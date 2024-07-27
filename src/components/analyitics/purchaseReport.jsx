import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../utils/api"; // Adjust this import path as needed
import { useReactToPrint } from 'react-to-print';

function PurchasesReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(true);
  const reportRef = useRef();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['purchasesReport', startDate, endDate],
    queryFn: async () => {
      const response = await api.get(`/api/report/purchases?startDate=${startDate}&endDate=${endDate}`);
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

  const purchasesData = data?.data?.purchaseDetails || [];
  const totalPurchaseAmount = data?.data?.totalPurchaseAmount || 0;

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
        <div className="mb-8 overflow-x-auto text-right print:hidden">
          <Button onClick={() => setShowDatePicker(true)}>Change Dates</Button>
          <Button onClick={handlePrint} className="ml-4">Print Report</Button>
        </div>
      )}
      
      {(isLoading || isError || data) && (
        <Card className="w-full min-h-full border shadow-lg print:shadow-none">
          <CardContent className="h-full p-4" ref={reportRef}>
            <h1 className="text-3xl font-bold text-center mb-2">Inventory Management System - Purchases Report</h1>
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
                    <TableHead className="font-bold">Product Name</TableHead>
                    <TableHead className="font-bold text-right">Price</TableHead>
                    <TableHead className="font-bold text-right">Quantity</TableHead>
                    <TableHead className="font-bold text-right">Amount</TableHead>
                    <TableHead className="font-bold">Supplier Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchasesData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-right">{parseFloat(item.price).toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
                      <TableCell>{item.supplierName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="border-t-2 border-black">
                    <TableCell colSpan={4} className="text-right font-bold">GRAND TOTAL</TableCell>
                    <TableCell className="text-right font-bold">{totalPurchaseAmount.toFixed(2)} Rfw</TableCell>
                    <TableCell></TableCell>
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

export default PurchasesReport;
