import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Check, OctagonX } from "lucide-react";
import TableMenu from "./tableMenu";

type Product = {
  id : string,
  isActive: boolean,
  name: string,
  price: number,
  stock: number
}
export default function ProductTable({ products } : {products : Product[]}) {
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
