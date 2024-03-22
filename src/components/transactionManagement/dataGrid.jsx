'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { StrictMode, useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { useAtom } from 'jotai';
import { transactionAtom } from "../../utils/atoms";
import api from "../../utils/api";

const gridDiv = document.querySelector('#myGrid');

const GridExample = () => {
  const [transactions, setTransactions] = useAtom(transactionAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/transaction/getAll");
        const transformedData = transformData(response.data.transactions);
        setTransactions(transformedData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error);
      }
    };

    fetchData();
  }, [setTransactions]);

  function transformData(data) {
    return data.map(item => ({
      ID: item.id,
      Product: item.product?.product_name,
      Price: item.product?.price,
      Quantity: item.quantity_sold,
      Transaction_Type: item.transaction_type,
      Done_By: `${item.user?.firstName} ${item.user?.lastName}`,
      Transaction_Time: `${new Date(item.transaction_date ).toLocaleString()}`
    }));
  }

  const columnDefs = useMemo(() => [
    { field: 'ID', checkboxSelection: true, editable: true },
    { field: 'Product' },
    { field: 'Price', filter: 'agNumberColumnFilter' },
    { field: 'Quantity', filter: 'agNumberColumnFilter' },
    { field: 'Transaction_Type' },
    { field: 'Done_By' },
    { field: 'Transaction_Time' },
  ], []);

  const defaultColDef = useMemo(() => ({
    filter: 'agTextColumnFilter',
    floatingFilter: true,
  }), []);

  if (isLoading) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6" style={{ height: "90vh" }}>
      <AgGridReact
        rowData={transactions}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100, 200, 500, 1000]}
      />
    </div>
  );
};

export default GridExample;
