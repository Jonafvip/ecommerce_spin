import { useEffect, useState } from "react";
import { type UserListByAdmin } from "@/types/types";
import { api } from "@/api/api";
import axios from "axios";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { TableCustomized } from "@/components/TableCustomized";
import { Select } from "@/components/Select";
import Barchar from "@/components/grafics/Barchar";

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

  const fetchDataCustomer = async (url?: string, pageNumber: number = 1) => {
    try {
      const response = await api.getUsersListByAdmin(url);
      setCustomerData(response.results);
      setnextUrl(response.next);
      setPrevUrl(response.previous);
      setCurrentPage(pageNumber);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data;
        console.log(serverError);
      }
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
    fetchDataCustomer(url, 1);
  }, [ordering]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <section className="w-275 mx-auto p-6">
        <div className="w-full mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-3xl tracking-wider">Clientes</h2>
            <p className="text-2xs text-gray-600  tracking-wider">
              Gestiona tu lista de Clientes y Consulta las estadisticas
            </p>
          </div>
          <div>
            <Select
              value={ordering}
              placeholder="Ordenar Por: "
              options={selectCustomerSort}
              onChange={setOrdering}
            />
          </div>
        </div>
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 py-6  md:py-2">
            <div className="w-80 lg:w-72 h-40 border border-gray-400 bg-gray-50 p-4 rounded-2xl font-light stracking-wider">
              <div className="flex  items-center gap-10">
                <h5>Clientes Totales</h5>
              </div>
            </div>
            <div className="w-80 lg:w-72 h-40 border border-gray-400 bg-gray-50 p-4 rounded-2xl font-light tracking-wider">
              <div className="flex  items-center gap-10">
                <h5>Tasa de Retencion</h5>
              </div>
            </div>
            <div className="w-80 lg:w-72 h-40 border border-gray-400 bg-gray-50 p-4 rounded-2xl font-light tracking-wider">
              <div className="flex items-center gap-10">
                <h5>Nuevos Clientes</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full lg:w-9/12 min-w-0 overflow-x-auto">
            <TableCustomized
              options={customerData}
              next={nextUrl}
              prev={prevUrl}
              onPageChange={fetchDataCustomer}
              currentPage={currentPage}
            />
          </div>
          <div className="w-full lg:w-1/3 min-w-0 h-76.25 bg-gray-50 py-4 rounded-xl border border-gray-200">
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
    </SidebarProvider>
  );
};
