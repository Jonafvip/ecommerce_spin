import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Phone, Headphones } from "lucide-react";
import { NavLink } from "react-router-dom";

type HelpCenter = {
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  services: string[];
};

const helpCenters: HelpCenter[] = [
  {
    name: "Centro de Ayuda Madrid",
    city: "Madrid",
    address: "Calle Innovación 42, 28001 Madrid",
    hours: "Lun - Vie · 9:00 - 20:00",
    phone: "+34 900 111 222",
    services: ["Soporte técnico", "Devoluciones", "Asesoría"],
  },
  {
    name: "Centro de Ayuda Barcelona",
    city: "Barcelona",
    address: "Avinguda del Progrés 15, 08018 Barcelona",
    hours: "Lun - Sáb · 10:00 - 19:00",
    phone: "+34 900 333 444",
    services: ["Garantías", "Configuración", "Envíos"],
  },
  {
    name: "Centro de Ayuda Valencia",
    city: "Valencia",
    address: "Carrer de la Tecnologia 8, 46001 Valencia",
    hours: "Lun - Vie · 9:00 - 18:00",
    phone: "+34 900 555 666",
    services: ["Facturación", "Cuentas", "Soporte general"],
  },
  {
    name: "Centro de Ayuda Online 24/7",
    city: "En línea",
    address: "soporte@ecommerce-spin.com",
    hours: "Todos los días · 24 horas",
    phone: "+34 900 000 000",
    services: ["Chat en vivo", "Correo", "Base de conocimientos"],
  },
];

export const HelpCenters = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8 md:px-16">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3 text-center">
          <Badge variant="secondary" className="mx-auto">
            Ayuda
          </Badge>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Centros de ayuda
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Encuentra el centro de soporte más cercano o contáctanos de forma
            virtual. Estamos para ayudarte en cada paso de tu compra.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {helpCenters.map((center) => (
            <Card key={center.name}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-2">
                    <Headphones /> {center.name}
                  </CardTitle>
                  <Badge variant="outline">{center.city}</Badge>
                </div>
                <CardDescription>{center.address}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {center.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
                <Separator />
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="text-foreground" />
                    {center.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-foreground" />
                    {center.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-foreground" />
                    {center.address}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  render={<NavLink to="/support" />}
                >
                  Contactar centro
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};
