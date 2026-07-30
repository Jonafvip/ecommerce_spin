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
  ];
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
            <h2 className="text-3xl tracking-wider">
              DashBoard Descripcion General
            </h2>
            <h3 className="tracking-wider">
              Bienvenido de vuelta {userDataDetail?.username}... Que Haremos
              Ahora!
            </h3>
          </div>
          <Button className="rounded-xl p-5 mr-8 tracking-wider">
            <ArrowDownToLine /> Export Report
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-6  md:py-14">
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
        <div className="flex gap-8">
          <div className="w-10/14 border-2 border-gray-300 rounded-2xl p-4">
            <Step4 />
          </div>
          <div className="w-1/3 border-2 border-gray-300 rounded-2xl">
            <h2 className="text-xl tracking-wide px-4 p-4">Top Products</h2>
            <div className="flex flex-col gap-4 p-4">
              {productData.map((pro) => (
                <div key={pro.id} className="flex justify-between gap-4">
                  <img src={pro.image} className="w-25 object-cover rounded-2xl" />
                  <div className="px-4">
                    <h2>{pro.name}</h2>
                    <p>{pro.stock} unidades</p>
                  </div>
                  <p>${pro.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
