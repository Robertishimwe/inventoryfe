// import React, { useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom"
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import ReusableTable from '../ReusableTable';
// import TopUpPopUp from "./topUp";
// import EditPopUp from "./editPopUp";
// import DeletePopUp from "./deletePopUp";
// import { useAtom } from 'jotai';
// import { unitsAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// function DataGrid() {
//   const [units, setUnits] = useAtom(unitsAtom);
//   const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
//   const [selectedUnit, setSelectedUnit] = useState(null);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ['units'],
//     queryFn: async () => {
//       const response = await api.get('/api/units/getAll');
//       return response?.data?.units;
//     }
//   });

//   useEffect(() => {
//     if (data) {
//       console.log("Units data:", data);
//       setUnits(data);
//     }
//   }, [data, setUnits]);

//   const handleAdd = () => {
//     navigate("/dashboard/units/addNew");
//   };

//   const handleTopUpClick = () => {    
//     setIsTopUpPopupOpen(true);
//   };

//   const handleEdit = (row) => {
//     setSelectedUnit({
//       "id": row.id,
//       "unitName": row.unit_name
//     });    
//     setIsEditPopupOpen(true);
//   };

//   const handleDelete = (row) => {
    
//     setSelectedUnit({
//       "id": row.id,
//       "unitName": row.unit_name
//     });    
//     setIsDeletePopupOpen(true);
//   };

//   const columnMapping = [
//     { columnName: "Id", fieldName: "id" },
//     { columnName: "Unit Name", fieldName: "unit_name" },
//     { columnName: "Updated at",  fieldName: "updatedAt" },
//   ];

//   if (isLoading) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
//   }

//   if (isError) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Error: {error.message}</p>
//   }

//   return (
//     <>  
//       <ReusableTable
//         columnMapping={columnMapping}
//         data={units}
//         title="Unit Management"
//         searchPlaceholder="Search..."
//         onAdd={handleAdd}
//         onTopup={handleTopUpClick}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         itemsPerPageOptions={[10, 25, 50, 100]}
//         showAddButton={true}
//         showSearchInput={true}
//       />
//       {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}
//       {isEditPopupOpen && (<EditPopUp unit={selectedUnit} setIsEditPopupOpen={setIsEditPopupOpen} />)}
//       {isDeletePopupOpen && (<DeletePopUp unit={selectedUnit} setIsDeletePopupOpen={setIsDeletePopupOpen} />)}
//     </>
//   );
// }

// export default DataGrid;































// // import React, {useState} from 'react'
// // import { useNavigate } from "react-router-dom"
// // import { useMutation, useQuery } from '@tanstack/react-query';

// // import ReusableTable from '../ReusableTable';
// // import TopUpPopUp from "./topUp";
// // import EditPopUp from "./editPopUp";
// // import { useAtom } from 'jotai';
// // import { unitsAtom } from "../../utils/atoms";

// // import api from "../../utils/api";

// // function DataGrid() {

// //   const [units, setUnits] = useAtom(unitsAtom);
// //   const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
// //   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
// //   const [selectedUnit, setSelectedUnit] = useState(null);
// //   const navigate = useNavigate();

// //   const { isLoading, isError, data, error } = useQuery({
// //     queryKey: ['units'],
// //     queryFn: async () => {
// //       const response = await api.get('/api/units/getAll');
// //       return response?.data?.units;
// //     }
// //   })

// //   if (isLoading) {
// //     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
// //   }

// //   if (isError) {
// //     return <p>Error: {error.message}</p>
// //   }

// //   const handleAdd = () => {
// //     navigate("/dashboard/units/addNew");
// // };

// // const handleTopUpClick = () => {    
// //   setIsTopUpPopupOpen(true);
// // };

// // const handleEdit = (row) => {
// //     // navigate(`/units/edit/${row.id}`);
// //     // navigate(`/dashboard/units/editUnit/${row.id}`);
// //     setSelectedUnit({
// //       "id":row.id,
// //       "unitName":row.unit_name
// //     });    
// //     setIsEditPopupOpen(true);
// // };

// // const handleDelete = (row) => {
// //     navigate(`/units/delete/${row.id}`);
// // };



// // if (data) {
// //   setUnits(data);
// // }

// // console.log("?????????????????????????????units",units);

// // const columnMapping = [
// //   { columnName: "Id", fieldName: "id" },
// //   { columnName: "Unit Name", fieldName: "unit_name" },
// //   { columnName: "Updated at",  fieldName: "updatedAt" },
// // ];

