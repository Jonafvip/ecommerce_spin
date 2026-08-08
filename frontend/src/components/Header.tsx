import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { SheetSide } from "@/components/SheetResponsive";
import { NavLink } from "react-router-dom";
import { HoverCard } from "@/components/HoverCard";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/api/api";
import { useEffect, useState } from "react";

export const Header = () => {
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        const response = await api.getUserDetail();
        setRole(response.role);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between border-b border-gray-200 px-4 py-4 md:px-15 md:py-6">
      <div className="flex items-center gap-3 md:gap-0">
        <div className="md:hidden">
          <SheetSide />
        </div>
        <h2 className="text-lg font-semibold md:text-2xl">
          <NavLink to="/">Ecommerce-SPIN</NavLink>
        </h2>
      </div>

      {/* nav center */}
      <ul className="hidden md:flex gap-4">
        <li className="cursor-pointer border-b border-transparent transition-colors hover:border-gray-800">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="cursor-pointer border-b border-transparent transition-colors hover:border-gray-800">
          <NavLink to="/products">Productos</NavLink>
        </li>
        <li className="cursor-pointer border-b border-transparent transition-colors hover:border-gray-800">
          <NavLink to="/about"> About</NavLink>
        </li>
      </ul>

      {/* nav icons */}
      <ul className="hidden md:flex gap-8">
        {isAuthenticated && role === "ADMIN" ? (
          <li>
            <NavLink to="/dashboard">DashBoard</NavLink>
          </li>
        ) : (
          ""
        )}
        <li className="cursor-pointer">
          <Search />
        </li>
        <li className="cursor-pointer">
          <HoverCard />
        </li>
        <li className="cursor-pointer">
          <NavLink to="/cart">
            <div className="relative">
              {cartCount > 0 && (
                <div className="w-5 h-5 z-10 absolute -top-4 -right-4 bg-black rounded-full flex items-center justify-center p-2">
                  <p className="text-white">{cartCount}</p>
                </div>
              )}
              <ShoppingCart />
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
