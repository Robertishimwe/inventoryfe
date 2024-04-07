'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import api from "../../utils/api";
import { transactionAtom, loggedinUserAtom } from "../../utils/atoms";

const GridExample = () => {
  const [transactions, setTransactions] = useAtom(transactionAtom);
  const loggedinUser = useAtomValue(loggedinUserAtom);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['transactions', loggedinUser],
    queryFn: async () => {
      let dataFetchUrl;
      if(loggedinUser?.user?.role !== "admin" && loggedinUser?.user?.role !== "manager"){
        dataFetchUrl = "/api/transaction/getAllForCurrentUser";
      } else {
        dataFetchUrl = "/api/transaction/getAll";
      }
      const response = await api.get(dataFetchUrl);
      // console.log(response);
      return transformData(response.data.transactions);
    }
  });

  useEffect(() => {
    if(!isLoading && !isError && data) {
      setTransactions(data);
    }
  }, [isLoading, isError, data, setTransactions]);

  function transformData(data) {
    return data.map(item => ({
      ID: item.id,
      Product: item.product?.product_name,
      Price: parseFloat(item.product?.price),
      Quantity: parseInt(item.quantity_sold),
      Transaction_Type: item.transaction_type,
      Done_By: `${item.user?.firstName} ${item.user?.lastName}`,
      Transaction_Time: `${new Date(item.transaction_date).toLocaleString()}`
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

  if(transactions.length === 0){
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">You have not sold anything yet</p>;
  }

  if(isError){
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
