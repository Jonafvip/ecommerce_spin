import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { Store } from "lucide-react";

export const Footer = () => {
  return (
    <div className="border-t px-6">
      <div className="flex justify-around p-8">
        <div className="w-1/3">
          <h3 className="flex items-center text-2xl tracking-wider py-4 gap-4">
            <Store />
            Ecommerce Spin
          </h3>
          <p>
            Nos apasiona ofrecerte la mejor experiencia de compra. Con envíos
            rápidos, pagos 100% seguros y un catálogo seleccionado, aseguramos
            que recibas exactamente lo que buscas sin complicaciones.
          </p>
          <ul className="flex gap-6 py-6">
            <li>
              <FaFacebookF size="20" />
            </li>
            <li>
              <FaXTwitter size="20" />
            </li>
            <li>
              <FaInstagram size="20" />
            </li>
            <li>
              <FaTiktok size="20" />
            </li>
          </ul>
        </div>
        {/* elementos */}
        <div className="w-1/2 flex  justify-between">
          <div>
            <h3 className="text-xl font-light tracking-wider py-4">Shop</h3>
            <ul className="flex flex-col gap-4 text-xs">
              <li>Nuevos Productos</li>
              <li>Collection</li>
              <li>Mejores Ofertas</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-light tracking-wider py-4">Support</h3>
            <ul className="flex flex-col gap-4 text-xs">
              <li>Centro de ayuda</li>
              <li>Envíos y devoluciones</li>
              <li>Seguimiento de pedidos</li>
              <li>Contactanos</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-light tracking-wider py-4">About</h3>
            <ul className="flex flex-col gap-4 text-xs">
              <li>Nuevos Historia</li>
              <li>Sustentabilidad</li>
              <li>Carreras</li>
              <li>Prensas</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-light tracking-wider py-4">Legal</h3>
            <ul className="flex flex-col gap-4 text-xs">
              <li>Politica de Privacidad</li>
              <li>Terminos de Servicio</li>
              <li>Articulos</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t py-8 px-23 ">
        <p className="text-gray-500">
          &copy; 2026 Ecommerce Spin. Todos los derechos reservados.
        </p>
        <ul className="flex gap-4">
          <li>
            <FaCcPaypal size="20" />
          </li>
          <li>
            <FaCcMastercard size="20" />
          </li>
          <li>
            <FaCcVisa size="20" />
          </li>
        </ul>
      </div>
    </div>
  );
};
