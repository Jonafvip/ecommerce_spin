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

  const fetchDataCustomer = async (url?: string, pageNumber: number = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await api.getUsersListByAdmin(url);
      setCustomerData(response.results);
      setnextUrl(response.next);
      setPrevUrl(response.previous);
      setCurrentPage(pageNumber);
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
    { id: "totales", label: "Clientes Totales" },
    { id: "retencion", label: "Tasa de Retencion" },
    { id: "nuevos", label: "Nuevos Clientes" },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl tracking-wider">Clientes</h2>
              <p className="text-base text-gray-500 tracking-wider mt-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
            {customerMetrics.map((metric) => (
              <div
                key={metric.id}
                className="border border-gray-200 bg-gray-50 p-5 rounded-2xl font-light tracking-wider flex flex-col justify-between gap-6 min-h-35"
              >
                <h5 className="text-sm text-muted-foreground">
                  {metric.label}
                </h5>
                <p className="text-2xl font-medium">—</p>
              </div>
            ))}
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 min-w-0 overflow-x-auto">
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
            <div className="min-w-0 min-h-76.25 bg-gray-50 py-4 rounded-xl border border-gray-200">
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
