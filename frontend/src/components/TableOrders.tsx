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

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  CANCELED: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
  DELIVERED: "bg-green-50 text-green-700 ring-1 ring-green-600/20",
  SHIPPED: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
  CONFIRMED: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20",
};

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
              <TableHead>Cliente</TableHead>
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
                <TableCell>
                  {new Date(op.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      statusStyles[op.status] ||
                      "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20"
                    }`}
                  >
                    {op.status}
                  </span>
                </TableCell>
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
