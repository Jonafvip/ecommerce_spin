import { api } from "@/api/api";
import { useEffect, useState } from "react";
import { type OrderList } from "@/types/types";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export const OrderHistory = () => {
  const [ordersCustomer, setOrdersCustomer] = useState<OrderList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.getMyOrders();
        setOrdersCustomer(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data;
          console.log(serverError);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">Historial de Pedidos</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Ver y realizar un seguimiento de tus compras recientes.
        </p>
      </div>

      <Separator className="mb-6" />

      {loading ? (
        <Spinner />
      ) : ordersCustomer.length === 0 ? (
        <p className="text-3xl text-center text-muted-foreground p-10">
          No hay Pedidos...
        </p>
      ) : (
        <div className="space-y-6">
          {ordersCustomer.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border bg-background p-5 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha</p>

                  <p className="font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground lg:pl-5 md:pl-5">
                    Estado
                  </p>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium
                ${
                  order.status === "Completado"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold">${order.total}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Productos</p>
                  <p className="font-medium">{order.details?.length ?? 0}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {order.details?.map((item) => (
                  <img
                    key={item.id}
                    src={item.product_image}
                    alt={item.product_name}
                    className="h-20 w-20 rounded-lg border object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
