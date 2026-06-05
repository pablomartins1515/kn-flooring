import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

export const Route = createFileRoute("/admin/leads/")({
  component: AdminLeadsListPage,
});

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service_needed: string | null;
  status: string;
  source_page: string | null;
  is_estimate_request: boolean;
  created_at: string;
};

const STATUSES = ["All", "New", "Contacted", "Estimate Sent", "Won", "Lost"] as const;

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  "Estimate Sent": "bg-purple-100 text-purple-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-gray-100 text-gray-600",
};

function AdminLeadsListPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("leads")
        .select("id, full_name, phone, email, city, service_needed, status, source_page, is_estimate_request, created_at")
        .order("created_at", { ascending: false });
      setLeads(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "All" && l.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          l.full_name.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          (l.email?.toLowerCase().includes(q) ?? false) ||
          (l.service_needed?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [leads, search, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">All contact and estimate requests.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search by name, phone, email, service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground sm:ml-auto">
          {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
        </div>
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">No leads match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-5 py-3">
                      <Link to="/admin/leads/$leadId" params={{ leadId: lead.id }} className="font-medium hover:text-primary">
                        {lead.full_name}
                      </Link>
                      {lead.is_estimate_request && (
                        <span className="ml-2 rounded bg-walnut/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-walnut">Estimate</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{lead.phone}</td>
                    <td className="px-5 py-3 text-muted-foreground">{lead.service_needed ?? "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[lead.status] ?? "bg-muted text-foreground"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{lead.source_page ?? "—"}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(lead.created_at), "MMM d, h:mm a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
