import { api } from "@/api/api";
import { AppSidebar } from "@/components/SideBar";
import { SkeletonTable } from "@/components/SkeletonTable";
import { TableOrders } from "@/components/TableOrders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import type { OrderList } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const Order = () => {
  const [ordersData, setordersData] = useState<OrderList[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrdersData = async () => {
      setErrors(null);
      setLoading(true);
      try {
        const response = await api.getOrders();
        setordersData(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response
            ? "No se puediron cargar los Pedidos."
            : "Error de conexion con el servidor";
          setErrors(message);
          toast.add({
            type: "error",
            title: "Pedidos",
            description: message,
          });
        }
      } finally {
        setLoading(false);
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
        {errors && <p className="text-red-500">{errors}</p>}
        {loading ? <SkeletonTable /> : <TableOrders options={ordersData} />}
      </div>
    </SidebarProvider>
  );
};
