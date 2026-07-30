import {
  Table as TableGlobal,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ProductListWatchAdmin } from "@/types/types";

interface TableMyProps {
  option: ProductListWatchAdmin[];
}

export const Table = ({ option }: TableMyProps) => {
  return (
    <TableGlobal className="border-2 border-gray-200">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="w-20">Image</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {option?.slice(0, 10).map((op) => (
          <TableRow key={op.id}>
            <TableCell>
              {typeof op.image === "string" ? (
                <img
                  src={op.image}
                  alt={op.name}
                  className="h-15 w-15 rounded-md object-contain"
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center text-xs text-gray-400">
                  No img
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium">{op.name}</TableCell>
            <TableCell>{op.category?.name ?? "Sin categoría"}</TableCell>
            <TableCell className="text-right">${op.unit_price}</TableCell>
            <TableCell
              className={`text-right ${op.stock <= 5 ? "text-red-500" : "text-black"}`}
            >
              {op.stock}
            </TableCell>
            <TableCell className="text-right">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  op.is_active
                    ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                    : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
                }`}
              >
                {op.is_active ? "Activo" : "Inactivo"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableGlobal>
  );
};
