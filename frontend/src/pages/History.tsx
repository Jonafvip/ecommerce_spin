import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "react-router-dom";
import { Rocket, Store, Users, Truck } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const milestones: Milestone[] = [
  {
    year: "2021",
    title: "El inicio",
    description:
      "Ecommerce-SPIN nace como un pequeño proyecto para ofrecer productos tecnológicos seleccionados con envíos locales.",
    icon: <Store />,
  },
  {
    year: "2023",
    title: "Crecimiento",
    description:
      "Ampliamos el catálogo a hogar y estilo de vida, superando los 10.000 clientes registrados en toda España.",
    icon: <Users />,
  },
  {
    year: "2024",
    title: "Logística propia",
    description:
      "Incorporamos centros de ayuda y una red de envíos más rápida para mejorar la experiencia de compra.",
    icon: <Truck />,
  },
  {
    year: "2026",
    title: "El presente",
    description:
      "Hoy somos una plataforma moderna y segura, comprometida con un servicio cercano y de calidad.",
    icon: <Rocket />,
  },
];

export const History = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8 md:px-16">
      <section className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-3 text-center">
          <Badge variant="secondary" className="mx-auto">
            Sobre nosotros
          </Badge>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Nuestra historia
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Conoce cómo Ecommerce-SPIN ha evolucionado desde sus inicios hasta
            convertirse en la tienda en línea que es hoy.
          </p>
        </div>

        <ol className="relative space-y-6 border-l border-border pl-6">
          {milestones.map((item, index) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[31px] flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground [&_svg]:size-3">
                {item.icon}
              </span>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge>{item.year}</Badge>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
              {index < milestones.length - 1 && <Separator className="mt-6" />}
            </li>
          ))}
        </ol>

        <div className="flex justify-center">
          <NavLink
            to="/about"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            ← Volver a Sobre nosotros
          </NavLink>
        </div>
      </section>
    </main>
  );
};
