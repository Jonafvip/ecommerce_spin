import type { OrderList } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MyTableCustomizedProp {
  options: OrderList[];
  next?: string | null;
  prev?: string | null;
  currentPage?: number;
  onPageChange?: (url: string, pageNumber: number) => void;
}

export const TableOrders = ({
  options,
//   next,
//   prev,
//   currentPage,
//   onPageChange,
}: MyTableCustomizedProp) => {
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha de Pedido</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((op) => (
              <TableRow className="odd:bg-muted/50" key={op.id}>
                <TableCell className="pl-4">{op.id}</TableCell>
                <TableCell className="font-medium">
                  {op.user.full_name === " "
                    ? op.user.username
                    : op.user.full_name}
                </TableCell>
                <TableCell>{new Date(op.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{op.status}</TableCell>
                <TableCell>${op.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <Pagination
        next={next}
        prev={prev}
        currentPage={currentPage}
        onPageChange={onPageChange}
      /> */}
    </div>
  );
};
