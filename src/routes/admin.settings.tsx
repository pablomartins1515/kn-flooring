import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

type Settings = {
  id?: string;
  business_phone: string | null;
  business_email: string | null;
  estimate_email: string | null;
  whatsapp_number: string | null;
  google_review_link: string | null;
  yelp_review_link: string | null;
  facebook_link: string | null;
  instagram_link: string | null;
  cta_call_label: string | null;
  cta_text_label: string | null;
};

const empty: Settings = {
  business_phone: "",
  business_email: "",
  estimate_email: "",
  whatsapp_number: "",
  google_review_link: "",
  yelp_review_link: "",
  facebook_link: "",
  instagram_link: "",
  cta_call_label: "Call Now",
  cta_text_label: "Text Us",
};

function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*").maybeSingle();
      if (data) setSettings({ ...empty, ...data });
      setLoading(false);
    };
    load();
  }, []);

  const update = (k: keyof Settings, v: string) => setSettings((s) => ({ ...s, [k]: v }));

  const save = async () => {
    setSaving(true);
    const payload = {
      business_phone: settings.business_phone || null,
      business_email: settings.business_email || null,
      estimate_email: settings.estimate_email || null,
      whatsapp_number: settings.whatsapp_number || null,
      google_review_link: settings.google_review_link || null,
      yelp_review_link: settings.yelp_review_link || null,
      facebook_link: settings.facebook_link || null,
      instagram_link: settings.instagram_link || null,
      cta_call_label: settings.cta_call_label || "Call Now",
      cta_text_label: settings.cta_text_label || "Text Us",
    };
    const { error } = settings.id
      ? await supabase.from("site_settings").update(payload).eq("id", settings.id)
      : await supabase.from("site_settings").insert(payload);
    setSaving(false);
    if (error) {
      toast.error("Failed to save settings");
      return;
    }
    toast.success("Settings saved");
    const { data } = await supabase.from("site_settings").select("*").maybeSingle();
    if (data) setSettings({ ...empty, ...data });
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Business contact details and links displayed on the website.</p>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold">Contact</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Business Phone" value={settings.business_phone ?? ""} onChange={(v) => update("business_phone", v)} placeholder="(555) 123-4567" />
          <Field label="WhatsApp / SMS Number" value={settings.whatsapp_number ?? ""} onChange={(v) => update("whatsapp_number", v)} placeholder="+15551234567" />
          <Field label="Business Email" value={settings.business_email ?? ""} onChange={(v) => update("business_email", v)} placeholder="info@knflooring.com" />
          <Field label="Estimate Email Destination" value={settings.estimate_email ?? ""} onChange={(v) => update("estimate_email", v)} placeholder="estimates@knflooring.com" />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">Reviews</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Google Reviews URL" value={settings.google_review_link ?? ""} onChange={(v) => update("google_review_link", v)} placeholder="https://g.page/..." />
          <Field label="Yelp URL" value={settings.yelp_review_link ?? ""} onChange={(v) => update("yelp_review_link", v)} placeholder="https://yelp.com/biz/..." />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">Social</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Facebook URL" value={settings.facebook_link ?? ""} onChange={(v) => update("facebook_link", v)} />
          <Field label="Instagram URL" value={settings.instagram_link ?? ""} onChange={(v) => update("instagram_link", v)} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">CTA Labels</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Call Button Label" value={settings.cta_call_label ?? ""} onChange={(v) => update("cta_call_label", v)} />
          <Field label="Text Button Label" value={settings.cta_text_label ?? ""} onChange={(v) => update("cta_text_label", v)} />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
