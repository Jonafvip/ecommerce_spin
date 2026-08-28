import { useEffect, useState } from "react";
import { type UserListByAdmin } from "@/types/types";
import { api } from "@/api/api";
import axios from "axios";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { TableCustomized } from "@/components/TableCustomized";
import { Select } from "@/components/Select";
import Barchar from "@/components/grafics/Barchar";
import { toast } from "@/components/ui/toast";
import { SkeletonTable } from "@/components/SkeletonTable";
import { Users, UserPlus, Percent, BarChart3, RefreshCw } from "lucide-react";

const selectCustomerSort = [
  { label: "Nombre (A-Z)", value: "username" },
  { label: "Nombre (Z-A)", value: "-username" },
];

export const Customer = () => {
  const [customerData, setCustomerData] = useState<UserListByAdmin[]>([]);
  const [ordering, setOrdering] = useState<string>("");
  const [nextUrl, setnextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState({
    count: 0,
    customersNew: 0,
  });
  const [customerGrowth, setCustomerGrowth] = useState<
    { name: string; value: number }[]
  >([]);

  const fetchDataCustomer = async (url?: string, pageNumber: number = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await api.getUsersListByAdmin(url);
      setCustomerData(response.results);
      setnextUrl(response.next);
      setPrevUrl(response.previous);
      setCurrentPage(pageNumber);
      setStats((prev) => ({ ...prev, count: response.count }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
          const message = error.response
            ? "No se pudieron cargar los Clientes."
            : "Error de conexión con el servidor";
        setErrors(message);
        toast.add({
          type: "error",
          title: "Clientes",
          description: message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (ordering) {
      params.append("ordering", ordering);
    }

    const queryString = params.toString();
    const url = queryString
      ? `${import.meta.env.VITE_BASE_URL}users/admin/?${queryString}`
      : undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDataCustomer(url, 1);
  }, [ordering]);

  const customerMetrics = [
    {
      id: "totales",
      label: "Clientes Totales",
      result: stats.count,
      hint: "Registrados en total",
      icon: <Users size="20" />,
      iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      bar: "from-emerald-400 to-emerald-600",
      glow: "bg-emerald-400/20",
    },
    {
      id: "retencion",
      label: "Tasa de Retencion",
      result: "Sin resultado",
      hint: "No disponible aún",
      icon: <Percent size="20" />,
      iconClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      bar: "from-sky-400 to-sky-600",
      glow: "bg-sky-400/20",
    },
    {
      id: "nuevos",
      label: "Nuevos Clientes",
      result: stats.customersNew,
      hint: "Últimos 30 días",
      icon: <UserPlus size="20" />,
      iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      bar: "from-violet-400 to-violet-600",
      glow: "bg-violet-400/20",
    },
  ];

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        let allUsers: UserListByAdmin[] = [];
        let url: string | undefined = undefined;

        do {
          const page = await api.getUsersListByAdmin(url);
          allUsers = [...allUsers, ...page.results];
          url = page.next ?? undefined;
        } while (url);

        const thirtyDays = new Date();
        thirtyDays.setDate(thirtyDays.getDate() - 30);

        const customerNew = allUsers.filter((u) => {
          if (!u.date_joined) return false;
          return new Date(u.date_joined) >= thirtyDays;
        }).length;

        const monthNames = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
        ];
        const byMonth: Record<string, number> = {};
        allUsers.forEach((u) => {
          if (!u.date_joined) return;
          const d = new Date(u.date_joined);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          byMonth[key] = (byMonth[key] ?? 0) + 1;
        });
        const growth = Object.entries(byMonth)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => {
            const month = Number(key.split("-")[1]) - 1;
            return { name: monthNames[month], value };
          });

        setCustomerGrowth(growth);
        setStats((prev) => ({
          ...prev,
          customersNew: customerNew,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCustomers();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-13 pb-12 ">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="px-2">
              <h2 className="text-2xl font-medium sm:text-2xl text-foreground">
                Clientes
              </h2>
              <p className="mt-1 text-base tracking-wider text-muted-foreground">
                Gestiona tu lista de Clientes y Consulta las estadisticas
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <Select
                value={ordering}
                placeholder="Ordenar Por: "
                options={selectCustomerSort}
                onChange={setOrdering}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-3">
            {customerMetrics.map((metric) => (
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
          {errors && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              <span>{errors}</span>
              <button
                type="button"
                onClick={() => fetchDataCustomer(undefined, 1)}
                className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-100"
              >
                <RefreshCw size="16" /> Reintentar
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="min-w-0 overflow-x-auto xl:col-span-2">
              {loading ? (
                <SkeletonTable />
              ) : customerData.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                  <Users className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No hay clientes para mostrar.
                  </p>
                </div>
              ) : (
                <TableCustomized
                  options={customerData}
                  next={nextUrl}
                  prev={prevUrl}
                  onPageChange={fetchDataCustomer}
                  currentPage={currentPage}
                />
              )}
            </div>
            <div className="relative min-h-[300px] min-w-0 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h2 className="text-xl tracking-wide text-foreground">
                    Clientes Registrados por Mes
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground tracking-wider">
                    Cantidad de clientes que se registraron en la plataforma cada
                    mes.
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <BarChart3 size="20" />
                </div>
              </div>
              <div className="px-2 pb-4">
                <Barchar data={customerGrowth} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
};
