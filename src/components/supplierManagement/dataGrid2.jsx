// import React, {useState} from 'react';
// import { useNavigate } from "react-router-dom";
// import { useQuery } from '@tanstack/react-query';
// import { useAtom } from 'jotai';
// import { suppliersAtom } from "../../utils/atoms"; // Import the suppliers atom
// import api from "../../utils/api"; // Import the API utility
// import TopUpPopUp from "./topUp";
// import EditPopUp from "./editPopUp";
// import DeletePopUp from "./deletePopUp";
// import ReusableTable from '../ReusableTable';

// function SupplierDataGrid() {
//     const [suppliers, setSuppliers] = useAtom(suppliersAtom);
//     const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
//     const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//     const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
//     const [selectedSupplier, setSelectedSupplier] = useState(null);
//     const navigate = useNavigate();

//     const { isLoading, isError, data, error } = useQuery({
//         queryKey: ['suppliers'],
//         queryFn: async () => {
//             const response = await api.get('/api/Supplier/getAll');
//             return response?.data?.suppliers;
//         }
//     });

//     if (isLoading) {
//         return <p>Loading...</p>; // Render a loading indicator while data is being fetched
//     }

//     if (isError) {
//         return <p>Error: {error.message}</p>; // Render an error message if there's an error fetching data
//     }

//     if (data) {
//         setSuppliers(data); // Once data is fetched successfully, set it in the state
//     }

//     const handleAdd = () => {
//         navigate("/dashboard/suppliers/addNew");
//     };

//     const handleTopUpClick = () => {    
//         setIsTopUpPopupOpen(true);
//       };

//     const handleEdit = (row) => {
//         // navigate(`/dashboard/supplier/edit/${row.id}`);
//         setSelectedSupplier({
//             "id":row.id,
//             "supplierName":row.supplierName,
//             "contact":row.contact
//         });    
//         setIsEditPopupOpen(true);
//     };
  
//     const handleDelete = (row) => {
        
//         setSelectedSupplier({
//             "id":row.id,
//             "supplierName":row.supplierName,
//             "contact":row.contact
//         });    
//         setIsDeletePopupOpen(true);

        
//     };

//     const handleImport = () => {
//         // Implement import logic here
//     };
  
//     const handleExport = () => {
//         // Implement export logic here
//     };

//     if (data) {
//       setSuppliers(data);
//     }

//     const columnMapping = [
//         { columnName: "Id", fieldName: "id" },
//         { columnName: "Supplier Name", fieldName: "supplierName" },
//         { columnName: "Supplier Contact",  fieldName: "contact" },
//       ];

//     return (
//         <>
//             <ReusableTable
//                 columnMapping={columnMapping}
//                 data={suppliers}
//                 title="Supplier Management"
//                 searchPlaceholder="Search..."
//                 onAdd={handleAdd}
//                 onTopup={handleTopUpClick}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//                 itemsPerPageOptions={[10, 25, 50, 100]}
//                 showAddButton={true}
//                 showSearchInput={true}
//                 // additionalButtons={[
//                 //     <Button key="import-btn" variant="ghost">
//                 //         Import
//                 //     </Button>,
//                 //     <Button key="export-btn" variant="ghost">
//                 //         Export
//                 //     </Button>,
//                 // ]}
//             />
//             {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}
//             {isEditPopupOpen && (<EditPopUp supplier={selectedSupplier} setIsEditPopupOpen={setIsEditPopupOpen} />)}
//             {isDeletePopupOpen && (<DeletePopUp supplier={selectedSupplier} setIsDeletePopupOpen={setIsDeletePopupOpen} />)}
//         </>
//     );
// }

// export default SupplierDataGrid;


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { suppliersAtom } from "../../utils/atoms";
import api from "../../utils/api";
import ReusableTable from '../ReusableTable';
import TopUpPopUp from "./topUp";
import EditPopUp from "./editPopUp";
import DeletePopUp from "./deletePopUp";
import { Button } from "@/components/ui/button";

const SupplierDataGrid = () => {
  const [suppliers, setSuppliers] = useAtom(suppliersAtom);
  const navigate = useNavigate();

  const [popupState, setPopupState] = useState({
    topUp: false,
    edit: false,
    delete: false,
  });
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const response = await api.get('/api/Supplier/getAll');
      return response?.data?.suppliers;
    },
    staleTime: 60000, // 1 minute
    cacheTime: 300000, // 5 minutes
  });

  useEffect(() => {
    if (data) {
      setSuppliers(data);
    }
  }, [data, setSuppliers]);

  const handleAdd = useCallback(() => {
    navigate("/dashboard/suppliers/addNew");
  }, [navigate]);

  const handlePopupOpen = useCallback((popupType, supplier = null) => {
    setPopupState(prev => ({ ...prev, [popupType]: true }));
    if (supplier) {
      setSelectedSupplier({
        id: supplier.id,
        supplierName: supplier.supplierName,
        contact: supplier.contact
      });
    }
  }, []);

  const handlePopupClose = useCallback((popupType) => {
    setPopupState(prev => ({ ...prev, [popupType]: false }));
    setSelectedSupplier(null);
  }, []);

  const handleImport = useCallback(() => {
    console.log('Import functionality not implemented');
  }, []);

  const handleExport = useCallback(() => {
    console.log('Export functionality not implemented');
  }, []);

  const columnMapping = [
    { columnName: "Id", fieldName: "id" },
    { columnName: "Supplier Name", fieldName: "supplierName" },
    { columnName: "Supplier Contact", fieldName: "contact" },
  ];

  const additionalButtons = [
    <Button key="import-btn" variant="ghost" onClick={handleImport}>
      Import
    </Button>,
    <Button key="export-btn" variant="ghost" onClick={handleExport}>
      Export
    </Button>,
  ];

  if (isLoading) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <ReusableTable
        columnMapping={columnMapping}
        data={suppliers}
        title="Supplier Management"
        searchPlaceholder="Search..."
        onAdd={handleAdd}
        onTopup={() => handlePopupOpen('topUp')}
        onEdit={(row) => handlePopupOpen('edit', row)}
        onDelete={(row) => handlePopupOpen('delete', row)}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showAddButton={true}
        showSearchInput={true}
        // additionalButtons={additionalButtons}
      />
      {popupState.topUp && (
        <TopUpPopUp setIsTopUpPopupOpen={() => handlePopupClose('topUp')} />
      )}
      {popupState.edit && (
        <EditPopUp
          supplier={selectedSupplier}
          setIsEditPopupOpen={() => handlePopupClose('edit')}
        />
      )}
      {popupState.delete && (
        <DeletePopUp
          supplier={selectedSupplier}
          setIsDeletePopupOpen={() => handlePopupClose('delete')}
        />
      )}
    </>
  );
};

export default React.memo(SupplierDataGrid);
