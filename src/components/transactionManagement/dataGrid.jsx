'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const gridDiv = document.querySelector('#myGrid');

 const GridExample = () => {
  const [rowData, setRowData] = useState([
    {
      make: 'Tesla',
      model: 'Model Y',
      price: 64950,
      electric: true,
      month: 'June',
    },
    {
      make: 'Ford',
      model: 'F-Series',
      price: 33850,
      electric: false,
      month: 'October',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: false,
      month: 'August',
    },
    {
      make: 'Mercedes',
      model: 'EQA',
      price: 48890,
      electric: true,
      month: 'February',
    },
    {
      make: 'Fiat',
      model: '500',
      price: 15774,
      electric: false,
      month: 'January',
    },
    {
      make: 'Nissan',
      model: 'Juke',
      price: 20675,
      electric: false,
      month: 'March',
    },
    {
      make: 'Vauxhall',
      model: 'Corsa',
      price: 18460,
      electric: false,
      month: 'July',
    },
    {
      make: 'Volvo',
      model: 'EX30',
      price: 33795,
      electric: true,
      month: 'September',
    },
    {
      make: 'Mercedes',
      model: 'Maybach',
      price: 175720,
      electric: false,
      month: 'December',
    },
    {
      make: 'Vauxhall',
      model: 'Astra',
      price: 25795,
      electric: false,
      month: 'April',
    },
    {
      make: 'Fiat',
      model: 'Panda',
      price: 13724,
      electric: false,
      month: 'November',
    },
    {
      make: 'Jaguar',
      model: 'I-PACE',
      price: 69425,
      electric: true,
      month: 'May',
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'ID',
      checkboxSelection: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [
          'Tesla',
          'Ford'
        ],
      },
    },
    { field: 'Product' },
    { field: 'Price', filter: 'agNumberColumnFilter' },
    { field: 'Quantity', filter: 'agNumberColumnFilter' },
    { field: 'Transaction Type' },
    { field: 'Done By' },
    { field: 'Transaction Time' },
    // {
    //   field: 'Transaction Type',
    //   comparator: (valueA, valueB) => {
    //     const months = [
    //       'January',
    //       'February',
    //       'March',
    //       'April',
    //       'May',
    //       'June',
    //       'July',
    //       'August',
    //       'September',
    //       'October',
    //       'November',
    //       'December',
    //     ];
    //     const idxA = months.indexOf(valueA);
    //     const idxB = months.indexOf(valueB);
    //     return idxA - idxB;
    //   },
    // },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);
 
  return (
    <div className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6" style={{ height: "90vh" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100,200, 500, 1000]}
      />
    </div>
  );
};

export default GridExample
// const root = createRoot(document.getElementById('root'));
// root.render(
//   <StrictMode>
//     <GridExample />
//   </StrictMode>
// );