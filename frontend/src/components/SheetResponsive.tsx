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

const mobileLinks = ["Home", "Collection", "About"];

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
          <SheetHeader className="border-b border-gray-200 px-4 py-4">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <SheetFooter className="mt-0 gap-2 p-4">
            {mobileLinks.map((item) => (
              <SheetClose key={item}>
                <Button className="w-full p-6" variant="outline">
                  {item}
                </Button>
              </SheetClose>
            ))}

            <SheetClose>
              <Button variant="default" className="w-full p-6">
                Cancelar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
