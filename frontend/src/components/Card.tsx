import { Badge } from "@/components/ui/badge";
import {
  Card as CardFather,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface MyPropCard {
  id?: string | number;
  badge?: string;
  title?: string;
  descripcion?: string;
  titleButton?: string;
  image?: string;
}

export const Card = ({
  id,
  badge,
  title,
  descripcion,
  image,
  titleButton,
}: MyPropCard) => {
  const navigate = useNavigate();

  return (
    <CardFather
      className="flex flex-col items-center overflow-hidden transition-all hover:shadow-xl rounded-none"
      onClick={
        titleButton === "Ver Producto"
          ? () => navigate(`/products/${id}`)
          : undefined
      }
    >
      <div className="relative w-full aspect-square bg-gray-100 shrink-0">
        {image ? (
          <>
            <div className="absolute inset-0 z-10 bg-black/10 transition-colors hover:bg-transparent" />
            <img
              src={image}
              alt={`Imagen de ${title}`}
              className="w-full h-full object-cover z-0"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}

        {badge ? (
          <div className="absolute top-3 right-3 z-20">
            <Badge variant="secondary" className="font-semibold shadow-sm">
              {badge}
            </Badge>
          </div>
        ) : (
          ""
        )}
      </div>

      <CardHeader className="min-w-52 h-18 p-2 pb-2">
        <CardTitle className="text-xl ">{title}</CardTitle>
        {descripcion && (
          <CardDescription className="line-clamp-2 mt-2">
            {descripcion}
          </CardDescription>
        )}
      </CardHeader>
      {titleButton ? <Button className="w-48 p-4 ">{titleButton}</Button> : ""}
    </CardFather>
  );
};
