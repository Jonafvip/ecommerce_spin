import { NavLink } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center font-sans">
      <h1 className="text-8xl font-light tracking-tighter text-foreground">
        404
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">Página no encontrada</p>
      <NavLink
        to="/"
        className="mt-8 border-b border-foreground pb-0.5 text-sm text-foreground transition-opacity hover:opacity-75"
      >
        Volver al inicio
      </NavLink>
    </div>
  );
};
