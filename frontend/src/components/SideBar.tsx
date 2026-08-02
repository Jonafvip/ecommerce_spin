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
import { LayoutDashboard, Archive, Users, ListFilterPlus } from "lucide-react";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 text-xl tracking-wider">
        Ecommerce-Spin <br />
        <span className="text-sm text-gray-500">Panel de Admin</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton className="transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-primary hover:translate-x-1 py-5 pl-6">
                <LayoutDashboard className="h-5! w-6! shrink-0" />
                <span className="text-base font-light">
                  <NavLink to="/dash">Dashboard</NavLink>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Luego trabajere en los pedidos */}
            {/* <SidebarMenuItem>
              <SidebarMenuButton className="transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-primary hover:translate-x-1 py-5 pl-6">
                <ShoppingCart className="h-5! w-6! shrink-0" />
                <span className="text-base font-light">Orders</span>
              </SidebarMenuButton>
            </SidebarMenuItem> */}

            <SidebarMenuItem>
              <SidebarMenuButton className="transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-primary hover:translate-x-1 py-5 pl-6">
                <Archive className="h-5! w-6! shrink-0" />
                <span className="text-base font-light">Productos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-primary hover:translate-x-1 py-5 pl-6">
                <Users className="h-5! w-6! shrink-0" />
                <span className="text-base font-light">Clientes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-primary hover:translate-x-1 py-5 pl-6">
                <ListFilterPlus className="h-5! w-6! shrink-0" />
                <span className="text-base font-light">Categorias</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
