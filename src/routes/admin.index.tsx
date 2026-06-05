import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, Eye, PhoneCall, MessageSquare, FileText, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/admin/")({
  component: AdminOverviewPage,
});

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  service_needed: string | null;
  status: string;
  created_at: string;
  is_estimate_request: boolean;
};

type Stats = {
  newLeads7d: number;
  totalLeads: number;
  pageViews7d: number;
  callClicks7d: number;
  textClicks7d: number;
  estimates7d: number;
};

function StatCard({ icon: Icon, label, value, hint }: { icon: React.ElementType; label: string; value: number | string; hint?: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold">{value}</div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}

function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const load = async () => {
      const [
        { count: newLeads7d },
        { count: totalLeads },
        { count: pageViews7d },
        { count: callClicks7d },
        { count: textClicks7d },
        { count: estimates7d },
        { data: recentLeads },
      ] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("event_tracking").select("*", { count: "exact", head: true }).eq("event_type", "page_view").gte("created_at", sevenDaysAgo),
        supabase.from("event_tracking").select("*", { count: "exact", head: true }).eq("event_type", "call_click").gte("created_at", sevenDaysAgo),
        supabase.from("event_tracking").select("*", { count: "exact", head: true }).eq("event_type", "text_click").gte("created_at", sevenDaysAgo),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("is_estimate_request", true).gte("created_at", sevenDaysAgo),
        supabase.from("leads").select("id, full_name, phone, email, service_needed, status, created_at, is_estimate_request").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        newLeads7d: newLeads7d ?? 0,
        totalLeads: totalLeads ?? 0,
        pageViews7d: pageViews7d ?? 0,
        callClicks7d: callClicks7d ?? 0,
        textClicks7d: textClicks7d ?? 0,
        estimates7d: estimates7d ?? 0,
      });
      setRecent(recentLeads ?? []);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">Last 7 days of website activity and leads.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Users} label="New Leads" value={loading ? "—" : stats!.newLeads7d} hint="Last 7 days" />
        <StatCard icon={FileText} label="Estimate Requests" value={loading ? "—" : stats!.estimates7d} hint="Last 7 days" />
        <StatCard icon={Eye} label="Page Views" value={loading ? "—" : stats!.pageViews7d} hint="Last 7 days" />
        <StatCard icon={PhoneCall} label="Call Clicks" value={loading ? "—" : stats!.callClicks7d} hint="Last 7 days" />
        <StatCard icon={MessageSquare} label="Text Clicks" value={loading ? "—" : stats!.textClicks7d} hint="Last 7 days" />
        <StatCard icon={Users} label="Total Leads" value={loading ? "—" : stats!.totalLeads} hint="All time" />
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-semibold">Recent Leads</h2>
          <Link to="/admin/leads" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : recent.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No leads yet.</div>
        ) : (
          <ul className="divide-y">
            {recent.map((lead) => (
              <li key={lead.id}>
                <Link
                  to="/admin/leads/$leadId"
                  params={{ leadId: lead.id }}
                  className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{lead.full_name}</span>
                      {lead.is_estimate_request && (
                        <span className="rounded bg-walnut/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-walnut">Estimate</span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground truncate">
                      {lead.phone}{lead.service_needed ? ` · ${lead.service_needed}` : ""}
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                    <div className="font-medium text-foreground">{lead.status}</div>
                    <div>{formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
