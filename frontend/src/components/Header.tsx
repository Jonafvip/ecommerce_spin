import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { SheetSide } from "@/components/SheetResponsive";
import { NavLink } from "react-router-dom";
import { HoverCard } from "@/components/HoverCard";

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 md:px-15 md:py-6">
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
          <NavLink to="/products">Products</NavLink>
        </li>
        <li className="cursor-pointer border-b border-transparent transition-colors hover:border-gray-800">
          About
        </li>
      </ul>

      {/* nav icons */}
      <ul className="hidden md:flex gap-8">
        <li className="cursor-pointer">
          <Search />
        </li>
        <li className="cursor-pointer">
          <HoverCard />
        </li>
        <li className="cursor-pointer">
          <ShoppingCart />
        </li>
      </ul>
    </div>
  );
};
