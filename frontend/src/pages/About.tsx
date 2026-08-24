import { NavLink } from "react-router-dom";

export const About = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8 md:px-16">
      <section className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-8 shadow-sm shadow-border sm:p-12">
        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Sobre nosotros
            </p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Conoce Ecommerce-SPIN
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Somos una tienda en línea dedicada a ofrecer productos de calidad
              en tecnología, hogar y estilo de vida. Nuestra misión es entregar
              experiencias de compra rápidas, seguras y confiables.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-muted p-6">
              <h2 className="text-xl font-semibold text-foreground">
                Quiénes somos
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Ecommerce-SPIN nació para conectar a clientes con productos
                seleccionados para su vida diaria. Buscamos simplificar las
                compras ofreciendo un catálogo moderno y un servicio de atención
                cercano.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-muted p-6">
              <h2 className="text-xl font-semibold text-foreground">
                Qué ofrecemos
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Descubre ofertas, envíos confiables y una navegación clara para
                encontrar justo lo que necesitas. Cada pedido es gestionado con
                cuidado desde nuestro catálogo hasta tu puerta.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-muted p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Nuestro compromiso
            </h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• Experiencias de compra seguras y fáciles.</li>
              <li>• Soporte atento y rápido para todas tus dudas.</li>
              <li>• Productos seleccionados con atención al detalle.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <NavLink
            to="/about/history"
            className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            Conoce nuestra historia →
          </NavLink>
        </div>
      </section>
    </main>
  );
};
