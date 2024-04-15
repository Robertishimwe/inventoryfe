import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

function ReusableTable({
  columnMapping,
  data,
  title,
  searchPlaceholder,
  onAdd,
  onEdit,
  onDelete,
  itemsPerPageOptions,
  showAddButton,
  showSearchInput,
  additionalButtons,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    columnMapping.some(({ fieldName }) =>
      item[fieldName]
        .toString()
        .includes(searchQuery.toString().toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderActions = (item) => (
    <div className="flex gap-2">
      {onEdit && (
        <Button variant="ghost" onClick={() => onEdit(item)}>
          Edit
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" onClick={() => onDelete(item)}>
          Delete
        </Button>
      )}
    </div>
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card className="w-full">
        {showSearchInput && (
          <CardHeader className="flex flex-wrap justify-between pb-4">
            <CardTitle>{title}</CardTitle>
            {showAddButton && (
              <div className="flex gap-2">
                {additionalButtons}
                <Button className="ml-auto" size="sm" onClick={onAdd}>
                  Add New
                </Button>
              </div>
            )}
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="ml-auto w-1/2"
            />
          </CardHeader>
        )}
        <CardContent>
          <ScrollArea className="h-96 w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  {columnMapping.map(({ columnName }) => (
                    <TableHead key={columnName}>
                      <span className="whitespace-pre">{columnName}</span>
                    </TableHead>
                  ))}
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    {columnMapping.map(({ columnName, fieldName }) => (
                      <TableCell key={columnName}>
                        {item[fieldName]}
                      </TableCell>
                    ))}
                    <TableCell>{renderActions(item)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="border-gray-300 hover:border-gray-400 focus:border-gray-400"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-500">
                Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
              </span>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= filteredData.length}
                variant="outline"
                className="border-gray-300 hover:border-gray-400 focus:border-gray-400"
              >
                Next
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded-md py-1 px-2 text-sm"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default ReusableTable;















































































// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";

// function ReusableTable({
//   columns,
//   data,
//   title,
//   searchPlaceholder,
//   onAdd,
//   onEdit,
//   onDelete,
//   itemsPerPageOptions,
//   showAddButton,
//   showSearchInput,
//   additionalButtons,
// }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredData = data.filter((item) =>
//     columns.some((column) =>
//       item[column.toLowerCase()]
//         .toString()
//         .includes(searchQuery.toString().toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderActions = (item) => (
//     <div className="flex gap-2">
//       {onEdit && (
//         <Button variant="ghost" onClick={() => onEdit(item)}>
//           Edit
//         </Button>
//       )}
//       {onDelete && (
//         <Button variant="ghost" onClick={() => onDelete(item)}>
//           Delete
//         </Button>
//       )}
//     </div>
//   );

//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//       <Card className="w-full">
//         {showSearchInput && (
//           <CardHeader className="flex flex-wrap justify-between pb-4">
//             <CardTitle>{title}</CardTitle>
//             {showAddButton && (
//               <div className="flex gap-2">
//                 {additionalButtons}
//                 <Button className="ml-auto" size="sm" onClick={onAdd}>
//                   Add New
//                 </Button>
//               </div>
//             )}
//             <Input
//               placeholder={searchPlaceholder}
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="ml-auto w-1/2"
//             />
//           </CardHeader>
//         )}
//         <CardContent>
//           <ScrollArea className="h-96 w-full">
//             <Table className="w-full">
//               <TableHeader>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableHead key={column}>{column}</TableHead>
//                   ))}
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginatedData.map((item) => (
//                   <TableRow key={item.id}>
//                     {columns.map((column) => (
//                       <TableCell key={column}>
//                         {item[column.toLowerCase()]}
//                       </TableCell>
//                     ))}
//                     <TableCell>{renderActions(item)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </ScrollArea>
//           <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
//             <div className="flex items-center gap-2">
//               <Button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 variant="outline"
//                 className="border-gray-300 hover:border-gray-400 focus:border-gray-400"
//               >
//                 Previous
//               </Button>
//               <span className="text-sm text-gray-500">
//                 Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
//               </span>
//               <Button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage * itemsPerPage >= filteredData.length}
//                 variant="outline"
//                 className="border-gray-300 hover:border-gray-400 focus:border-gray-400"
//               >
//                 Next
//               </Button>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-500">Items per page:</span>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
//                 className="border border-gray-300 focus:border-gray-400 focus:ring-0 rounded-md py-1 px-2 text-sm"
//               >
//                 {itemsPerPageOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }

// export default ReusableTable;





// {/* <ReusableTable
//   columns={columns}
//   data={data}
//   searchPlaceholder="Search..."
//   onAdd={handleAdd}
//   onEdit={handleEdit}
//   onDelete={handleDelete}
//   itemsPerPageOptions={[10, 25, 50, 100]}
//   showAddButton={true}
//   showSearchInput={true}
//   additionalButtons={[
//     <Button key="import-btn" variant="ghost">
//       Import
//     </Button>,
//     <Button key="export-btn" variant="ghost">
//       Export
//     </Button>,
//   ]}
// /> */}

