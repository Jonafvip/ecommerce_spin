import React, { useEffect, useState } from "react";
import { type CategoryCreate, type CategoryList } from "@/types/types";
import { api } from "@/api/api";
import axios from "axios";
import { TableCategory } from "@/components/TableCategory";
import { Input } from "@/components/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    const params = new URLSearchParams();
    const queryString = params.toString();
    const url = queryString
      ? `${import.meta.env.VITE_BASE_URL}users/admin/?${queryString}`
      : undefined;
    fetchData(url, 1);
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.postCategory(categoryFormData);
      console.log("Categoria Creada con exito");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const ServerError = error.response?.data;
        console.log(ServerError);
      }
    }
  };
  return (
    <div className="flex px-8">
      <section className="w-full lg:w-10/12">
        <h2 className="text-3xl px-14 py-6 tracking-wider">
          Gestiona tus categorias
        </h2>
        <div className="w-[800px] mx-auto">
          <TableCategory
            options={categoryData}
            currentPage={currentPage}
            next={nextUrl}
            prev={prevUrl}
            onPageChange={fetchData}
          />
        </div>
      </section>
      <aside className="w-full lg:w-1/2 py-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl">Crear nueva Categoria</h2>
          <Label>Ingrese Nombre de la categoria</Label>
          <Input
            name="name"
            value={categoryFormData.name}
            placeholder="Nombre de la categoria"
          />
          <Label>Ingrese Descripcion</Label>
          <Input
            name="description"
            value={categoryFormData.description}
            placeholder="Descripcion"
          />
          <Button className="p-5">Guardar</Button>
        </form>
      </aside>
    </div>
  );
};
