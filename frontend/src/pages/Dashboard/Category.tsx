import React, { useEffect, useState } from "react";
import { type CategoryCreate, type CategoryList } from "@/types/types";
import { api } from "@/api/api";
import axios from "axios";
import { TableCategory } from "@/components/TableCategory";
import { Input } from "@/components/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { SkeletonTable } from "@/components/SkeletonTable";

const initialValue: CategoryCreate = {
  name: "",
  description: "",
  is_active: true,
};

export const Category = () => {
  const [categoryFormData, setCategoryFormData] =
    useState<CategoryCreate>(initialValue);
  const [categoryData, setCategoryData] = useState<CategoryList[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCategoryCreated = (newCategory: CategoryList) => {
    setCategoryData((prevCategory) => [newCategory, ...prevCategory]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({
      ...categoryFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id: number | string) => {
    try {
      await api.deleteCategory(id);
      setCategoryData((prev) => prev.filter((cat) => cat.id !== id));
      toast.add({
        type: "success",
        title: "Categoria",
        description: "Categoria Eliminada Correctamente",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response
          ? "No se pudo eliminar la categoria"
          : "Error de conextion con el servidor";
        setErrors(message);
        toast.add({
          type: "error",
          title: "Categoria",
          description: message,
        });
      }
    }
  };

  const fetchData = async (url?: string, pageNumber: number = 1) => {
    setErrors(null);
    setLoading(true);
    try {
      const response = await api.getCategoriesNavigation(url);
      setCategoryData(response.results);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      setCurrentPage(pageNumber);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response
          ? "No se puediron cargar las categorias."
          : "Error de conexion con el servidor";
        setErrors(message);
        toast.add({
          type: "error",
          title: "Categoria",
          description: message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(undefined, 1);
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    try {
      const response = await api.postCategory(categoryFormData);
      handleCategoryCreated(response);
      toast.add({
        type: "success",
        title: "Categoria",
        description: "Categoria creada con Exito!",
      });
      setCategoryFormData(initialValue);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const data = error.response.data as Record<string, string[]>;
          const message =
            Object.values(data).flat().join(" - ") || "Error desconocido";
          setErrors(message);
          toast.add({
            type: "error",
            title: "Categoria",
            description: message,
          });
        } else {
          setErrors("Error de conexion con el servidor");
          toast.add({
            type: "error",
            title: "Error de red",
            description: "No se pudo conectar al Servidor",
          });
        }
      } else {
        setErrors("Ocurrio un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 gap-8 lg:gap-12 pb-12">
          <section className="w-full lg:w-8/12">
            <div className="px-2">
              <h2 className="text-2xl sm:text-2xl font-medium">Categorias</h2>
              <p className="text-base text-gray-500 tracking-wider mt-1">
                Gestiona tus categorias
              </p>
            </div>
            <div className="w-full overflow-x-auto rounded-lg border mt-6">
              {loading ? (
                <SkeletonTable />
              ) : (
                <TableCategory
                  options={categoryData}
                  currentPage={currentPage}
                  next={nextUrl}
                  prev={prevUrl}
                  onPageChange={fetchData}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </section>

          <aside className="w-full lg:w-4/12 lg:pt-21">
            {errors && <p className="text-red-500">{errors}</p>}
            <form
              className="flex flex-col gap-4 border rounded-lg p-6 shadow-sm bg-card"
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl sm:text-2xl mb-2">
                Crear nueva Categoria
              </h2>

              <div className="flex flex-col gap-1.5">
                <Label>Ingrese Nombre de la categoria</Label>
                <Input
                  name="name"
                  value={categoryFormData.name}
                  placeholder="Nombre de la categoria"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Ingrese Descripcion</Label>
                <Input
                  name="description"
                  value={categoryFormData.description}
                  placeholder="Descripcion"
                  onChange={handleChange}
                />
              </div>

              <Button className="p-5 mt-2 w-full" type="submit">
                {loading ? <Spinner /> : "Guardar"}
              </Button>
            </form>
          </aside>
        </div>
      </div>
    </SidebarProvider>
  );
};
