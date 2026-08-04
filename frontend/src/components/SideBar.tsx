import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Archive,
  Users,
  ListFilterPlus,
  ShoppingCart,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { to: "/dash", label: "Dashboard", icon: LayoutDashboard },
  { to: "/create-products", label: "Productos", icon: Archive },
  { to: "/customers", label: "Clientes", icon: Users },
  { to: "/categories", label: "Categorias", icon: ListFilterPlus },
  { to: "/orders", label: "Pedidos", icon: ShoppingCart },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <h1 className="text-xl tracking-wider font-medium">Ecommerce-Spin</h1>
        <span className="text-sm text-gray-500">Panel de Admin</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1 px-1">
            {menuItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;

              return (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    isActive={isActive}
                    className={cn(
                      "py-5 pl-5 rounded-lg transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-primary hover:translate-x-1",
                      isActive &&
                        "bg-slate-100 dark:bg-zinc-800 text-primary font-medium",
                    )}
                  >
                    <NavLink to={to} className="flex items-center gap-3 w-full">
                      <Icon className="h-5! w-5! shrink-0" />
                      <span className="text-base font-light">{label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
