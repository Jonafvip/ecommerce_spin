import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type UserListByAdmin } from "@/types/types";
import { PaginationProducts as Pagination } from "./PaginationProducts";

interface MyTableCustomizedProp {
  options: UserListByAdmin[];
  next: string | null;
  prev: string | null;
  currentPage: number;
  onPageChange: (url: string, pageNumber: number) => void;
}

export const TableCustomized = ({
  options,
  next,
  prev,
  currentPage,
  onPageChange,
}: MyTableCustomizedProp) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Role</TableHead>
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
                        aria-label="Ver detalles del cliente"
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
                      {op.full_name === " " ? op.username : op.full_name}
                    </TableCell>
                    <TableCell>{op.email}</TableCell>
                    <TableCell>{op.orders_count ?? 0}</TableCell>
                    <TableCell>{op.role}</TableCell>
                  </TableRow>
                  {open && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={6} className="p-0">
                        <div className="grid grid-cols-2 gap-3 px-4 py-3 sm:grid-cols-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Email
                            </p>
                            <p className="text-sm font-medium">{op.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Rol</p>
                            <p className="text-sm font-medium">{op.role}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Pedidos
                            </p>
                            <p className="text-sm font-medium">
                              {op.orders_count ?? 0}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Fecha de registro
                            </p>
                            <p className="text-sm font-medium">
                              {op.date_joined
                                ? new Date(op.date_joined).toLocaleDateString()
                                : "—"}
                            </p>
                          </div>
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

      <Pagination
        next={next}
        prev={prev}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
