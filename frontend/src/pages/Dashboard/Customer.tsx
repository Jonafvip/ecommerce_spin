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
          ? "No se puediron cargar los Clientes."
          : "Error de conexion con el servidor";
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
    { id: "totales", label: "Clientes Totales", result: stats.count },
    { id: "retencion", label: "Tasa de Retencion", result: "Sin resultado" },
    { id: "nuevos", label: "Nuevos Clientes", result: stats.customersNew },
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
                className="flex min-h-35 flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-5 font-light tracking-wider"
              >
                <h5 className="text-sm text-muted-foreground">
                  {metric.label}
                </h5>
                <p className="text-2xl font-medium text-foreground">
                  {metric.result}
                </p>
              </div>
            ))}
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="min-w-0 overflow-x-auto xl:col-span-2">
              {loading ? (
                <SkeletonTable />
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
            <div className="min-h-76.25 min-w-0 rounded-xl border border-border bg-card py-4">
              <Barchar
                data={[
                  { name: "January", value: 100 },
                  { name: "February", value: 150 },
                  { name: "Marz", value: 250 },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
};
