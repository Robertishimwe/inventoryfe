// import React, {useState} from 'react'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
// import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
// import ReusableTable from '../ReusableTable';
// import TopUpPopUp from "./topUp";
// import EditPopUp from "./editPopUp";
// import DeletePopUp from "./deletePopUp";
// import { useAtom } from 'jotai';
// import { categoriesAtom } from "../../utils/atoms";

// import api from "../../utils/api";

// function DataGrid() {

//   const [categories, setCategories] = useAtom(categoriesAtom);
//   const navigate = useNavigate();
//   const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ['categories'],
//     queryFn: async () => {
//       const response = await api.get('/api/category/getAll');
//       return response?.data?.categories;
//     }
//   })


//   if (isLoading) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>
//   }

//   if (data) {
//     setCategories(data);
//   }
  
//   console.log("?????????????????????????cat",categories);

//   const handleAdd = () => {
//     navigate("/dashboard/categories/addNew");
// };

// const handleTopUpClick = () => {    
//   setIsTopUpPopupOpen(true);
// };

// const handleEdit = (row) => {
//     // navigate(`/categories/edit/${row.id}`);
//     setSelectedCategory({
//       "id":row.id,
//       "categoryName":row.name
//     });    
//     setIsEditPopupOpen(true);
// };

// const handleDelete = (row) => {
//     // navigate(`/categories/delete/${row.id}`);
//     setSelectedCategory({
//       "id":row.id,
//       "categoryName":row.name
//     });    
//     setIsDeletePopupOpen(true);
// };

// if (data) {
//   setCategories(data);
// }

//   const columnMapping = [
//     { columnName: "Id", fieldName: "id" },
//     { columnName: "Category Name", fieldName: "name" },
//     { columnName: "Updated at",  fieldName: "updatedAt" },
//   ];
  
//   return (
//     <>
//     <ReusableTable
//         columnMapping={columnMapping}
//         data={categories}
//         title="Category Management"
//         searchPlaceholder="Search..."
//         onAdd={handleAdd}
//         onTopup={handleTopUpClick}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         itemsPerPageOptions={[10, 25, 50, 100]}
//         showAddButton={true}
//         showSearchInput={true}
//     />
//    {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}
//    {isEditPopupOpen && (<EditPopUp category={selectedCategory} setIsEditPopupOpen={setIsEditPopupOpen} />)}
//    {isDeletePopupOpen && (<DeletePopUp category={selectedCategory} setIsDeletePopupOpen={setIsDeletePopupOpen} />)}
//     </>
//   );

// export default DataGrid









import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { categoriesAtom } from "../../utils/atoms";
import api from "../../utils/api";
import ReusableTable from '../ReusableTable';
import TopUpPopUp from "./topUp";
import EditPopUp from "./editPopUp";
import DeletePopUp from "./deletePopUp";

const DataGrid = () => {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [popupState, setPopupState] = useState({
    topUp: false,
    edit: false,
    delete: false,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/api/category/getAll');
      return response?.data?.categories;
    },
    staleTime: 60000, // 1 minute
    cacheTime: 300000, // 5 minutes
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  const handleAdd = useCallback(() => {
    navigate("/dashboard/categories/addNew");
  }, [navigate]);

  const handlePopupOpen = useCallback((popupType, category = null) => {
    setPopupState(prev => ({ ...prev, [popupType]: true }));
    if (category) {
      setSelectedCategory({ id: category.id, categoryName: category.name });
    }
  }, []);

  const handlePopupClose = useCallback((popupType) => {
    setPopupState(prev => ({ ...prev, [popupType]: false }));
    setSelectedCategory(null);
  }, []);

  const columnMapping = [
    { columnName: "Id", fieldName: "id" },
    { columnName: "Category Name", fieldName: "name" },
    { columnName: "Updated at", fieldName: "updatedAt" },
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
        data={categories}
        title="Category Management"
        searchPlaceholder="Search..."
        onAdd={handleAdd}
        onTopup={() => handlePopupOpen('topUp')}
        onEdit={(row) => handlePopupOpen('edit', row)}
        onDelete={(row) => handlePopupOpen('delete', row)}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showAddButton={true}
        showSearchInput={true}
      />
      {popupState.topUp && (
        <TopUpPopUp setIsTopUpPopupOpen={() => handlePopupClose('topUp')} />
      )}
      {popupState.edit && (
        <EditPopUp
          category={selectedCategory}
          setIsEditPopupOpen={() => handlePopupClose('edit')}
        />
      )}
      {popupState.delete && (
        <DeletePopUp
          category={selectedCategory}
          setIsDeletePopupOpen={() => handlePopupClose('delete')}
        />
      )}
    </>
  );
};

export default React.memo(DataGrid);
