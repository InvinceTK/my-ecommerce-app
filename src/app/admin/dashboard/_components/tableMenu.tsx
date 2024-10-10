"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteProduct from "../../_actions/deleteProduct";
import ToggleActive from "../../_actions/toggleActive";



export default function TableMenu({id, isActive}) {
  



  return (
    <DropdownMenu>
      <DropdownMenuTrigger><EllipsisVertical/></DropdownMenuTrigger>
      <DropdownMenuContent>
        
        <DropdownMenuItem onClick={()=>ToggleActive(id,!isActive)}>{isActive ? "Deactivate" : "Activate"}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick = {()=>DeleteProduct(id)}className="text-red-500">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
