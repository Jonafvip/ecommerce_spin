import { useEffect, useState } from "react";
import { type ProductDetail as Details } from "@/types/types";
import { api } from "@/api/api";
import { useParams } from "react-router-dom";
import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const initialValue: Details = {
  id: "",
  name: "",
  description: "",
  image: "",
  category: {
    id: "",
    name: "",
  },
  product_code: "",
  unit_price: "",
};

export const ProductDetail = () => {
  const [productDetailData, setProductDetailData] =
    useState<Details>(initialValue);
  const { id } = useParams<{ id: string }>();

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
    window.scroll(0,0)
  }, [id]);

  return (
    <div className="w-full h-[700px]">
      <section className="flex pt-20 pb-38 justify-center h-screen gap-20">
        <div className="w-96">
          <Card />
        </div>
        <div className="flex flex-col justify-between tracking-wide">
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
          <Button className="rounded-none p-6 text-xl flex gap-4">
            Agregar al Carrito <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
};
