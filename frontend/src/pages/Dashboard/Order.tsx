import { api } from "@/api/api";
import { AppSidebar } from "@/components/SideBar";
import { SkeletonTable } from "@/components/SkeletonTable";
import { TableOrders } from "@/components/TableOrders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/Select";
import { toast } from "@/components/ui/toast";
import type { OrderList } from "@/types/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  DollarSign,
  Search,
  RefreshCw,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";

const statusFilterOptions = [
  { label: "Todos los estados", value: "" },
  { label: "Pendiente", value: "PENDING" },
  { label: "Confirmado", value: "CONFIRMED" },
  { label: "Enviado", value: "SHIPPED" },
  { label: "Entregado", value: "DELIVERED" },
  { label: "Cancelado", value: "CANCELED" },
];

const pageSize = 8;

export const Order = () => {
  const [ordersData, setordersData] = useState<OrderList[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  const loadOrders = async () => {
    setErrors(null);
    setLoading(true);
    try {
      const response = await api.getOrders();
      setordersData(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response
          ? "No se pudieron cargar los Pedidos."
          : "Error de conexión con el servidor";
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

  useEffect(() => {
    queueMicrotask(() => {
      loadOrders();
    });
  }, []);

  const filtered = useMemo(() => {
    return ordersData.filter((o) => {
      const matchStatus = !statusFilter || o.status === statusFilter;
      const name = (
        o.user.full_name?.trim() ||
        o.user.username ||
        ""
      ).toLowerCase();
      const matchSearch =
        !search.trim() || name.includes(search.trim().toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [ordersData, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalOrders = ordersData.length;
  const pending = ordersData.filter((o) => o.status === "PENDING").length;
  const delivered = ordersData.filter((o) => o.status === "DELIVERED").length;
  const revenue = ordersData.reduce((acc, o) => acc + Number(o.total), 0);

  const orderMetrics = [
    {
      id: "totales",
      label: "Total de Pedidos",
      result: totalOrders,
      hint: "Registrados en total",
      icon: <ShoppingCart size="20" />,
      iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      bar: "from-emerald-400 to-emerald-600",
      glow: "bg-emerald-400/20",
    },
    {
      id: "pendientes",
      label: "Pedidos Pendientes",
      result: pending,
      hint: "Por confirmar",
      icon: <Clock size="20" />,
      iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      bar: "from-amber-400 to-amber-600",
      glow: "bg-amber-400/20",
    },
    {
      id: "entregados",
      label: "Pedidos Entregados",
      result: delivered,
      hint: "Completados",
      icon: <CheckCircle2 size="20" />,
      iconClass: "bg-green-500/10 text-green-600 dark:text-green-400",
      bar: "from-green-400 to-green-600",
      glow: "bg-green-400/20",
    },
    {
      id: "ingresos",
      label: "Ingresos",
      result: formatCurrency(revenue),
      hint: "Suma de pedidos",
      icon: <DollarSign size="20" />,
      iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      bar: "from-violet-400 to-violet-600",
      glow: "bg-violet-400/20",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="m-2" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="flex items-start justify-between gap-4 pb-2">
          <div>
            <h2 className="text-2xl font-medium tracking-wide text-foreground">
              Pedidos
            </h2>
            <p className="mt-1 text-base text-muted-foreground tracking-wider">
              Gestiona y realiza el seguimiento de la satisfacción de los
              clientes
            </p>
          </div>
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 sm:flex">
            <ShoppingCart size="22" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 md:py-10">
          {orderMetrics.map((metric) => (
            <div
              key={metric.id}
              className="group relative flex min-h-[140px] flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-border bg-card p-5 font-light tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${metric.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${metric.bar}`}
              />
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-medium text-foreground">
                  {metric.label}
                </h5>
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${metric.iconClass}`}
                >
                  {metric.icon}
                </div>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground sm:text-4xl">
                  {metric.result}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {metric.hint}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select
              value={statusFilter}
              placeholder="Estado"
              options={statusFilterOptions}
              onChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Buscar cliente..."
                className="w-full pl-9 sm:w-64"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "pedido" : "pedidos"}
          </p>
        </div>

        {errors && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <span>{errors}</span>
            <button
              type="button"
              onClick={loadOrders}
              className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-100"
            >
              <RefreshCw size="16" /> Reintentar
            </button>
          </div>
        )}

        {!errors && (
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 to-indigo-600" />
            <div className="p-4">
              {loading ? (
                <SkeletonTable />
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No hay pedidos que coincidan con los filtros.
                  </p>
                </div>
              ) : (
                <>
                  <TableOrders options={paged} />
                  {filtered.length > pageSize && (
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        Anterior
                      </button>
                      <span className="text-sm text-muted-foreground">
                        Página {currentPage} de {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        Siguiente
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};
