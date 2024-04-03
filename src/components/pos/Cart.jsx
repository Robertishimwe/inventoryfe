import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

import { useAtomValue, useAtom } from "jotai";
import { cartAtom } from "../../utils/atoms";

import api from "../../utils/api";
import transformCartData from "../../utils/posDataFormat";

function Cart() {
  // const cart = useAtomValue(cartAtom);
  const [cart, setCart] = useAtom(cartAtom);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);

  const transformedCartData = transformCartData(cart);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (cartData) => {
      return api.patch("/api/stock/dedact", cartData);
    },
    onSuccess: (data) => {
      toast.success("Operation was successful", {
        duration: 7000,
        position: 'top-center'        
      });
      setCart([]);
    },
    onError: (error) => {
      toast.error(`${error?.response?.data?.error}`, {
        duration: 9000,
        position: 'top-center'});
    },
  });

  const handleConfirmSell = () => {
    mutate(transformedCartData);
  };
  const handleRemoveProduct = (productIndex) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== productIndex));
  };

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
            <TableHead></TableHead> {/* Empty table head for remove button */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{Number(item.price) * item.quantity} Frw</TableCell>
                <TableCell>
                  <Button variant="destructive" size="icon" onClick={() => handleRemoveProduct(index)}>
                    -
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
              Cart is empty
            </p>
          )}
        </TableBody>
      </Table>
      <div className="ml-4">
        ___________
        <br />
        <Label className="text-base">Total Price</Label>
        <div className="text-2xl font-bold">{totalPrice} FRW</div>
      </div>
      <div className="flex justify-end mb-6 gap-4 px-8">
        <Button onClick={handleConfirmSell} disabled={isPending}>
          {isPending ? "Loading..." : "Confirm Sell"}
        </Button>
      </div>
    </>
  );
}

export default Cart;
