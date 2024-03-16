import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from '@tanstack/react-query';
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

import { useAtom } from 'jotai';
import { productsAtom } from "../../utils/atoms";

import api from "../../utils/api";

function DataGrid() {

 const [products, setProducts] = useAtom(productsAtom);
 const navigate = useNavigate();

 const { isLoading, isError, data, error } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await api.get('/api/product/getAll');
    return response?.data;
  }
 })


if (isLoading) {
  return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
}

if (isError) {
  return <p>Error: {error.message}</p>
}

if (data) {
  setProducts(data);
}

console.log(products);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
    <Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Product Management</CardTitle>
          <Button className="ml-auto" size="sm" onClick={()=>  navigate("/dashboard/products/addNew")}>
            Add New Product
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{
              products && products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product?.productCategory?.name}</TableCell>
                <TableCell>{product?.Supplier?.supplierName}</TableCell>
                <TableCell>{product?.unit?.unit_name}</TableCell>
                <TableCell>{product?.price} RFW</TableCell>
                <TableCell>
                  <Button variant="ghost">Edit</Button>
                  <Button variant="ghost">Delete</Button>
                </TableCell>
              </TableRow>))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Card>
  </main>
  )
}

export default DataGrid