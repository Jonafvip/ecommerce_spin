import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

export interface Category {
  id: number;
  name: string;
}

interface CategorySelectProps {
  categories: Category[];
  selectedCategoryId?: number | string;
  onSelectCategory: (categoryId: number) => void;
  placeholder?: string;
}

export const DropDown = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  placeholder = "Seleccionar categoría",
}: CategorySelectProps) => {
  const selectedCategory = categories.find(
    (cat) => cat.id === Number(selectedCategoryId),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            <span>
              {selectedCategory ? selectedCategory.name : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        }
      />

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Categorías</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {categories.length === 0 ? (
            <DropdownMenuItem disabled>
              No hay categorías disponibles
            </DropdownMenuItem>
          ) : (
            categories.map((cat) => {
              const isSelected = cat.id === Number(selectedCategoryId);
              return (
                <DropdownMenuItem
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span>{cat.name}</span>
                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              );
            })
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
