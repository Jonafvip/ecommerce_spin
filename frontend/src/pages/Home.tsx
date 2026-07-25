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
type ProductListExceptCategory = Omit<ProductsList, "category">;

export const Home = () => {
  const [productsData, setProductsData] = useState<ProductListExceptCategory[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getProducts();
        setProductsData(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="border-b-2 border-gray-200">
        <div className="relative min-h-[26rem] overflow-hidden md:min-h-[38rem]">
          <img
            src={Hero}
            alt="Hero"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/70 to-white/30 md:bg-none" />

          <div className="relative z-10 flex min-h-[26rem] items-center justify-center px-4 md:px-30  text-center md:min-h-[32rem] md:top-[70px] md:justify-start md:text-left">
            <div className="max-w-md md:max-w-lg">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">
                Encuentra todo lo que necesitas, en un solo lugar.
              </h2>
              <p className="mt-3 text-base font-light text-gray-700 sm:text-lg md:text-xl">
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
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-6 px-6  md:px-8 md:py-14">
          <div className="flex flex-col items-center px-5 gap-1">
            <LuTruck size="30" />
            <h3 className="tracking-wider leading-relaxed">Compra rapida</h3>
            <p className="text-xs text-gray-400">Velocidad siempre</p>
          </div>
          <div className="flex flex-col items-center px-5 gap-1">
            <ShieldCheck size="30" />
            <h3 className="tracking-wider leading-relaxed">Pagos Seguros</h3>
            <p className="text-xs text-gray-400">100% Protegidos</p>
          </div>
          <div className="flex flex-col items-center px-5 gap-1">
            <CircleDollarSign size="30" />
            <h3 className="tracking-wider leading-relaxed">Reembolsos</h3>
            <p className="text-xs text-gray-400">30 dias de Garantia</p>
          </div>
          <div className="flex flex-col items-center px-5 gap-1">
            <MdOutlineSupportAgent size="30" />
            <h3 className="tracking-wider leading-relaxed">24/7 Soporte</h3>
            <p className="text-xs text-gray-400"> Siempre para ayudarte</p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl font-light mb-6 px-8 py-4 md:px-20">
            Compra por Categoría
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 md:px-2">
            <div className="relative group overflow-hidden  h-64 cursor-pointer">
              <div className="absolute inset-0 bg-[url('@/assets/tecnologia.webp')] bg-cover bg-center transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-bold tracking-wide">
                  Tecnología
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden  h-64 cursor-pointer">
              <div className="absolute inset-0 bg-[url('@/assets/hogar.webp')] bg-cover bg-center transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-bold tracking-wide">
                  Hogar
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden  h-64 cursor-pointer">
              <div className="absolute inset-0 bg-[url('@/assets/ropa.webp')] bg-cover bg-center transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-bold tracking-wide">
                  Moda
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden  h-64 cursor-pointer">
              <div className="absolute inset-0 bg-[url('@/assets/herramientas.webp')] bg-cover bg-center transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-bold tracking-wide">
                  Herramientas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 md:mt-20 p-10">
        <div>
          <div className=" text-center mb-10">
            <h2 className="text-4xl font-light">Nuevos Productos</h2>
          </div>
          <div className="flex justify-center md:justify-end px-22">
            <p className="cursor-pointer border-b border-transparent hover:border-gray-800 transition-colors pb-1 font-light">
              <NavLink to="products/">VER TODO</NavLink>
            </p>
          </div>
        </div>

        {/* Productos Cuadricula */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 md:px-20 mt-8">
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
        <div className="flex flex-col gap-6 bg-black p-6 md:h-80 md:flex-row md:items-center md:justify-between md:px-25 md:py-10">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
              Rebajas de Verano
            </h2>
            <p className="text-gray-300 tracking-wide">
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

      <section className="p-10 border-b-2">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-4xl font-light tracking-wide">
            Lo mas Vendido
          </h2>
          <p className="tracking-wide">
            Tendencia actual entre nuestra comunidad
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 md:px-20 mt-8">
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
          <h2 className="text-4xl text-center font-light tracking-wide">
            Amada por nuestra comunidad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-8 md:px-20 mt-10">
            <CardUser />
            <CardUser />
            <CardUser />
          </div>
        </div>
      </section>
    </div>
  );
};
