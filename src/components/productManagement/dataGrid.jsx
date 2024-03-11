import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

function DataGrid() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
    <Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Product Management</CardTitle>
          <Button className="ml-auto" size="sm">
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
            <TableBody>
              <TableRow>
                <TableCell>simerwa cement 0.9</TableCell>
                <TableCell>shgfkhasgdfkausydgfkyudgfk</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$10,000</TableCell>
                <TableCell>
                  <Button variant="ghost">Edit</Button>
                  <Button variant="ghost">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Card>
  </main>
  )
}

export default DataGrid