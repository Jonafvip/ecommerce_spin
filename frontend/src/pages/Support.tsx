import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const Support = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.add({
      type: "success",
      title: "Mensaje enviado (demo)",
      description:
        "Gracias por contactarnos. Este formulario es de demostración y no envía datos reales.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 1800);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8 md:px-16">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3 text-center">
          <Badge variant="secondary" className="mx-auto">
            Soporte
          </Badge>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Contáctanos
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            ¿Tienes alguna duda, queja o sugerencia? Escríbenos a través del
            siguiente formulario y nuestro equipo te responderá lo antes
            posible.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Formulario de contacto</CardTitle>
              <CardDescription>
                Completa los campos y pulsa enviar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tucorreo@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={sent}>
                  <Send />
                  {sent ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle /> Canales de atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 text-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Correo</p>
                    <p>soporte@ecommerce-spin.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 text-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Teléfono</p>
                    <p>+34 900 123 456</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 text-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Horario</p>
                    <p>Lunes a viernes · 9:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <MapPin className="mt-0.5 text-foreground" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Oficina</p>
                  <p>Calle Innovación 42, Ciudad Tech, España</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />
        <p className="text-center text-xs text-muted-foreground">
          Página de contacto de demostración · Ecommerce-SPIN
        </p>
      </section>
    </main>
  );
};
