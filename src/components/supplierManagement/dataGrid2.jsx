import React from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { suppliersAtom } from "../../utils/atoms"; // Import the suppliers atom
import api from "../../utils/api"; // Import the API utility
import { Button } from "@/components/ui/button"

import ReusableTable from '../ReusableTable';

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
        console.log(">>>>>>>",data);
        setSuppliers(data); // Once data is fetched successfully, set it in the state
    }

    const columns = [
        'id',
        'name',
        'contact'
      ];

    const handleAdd = () => {
        navigate("/dashboard/suppliers/addNew");
    };

    const handleEdit = (row) => {
        navigate(`/supplier/edit/${row.id}`);
    };
  
    const handleDelete = (row) => {
        navigate(`/supplier/delete/${row.id}`);
    };

    const handleImport = () => {
        // Implement import logic here
    };
  
    const handleExport = () => {
        // Implement export logic here
    };

    const supplierData = suppliers.map((supplier) => ({
        id: supplier.id,
        name: supplier.supplierName,
        contact: supplier.contact,
    }));

    return (
        <ReusableTable
            columns={columns}
            data={supplierData}
            title="Supplier Management"
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

export default SupplierDataGrid;
