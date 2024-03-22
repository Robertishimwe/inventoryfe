import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from '@tanstack/react-query';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

import { useAtom } from 'jotai';
import { unitsAtom } from "../../utils/atoms";

import api from "../../utils/api";

function DataGrid() {

  const [units, setUnits] = useAtom(unitsAtom);

  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['units'],
    queryFn: async () => {
      const response = await api.get('/api/units/getAll');
      return response?.data?.units;
    }
  })

  if (isLoading) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  // const { mutate } = useMutation({
  //   mutationFn: (unit) => {
  //     return api.post('/api/units/add', unit);

  //   }
  // })




  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   mutate({ name: e.target.name.value });
  //   e.target.reset();
  // }

if (data) {
  setUnits(data);
}

console.log( units);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
    <Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Unit Management</CardTitle>
          <Button className="ml-auto" size="sm" onClick={()=>  navigate("/dashboard/units/addNew")}>
            Add New Unit
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit ID</TableHead>
                <TableHead>Unit Name</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                        
              {
              units && units.map((unit) => (
                <TableRow>
                  <TableCell>{unit.id}</TableCell>
                  <TableCell>{unit.unit_name}</TableCell> 
                  <TableCell>{new Date(unit.updatedAt).toLocaleString()}</TableCell>
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