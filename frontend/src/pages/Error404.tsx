import { NavLink } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 font-sans">
      <h1 className="text-8xl font-light tracking-tighter text-gray-900">
        404
      </h1>
      <p className="mt-4 text-gray-500 text-lg">Página no encontrada</p>
      <NavLink
        to="/"
        className="mt-8 text-sm text-gray-900 border-b border-gray-900 pb-0.5 hover:opacity-75 transition-opacity"
      >
        Volver al inicio
      </NavLink>
    </div>
  );
};
