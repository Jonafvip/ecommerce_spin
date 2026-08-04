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
import Camisa from "@/assets/camisa.webp";
import Moto from "@/assets/motocierra.webp";
import Refri from "@/assets/refrigeradora.webp";
import Tv from "@/assets/nueva-smart-tv.webp";
export const Dashboard = () => {
  const [userDataDetail, setUserDataDetail] = useState<UserDetailt>();
  // const [productData, setProductData] = useState<ProductListExceptCategory[]>(
  //   [],
  // );

  const productData = [
    { id: 1, name: "Televisor", price: 789.99, stock: 20, image: Tv },
    { id: 2, name: "Refrigeradora", price: 839.99, stock: 40, image: Refri },
    {
      id: 3,
      name: "Camisa de Algodon",
      price: 129.99,
      stock: 50,
      image: Camisa,
    },
    { id: 4, name: "Motocierra", price: 669.99, stock: 60, image: Moto },
    { id: 5, name: "MotocierraV2", price: 559.99, stock: 30, image: Moto },
  ];

  const metricCards = [
    {
      id: "ingresos",
      label: "Ingresos Totales",
      icon: <FaMoneyBill1Wave size="20" />,
    },
    {
      id: "pedidos",
      label: "Total de Pedidos",
      icon: <IoBagOutline size="20" />,
    },
    {
      id: "clientes",
      label: "Clientes Activos",
      icon: <MdOutlinePeopleAlt size="20" />,
    },
    {
      id: "promedio",
      label: "Promedio de Pedidos",
      icon: <ScrollText size="20" />,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.getUserDetail();
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
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl tracking-wider">
                DashBoard Descripcion General
              </h2>
              <h3 className="text-sm sm:text-base text-muted-foreground tracking-wider mt-1">
                Bienvenido de vuelta{" "}
                {userDataDetail?.username
                  ? userDataDetail.username.charAt(0).toUpperCase() +
                    userDataDetail.username.slice(1).toLowerCase()
                  : "Usuario"}
                ... ¡Qué haremos ahora!
              </h3>
            </div>
            <Button className="rounded-xl p-5 tracking-wider w-full sm:w-auto">
              <ArrowDownToLine /> Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-6 md:py-10">
            {metricCards.map((card) => (
              <div
                key={card.id}
                className="border border-gray-200 bg-gray-50 p-5 rounded-2xl font-light tracking-wider flex flex-col justify-between gap-6 min-h-35"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-sm text-muted-foreground">
                    {card.label}
                  </h5>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 shrink-0">
                    {card.icon}
                  </div>
                </div>
                <p className="text-2xl font-medium">—</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 border-2 border-gray-200 rounded-2xl p-4 overflow-x-auto">
              <Step4 />
            </div>
            <div className="border-2 border-gray-200 rounded-2xl p-4">
              <h2 className="text-xl tracking-wide px-4 pt-4 pb-2">
                Top Products
              </h2>
              <div className="flex flex-col gap-2 p-4">
                {productData.map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={pro.image}
                        alt={pro.name}
                        className="w-14 h-14 object-cover rounded-xl shrink-0"
                      />
                      <div className="min-w-0">
                        <h2 className="text-sm font-medium truncate">
                          {pro.name}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {pro.stock} unidades
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium shrink-0">${pro.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
