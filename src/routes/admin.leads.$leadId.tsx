import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Phone, Mail, MessageSquare, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/leads/$leadId")({
  component: LeadDetailPage,
});

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service_needed: string | null;
  message: string | null;
  status: string;
  source_page: string | null;
  is_estimate_request: boolean;
  created_at: string;
  updated_at: string;
};

type Note = {
  id: string;
  note: string;
  created_at: string;
  author_id: string | null;
};

const STATUSES = ["New", "Contacted", "Estimate Sent", "Won", "Lost"] as const;
type LeadStatus = typeof STATUSES[number];

function LeadDetailPage() {
  const { leadId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const load = async () => {
    const [{ data: leadData }, { data: notesData }] = await Promise.all([
      supabase.from("leads").select("*").eq("id", leadId).maybeSingle(),
      supabase.from("lead_notes").select("*").eq("lead_id", leadId).order("created_at", { ascending: false }),
    ]);
    setLead(leadData as Lead | null);
    setNotes((notesData ?? []) as Note[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  const updateStatus = async (status: string) => {
    if (!lead) return;
    const { error } = await supabase.from("leads").update({ status: status as LeadStatus }).eq("id", lead.id);
    if (error) {
      toast.error("Failed to update status");
      return;
    }
    setLead({ ...lead, status });
    toast.success("Status updated");
  };

  const addNote = async () => {
    if (!newNote.trim() || !user) return;
    setSavingNote(true);
    const { error } = await supabase.from("lead_notes").insert({
      lead_id: leadId,
      note: newNote.trim(),
      author_id: user.id,
    });
    setSavingNote(false);
    if (error) {
      toast.error("Failed to add note");
      return;
    }
    setNewNote("");
    load();
  };

  const deleteLead = async () => {
    const { error } = await supabase.from("leads").delete().eq("id", leadId);
    if (error) {
      toast.error("Failed to delete");
      return;
    }
    toast.success("Lead deleted");
    navigate({ to: "/admin/leads" });
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  }

  if (!lead) {
    return (
      <div className="space-y-4">
        <Link to="/admin/leads" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to leads
        </Link>
        <Card className="p-8 text-center text-sm text-muted-foreground">Lead not found.</Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/admin/leads" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to leads
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteLead} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">{lead.full_name}</h1>
                {lead.is_estimate_request && (
                  <span className="rounded bg-walnut/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-walnut">Estimate</span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Received {format(new Date(lead.created_at), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            <div className="w-44">
              <Select value={lead.status} onValueChange={updateStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Phone" value={
              <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                <Phone className="h-3.5 w-3.5" /> {lead.phone}
              </a>
            } />
            <Field label="Email" value={
              lead.email ? (
                <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 text-primary hover:underline break-all">
                  <Mail className="h-3.5 w-3.5" /> {lead.email}
                </a>
              ) : "—"
            } />
            <Field label="City" value={lead.city ?? "—"} />
            <Field label="Service" value={lead.service_needed ?? "—"} />
            <Field label="Source" value={lead.source_page ?? "—"} />
          </div>

          {lead.message && (
            <div className="mt-6">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</div>
              <p className="mt-2 whitespace-pre-wrap rounded-md bg-muted/40 p-4 text-sm">{lead.message}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline">
              <a href={`tel:${lead.phone}`}><Phone className="mr-2 h-4 w-4" /> Call</a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href={`sms:${lead.phone}`}><MessageSquare className="mr-2 h-4 w-4" /> Text</a>
            </Button>
            {lead.email && (
              <Button asChild size="sm" variant="outline">
                <a href={`mailto:${lead.email}`}><Mail className="mr-2 h-4 w-4" /> Email</a>
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold">Notes</h2>
          <p className="mt-1 text-xs text-muted-foreground">Internal follow-up notes.</p>
          <div className="mt-4 space-y-2">
            <Textarea
              placeholder="Add a note…"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <Button size="sm" onClick={addNote} disabled={!newNote.trim() || savingNote}>
              {savingNote ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add note"}
            </Button>
          </div>
          <div className="mt-6 space-y-3">
            {notes.length === 0 ? (
              <p className="text-xs text-muted-foreground">No notes yet.</p>
            ) : notes.map((n) => (
              <div key={n.id} className="rounded-md border bg-muted/20 p-3">
                <p className="whitespace-pre-wrap text-sm">{n.note}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {format(new Date(n.created_at), "MMM d, h:mm a")}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
