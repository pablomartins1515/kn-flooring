import { createFileRoute, Outlet, Link, useLocation, useNavigate, useMatchRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — KN Flooring" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads", icon: Users, exact: false },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: true },
  { to: "/admin/settings", label: "Settings", icon: Settings, exact: true },
] as const;

function AdminLayout() {
  const { loading, session, isAdmin } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const isLoginRoute = location.pathname === "/admin/login";

  useEffect(() => {
    if (loading || isLoginRoute) return;
    if (!session || !isAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, session, isAdmin, isLoginRoute, navigate]);

  if (isLoginRoute) {
    return <Outlet />;
  }

  if (loading || !session || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="hidden w-60 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-sm font-semibold tracking-wide">KN Flooring</span>
          <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : !!matchRoute({ to: item.to, fuzzy: true });
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <div className="mb-2 px-3 text-xs text-muted-foreground truncate">{session.user.email}</div>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
          <span className="text-sm font-semibold">KN Admin</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b bg-background px-2 py-2 md:hidden">
          {navItems.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : !!matchRoute({ to: item.to, fuzzy: true });
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap rounded px-3 py-1.5 text-xs font-medium ${
                  active ? "bg-primary text-primary-foreground" : "text-foreground/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
