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
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((op) => (
              <TableRow className="odd:bg-muted/50" key={op.id}>
                <TableCell className="pl-4">{op.id}</TableCell>
                <TableCell className="font-medium">
                  {op.full_name === " " ? op.username : op.full_name}
                </TableCell>
                <TableCell>{op.email}</TableCell>
                <TableCell>{op.orders_count ?? 0}</TableCell>
                <TableCell>{op.role}</TableCell>
              </TableRow>
            ))}
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
