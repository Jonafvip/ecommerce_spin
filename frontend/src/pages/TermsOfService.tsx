export const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8 md:px-16">
      <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm shadow-border sm:p-12">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Legal
            </p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Términos de Servicio
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Última actualización: 21 de agosto de 2026
            </p>
          </div>

          <p className="leading-7 text-muted-foreground">
            Al utilizar Ecommerce-SPIN aceptas los siguientes términos. Te
            recomendamos leerlos con atención antes de realizar una compra.
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              1. Uso de la plataforma
            </h2>
            <p className="leading-7 text-muted-foreground">
              El acceso y uso del sitio es personal e intransferible. Te
              comprometes a proporcionar información veraz al registrarte y
              realizar pedidos.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              2. Productos y precios
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                Los precios se muestran en la moneda local e incluyen los
                impuestos aplicables.
              </li>
              <li>
                Las imágenes son referenciales; el producto final puede variar
                ligeramente.
              </li>
              <li>
                Nos reservamos el derecho de modificar precios y disponibilidad
                sin previo aviso.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              3. Pagos y envíos
            </h2>
            <p className="leading-7 text-muted-foreground">
              Los pagos se procesan a través de pasarelas seguras. Los tiempos de
              envío son estimados y pueden variar según la zona de entrega.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              4. Devoluciones y reembolsos
            </h2>
            <p className="leading-7 text-muted-foreground">
              Aceptamos devoluciones dentro de los 30 días posteriores a la
              recepción, siempre que el producto esté en su estado original.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              5. Limitación de responsabilidad
            </h2>
            <p className="leading-7 text-muted-foreground">
              Ecommerce-SPIN no será responsable por daños indirectos derivados
              del uso del sitio o la interrupción del servicio por causas
              fuera de nuestro control.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              6. Contacto
            </h2>
            <p className="leading-7 text-muted-foreground">
              Para dudas sobre estos términos, escríbenos a
              soporte@ecommerce-spin.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
