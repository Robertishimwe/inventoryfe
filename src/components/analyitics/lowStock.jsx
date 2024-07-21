import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import api from "../../utils/api";

function LowStock() {
  // Set date range from June 2024 to January 2050
  const startDate = "2024-06-01";
  const endDate = "2050-01-31";

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["lowStock", startDate, endDate],
    queryFn: async () => {
      const response = await api.get(
        `/api/report/inventory-status?startDate=${startDate}&endDate=${endDate}`
      );
      // Filter for 'Low Stock' items
      return response?.data?.data.filter(item => item.status === 'Low Stock');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No low stock items found</div>;
  }

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Low Stock Report</CardTitle> */}
        {/* <CardDescription>
          Current low stock items
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Minimum Stock</TableHead>
              <TableHead>Available Stock</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Selling Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{item.productName}</TableCell>
                <TableCell>{item.minimumStockLevel}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default LowStock;






































// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   CardDescription,
//   CardTitle,
//   CardHeader,
//   CardContent,
//   Card,
// } from "@/components/ui/card";
// import {
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableCell,
//   TableBody,
//   Table,
// } from "@/components/ui/table";
// import api from "../../utils/api";

// function LowStock() {
//   let today = new Date();
//   let firstDayOfNextMonth = new Date(
//     today.getFullYear(),
//     today.getMonth() + 1,
//     1
//   );
//   let startDate = new Date(today.getFullYear(), today.getMonth(), 1)
//     .toISOString()
//     .split("T")[0];
//   let endDate = firstDayOfNextMonth.toISOString().split("T")[0];

//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ["lowStock", startDate, endDate],
//     queryFn: async () => {
//       const response = await api.get(
//         `/api/report/inventory-status?startDate=${startDate}&endDate=${endDate}`
//       );
//       return response?.data?.data;
//     },
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Low Stock Report</CardTitle>
//         <CardDescription>
//           Inventory status from {startDate} to {endDate}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Product Name</TableHead>
//               <TableHead>Minimum Stock</TableHead>
//               <TableHead>Available Stock</TableHead>
//               <TableHead>Units</TableHead>
//               <TableHead>Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell className="font-semibold">{item.productName}</TableCell>
//                 <TableCell>{item.minimumStockLevel}</TableCell>
//                 <TableCell>{item.currentStock}</TableCell>
//                 <TableCell>{item.unit}</TableCell>
//                 <TableCell>{item.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// export default LowStock;



















// import React from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import {
//   CardDescription,
//   CardTitle,
//   CardHeader,
//   CardContent,
//   Card,
// } from "@/components/ui/card";
// import {
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableCell,
//   TableBody,
//   Table,
// } from "@/components/ui/table";
// import api from "../../utils/api";

// function LowStock() {
//   let today = new Date();
//   let firstDayOfNextMonth = new Date(
//     today.getFullYear(),
//     today.getMonth() + 1,
//     1
//   );

//   let startDate = new Date(today.getFullYear(), today.getMonth(), 1)
//     .toISOString()
//     .split("T")[0];
//   let endDate = firstDayOfNextMonth.toISOString().split("T")[0];

//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ["lowStock"],
//     queryFn: async () => {
//       const response = await api.get(
//         `/api/report/inventory-status?startDate=${startDate}&endDate=${endDate}`
//       );
//       console.log(response?.data?.data)
//       return response?.data?.data;
//     },
//   });

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Poduct Name</TableHead>
//           <TableHead>Minimum Stock</TableHead>
//           <TableHead>Available stock</TableHead>
//           <TableHead>Units</TableHead>
//           <TableHead className="text-right">Price</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         <TableRow>
//           <TableCell className="font-semibold">ORD001</TableCell>
//           <TableCell>John Doe</TableCell>
//           <TableCell>2023-06-01</TableCell>
//           <TableCell>Pending</TableCell>
//           <TableCell className="text-right">$250.00</TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );
// }

// export default LowStock;
