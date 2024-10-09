import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableMenu from "./tableMenu.tsx";
import { Check, OctagonX } from "lucide-react";

export default function ProductTable({ products }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.isActive ? <Check/> : <OctagonX/>}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>£{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <TableMenu id={product.id} isActive={product.isActive} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
