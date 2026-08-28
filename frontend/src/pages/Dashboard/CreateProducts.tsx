import { api } from "@/api/api";
import { AppSidebar } from "@/components/SideBar";
import { Table } from "@/components/Table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { ProductListWatchAdmin } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Boxes } from "lucide-react";
import { Dialog } from "@/components/Dialog";
import { toast } from "@/components/ui/toast";
import { SkeletonTable } from "@/components/SkeletonTable";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";

const PAGE_SIZE = 8;

export const CreateProducts = () => {
  const [productsData, setProductsData] = useState<ProductListWatchAdmin[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [productSelected, setProductSelected] =
    useState<ProductListWatchAdmin | null>(null);
  const [productToDelete, setProductToDelete] =
    useState<ProductListWatchAdmin | null>(null);
  const [page, setPage] = useState(1);

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
            : "Error de conexión con el servidor";
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
        setProductsData(response.results);
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

  const totalPages = Math.max(1, Math.ceil(productsData.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = productsData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <div className="w-full max-w-6xl mx-auto px-2 pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:pb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-medium text-foreground">
                  Productos
                </h2>
                <p className="mt-1 text-base text-muted-foreground tracking-wider">
                  Controla tu Inventario
                </p>
              </div>
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 sm:flex">
                <Boxes size="22" />
              </div>
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
          <div className="relative mt-2 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 to-indigo-600" />
            <div className="p-4">
              {loading ? (
                <SkeletonTable />
              ) : (
                <Table
                  option={pageItems}
                  onDelete={setProductToDelete}
                  onUpdate={setProductSelected}
                />
              )}
            </div>
          </div>

          {!loading && totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
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
