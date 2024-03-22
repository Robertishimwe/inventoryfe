import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from '@tanstack/react-query';
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

import { useAtom } from 'jotai';
import { categoriesAtom } from "../../utils/atoms";

import api from "../../utils/api";

function DataGrid() {

  const [categories, setCategories] = useAtom(categoriesAtom);
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/api/category/getAll');
      return response?.data?.categories;
    }
  })


  if (isLoading) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (data) {
    setCategories(data);
  }
  
  console.log(categories);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
    <Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Category Management</CardTitle>
          <Button className="ml-auto" size="sm" onClick={()=>  navigate("/dashboard/categories/addNew")}>
            Add New Category
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category ID</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { categories && categories.map((category) => (
              <TableRow>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{new Date(category.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="ghost">Edit</Button>
                  <Button variant="ghost">Delete</Button>
                </TableCell>
              </TableRow>
             ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Card>
  </main>
  )
}

export default DataGrid