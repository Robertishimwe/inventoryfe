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
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

function DataGrid() {
  const [products, setProducts] = useAtom(productsAtom);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/api/product/getAll');
      return response?.data;
    }
  })

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <Card className="w-full">
        <CardHeader className="flex flex-wrap justify-between pb-4">
          <CardTitle>Product Management</CardTitle>
          <Button className="ml-auto" size="sm" onClick={()=>  navigate("/dashboard/products/addNew")}>
            Add New Product
          </Button>
          <Input
            placeholder="Search product..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="ml-auto w-1/2"
          />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full">
            <Table className="w-full">
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
                currentItems && currentItems.map((product) => (
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
          </ScrollArea>
          <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="border-gray-300 hover:border-gray-400 focus:border-gray-400"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-500">
                Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
              </span>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= filteredProducts.length}
                variant="outline"
                className="border-gray-300 hover:border-gray-400 focus:border-gray-400"
              >
                Next
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded-md py-1 px-2 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default DataGrid
