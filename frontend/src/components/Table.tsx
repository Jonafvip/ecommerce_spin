import {
  Table as TableGlobal,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ProductListWatchAdmin } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";

interface TableMyProps {
  option: ProductListWatchAdmin[];
  onDelete: (product: ProductListWatchAdmin) => void;
  onUpdate: (product: ProductListWatchAdmin) => void;
}

export const Table = ({ option, onDelete, onUpdate }: TableMyProps) => {
  return (
    <TableGlobal className="mt-6 border border-border md:mt-0 lg:mt-0">
      <TableHeader>
        <TableRow>
          <TableHead className="w-20 text-foreground">Imagen</TableHead>
          <TableHead className="text-foreground">Nombre del Producto</TableHead>
          <TableHead className="text-foreground">Codigo del Producto</TableHead>
          <TableHead className="text-foreground">Categoria</TableHead>
          <TableHead className="text-foreground">Precio</TableHead>
          <TableHead className="text-foreground">Stock</TableHead>
          <TableHead className="text-foreground">Estado</TableHead>
          <TableHead className="text-center text-foreground">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {option?.map((op) => (
          <TableRow key={op.id} className="border-border">
            <TableCell>
              {typeof op.image === "string" ? (
                <img
                  src={op.image}
                  alt={op.name}
                  className="h-15 w-15 rounded-md object-contain"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                  No img
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium text-foreground">
              {op.name}
            </TableCell>
            <TableCell className="font-medium text-foreground">
              {op.product_code}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {op.category?.name ?? "Sin categoría"}
            </TableCell>
            <TableCell className="text-foreground">${op.unit_price}</TableCell>
            <TableCell
              className={`text-center ${op.stock <= 5 ? "text-destructive" : "text-foreground"}`}
            >
              {op.stock}
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  op.is_active
                    ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-300/30"
                    : "bg-red-100 text-red-700 ring-1 ring-red-600/20 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-300/30"
                }`}
              >
                {op.is_active ? "Activo" : "Inactivo"}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(op)}
                >
                  <Trash2 />
                  Eliminar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onUpdate(op)}
                  size="sm"
                >
                  <SquarePen />
                  Actualizar
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableGlobal>
  );
};
