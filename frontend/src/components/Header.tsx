import { Search } from "lucide-react";
import { UserRound } from "lucide-react";
import { ShoppingCart } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex items-center justify-between py-6 px-15 border-b border-gray-200">
      <h2 className="text-2xl font-semibold">Ecommerce-SPIN</h2>

      {/* nav center */}
      <ul className="flex gap-4">
        <li className="cursor-pointer border-b border-transparent hover:border-gray-800 transition-colors">
          Home
        </li>
        <li className="cursor-pointer border-b border-transparent hover:border-gray-800 transition-colors">
          Collection
        </li>
        <li className="cursor-pointer border-b border-transparent hover:border-gray-800 transition-colors">
          About
        </li>
      </ul>

      {/* nav icons */}
      <ul className="flex gap-8">
        <li className="cursor-pointer">
          <Search />
        </li>
        <li className="cursor-pointer">
          <UserRound />
        </li>
        <li className="cursor-pointer">
          <ShoppingCart />
        </li>
      </ul>
    </div>
  );
};
