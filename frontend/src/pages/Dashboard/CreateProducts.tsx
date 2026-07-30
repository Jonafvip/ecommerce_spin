import { api } from "@/api/api";
import { AppSidebar } from "@/components/SideBar";
import { Table } from "@/components/Table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { ProductListWatchAdmin } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/Dialog";

export const CreateProducts = () => {
  const [productsData, setProductsData] = useState<ProductListWatchAdmin[]>([]);

  const handleProductCreated = (newProduct:ProductListWatchAdmin) => {
    setProductsData((prevProducts) => [newProduct,...prevProducts])
  }

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await api.getProductsAdmin();
        setProductsData(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data;
          console.log(serverError);
        }
      }
    };
    fetchDataProduct();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="w-[1000px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="py-6">
            <h2 className="text-2xl">Products</h2>
            <p>Controla tu Inventario</p>
          </div>
          <div>
            <Dialog onProductCreated={handleProductCreated}/>
          </div>
        </div>
        <Table option={productsData} />
      </div>
    </SidebarProvider>
  );
};
