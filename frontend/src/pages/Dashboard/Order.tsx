import { api } from "@/api/api";
import { AppSidebar } from "@/components/SideBar";
import { TableOrders } from "@/components/TableOrders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { OrderList } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const Order = () => {
  const [ordersData, setordersData] = useState<OrderList[]>([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await api.getOrders();
        console.log(response);
        setordersData(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data;
          console.log(serverError);
        }
      }
    };
    fetchOrdersData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="m-2" />
      <div className="w-230 mx-auto py-10">
        <div className="pb-6">
          <h2 className="text-3xl">Pedidos</h2>
          <p>
            Gestionar y realizar el seguimiento de la satisfacción del clientes
          </p>
        </div>
        <TableOrders options={ordersData} />
      </div>
    </SidebarProvider>
  );
};
