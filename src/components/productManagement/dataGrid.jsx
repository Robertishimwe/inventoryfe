import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { productsAtom } from "../../utils/atoms";
import api from "../../utils/api";
import ReusableTable from '../ReusableTable';

function DataGrid() {
  const [products, setProducts] = useAtom(productsAtom);
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/api/product');
      return response?.data;
    }
  })


  if (isLoading) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (data) {
    console.log("?????????????????????", data)
    setProducts(data);
  }


  const handleAdd = () => {
    navigate('/dashboard/products/addNew');
};

const handleEdit = (row) => {
    navigate(`/dashboard/products/edit/${row.id}`);
};

const handleDelete = (row) => {
    navigate(`/dashboard/products/delete/${row.id}`);
};

const columns = [
  "id",
  "ProductName",
  "Description",
  "Category",
  "Supplier",
  "Unit",
  "buying_price",
  "selling_price",
  "Quantity",
  "MinimumStockLevel",
  "LastRestockDate",
  "LastUpdatedBy"
];


const columnMapping = [
  { columnName: "Id", fieldName: "id" },
  { columnName: "Product Name", fieldName: "ProductName" },
  { columnName: "Description",  fieldName: "Description" },
  { columnName: "Category",     fieldName: "Category" },
  { columnName: "Unit", fieldName: "Unit" },
  { columnName: "Price", fieldName: "selling_price" },
  // ... other column mappings
];

  
  return (
    <ReusableTable
        columnMapping={columnMapping}
        data={products}
        title="Product Management"
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


export default DataGrid