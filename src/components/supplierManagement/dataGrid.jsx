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
          <CardTitle>Supplier Management</CardTitle>
          <Button className="ml-auto" size="sm">
            Add New Supplier
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier ID</TableHead>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Supplier Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Robert ishimwe</TableCell>
                <TableCell>rob@ishimwe.com</TableCell>
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