import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../utils/api"; // Adjust this import path as needed
import { useReactToPrint } from 'react-to-print';

function SalesReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(true);
  const reportRef = useRef();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['salesReport', startDate, endDate],
    queryFn: async () => {
      const response = await api.get(`/api/report/sales?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    },
    enabled: false,
  });

  const handleFetchReport = () => {
    if (startDate && endDate) {
      refetch();
      setShowDatePicker(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  const salesData = data?.data?.salesDetails || [];
  const totalSalesAmount = data?.data?.totalSalesAmount || 0;

  const calculateProfit = () => {
    return salesData.reduce((total, item) => {
      const profit = (parseFloat(item.price) - parseFloat(item.sellingPrice)) * parseInt(item.quantity);
      return total + profit;
    }, 0);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {showDatePicker ? (
        <div className="mb-8 flex justify-center items-center gap-4">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
          <span>TO</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
          <Button onClick={handleFetchReport}>Generate Report</Button>
        </div>
      ) : (
        <div className="mb-8 text-right print:hidden">
          <Button onClick={() => setShowDatePicker(true)}>Change Dates</Button>
          <Button onClick={handlePrint} className="ml-4">Print Report</Button>
        </div>
      )}
      
      {(isLoading || isError || data) && (
        <Card className="border shadow-lg print:shadow-none">
          <CardContent className="p-6" ref={reportRef}>
            <h1 className="text-3xl font-bold text-center mb-2">Inventory Management System - Sales Report</h1>
            <p className="text-center mb-6 text-gray-600">
              {startDate} TILL DATE {endDate}
            </p>
            {isLoading && <div className="text-center">Loading...</div>}
            {isError && <div className="text-center text-red-500">Error: {error.message}</div>}
            {data && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold">Product Title</TableHead>
                    <TableHead className="font-bold text-right">Buying Price</TableHead>
                    <TableHead className="font-bold text-right">Selling Price</TableHead>
                    <TableHead className="font-bold text-right">Total Qty</TableHead>
                    <TableHead className="font-bold text-right">TOTAL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-right">{parseFloat(item.sellingPrice).toFixed(2)}</TableCell>
                      <TableCell className="text-right">{parseFloat(item.price).toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="border-t-2 border-black">
                    <TableCell colSpan={5} className="text-right font-bold">GRAND TOTAL</TableCell>
                    <TableCell className="text-right font-bold">$ {totalSalesAmount.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} className="text-right font-bold">PROFIT</TableCell>
                    <TableCell className="text-right font-bold">$ {calculateProfit().toFixed(2)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SalesReport;













































// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import api from "../../utils/api"; // Adjust this import path as needed

// function SalesReport() {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(true);

//   const { isLoading, isError, data, error, refetch } = useQuery({
//     queryKey: ['salesReport', startDate, endDate],
//     queryFn: async () => {
//       const response = await api.get(`/api/report/sales?startDate=${startDate}&endDate=${endDate}`);
//       return response.data;
//     },
//     enabled: false,
//   });

//   const handleFetchReport = () => {
//     if (startDate && endDate) {
//       refetch();
//       setShowDatePicker(false);
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const salesData = data?.data?.salesDetails || [];
//   const totalSalesAmount = data?.data?.totalSalesAmount || 0;

//   const calculateProfit = () => {
//     return salesData.reduce((total, item) => {
//       const profit = (parseFloat(item.price) - parseFloat(item.sellingPrice)) * parseInt(item.quantity);
//       return total + profit;
//     }, 0);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg print:shadow-none">
//       {showDatePicker ? (
//         <div className="mb-8 flex justify-center items-center gap-4">
//           <Input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="w-40"
//           />
//           <span>TO</span>
//           <Input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-40"
//           />
//           <Button onClick={handleFetchReport}>Generate Report</Button>
//         </div>
//       ) : (
//         <div className="mb-8 text-right print:hidden">
//           <Button onClick={() => setShowDatePicker(true)}>Change Dates</Button>
//           <Button onClick={handlePrint} className="ml-4">Print Report</Button>
//         </div>
//       )}
      
//       {(isLoading || isError || data) && (
//         <Card className="border-none shadow-none">
//           <CardContent className="p-0">
//             <h1 className="text-2xl font-bold text-center mb-2">Inventory Management System - Sales Report</h1>
//             <p className="text-center mb-6 text-gray-600">
//               {startDate} TILL DATE {endDate}
//             </p>
//             {isLoading && <div className="text-center">Loading...</div>}
//             {isError && <div className="text-center text-red-500">Error: {error.message}</div>}
//             {data && (
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gray-100">
//                     <TableHead className="font-bold">Date</TableHead>
//                     <TableHead className="font-bold">Product Title</TableHead>
//                     <TableHead className="font-bold text-right">Buying Price</TableHead>
//                     <TableHead className="font-bold text-right">Selling Price</TableHead>
//                     <TableHead className="font-bold text-right">Total Qty</TableHead>
//                     <TableHead className="font-bold text-right">TOTAL</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {salesData.map((item) => (
//                     <TableRow key={item.id}>
//                       <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
//                       <TableCell>{item.productName}</TableCell>
//                       <TableCell className="text-right">{parseFloat(item.sellingPrice).toFixed(2)}</TableCell>
//                       <TableCell className="text-right">{parseFloat(item.price).toFixed(2)}</TableCell>
//                       <TableCell className="text-right">{item.quantity}</TableCell>
//                       <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//                 <TableFooter>
//                   <TableRow className="border-t-2 border-black">
//                     <TableCell colSpan={5} className="text-right font-bold">GRAND TOTAL</TableCell>
//                     <TableCell className="text-right font-bold">$ {totalSalesAmount.toFixed(2)}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell colSpan={5} className="text-right font-bold">PROFIT</TableCell>
//                     <TableCell className="text-right font-bold">$ {calculateProfit().toFixed(2)}</TableCell>
//                   </TableRow>
//                 </TableFooter>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

// export default SalesReport;





















































// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import api from "../../utils/api"; // Adjust this import path as needed

// function SalesReport() {
//   const [startDate, setStartDate] = useState(getFormattedDate(new Date()));
//   const [endDate, setEndDate] = useState(getFormattedDate(new Date()));

//   const { isLoading, isError, data, error, refetch } = useQuery({
//     queryKey: ['salesReport', startDate, endDate],
//     queryFn: async () => {
//       const response = await api.get(`/api/report/sales?startDate=${startDate}&endDate=${endDate}`);
//       return response.data;
//     },
//     enabled: false,
//   });

//   const handleFetchReport = () => {
//     refetch();
//   };

//   const salesData = data?.data?.salesDetails || [];
//   const totalSalesAmount = data?.data?.totalSalesAmount || 0;

//   const calculateProfit = () => {
//     return salesData.reduce((total, item) => {
//       const profit = (parseFloat(item.price) - parseFloat(item.sellingPrice)) * parseInt(item.quantity);
//       return total + profit;
//     }, 0);
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">Inventory Management System - Sales Report</CardTitle>
//         <div className="flex justify-center items-center gap-4 mt-4">
//           <Input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="w-40"
//           />
//           <span>TO</span>
//           <Input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-40"
//           />
//           <Button onClick={handleFetchReport}>Generate Report</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {isLoading && <div className="text-center">Loading...</div>}
//         {isError && <div className="text-center text-red-500">Error: {error.message}</div>}
//         {data && (
//           <>
//             <div className="text-center mb-4">
//               {startDate} TILL DATE {endDate}
//             </div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Product Title</TableHead>
//                   <TableHead className="text-right">Buying Price</TableHead>
//                   <TableHead className="text-right">Selling Price</TableHead>
//                   <TableHead className="text-right">Total Qty</TableHead>
//                   <TableHead className="text-right">TOTAL</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {salesData.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
//                     <TableCell>{item.productName}</TableCell>
//                     <TableCell className="text-right">{parseFloat(item.sellingPrice).toFixed(2)}</TableCell>
//                     <TableCell className="text-right">{parseFloat(item.price).toFixed(2)}</TableCell>
//                     <TableCell className="text-right">{item.quantity}</TableCell>
//                     <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//               <TableFooter>
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-right font-bold">GRAND TOTAL</TableCell>
//                   <TableCell className="text-right font-bold">$ {totalSalesAmount.toFixed(2)}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-right font-bold">PROFIT</TableCell>
//                   <TableCell className="text-right font-bold">$ {calculateProfit().toFixed(2)}</TableCell>
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// function getFormattedDate(date) {
//   return date.toISOString().split('T')[0];
// }

// export default SalesReport;













































// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import api from "../../utils/api"; // Adjust this import path as needed

// function SalesReport() {
//   const [startDate, setStartDate] = useState(getFormattedDate(new Date()));
//   const [endDate, setEndDate] = useState(getFormattedDate(new Date()));

//   const { isLoading, isError, data, error, refetch } = useQuery({
//     queryKey: ['salesReport', startDate, endDate],
//     queryFn: async () => {
//       const response = await api.get(`/api/report/sales?startDate=${startDate}&endDate=${endDate}`);
//       return response.data;
//     },
//     enabled: false, // This prevents the query from running automatically
//   });

//   const handleFetchReport = () => {
//     refetch();
//   };

//   const salesData = data?.data?.salesDetails || [];
//   const totalSalesAmount = data?.data?.totalSalesAmount || 0;

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl text-center">Inventory Management System - Sales Report</CardTitle>
//         <div className="flex justify-between items-center mt-4">
//           <Input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="w-1/3"
//           />
//           <Input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-1/3"
//           />
//           <Button onClick={handleFetchReport}>Fetch Report</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {isLoading && <div>Loading...</div>}
//         {isError && <div>Error: {error.message}</div>}
//         {data && (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Product Name</TableHead>
//                 <TableHead className="text-right">Quantity</TableHead>
//                 <TableHead className="text-right">Buying Price</TableHead>
//                 <TableHead className="text-right">Selling Price</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//                 <TableHead>Sold By</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {salesData.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
//                   <TableCell>{item.productName}</TableCell>
//                   <TableCell className="text-right">{item.quantity}</TableCell>
//                   <TableCell className="text-right">{parseFloat(item.sellingPrice).toFixed(2)}</TableCell>
//                   <TableCell className="text-right">{parseFloat(item.price).toFixed(2)}</TableCell>
//                   <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
//                   <TableCell>{item.soldBy}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//             <tfoot>
//               <TableRow className="font-medium">
//                 <TableCell colSpan={5}>TOTAL SALES AMOUNT</TableCell>
//                 <TableCell className="text-right" colSpan={2}>RWF {totalSalesAmount.toFixed(2)}</TableCell>
//               </TableRow>
//             </tfoot>
//           </Table>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // Helper function to get today's date in YYYY-MM-DD format
// function getFormattedDate(date) {
//   return date.toISOString().split('T')[0];
// }

// export default SalesReport;



























// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import api from "../../utils/api"; // Adjust this import path as needed

// function SalesReport({ startDate, endDate }) {
//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ['salesReport', startDate, endDate],
//     queryFn: async () => {
//       const response = await api.get(`/api/report/sales?startDate=${startDate}&endDate=${endDate}`);
//       return response.data;
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   const salesData = data?.data?.salesDetails || [];
//   const totalSalesAmount = data?.data?.totalSalesAmount || 0;

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl text-center">Inventory Management System - Sales Report</CardTitle>
//         <p className="text-center text-sm text-muted-foreground">
//           {startDate} TILL DATE {endDate}
//         </p>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Date</TableHead>
//               <TableHead>Product Name</TableHead>
//               <TableHead className="text-right">Quantity</TableHead>
//               <TableHead className="text-right">Buying Price</TableHead>
//               <TableHead className="text-right">Selling Price</TableHead>
//               <TableHead className="text-right">Amount</TableHead>
//               <TableHead>Sold By</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {salesData.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
//                 <TableCell>{item.productName}</TableCell>
//                 <TableCell className="text-right">{item.quantity}</TableCell>
//                 <TableCell className="text-right">{parseFloat(item.sellingPrice).toFixed(2)}</TableCell>
//                 <TableCell className="text-right">{parseFloat(item.price).toFixed(2)}</TableCell>
//                 <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
//                 <TableCell>{item.soldBy}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <tfoot>
//             <TableRow className="font-medium">
//               <TableCell colSpan={5}>TOTAL SALES AMOUNT</TableCell>
//               <TableCell className="text-right" colSpan={2}>RWF {totalSalesAmount.toFixed(2)}</TableCell>
//             </TableRow>
//           </tfoot>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// export default SalesReport;





















// // import React from 'react';
// // import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // function SalesReport({ startDate, endDate, salesData, grandTotal, profit }) {
// //   return (
// //     <Card className="w-full max-w-4xl mx-auto">
// //       <CardHeader>
// //         <CardTitle className="text-2xl text-center">Inventory Management System - Sales Report</CardTitle>
// //         <p className="text-center text-sm text-muted-foreground">
// //           {startDate} TILL DATE {endDate}
// //         </p>
// //       </CardHeader>
// //       <CardContent>
// //         <Table>
// //           <TableHeader>
// //             <TableRow>
// //               <TableHead>Date</TableHead>
// //               <TableHead>Product Title</TableHead>
// //               <TableHead className="text-right">Buying Price</TableHead>
// //               <TableHead className="text-right">Selling Price</TableHead>
// //               <TableHead className="text-right">Total Qty</TableHead>
// //               <TableHead className="text-right">TOTAL</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {salesData.map((item, index) => (
// //               <TableRow key={index}>
// //                 <TableCell>{item.date}</TableCell>
// //                 <TableCell>{item.productTitle}</TableCell>
// //                 <TableCell className="text-right">{item.buyingPrice.toFixed(2)}</TableCell>
// //                 <TableCell className="text-right">{item.sellingPrice.toFixed(2)}</TableCell>
// //                 <TableCell className="text-right">{item.totalQty}</TableCell>
// //                 <TableCell className="text-right">{item.total.toFixed(2)}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //           <TableFooter>
// //             <TableRow className="font-medium">
// //               <TableCell colSpan={5}>GRAND TOTAL</TableCell>
// //               <TableCell className="text-right">$ {grandTotal.toFixed(2)}</TableCell>
// //             </TableRow>
// //             <TableRow className="font-medium">
// //               <TableCell colSpan={5}>PROFIT</TableCell>
// //               <TableCell className="text-right">$ {profit.toFixed(2)}</TableCell>
// //             </TableRow>
// //           </TableFooter>
// //         </Table>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // export default SalesReport;