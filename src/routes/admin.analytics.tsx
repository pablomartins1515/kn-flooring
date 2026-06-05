import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

type Range = "7d" | "30d" | "90d";

type Counts = {
  pageViews: number;
  callClicks: number;
  textClicks: number;
  estimateRequests: number;
};

type PageRow = { page: string; count: number };
type DeviceRow = { device: string; count: number };

function AnalyticsPage() {
  const [range, setRange] = useState<Range>("7d");
  const [counts, setCounts] = useState<Counts | null>(null);
  const [topPages, setTopPages] = useState<PageRow[]>([]);
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const load = async () => {
      const [
        { count: pv },
        { count: cc },
        { count: tc },
        { count: est },
        { data: pageEvents },
        { data: deviceEvents },
      ] = await Promise.all([
        supabase.from("event_tracking").select("*", { count: "exact", head: true }).eq("event_type", "page_view").gte("created_at", since),
        supabase.from("event_tracking").select("*", { count: "exact", head: true }).eq("event_type", "call_click").gte("created_at", since),
        supabase.from("event_tracking").select("*", { count: "exact", head: true }).eq("event_type", "text_click").gte("created_at", since),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("is_estimate_request", true).gte("created_at", since),
        supabase.from("event_tracking").select("page").eq("event_type", "page_view").gte("created_at", since).limit(1000),
        supabase.from("event_tracking").select("device_type").gte("created_at", since).limit(1000),
      ]);

      setCounts({
        pageViews: pv ?? 0,
        callClicks: cc ?? 0,
        textClicks: tc ?? 0,
        estimateRequests: est ?? 0,
      });

      const pageMap = new Map<string, number>();
      (pageEvents ?? []).forEach((e) => {
        const p = e.page ?? "(unknown)";
        pageMap.set(p, (pageMap.get(p) ?? 0) + 1);
      });
      setTopPages(
        Array.from(pageMap.entries())
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      );

      const deviceMap = new Map<string, number>();
      (deviceEvents ?? []).forEach((e) => {
        const d = e.device_type ?? "unknown";
        deviceMap.set(d, (deviceMap.get(d) ?? 0) + 1);
      });
      setDevices(
        Array.from(deviceMap.entries())
          .map(([device, count]) => ({ device, count }))
          .sort((a, b) => b.count - a.count)
      );

      setLoading(false);
    };

    load();
  }, [range]);

  const totalDeviceEvents = devices.reduce((s, d) => s + d.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">Built-in tracking from your website.</p>
        </div>
        <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
          <TabsList>
            <TabsTrigger value="7d">7 days</TabsTrigger>
            <TabsTrigger value="30d">30 days</TabsTrigger>
            <TabsTrigger value="90d">90 days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Page Views" value={loading ? "—" : counts!.pageViews} />
        <MetricCard label="Call Clicks" value={loading ? "—" : counts!.callClicks} />
        <MetricCard label="Text Clicks" value={loading ? "—" : counts!.textClicks} />
        <MetricCard label="Estimate Requests" value={loading ? "—" : counts!.estimateRequests} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-semibold">Top Pages</h2>
          <p className="mt-1 text-xs text-muted-foreground">Most visited pages.</p>
          <div className="mt-4 space-y-2">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : topPages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No page views in this range.</p>
            ) : topPages.map((p) => {
              const max = topPages[0].count || 1;
              const pct = (p.count / max) * 100;
              return (
                <div key={p.page} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate font-medium">{p.page}</span>
                    <span className="text-muted-foreground">{p.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold">Devices</h2>
          <p className="mt-1 text-xs text-muted-foreground">All tracked events.</p>
          <div className="mt-4 space-y-3">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : devices.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data.</p>
            ) : devices.map((d) => {
              const pct = totalDeviceEvents ? (d.count / totalDeviceEvents) * 100 : 0;
              return (
                <div key={d.device} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize font-medium">{d.device}</span>
                    <span className="text-muted-foreground">{d.count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-walnut" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold">External Analytics</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect Google Analytics or Search Console for deeper traffic insights. This dashboard tracks website-side events directly from your site.
        </p>
      </Card>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <Card className="p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </Card>
  );
}
