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
          <CardTitle>Inventory Management</CardTitle>
          {/* <Button className="ml-auto" size="sm">
            Add New Category
          </Button> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Unit</TableHead>
                {/* <TableHead>Stock in cash</TableHead> */}
                <TableHead>Minimum Stock Level</TableHead>
                <TableHead>Last re-stock date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Cement Nyati</TableCell>
                <TableCell>Cement</TableCell>
                <TableCell>400</TableCell>
                <TableCell>10</TableCell>
                <TableCell>Kg</TableCell>
                <TableCell>5</TableCell>
                <TableCell>2024-12-02T18:03:06.000Z</TableCell>
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