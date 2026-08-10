import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const mobileLinks = [
  { section: "Home", url: "/" },
  { section: "Productos", url: "/products" },
  { section: "About", url: "/about" },
  { section: "Login", url: "/login" },
  { section: "Register", url: "/register" },
];

export const SheetSide = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <SheetTrigger>
          <div className="capitalize">
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[85vw] max-w-sm p-0 data-[side=left]:max-w-sm"
        >
          <SheetHeader className="border-b border-border px-4 py-4">
            <SheetTitle className="text-foreground">Menu</SheetTitle>
          </SheetHeader>

          <SheetFooter className="mt-0 gap-2 p-4">
            {mobileLinks.map((item) => (
              <NavLink to={item.url} key={item.section}>
                <Button className="w-full p-6" variant="outline">
                  {item.section}
                </Button>
              </NavLink>
            ))}

            <SheetClose className="rounded-2xl bg-primary p-4 text-primary-foreground">
              Cancelar
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
