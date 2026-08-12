import { api } from "@/api/api";
import { AppSidebar } from "@/components/SideBar";
import { Table } from "@/components/Table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { ProductListWatchAdmin } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { toast } from "@/components/ui/toast";
import { SkeletonTable } from "@/components/SkeletonTable";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";

export const CreateProducts = () => {
  const [productsData, setProductsData] = useState<ProductListWatchAdmin[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [productSelected, setProductSelected] =
    useState<ProductListWatchAdmin | null>(null);
  const [productToDelete, setProductToDelete] =
    useState<ProductListWatchAdmin | null>(null);

  const handleProductCreated = (newProduct: ProductListWatchAdmin) => {
    setProductsData((prev) =>
      prev.some((p) => p.id === newProduct.id)
        ? prev.map((p) => (p.id === newProduct.id ? newProduct : p))
        : [newProduct, ...prev],
    );
    setProductSelected(null);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.deleteProduct(id);
      setProductsData((prev) => prev.filter((pro) => pro.id !== id));
      toast.add({
        type: "success",
        title: "Product",
        description: "Producto eliminado Correctamente!",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response
          ? "No se pudo eliminar el Producto"
          : "Error de conextion con el servidor";
        setErrors(message);
        toast.add({
          type: "error",
          title: "Producto",
          description: message,
        });
      }
    }
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      setErrors(null);
      setLoading(true);
      try {
        const response = await api.getProductsAdmin();
        setProductsData(response);
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? error.response
            ? "No se pudieron Cargar los Productos"
            : "Error de conexion. Verifica tu Red"
          : "Ocurrio un error inesperado";
        setErrors(message);
        toast.add({
          type: "error",
          title: "Productos",
          description: message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDataProduct();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <div className="w-full max-w-6xl mx-auto px-2 pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:pb-5">
            <div>
              <h2 className="text-2xl font-medium">Productos</h2>
              <p className="text-base text-gray-500 tracking-wider mt-1">
                Controla tu Inventario
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <Dialog
                onProductCreated={handleProductCreated}
                product={productSelected}
                onCancelEdit={() => setProductSelected(null)}
              />
            </div>
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
          <div className="overflow-x-auto">
            {loading ? (
              <SkeletonTable />
            ) : (
              <Table
                option={productsData}
                onDelete={setProductToDelete}
                onUpdate={setProductSelected}
              />
            )}
          </div>
        </div>
      </div>
      <ConfirmDeleteDialog
        open={!!productToDelete}
        title="Eliminar Producto"
        description="¿Estás seguro de querer eliminar este producto?"
        onClose={() => setProductToDelete(null)}
        onConfirm={() => {
          handleDelete(productToDelete?.id as string | number);
          setProductToDelete(null);
        }}
      />
    </SidebarProvider>
  );
};
