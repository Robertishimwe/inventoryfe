import React from "react";
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Card } from "@/components/ui/card"

import { useAtomValue, useAtom } from 'jotai'
import { cartAtom, productsAtom } from "../../utils/atoms"

import api from "../../utils/api";

function Cart() {

  const cart = useAtomValue(cartAtom)

  const totalPrice = cart.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);


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
        <TableBody>{
          cart.length > 0 ? cart.map((item, index) => (
            
          
          <TableRow key={index}>
            <TableCell>{item.product}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{Number(item.price) * item.quantity} FRW</TableCell>
          </TableRow>
          )) : <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Cart is empty</p>}
        </TableBody>
      </Table>
      <div className="ml-4">
        ------------
        <br/>
        <Label className="text-base">Total Price</Label>
        <div className="text-2xl font-bold">{totalPrice} FRW</div>
      </div>
      <div className="flex justify-end mb-6 gap-4 px-8">
        <Button>Confirm Sell</Button>
      </div>
    </>
  );
}

export default Cart;
