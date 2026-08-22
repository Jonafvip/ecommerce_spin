export const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8 md:px-16">
      <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm shadow-border sm:p-12">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Legal
            </p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Política de Privacidad
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Última actualización: 21 de agosto de 2026
            </p>
          </div>

          <p className="leading-7 text-muted-foreground">
            En Ecommerce-SPIN nos comprometemos a proteger tu privacidad. Esta
            política explica qué datos recopilamos, cómo los usamos y qué
            derechos tienes como usuario.
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              1. Datos que recopilamos
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                Datos de registro: nombre, correo electrónico y contraseña
                (almacenada de forma segura).
              </li>
              <li>
                Datos de pedido: productos adquiridos, dirección de envío y
                total de compra.
              </li>
              <li>
                Datos de navegación: dirección IP y cookies necesarias para el
                funcionamiento del sitio.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              2. Cómo utilizamos tu información
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Procesar y gestionar tus pedidos.</li>
              <li>Brindarte soporte y atención al cliente.</li>
              <li>Mejorar nuestros productos y la experiencia de compra.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              3. Compartición de datos
            </h2>
            <p className="leading-7 text-muted-foreground">
              No vendemos tu información personal. Solo la compartimos con
              proveedores de pago y envío estrictamente necesarios para
              completar tu compra.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              4. Tus derechos
            </h2>
            <p className="leading-7 text-muted-foreground">
              Puedes solicitar en cualquier momento el acceso, corrección o
              eliminación de tus datos escribiéndonos a
              privacidad@ecommerce-spin.com.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              5. Cambios a esta política
            </h2>
            <p className="leading-7 text-muted-foreground">
              Podemos actualizar esta política periódicamente. Te notificaremos
              los cambios importantes a través de nuestro sitio web.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
