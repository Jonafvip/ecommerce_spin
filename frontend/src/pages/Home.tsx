import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { api } from "@/api/api";
import { type ProductsList } from "@/types/types";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { LuTruck } from "react-icons/lu";
import CardUser from "@/components/CardUser";
import Hero from "@/assets/hero.png";
import { NavLink } from "react-router-dom";
import imgTecnologia from "@/assets/tecnologia.webp";
import imgHogar from "@/assets/hogar.webp";
import imgRopa from "@/assets/ropa.webp";
import imgHerramientas from "@/assets/herramientas.webp";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

type ProductListExceptCategory = Omit<ProductsList, "category">;

export const Home = () => {
  const [productsData, setProductsData] = useState<ProductListExceptCategory[]>(
    [],
  );

  const CategoryData = [
    {
      nombre: "Tecnología",
      imageBackground: imgTecnologia,
      url: "/products",
    },
    {
      nombre: "Hogar",
      imageBackground: imgHogar,
      url: "/products",
    },
    {
      nombre: "Moda",
      imageBackground: imgRopa,
      url: "/products",
    },
    {
      nombre: "Herramientas",
      imageBackground: imgHerramientas,
      url: "/products",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getProducts();
        setProductsData(response.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data;
          console.log(serverError);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="relative min-h-104 overflow-hidden md:min-h-152">
          <img
            src={Hero}
            alt="Hero"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/70 to-background/30 md:bg-none" />

          <div className="relative z-10 flex min-h-104 items-center justify-center px-4 md:px-30 text-center md:min-h-128 md:top-17.5 md:justify-start md:text-left">
            <div className="max-w-md md:max-w-lg">
              <Badge variant="secondary" className="mb-5 p-4 text-xl font-light tracking-wide">
                Spin Version 1.0.0
              </Badge>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
                Encuentra todo lo que necesitas, en un solo lugar.
              </h2>
              <p className="mt-3 text-base font-light text-muted-foreground sm:text-lg md:text-xl">
                Explora miles de productos en tecnología, hogar, moda y más.
                Compra hoy y recíbelo directo en la puerta de tu casa.
              </p>
              <Button className="mt-7 w-full max-w-56 p-6">
                <NavLink to="products/" className="flex items-center gap-4">
                  Ver Productos <ArrowRight />
                </NavLink>
              </Button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-4 gap-10 px-6 py-6 sm:grid-cols-2 md:grid-cols-3 md:px-8 md:py-14 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-1 px-5">
            <LuTruck size="30" />
            <h3 className="leading-relaxed tracking-wider text-foreground">Compra rapida</h3>
            <p className="text-xs text-muted-foreground">Velocidad siempre</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-5">
            <ShieldCheck size="30" />
            <h3 className="leading-relaxed tracking-wider text-foreground">Pagos Seguros</h3>
            <p className="text-xs text-muted-foreground">100% Protegidos</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-5">
            <CircleDollarSign size="30" />
            <h3 className="leading-relaxed tracking-wider text-foreground">Reembolsos</h3>
            <p className="text-xs text-muted-foreground">30 dias de Garantia</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-5">
            <MdOutlineSupportAgent size="30" />
            <h3 className="leading-relaxed tracking-wider text-foreground">24/7 Soporte</h3>
            <p className="text-xs text-muted-foreground"> Siempre para ayudarte</p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 px-8 py-4 text-center text-3xl font-light md:px-20">
            Compra por Categoría
          </h2>

          <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 md:grid-cols-3 md:px-2 lg:grid-cols-4">
            {CategoryData.map((cat) => (
              <div
                key={cat.nombre}
                className="group relative h-64 cursor-pointer overflow-hidden"
              >
                <NavLink to={cat.url}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${cat.imageBackground})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xl font-bold tracking-wide text-white">
                      {cat.nombre}
                    </p>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 p-10 md:mt-20">
        <div>
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-light text-foreground">Nuevos Productos</h2>
          </div>
          <div className="flex justify-center px-22 md:justify-end">
            <p className="cursor-pointer border-b border-transparent pb-1 font-light transition-colors hover:border-foreground">
              <NavLink to="products/">VER TODO</NavLink>
            </p>
          </div>
        </div>

        {/* Productos Cuadricula */}
        <div className="mt-8 grid grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 md:px-20 lg:grid-cols-4">
          {productsData.slice(0, 4).map((pro) => (
            <Card
              id={pro.id}
              key={pro.id}
              title={pro.name}
              badge={`$${pro.unit_price}`}
              titleButton="Ver Producto"
            />
          ))}
        </div>
      </section>

      <section className="w-full py-10 md:py-25">
        <div className="flex flex-col gap-6 bg-card p-6 md:h-80 md:flex-row md:items-center md:justify-between md:px-25 md:py-10">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-light tracking-wide text-foreground sm:text-4xl md:text-5xl">
              Rebajas de Verano
            </h2>
            <p className="tracking-wide text-muted-foreground">
              Obten hasta un 30% de descuento en cualquier compra de diferentes
              piezas por tiempo limitado
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-none p-6 font-mono md:mt-0"
          >
            Compra en las rebajas
          </Button>
        </div>
      </section>

      <section className="border-b border-border p-10">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-4xl font-light tracking-wide text-foreground">
            Lo mas Vendido
          </h2>
          <p className="tracking-wide text-muted-foreground">
            Tendencia actual entre nuestra comunidad
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 md:px-20 lg:grid-cols-4">
          {productsData.slice(4, 8).map((pro) => (
            <Card
              id={pro.id}
              key={pro.id}
              title={pro.name}
              badge={`$${pro.unit_price}`}
              titleButton="Ver Producto"
            />
          ))}
        </div>
      </section>

      {/* Section de reseñas */}
      <section className="py-20">
        <div className="p-8">
          <h2 className="text-center text-4xl font-light tracking-wide text-foreground">
            Amada por nuestra comunidad
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 md:px-20 lg:grid-cols-3">
            <CardUser />
            <CardUser />
            <CardUser />
          </div>
        </div>
      </section>
    </div>
  );
};
