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

  const handleProductCreated = (newProduct: ProductListWatchAdmin) => {
    setProductsData((prevProducts) => [newProduct, ...prevProducts]);
  };

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
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <div>
              <h2 className="text-2xl font-medium">Productos</h2>
              <p className="text-muted-foreground tracking-wider mt-1">
                Controla tu Inventario
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <Dialog onProductCreated={handleProductCreated} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table option={productsData} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
