import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { suppliersAtom } from "../../utils/atoms"; // Import the suppliers atom
import api from "../../utils/api"; // Import the API utility
import TopUpPopUp from "./topUp";
import EditPopUp from "./editPopUp";
import ReusableTable from '../ReusableTable';

function SupplierDataGrid() {
    const [suppliers, setSuppliers] = useAtom(suppliersAtom);
    const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
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

    const handleAdd = () => {
        navigate("/dashboard/suppliers/addNew");
    };

    const handleTopUpClick = () => {    
        setIsTopUpPopupOpen(true);
      };

    const handleEdit = (row) => {
        // navigate(`/dashboard/supplier/edit/${row.id}`);
        setSelectedSupplier({
            "id":row.id,
            "supplierName":row.supplierName,
            "contact":row.contact
        });    
        setIsEditPopupOpen(true);
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

    if (data) {
      setSuppliers(data);
    }

    const columnMapping = [
        { columnName: "Id", fieldName: "id" },
        { columnName: "Supplier Name", fieldName: "supplierName" },
        { columnName: "Supplier Contact",  fieldName: "contact" },
      ];

    return (
        <>
            <ReusableTable
                columnMapping={columnMapping}
                data={suppliers}
                title="Supplier Management"
                searchPlaceholder="Search..."
                onAdd={handleAdd}
                onTopup={handleTopUpClick}
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
            {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}
            {isEditPopupOpen && (<EditPopUp supplier={selectedSupplier} setIsEditPopupOpen={setIsEditPopupOpen} />)}
        </>
    );
}

export default SupplierDataGrid;
