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

  const handleCategoryCreated = (newCategory: CategoryList) => {
    setCategoryData((prevCategory) => [newCategory, ...prevCategory]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({
      ...categoryFormData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async (url?: string, pageNumber: number = 1) => {
    try {
      const response = await api.getCategoriesNavigation(url);
      setCategoryData(response.results);
      setNextUrl(response.next);
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
    fetchData(undefined, 1);
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.postCategory(categoryFormData);
      handleCategoryCreated(response);
      console.log("Categoria Creada con exito");
      setCategoryFormData(initialValue);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const ServerError = error.response?.data;
        console.log(ServerError);
      }
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 lg:gap-12 pb-12">
          <section className="w-full lg:w-8/12">
            <h2 className="text-2xl sm:text-3xl  sm:px-4 py-4 sm:py-6 tracking-wider">
              Gestiona tus categorias
            </h2>
            <div className="w-full overflow-x-auto rounded-lg border">
              <TableCategory
                options={categoryData}
                currentPage={currentPage}
                next={nextUrl}
                prev={prevUrl}
                onPageChange={fetchData}
              />
            </div>
          </section>

          <aside className="w-full lg:w-4/12 lg:pt-21">
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
                Guardar
              </Button>
            </form>
          </aside>
        </div>
      </div>
    </SidebarProvider>
  );
};
