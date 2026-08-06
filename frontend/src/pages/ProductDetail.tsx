import { useEffect, useState } from "react";
import { type ProductDetail as Details } from "@/types/types";
import { api } from "@/api/api";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/toast";

const initialValue: Details = {
  id: 0,
  name: "",
  description: "",
  image: "",
  category: {
    id: 0,
    name: "",
  },
  product_code: "",
  unit_price: "",
};

export const ProductDetail = () => {
  const [productDetailData, setProductDetailData] =
    useState<Details>(initialValue);
  const { id } = useParams<{ id: string }>();
  const { refreshCartCount } = useCart();
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (productId?: string | number) => {
      try {
        const response = await api.getProductDetail(productId);
        setProductDetailData(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchData(id);
    }
    window.scroll(0, 0);
  }, [id]);

  const handleAddProducToCard = async () => {
    if (!productDetailData.id) return;

    if (!productDetailData.id) {
      console.error("El producto aún no ha cargado su ID.");
      return;
    }
    setErrors(null);
    try {
      await api.addProductToCart(productDetailData.id, 1);
      await refreshCartCount();
      toast.add({
        type: "success",
        title: "Cart",
        description: "Producto agregado al carrito Exitosamente!",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const data = error.response.data as Record<string, string[]>;
          const message = Object.values(data).flat();
          setErrors(message.join(" - ") || "Error desconocido");
          toast.add({
            type: "error",
            title: "Cart",
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
    }
  };

  return (
    <div className="w-full h-175 mb-30 md:mb-0">
      <section className="flex flex-col md:flex-row pt-60 pl-6 md:pl-2 md:pt-20 pb-45 justify-center h-screen gap-5 md:gap-20">
        <div className="w-80 mx-auto md:mx-0 h-130 mt-12 md:w-96">
          <img
            src={productDetailData.image || undefined}
            className="h-90 md:h-112.5 p-6 mt-40 md:mt-0  md:p-2 "
          />
        </div>
        <div className="flex flex-col px-4 md:pt-13 md:px-1 mb-30 md:mb-1  justify-between tracking-wide">
          {errors && <p className="text-red-500">{errors}</p>}
          <div className="flex flex-col gap-5">
            <Badge variant="outline" className="p-4">
              Categoria - {productDetailData.category.name}
            </Badge>
            <h2 className="text-4xl font-light tracking-wide">
              {productDetailData.name}
            </h2>
            <Badge className="w-24 p-4 text-xl">
              ${productDetailData.unit_price}
            </Badge>
            <p className="tracking-wide">{productDetailData.description}</p>
          </div>
          <Button
            className="rounded-none p-6 text-xl flex gap-4 mt-5"
            onClick={() => handleAddProducToCard()}
          >
            Agregar al Carrito <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
};
