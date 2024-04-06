'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { StrictMode, useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { useAtom } from 'jotai';
import { inventoryAtom } from "../../utils/atoms";
import api from "../../utils/api";

const gridDiv = document.querySelector('#myGrid');

const GridExample = () => {
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/stock/getAllStock");
        const transformedData = transformData(response.data.stock);
        setInventory(transformedData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error);
      }
    };

    fetchData();
  }, [setInventory]);

  function transformData(data) {
    return data.map(item => ({
      ID: item.id,
      Product: item.product?.product_name,
      Category: item.product?.productCategory?.name,
      Stock: parseInt(item.quantity),
      Buying_Price: parseFloat(item.product?.buying_price),
      Selling_Price: parseFloat(item.product?.selling_price),
      Unit: item.product?.unit?.unit_name,
      Reorder_Stock_Level: parseInt(item.minimumStockLevel),
      Stock_In_Cash: parseInt(item.quantity) * parseFloat(item.product?.price),
      Last_Re_Stock_Date: `${new Date(item.lastRestockDate).toLocaleString()}`
    }));
  }
   

  const columnDefs = useMemo(() => [
    { field: 'ID', checkboxSelection: true, editable: true },
    { field: 'Product' },
    { field: 'Category' },
    { field: 'Stock', filter: 'agNumberColumnFilter' },
    { field: 'Buying_Price', filter: 'agNumberColumnFilter' },
    { field: 'Selling_Price', filter: 'agNumberColumnFilter' },
    { field: 'Unit' },
    { field: 'Reorder_Stock_Level', filter: 'agNumberColumnFilter' },
    { field: 'Stock_In_Cash', filter: 'agNumberColumnFilter' },
    { field: 'Last_Re_Stock_Date', filter: 'agDateColumnFilter' }
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
        rowData={inventory}
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
