import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type CategoryList } from "@/types/types";
import { PaginationProducts as Pagination } from "./PaginationProducts";

interface MyTableCustomizedProp {
  options: CategoryList[];
  next?: string | null;
  prev?: string | null;
  currentPage?: number;
  onPageChange?: (url: string, pageNumber: number) => void;
}

export const TableCategory = ({
  options,
  next,
  prev,
  currentPage,
  onPageChange,
}: MyTableCustomizedProp) => {
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((op) => (
              <TableRow className="odd:bg-muted/50" key={op.id}>
                <TableCell className="pl-4">{op.id}</TableCell>
                <TableCell className="font-medium">{op.name}</TableCell>
                <TableCell>{op.description}</TableCell>
                <TableCell>
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
        </Table>
      </div>

      <Pagination
        next={next!}
        prev={prev!}
        currentPage={currentPage!}
        onPageChange={onPageChange!}
      />
    </div>
  );
};
