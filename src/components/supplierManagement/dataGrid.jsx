import React from 'react';
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { suppliersAtom } from "../../utils/atoms"; // Import the suppliers atom
import api from "../../utils/api"; // Import the API utility

function SupplierDataGrid() {
    const [suppliers, setSuppliers] = useAtom(suppliersAtom);
    const navigate = useNavigate();

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['suppliers'],
        queryFn: async () => {
            const response = await api.get('/api/Supplier/getAll');
            return response?.data?.suppliers;
        }
    });

    if (isLoading) {
        return <p>Loading...</p>; // Render a loading indicator while data is being fetched
    }

    if (isError) {
        return <p>Error: {error.message}</p>; // Render an error message if there's an error fetching data
    }

    if (data) {
        setSuppliers(data); // Once data is fetched successfully, set it in the state
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Card>
                <CardHeader className="pb-4">
                    <h2 className="text-xl font-semibold">Supplier Management</h2>
                    <Button className="ml-auto" size="sm" onClick={() => navigate("/dashboard/suppliers/addNew")}>
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
                            {suppliers && suppliers.map(supplier => (
                                <TableRow key={supplier.id}>
                                    <TableCell>{supplier.id}</TableCell>
                                    <TableCell>{supplier.supplierName}</TableCell>
                                    <TableCell>{supplier.contact}</TableCell>
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
        </main>
    );
}

export default SupplierDataGrid;
