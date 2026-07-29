import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { type UserDetailt } from "@/types/types";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { ScrollText } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import axios from "axios";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Step4 } from "@/components/grafics/Diagrams";

export const Dashboard = () => {
  const [userDataDetail, setUserDataDetail] = useState<UserDetailt>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.getUserDetail();
        console.log(response);
        setUserDataDetail(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data;
          console.log("Errores", serverError);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="w-min-full p-6 flex flex-col mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl pl-6 tracking-wider">
              DashBoard Descripcion General
            </h2>
            <h3 className="pl-6 tracking-wider">
              Bienvenido de vuelta {userDataDetail?.username}... Que Haremos
              Ahora!
            </h3>
          </div>
          <Button className="rounded-xl p-5 mr-8 tracking-wider">
            <ArrowDownToLine /> Export Report
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-6 px-6   md:py-14">
          <div className="w-80 lg:w-65 h-40 border border-gray-400 bg-gray-50 p-4 rounded-2xl font-light stracking-wider">
            <div className="flex  items-center gap-10">
              <h5>Ingresos Totales</h5>
              <FaMoneyBill1Wave size="25" />
            </div>
          </div>
          <div className="w-80 lg:w-65 h-40 border border-gray-400 bg-gray-50 p-4 rounded-2xl font-light tracking-wider">
            <div className="flex  items-center gap-10">
              <h5> Total de Pedidos</h5>
              <IoBagOutline size="25" />
            </div>
          </div>
          <div className="w-80 lg:w-65 h-40 border border-gray-400 bg-gray-50 p-4 rounded-2xl font-light tracking-wider">
            <div className="flex items-center gap-10">
              <h5>Clientes Activos</h5>
              <MdOutlinePeopleAlt size="25" />
            </div>
          </div>
          <div className="w-80 lg:w-65 h-40 border border-gray-400 bg-gray-50 p-4 rounded-2xl font-light tracking-wider">
            <div className="flex items-center gap-5">
              <h5>Promedio de Pedidos</h5>
              <ScrollText />
            </div>
          </div>
        </div>
        <div>
          <div className="w-165.5 border-2 rounded-2xl p-4">
            <Step4 />
          </div>
          <div></div>
        </div>
      </div>
    </SidebarProvider>
  );
};
