import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { Store } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="border-t border-border bg-background px-12 py-6 md:px-6">
      <div className="flex flex-col gap-8 p-4 md:flex-row md:items-start md:justify-around md:p-8">
        <div className="w-full md:w-1/3">
          <h3 className="flex items-center gap-4 py-4 text-2xl tracking-wider text-foreground">
            <Store />
            Ecommerce Spin
          </h3>
          <p className="text-sm text-muted-foreground md:text-base">
            Nos apasiona ofrecerte la mejor experiencia de compra. Con envíos
            rápidos, pagos 100% seguros y un catálogo seleccionado, aseguramos
            que recibas exactamente lo que buscas sin complicaciones.
          </p>
          <ul className="flex gap-6 py-6 text-foreground">
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

        <div className="grid grid-cols-2 gap-6 md:w-1/2 md:grid-cols-4 md:justify-between">
          <div>
            <h3 className="py-4 text-xl font-light tracking-wider text-foreground">Shop</h3>
            <ul className="flex flex-col gap-4 text-xs text-muted-foreground">
              <li>Nuevos Productos</li>
              <li>Collection</li>
              <li>Mejores Ofertas</li>
            </ul>
          </div>
          <div>
            <h3 className="py-4 text-xl font-light tracking-wider text-foreground">Support</h3>
            <ul className="flex flex-col gap-4 text-xs text-muted-foreground">
              <li>
                <NavLink
                  to="/help-centers"
                  className="transition-colors hover:text-foreground"
                >
                  Centro de ayuda
                </NavLink>
              </li>
              <li>Envíos y devoluciones</li>
              <li>Seguimiento de pedidos</li>
              <li>
                <NavLink
                  to="/support"
                  className="transition-colors hover:text-foreground"
                >
                  Contactanos
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="py-4 text-xl font-light tracking-wider text-foreground">About</h3>
            <ul className="flex flex-col gap-4 text-xs text-muted-foreground">
              <li>
                <NavLink
                  to="/about/history"
                  className="transition-colors hover:text-foreground"
                >
                  Nuestra historia
                </NavLink>
              </li>
              <li>Sustentabilidad</li>
              <li>Carreras</li>
              <li>Prensas</li>
            </ul>
          </div>
          <div>
            <h3 className="py-4 text-xl font-light tracking-wider text-foreground">Legal</h3>
            <ul className="flex flex-col gap-4 text-xs text-muted-foreground">
              <li>
                <NavLink
                  to="/privacy-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Politica de Privacidad
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/terms-of-service"
                  className="transition-colors hover:text-foreground"
                >
                  Terminos de Servicio
                </NavLink>
              </li>
              <li>Articulos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border py-6 px-4 md:flex-row md:items-center md:justify-between md:px-20">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; 2026 Ecommerce Spin. Todos los derechos reservados.
        </p>
        <ul className="flex justify-center gap-4 text-foreground md:justify-end">
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
