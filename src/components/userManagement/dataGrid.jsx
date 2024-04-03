import React from 'react';
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { usersAtom } from "../../utils/atoms"; 
import ReusableTable from '../ReusableTable';
import api from "../../utils/api"; 

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

    const columns = [
        'Id',
        'FirstName',
        'LastName',
        'Email',
        'Role'
      ];

    if (isLoading) {
        return <p>Loading...</p>; // Render a loading indicator while data is being fetched
    }

    if (isError) {
        return <p>Error: {error.message}</p>; // Render an error message if there's an error fetching data
    }

    if (data) {
        setUsers(data); // Once data is fetched successfully, set it in the state
    }

    const handleAdd = () => {
        navigate('/dashboard/users/addNew');
    };

    const handleEdit = (row) => {
        navigate(`/dashboard/users/edit/${row.id}`);
    };
  
    const handleDelete = (row) => {
        navigate(`/dashboard/users/delete/${row.id}`);
    };

    console.log(">>>>>>>", users);

    const userDatas = users.map((user) => ({
        id: user.id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        role: user.role,
    }));

    console.log(">>>>>>>!!!!!", userDatas);

    return (
        <ReusableTable
            columns={columns}
            data={userDatas}
            title="User Management"
            searchPlaceholder="Search..."
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemsPerPageOptions={[10, 25, 50, 100]}
            showAddButton={true}
            showSearchInput={true}
            // additionalButtons={[
            //     <Button key="import-btn" variant="ghost">
            //         Import
            //     </Button>,
            //     <Button key="export-btn" variant="ghost">
            //         Export
            //     </Button>,
            // ]}
        />
    );
}

export default UserManagement;
