import React from 'react';
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { usersAtom } from "../utils/atoms"; // Import the users atom
import api from "../utils/api"; // Import the API utility

function UserManagement() {
    const [users, setUsers] = useAtom(usersAtom);
    const navigate = useNavigate();

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/api/user/getAll');
            return response?.data;
        }
    });

    if (isLoading) {
        return <p>Loading...</p>; // Render a loading indicator while data is being fetched
    }

    if (isError) {
        return <p>Error: {error.message}</p>; // Render an error message if there's an error fetching data
    }

    if (data) {
        setUsers(data); // Once data is fetched successfully, set it in the state
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Card>
                <CardHeader className="pb-4">
                    <h2 className="text-xl font-semibold">User Management</h2>
                    <Button className="ml-auto" size="sm" onClick={() => navigate('/dashboard/users/addNew')}>
                        Add New User
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
              <TableRow>
                {/* <TableHead>User ID</TableHead> */}
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
                        <TableBody>
                            {users && users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
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

export default UserManagement;
