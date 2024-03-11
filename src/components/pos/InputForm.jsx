import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

function InputForm() {
  return (
    <>
      <div className="grid gap-4">
        <div>
          <br />
          <Label className="text-base ml-6" htmlFor="product">
            Product
          </Label>
          <Input
            className="w-[95%] ml-6"
            id="product"
            list="products"
            placeholder="Enter product name or code"
            type="text"
          />
          <datalist id="products">
            <option value="Product A" />
            <option value="Product B" />
          </datalist>
        </div>
        <div>
          <Label className="text-base ml-6" htmlFor="quantity">
            Quantity
          </Label>
          <Input
            className="w-[95%] ml-6"
            id="quantity"
            placeholder="Enter quantity"
            type="number"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 gap-4 px-8">
        <Button>Add to Cart</Button>
      </div>
    </>
  );
}

export default InputForm;
