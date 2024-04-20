import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from '@tanstack/react-query';

import ReusableTable from '../ReusableTable';
import TopUpPopUp from "./topUp";
import { useAtom } from 'jotai';
import { unitsAtom } from "../../utils/atoms";

import api from "../../utils/api";

function DataGrid() {

  const [units, setUnits] = useAtom(unitsAtom);
  const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
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

  const handleAdd = () => {
    navigate("/dashboard/units/addNew");
};

const handleTopUpClick = () => {    
  setIsTopUpPopupOpen(true);
};

const handleEdit = (row) => {
    navigate(`/units/edit/${row.id}`);
};

const handleDelete = (row) => {
    navigate(`/units/delete/${row.id}`);
};



if (data) {
  setUnits(data);
}

console.log("?????????????????????????????units",units);

const columnMapping = [
  { columnName: "Id", fieldName: "id" },
  { columnName: "Unit Name", fieldName: "unit_name" },
  { columnName: "Updated at",  fieldName: "updatedAt" },
];

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
  </>
);
  // return (
  //   <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
  //   <Card>
  //     <Card>
  //       <CardHeader className="pb-4">
  //         <CardTitle>Unit Management</CardTitle>
  //         <Button className="ml-auto" size="sm" onClick={()=>  navigate("/dashboard/units/addNew")}>
  //           Add New Unit
  //         </Button>
  //       </CardHeader>
  //       <CardContent>
  //         <Table>
  //           <TableHeader>
  //             <TableRow>
  //               <TableHead>Unit ID</TableHead>
  //               <TableHead>Unit Name</TableHead>
  //               <TableHead>Updated At</TableHead>
  //             </TableRow>
  //           </TableHeader>
  //           <TableBody>
                        
  //             {
  //             units && units.map((unit) => (
  //               <TableRow>
  //                 <TableCell>{unit.id}</TableCell>
  //                 <TableCell>{unit.unit_name}</TableCell> 
  //                 <TableCell>{new Date(unit.updatedAt).toLocaleString()}</TableCell>
  //                 <TableCell>
  //                 <Button variant="ghost">Edit</Button>
  //                 <Button variant="ghost">Delete</Button>
  //               </TableCell>
  //               </TableRow> 
  //             ))}
             
  //           </TableBody>
  //         </Table>
  //       </CardContent>
  //     </Card>
  //   </Card>
  // </main>
  // )
}

export default DataGrid