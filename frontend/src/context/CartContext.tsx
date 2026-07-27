import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "@/api/api";

interface CartContextType {
  cartCount: number;
  refreshCartCount: () => Promise<void>;
}
const Cartcontext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const refreshCartCount = async () => {
    try {
      const response = await api.getCartList();

      if (Array.isArray(response) && response.length > 0) {
        let totalUnit = 0;

        response.forEach((cart) => {
          if (Array.isArray(cart.details)) {
            cart.details.forEach((item: { quantity?: number | string }) => {
              const qty = Number(item.quantity) || 0;
              totalUnit += qty;
            });
          }
        });
        setCartCount(totalUnit);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.log("Error al obtener el contador de carrito:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <Cartcontext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </Cartcontext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const contex = useContext(Cartcontext);
  if (!contex) {
    throw new Error("Use Cart debe ser usado dentro de un CartProvider");
  }
  return contex;
};
