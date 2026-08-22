import { Moon, Search, Sun } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { SheetSide } from "@/components/SheetResponsive";
import { NavLink, useNavigate } from "react-router-dom";
import { HoverCard } from "@/components/HoverCard";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/api/api";
import { useEffect, useState } from "react";
import { Button } from "@base-ui/react";

export const Header = () => {
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  };

  const closeSearch = () => {
    setQuery("");
    setSearchOpen(false);
  };

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

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-15 md:py-6">
      <div className="flex items-center gap-3 md:gap-0">
        <div className="md:hidden">
          <SheetSide />
        </div>
        <h2 className="text-lg font-semibold text-foreground md:text-2xl">
          <NavLink to="/">Ecommerce-SPIN</NavLink>
        </h2>
      </div>

      {/* nav center */}
      <ul className="hidden md:flex gap-4">
        <li className="cursor-pointer border-b border-transparent transition-colors hover:border-foreground">
          <NavLink to="/" className="text-foreground">Home</NavLink>
        </li>
        <li className="cursor-pointer border-b border-transparent transition-colors hover:border-foreground">
          <NavLink to="/products" className="text-foreground">Productos</NavLink>
        </li>
        <li className="cursor-pointer border-b border-transparent transition-colors hover:border-foreground">
          <NavLink to="/about" className="text-foreground"> About</NavLink>
        </li>
      </ul>

      {/* nav icons */}
      <ul className="hidden md:flex gap-8">
        {isAuthenticated && role === "ADMIN" ? (
          <li>
            <NavLink to="/dashboard" className="text-foreground">DashBoard</NavLink>
          </li>
        ) : (
          ""
        )}
        <li className="flex items-center text-foreground">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
            className={`cursor-pointer transition-all duration-300 ${
              searchOpen ? "pointer-events-none w-0 opacity-0" : "opacity-100"
            }`}
          >
            <Search />
          </button>
          <form
            onSubmit={handleSearch}
            className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${
              searchOpen
                ? "ml-2 w-44 translate-x-0 opacity-100"
                : "w-0 translate-x-4 opacity-0"
            }`}
          >
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && closeSearch()}
              onBlur={closeSearch}
              placeholder="Buscar productos..."
              className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-foreground"
            />
          </form>
        </li>
        <li className="cursor-pointer text-foreground">
          <HoverCard />
        </li>
        <li className="cursor-pointer">
          <NavLink to="/cart">
            <div className="relative">
              {cartCount > 0 && (
                <div className="absolute -top-4 -right-4 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-2">
                  <p className="text-primary-foreground">{cartCount}</p>
                </div>
              )}
              <ShoppingCart className="text-foreground" />
            </div>
          </NavLink>
        </li>
        <li>
          <Button onClick={toggleTheme} className="text-foreground">{isDark ? <Sun /> : <Moon />}</Button>
        </li>
      </ul>
    </div>
  );
};
