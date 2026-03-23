import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Package, FileText, Image, Mail, Briefcase, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo-metacares.png";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Tableau de bord", end: true },
  { to: "/admin/products", icon: Package, label: "Produits" },
  { to: "/admin/content", icon: FileText, label: "Contenus" },
  { to: "/admin/gallery", icon: Image, label: "Images" },
  { to: "/admin/messages", icon: Mail, label: "Messages" },
  { to: "/admin/applications", icon: Briefcase, label: "Candidatures" },
];

const AdminLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Meta Cares" className="h-8 w-auto" />
          <div>
            <h2 className="text-sm font-bold text-foreground">Meta Cares</h2>
            <p className="text-[10px] text-muted-foreground">Administration</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "gradient-bg text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-primary/10">
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5">
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 bg-card border-r border-primary/10 fixed inset-y-0 left-0 z-30 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 gradient-bg px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Meta Cares" className="h-7 w-auto brightness-0 invert" />
          <span className="text-sm font-bold text-primary-foreground">Admin</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} className="text-primary-foreground hover:bg-primary-foreground/10">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-card z-50 lg:hidden shadow-lg">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-60 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
