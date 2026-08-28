import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { OrderList } from "@/types/types";
import { formatCurrency } from "@/lib/format";
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
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  CANCELED: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
  DELIVERED: "bg-green-50 text-green-700 ring-1 ring-green-600/20",
  SHIPPED: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
  CONFIRMED: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20",
};

export const TableOrders = ({ options }: MyTableCustomizedProp) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha de Pedido</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((op) => {
              const open = expandedId === op.id;
              return (
                <Fragment key={op.id}>
                  <TableRow className="odd:bg-muted/50">
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => setExpandedId(open ? null : op.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
                        aria-label="Ver detalles del pedido"
                      >
                        {open ? (
                          <ChevronDown size="16" />
                        ) : (
                          <ChevronRight size="16" />
                        )}
                      </button>
                    </TableCell>
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
                    <TableCell>{formatCurrency(op.total)}</TableCell>
                  </TableRow>
                  {open && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={6} className="p-0">
                        <div className="px-4 py-3">
                          {op.details && op.details.length > 0 ? (
                            <ul className="flex flex-col gap-2">
                              {op.details.map((d) => (
                                <li
                                  key={d.id}
                                  className="flex items-center gap-3"
                                >
                                  <img
                                    src={d.product_image}
                                    alt={d.product_name}
                                    className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">
                                      {d.product_name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Cantidad: {d.quantity}
                                    </p>
                                  </div>
                                  <p className="shrink-0 text-sm font-medium">
                                    {formatCurrency(d.total)}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Sin detalles disponibles.
                            </p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
