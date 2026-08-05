import {
  Dialog as DialogGlobal,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  type CategoryList,
  type ProductCreate,
  type ProductListWatchAdmin,
} from "@/types/types";
import { Input } from "@/components/Input";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/api/api";
import { DropDown } from "@/components/DropDown";
import { toast } from "./ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

interface DialogProps {
  onProductCreated: (newProduct: ProductListWatchAdmin) => void;
}

const initialValue: ProductCreate = {
  name: "",
  description: "",
  unit_price: "",
  stock: 0,
  category: 0,
  image: null,
  is_active: true,
  product_code: "",
};

export const Dialog = ({ onProductCreated }: DialogProps) => {
  const [productData, setProductData] = useState<ProductCreate>(initialValue);
  const [categoriesData, setCategoriesData] = useState<CategoryList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [categoriesErrors, setCategoriesErrors] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setProductData({
      ...productData,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    if (!productData.category || productData.category === 0) {
      toast.add({
        type: "warning",
        title: "Categoria",
        description: "Por favor selecciona una categoría válida.",
      });
      return;
    }
    setLoading(true);

    const formdata = new FormData();
    formdata.append("name", productData.name);
    formdata.append("unit_price", String(productData.unit_price));
    formdata.append("description", productData.description);
    formdata.append("product_code", productData.product_code);
    formdata.append("stock", String(productData.stock));
    formdata.append("category", String(productData.category));
    formdata.append("is_active", String(productData.is_active));

    if (productData.image instanceof File) {
      formdata.append("image", productData.image);
    }

    try {
      const createdProduct = await api.postProductCreate(formdata);
      onProductCreated(createdProduct);
      toast.add({
        type: "success",
        title: "Producto",
        description: "Producto Creado Correctamente",
      });
      setProductData(initialValue);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const data = error.response.data as Record<string, string[]>;
          const message = Object.values(data).flat();
          setErrors(message.join(" - ") || "Error desconocido");
          toast.add({
            type: "error",
            title: "No se pudo crear el Producto",
            description: message.join(", "),
          });
        } else {
          setErrors("Error de conexion del servidor");
          toast.add({
            type: "error",
            title: "Error de red",
            description: "No se pudo conectar al servidor",
          });
        }
      } else {
        setErrors("Ocurrio un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesData = async () => {
    setCategoriesLoading(true);
    setCategoriesErrors(null);
    try {
      const response = await api.getCategories();
      setCategoriesData(response);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response
          ? "No se puedieron cargar las categorias. Intente de nuevo"
          : "Error de Conexion. Verifica tu red"
        : "Ocurrio un error inesperado";
      setCategoriesErrors(message);
      toast.add({
        type: "error",
        title: "Categorias",
        description: message,
      });
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategoriesData();
  }, []);

  return (
    <DialogGlobal>
      <DialogTrigger
        render={
          <Button variant="default" className="p-6">
            <Plus />
            Agregar nuevo Producto
          </Button>
        }
      />
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Agregar Producto</DialogTitle>
          <DialogDescription>
            Complete los campos necesarios para agregar un producto
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <Label>Nombre del Producto</Label>
                <Input
                  placeholder="Ej. Zapatillas Running"
                  value={productData.name}
                  name="name"
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label>Precio Unitario</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={productData.unit_price}
                  name="unit_price"
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label>Descripción</Label>
                <Input
                  placeholder="Breve descripción..."
                  value={productData.description}
                  name="description"
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label>Código del Producto</Label>
                <Input
                  placeholder="PKU-1234"
                  value={productData.product_code}
                  name="product_code"
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label>Stock</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={productData.stock}
                  name="stock"
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label>Imagen del Producto</Label>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setProductData({ ...productData, image: file });
                  }}
                />
              </Field>

              <Field>
                <Label>Categoría</Label>
                {categoriesLoading ? (
                  <Spinner />
                ) : categoriesErrors ? (
                  <Button size="sm" type="button" onClick={fetchCategoriesData}>
                    Reintentar
                  </Button>
                ) : (
                  <DropDown
                    categories={categoriesData}
                    selectedCategoryId={productData.category}
                    onSelectCategory={(selectedCat) =>
                      setProductData({ ...productData, category: selectedCat })
                    }
                  />
                )}
              </Field>
            </div>
          </FieldGroup>
          {errors && (
            <>
              <Badge variant="ghost">
                <p className="text-red-500">{errors}</p>
              </Badge>
            </>
          )}
          <DialogFooter className="flex sm:gap-2">
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">
              {loading ? <Spinner /> : "Guardar Producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogGlobal>
  );
};
