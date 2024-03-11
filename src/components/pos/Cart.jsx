import React from "react";
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Card } from "@/components/ui/card"

function Cart() {
  return (
    <>
      <div>
        <Label className="text-base text-center ml-4">Product List</Label>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name/Code</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Extended Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Product A</TableCell>
            <TableCell>2</TableCell>
            <TableCell>25.00 FRW</TableCell>
            <TableCell>50.00 FRW</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product B</TableCell>
            <TableCell>1</TableCell>
            <TableCell>30.00 FRW</TableCell>
            <TableCell>30.00 FRW</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="ml-4">
        ------------
        <br/>
        <Label className="text-base">Total Price</Label>
        <div className="text-2xl font-bold">80.00 FRW</div>
      </div>
      <div className="flex justify-end mb-6 gap-4 px-8">
        <Button>Confirm Sell</Button>
      </div>
    </>
  );
}

export default Cart;