// // return (
// //   <>  
// //     <ReusableTable
// //         columnMapping={columnMapping}
// //         data={units}
// //         title="Unit Management"
// //         searchPlaceholder="Search..."
// //         onAdd={handleAdd}
// //         onTopup={handleTopUpClick}
// //         onEdit={handleEdit}
// //         onDelete={handleDelete}
// //         itemsPerPageOptions={[10, 25, 50, 100]}
// //         showAddButton={true}
// //         showSearchInput={true}
// //     />
// //      {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}
// //      {isEditPopupOpen && (<EditPopUp unit={selectedUnit} setIsEditPopupOpen={setIsEditPopupOpen} />)}
// //   </>
// // );
// //   // return (
// //   //   <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
// //   //   <Card>
// //   //     <Card>
// //   //       <CardHeader className="pb-4">
// //   //         <CardTitle>Unit Management</CardTitle>
// //   //         <Button className="ml-auto" size="sm" onClick={()=>  navigate("/dashboard/units/addNew")}>
// //   //           Add New Unit
// //   //         </Button>
// //   //       </CardHeader>
// //   //       <CardContent>
// //   //         <Table>
// //   //           <TableHeader>
// //   //             <TableRow>
// //   //               <TableHead>Unit ID</TableHead>
// //   //               <TableHead>Unit Name</TableHead>
// //   //               <TableHead>Updated At</TableHead>
// //   //             </TableRow>
// //   //           </TableHeader>
// //   //           <TableBody>
                        
// //   //             {
// //   //             units && units.map((unit) => (
// //   //               <TableRow>
// //   //                 <TableCell>{unit.id}</TableCell>
// //   //                 <TableCell>{unit.unit_name}</TableCell> 
// //   //                 <TableCell>{new Date(unit.updatedAt).toLocaleString()}</TableCell>
// //   //                 <TableCell>
// //   //                 <Button variant="ghost">Edit</Button>
// //   //                 <Button variant="ghost">Delete</Button>
// //   //               </TableCell>
// //   //               </TableRow> 
// //   //             ))}
             
// //   //           </TableBody>
// //   //         </Table>
// //   //       </CardContent>
// //   //     </Card>
// //   //   </Card>
// //   // </main>
// //   // )
// // }

// // export default DataGrid














import React, { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReusableTable from '../ReusableTable';
import TopUpPopUp from "./topUp";
import EditPopUp from "./editPopUp";
import DeletePopUp from "./deletePopUp";
import NewUnit from "./addNewUnit";
import { useAtom } from 'jotai';
import { unitsAtom } from "../../utils/atoms";
import api from "../../utils/api";

function DataGrid() {
  const [units, setUnits] = useAtom(unitsAtom);
  const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isNewUnitPopupOpen, setIsNewUnitPopupOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['units'],
    queryFn: async () => {
      const response = await api.get('/api/units/getAll');
      return response?.data?.units;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true
  });

  useEffect(() => {
    if (data) {
      console.log("Units data:", data);
      setUnits(data);
    }
  }, [data, setUnits]);

  const handleAdd = () => {
    setIsNewUnitPopupOpen(true);
  };

  const handleUnitAdded = (newUnit) => {
    setUnits((prevUnits) => [...prevUnits, newUnit]);
  };

  const handleTopUpClick = () => {    
    setIsTopUpPopupOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedUnit({
      "id": row.id,
      "unitName": row.unit_name
    });    
    setIsEditPopupOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedUnit({
      "id": row.id,
      "unitName": row.unit_name
    });    
    setIsDeletePopupOpen(true);
  };

  const columnMapping = [
    { columnName: "Id", fieldName: "id" },
    { columnName: "Unit Name", fieldName: "unit_name" },
    { columnName: "Updated at",  fieldName: "updatedAt" },
  ];

  if (isLoading) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
  }

  if (isError) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Error: {error.message}</p>
  }

  return (
    <>  
      <ReusableTable
        columnMapping={columnMapping}
        data={units}
        title="Unit Management"
        searchPlaceholder="Search..."
        onAdd={handleAdd}
        onTopup={handleTopUpClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showAddButton={true}
        showSearchInput={true}
      />
      {isTopUpPopupOpen && (<TopUpPopUp setIsTopUpPopupOpen={setIsTopUpPopupOpen} />)}
      {isEditPopupOpen && (<EditPopUp unit={selectedUnit} setIsEditPopupOpen={setIsEditPopupOpen} />)}
      {isDeletePopupOpen && (<DeletePopUp unit={selectedUnit} setIsDeletePopupOpen={setIsDeletePopupOpen} />)}
      {isNewUnitPopupOpen && (
        <NewUnit 
          onClose={() => setIsNewUnitPopupOpen(false)} 
          onUnitAdded={handleUnitAdded} 
        />
      )}
    </>
  );
}

export default DataGrid;