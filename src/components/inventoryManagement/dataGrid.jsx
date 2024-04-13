'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"
import { useAtom } from 'jotai';
import { inventoryAtom } from "../../utils/atoms";
import api from "../../utils/api";

const GridExample = () => {
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const productRef = useRef(null);
  const quantityRef = useRef(null);

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

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/dashboard/inventory/addNew");
  };

  const handleTopUpClick = (inventoryItem) => {
    setSelectedInventory(inventoryItem);
    setIsTopUpPopupOpen(true);
  };

  const handleTopUpFormSubmit = async (event) => {
    event.preventDefault();

    const product = productRef.current.value;
    const quantity = quantityRef.current.value;

    console.log("Product:", product);
    console.log("Quantity:", quantity);

    // Your form submission logic here, e.g., making an API request to update the stock

    setIsTopUpPopupOpen(false);
  };

  const transformData = useMemo(() => {
    return (data) => data.map(item => ({
      ID: item.id,
      Product: item.product?.product_name,
      Category: item.product?.productCategory?.name,
      Stock: parseInt(item.quantity),
      Buying_Price: parseFloat(item?.buying_price),
      Selling_Price: parseFloat(item?.selling_price),
      Unit: item.product?.unit?.unit_name,
      Reorder_Stock_Level: parseInt(item.minimumStockLevel),
      Stock_In_Cash: parseInt(item.quantity) * parseFloat(item?.buying_price),
      Last_Re_Stock_Date: `${new Date(item.lastRestockDate).getDate()}/${(new Date(item.lastRestockDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.lastRestockDate).getFullYear()}`
    }));
  }, []);

  const columnDefs = useMemo(() => [
    { field: 'ID', checkboxSelection: false, editable: true },
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
    <div className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6" style={{ height: "89vh" }}>
      <div className="flex gap-2 pb-4">
        <Button className="ml-auto" size="sm" onClick={handleAdd}>
          Add New
        </Button>
        <Button className="ml-2" size="sm" onClick={handleTopUpClick} disabled={selectedInventory === null}>
          Top Up
        </Button>
      </div>
      <AgGridReact
        rowData={inventory}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="single"
        suppressRowClickSelection={false}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100, 200, 500, 1000]}
        onCellClicked={(params) => handleTopUpClick(params.data)}
      />
      {isTopUpPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg z-50 relative">
            <h2 className="text-lg font-semibold mb-4">Top Up Stock</h2>
            <form onSubmit={handleTopUpFormSubmit}>
              {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
              <div className="mb-4">
                <label htmlFor="product" className="block mb-2 font-medium">
                  Product
                </label>
                <input type="text" id="product" ref={productRef} value={selectedInventory?.Product} className="border border-gray-300 p-2 w-full rounded" readOnly />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block mb-2 font-medium">
                  Quantity
                </label>
                <input type="number" id="quantity" ref={quantityRef} className="border border-gray-300 p-2 w-full rounded" />
              </div>

              {/* Add form submit and cancel buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => setIsTopUpPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsTopUpPopupOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default GridExample;































// 'use strict';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import { AgGridReact } from 'ag-grid-react';
// import React, { StrictMode, useMemo, useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { createRoot } from 'react-dom/client';
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { inventoryAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// const GridExample = () => {
//   const [inventory, setInventory] = useAtom(inventoryAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
//   const [selectedInventory, setSelectedInventory] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/api/stock/getAllStock");
//         const transformedData = transformData(response.data.stock);
//         setInventory(transformedData);
//         setIsLoading(false);
//       } catch (error) {
//         setIsError(true);
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [setInventory]);

//   const navigate = useNavigate();

//   const handleAdd = () => {
//     navigate("/dashboard/inventory/addNew");
//   };

//   const handleTopUpClick = (inventoryItem) => {
//     setSelectedInventory(inventoryItem);
//     setIsTopUpPopupOpen(true);
//   };

//   const handleTopUpFormSubmit = async (event) => {
//     event.preventDefault();
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",selectedInventory)
// console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", event)
//     // Your form submission logic here, e.g., making an API request to update the stock

//     setIsTopUpPopupOpen(false);
//   };

//   function transformData(data) {
//     return data.map(item => ({
//       ID: item.id,
//       Product: item.product?.product_name,
//       Category: item.product?.productCategory?.name,
//       Stock: parseInt(item.quantity),
//       Buying_Price: parseFloat(item?.buying_price),
//       Selling_Price: parseFloat(item?.selling_price),
//       Unit: item.product?.unit?.unit_name,
//       Reorder_Stock_Level: parseInt(item.minimumStockLevel),
//       Stock_In_Cash: parseInt(item.quantity) * parseFloat(item?.buying_price),
//       Last_Re_Stock_Date: `${new Date(item.lastRestockDate).getDate()}/${(new Date(item.lastRestockDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.lastRestockDate).getFullYear()}`
//     }));
//   }

//   const columnDefs = useMemo(() => [
//     { field: 'ID', checkboxSelection: false, editable: true },
//     { field: 'Product' },
//     { field: 'Category' },
//     { field: 'Stock', filter: 'agNumberColumnFilter' },
//     { field: 'Buying_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Selling_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Unit' },
//     { field: 'Reorder_Stock_Level', filter: 'agNumberColumnFilter' },
//     { field: 'Stock_In_Cash', filter: 'agNumberColumnFilter' },
//     { field: 'Last_Re_Stock_Date', filter: 'agDateColumnFilter' }
//   ], []);

//   const defaultColDef = useMemo(() => ({
//     filter: 'agTextColumnFilter',
//     floatingFilter: true,
//   }), []);

//   if (isLoading) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6" style={{ height: "89vh" }}>
//       <div className="flex gap-2 pb-4">
//         <Button className="ml-auto" size="sm" onClick={handleAdd}>
//           Add New
//         </Button>
//         <Button className="ml-2" size="sm" onClick={handleTopUpClick} disabled={selectedInventory === null}>
//           Top Up
//         </Button>
//       </div>
//       <AgGridReact
//         rowData={inventory}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         rowSelection="single"
//         suppressRowClickSelection={false}
//         pagination={true}
//         paginationPageSize={10}
//         paginationPageSizeSelector={[10, 20, 50, 100, 200, 500, 1000]}
//         onCellClicked={(params) => handleTopUpClick(params.data)}
//       />
//       {isTopUpPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg z-50 relative">
//             <h2 className="text-lg font-semibold mb-4">Top Up Stock</h2>
//             <form onSubmit={handleTopUpFormSubmit}>
//               {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
//               <div className="mb-4">
//                 <label htmlFor="product" className="block mb-2 font-medium">
//                   Product
//                 </label>
//                 <input type="text" id="product" value={selectedInventory?.Product} className="border border-gray-300 p-2 w-full rounded" readOnly />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="quantity" className="block mb-2 font-medium">
//                   Quantity
//                 </label>
//                 <input type="number" id="quantity" className="border border-gray-300 p-2 w-full rounded" />
//               </div>

//               {/* Add form submit and cancel buttons */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
//                   onClick={() => setIsTopUpPopupOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div
//             className="fixed inset-0 bg-black opacity-50"
//             onClick={() => setIsTopUpPopupOpen(false)}
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GridExample;








































// 'use strict';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import { AgGridReact } from 'ag-grid-react';
// import React, { StrictMode, useMemo, useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { createRoot } from 'react-dom/client';
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { inventoryAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// const GridExample = () => {
//   const [inventory, setInventory] = useAtom(inventoryAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
//   const [selectedInventoryId, setSelectedInventoryId] = useState(null);
//   const [selectedInventory, setSelectedInventory] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/api/stock/getAllStock");
//         const transformedData = transformData(response.data.stock);
//         setInventory(transformedData);
//         setIsLoading(false);
//       } catch (error) {
//         setIsError(true);
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [setInventory]);

//   const navigate = useNavigate();

//   const handleAdd = () => {
//     navigate("/dashboard/inventory/addNew");
//   };

//   const handleTopUpClick = (id, inventoryItem) => {
//     setSelectedInventoryId(id);
//     setSelectedInventory(inventoryItem);
//     setIsTopUpPopupOpen(true);
//   };

//   const handleTopUpFormSubmit = async (event) => {
//     event.preventDefault();

//     // Your form submission logic here, e.g., making an API request to update the stock

//     setIsTopUpPopupOpen(false);
//   };

//   function transformData(data) {
//     return data.map(item => ({
//       ID: item.id,
//       Product: item.product?.product_name,
//       Category: item.product?.productCategory?.name,
//       Stock: parseInt(item.quantity),
//       Buying_Price: parseFloat(item?.buying_price),
//       Selling_Price: parseFloat(item?.selling_price),
//       Unit: item.product?.unit?.unit_name,
//       Reorder_Stock_Level: parseInt(item.minimumStockLevel),
//       Stock_In_Cash: parseInt(item.quantity) * parseFloat(item?.buying_price),
//       Last_Re_Stock_Date: `${new Date(item.lastRestockDate).getDate()}/${(new Date(item.lastRestockDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.lastRestockDate).getFullYear()}`
//     }));
//   }

//   const columnDefs = useMemo(() => [
//     { field: 'ID', checkboxSelection: false, editable: true },
//     { field: 'Product' },
//     { field: 'Category' },
//     { field: 'Stock', filter: 'agNumberColumnFilter' },
//     { field: 'Buying_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Selling_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Unit' },
//     { field: 'Reorder_Stock_Level', filter: 'agNumberColumnFilter' },
//     { field: 'Stock_In_Cash', filter: 'agNumberColumnFilter' },
//     { field: 'Last_Re_Stock_Date', filter: 'agDateColumnFilter' }
//   ], []);

//   const defaultColDef = useMemo(() => ({
//     filter: 'agTextColumnFilter',
//     floatingFilter: true,
//   }), []);

//   if (isLoading) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6" style={{ height: "89vh" }}>
//       <div className="flex gap-2 pb-4">
//         <Button className="ml-auto" size="sm" onClick={handleAdd}>
//           Add New
//         </Button>
//         <Button className="ml-2" size="sm" onClick={() => handleTopUpClick(selectedInventoryId, selectedInventory)} disabled={selectedInventoryId === null}>
//           Top Up
//         </Button>
//       </div>
//       <AgGridReact
//         rowData={inventory}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         rowSelection="single"
//         suppressRowClickSelection={false}
//         pagination={true}
//         paginationPageSize={10}
//         paginationPageSizeSelector={[10, 20, 50, 100, 200, 500, 1000]}
//         onRowSelected={(params) => handleTopUpClick(params.data.ID, params.data)}
//       />
//       {isTopUpPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg z-50 relative">
//             <h2 className="text-lg font-semibold mb-4">Top Up Stock</h2>
//             <form onSubmit={handleTopUpFormSubmit}>
//               {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
//               <div className="mb-4">
//                 <label htmlFor="product" className="block mb-2 font-medium">
//                   Product
//                 </label>
//                 <input type="text" id="product" value={selectedInventory?.Product} className="border border-gray-300 p-2 w-full rounded" readOnly />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="quantity" className="block mb-2 font-medium">
//                   Quantity
//                 </label>
//                 <input type="number" id="quantity" className="border border-gray-300 p-2 w-full rounded" />
//               </div>

//               {/* Add form submit and cancel buttons */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
//                   onClick={() => setIsTopUpPopupOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div
//             className="fixed inset-0 bg-black opacity-50"
//             onClick={() => setIsTopUpPopupOpen(false)}
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GridExample;


















































// 'use strict';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import { AgGridReact } from 'ag-grid-react';
// import React, { StrictMode, useMemo, useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { createRoot } from 'react-dom/client';
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { inventoryAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// const GridExample = () => {
//   const [inventory, setInventory] = useAtom(inventoryAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
//   const [selectedInventoryId, setSelectedInventoryId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/api/stock/getAllStock");
//         const transformedData = transformData(response.data.stock);
//         setInventory(transformedData);
//         setIsLoading(false);
//       } catch (error) {
//         setIsError(true);
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [setInventory]);

//   const navigate = useNavigate();

//   const handleAdd = () => {
//     navigate("/dashboard/inventory/addNew");
//   };

//   const handleTopUpClick = (id) => {
//     setSelectedInventoryId(id);
//     setIsTopUpPopupOpen(true);
//   };

//   const handleTopUpFormSubmit = async (event) => {
//     event.preventDefault();

//     // Your form submission logic here, e.g., making an API request to update the stock

//     setIsTopUpPopupOpen(false);
//   };

//   function transformData(data) {
//     return data.map(item => ({
//       ID: item.id,
//       Product: item.product?.product_name,
//       Category: item.product?.productCategory?.name,
//       Stock: parseInt(item.quantity),
//       Buying_Price: parseFloat(item?.buying_price),
//       Selling_Price: parseFloat(item?.selling_price),
//       Unit: item.product?.unit?.unit_name,
//       Reorder_Stock_Level: parseInt(item.minimumStockLevel),
//       Stock_In_Cash: parseInt(item.quantity) * parseFloat(item?.buying_price),
//       Last_Re_Stock_Date: `${new Date(item.lastRestockDate).getDate()}/${(new Date(item.lastRestockDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.lastRestockDate).getFullYear()}`
//     }));
//   }

//   const columnDefs = useMemo(() => [
//     { field: 'ID', checkboxSelection: true, editable: true },
//     { field: 'Product' },
//     { field: 'Category' },
//     { field: 'Stock', filter: 'agNumberColumnFilter' },
//     { field: 'Buying_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Selling_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Unit' },
//     { field: 'Reorder_Stock_Level', filter: 'agNumberColumnFilter' },
//     { field: 'Stock_In_Cash', filter: 'agNumberColumnFilter' },
//     { field: 'Last_Re_Stock_Date', filter: 'agDateColumnFilter' }
//   ], []);

//   const defaultColDef = useMemo(() => ({
//     filter: 'agTextColumnFilter',
//     floatingFilter: true,
//   }), []);

//   if (isLoading) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6" style={{ height: "89vh" }}>
//       <div className="flex gap-2 pb-4">
//         <Button className="ml-auto" size="sm" onClick={handleAdd}>
//           Add New
//         </Button>
//         <Button className="ml-2" size="sm" onClick={() => handleTopUpClick(selectedInventoryId)}>
//           Top Up
//         </Button>
//       </div>
//       <AgGridReact
//         rowData={inventory}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         rowSelection="multiple"
//         suppressRowClickSelection={true}
//         pagination={true}
//         paginationPageSize={10}
//         paginationPageSizeSelector={[10, 20, 50, 100, 200, 500, 1000]}
//         onCellClicked={(params) => handleTopUpClick(params.data.ID)}
//       />
//       {isTopUpPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Top Up Stock</h2>
//             <form onSubmit={handleTopUpFormSubmit}>
//               {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
//               <div className="mb-4">
//                 <label htmlFor="product" className="block mb-2 font-medium">
//                   Product
//                 </label>
//                 <select id="product" className="border border-gray-300 p-2 w-full rounded">
//                   {/* Populate the options with your products */}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="quantity" className="block mb-2 font-medium">
//                   Quantity
//                 </label>
//                 <input type="number" id="quantity" className="border border-gray-300 p-2 w-full rounded" />
//               </div>

//               {/* Add form submit and cancel buttons */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
//                   onClick={() => setIsTopUpPopupOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div
//             className="fixed inset-0 bg-black opacity-50"
//             onClick={() => setIsTopUpPopupOpen(false)}
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GridExample;









































// 'use strict';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import { AgGridReact } from 'ag-grid-react';
// import React, { StrictMode, useMemo, useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { createRoot } from 'react-dom/client';
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom"

// import { useAtom } from 'jotai';
// import { inventoryAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// const gridDiv = document.querySelector('#myGrid');

// const GridExample = () => {
//   const [inventory, setInventory] = useAtom(inventoryAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/api/stock/getAllStock");
//         const transformedData = transformData(response.data.stock);
//         setInventory(transformedData);
//         setIsLoading(false);
//       } catch (error) {
//         setIsError(true);
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [setInventory]);
//   const navigate = useNavigate();

//   const handleAdd = () => {
//     navigate("/dashboard/inventory/addNew");
// };
  
//   function transformData(data) {
//     return data.map(item => ({
//       ID: item.id,
//       Product: item.product?.product_name,
//       Category: item.product?.productCategory?.name,
//       Stock: parseInt(item.quantity),
//       Buying_Price: parseFloat(item?.buying_price),
//       Selling_Price: parseFloat(item?.selling_price),
//       Unit: item.product?.unit?.unit_name,
//       Reorder_Stock_Level: parseInt(item.minimumStockLevel),
//       Stock_In_Cash: parseInt(item.quantity) * parseFloat(item?.buying_price),
//       Last_Re_Stock_Date: `${new Date(item.lastRestockDate).getDate()}/${(new Date(item.lastRestockDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.lastRestockDate).getFullYear()}`
//     }));
//   }
  
//   const columnDefs = useMemo(() => [
//     { field: 'ID', checkboxSelection: true, editable: true },
//     { field: 'Product' },
//     { field: 'Category' },
//     { field: 'Stock', filter: 'agNumberColumnFilter' },
//     { field: 'Buying_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Selling_Price', filter: 'agNumberColumnFilter' },
//     { field: 'Unit' },
//     { field: 'Reorder_Stock_Level', filter: 'agNumberColumnFilter' },
//     { field: 'Stock_In_Cash', filter: 'agNumberColumnFilter' },
//     { field: 'Last_Re_Stock_Date', filter: 'agDateColumnFilter' }
//   ], []);

//   const defaultColDef = useMemo(() => ({
//     filter: 'agTextColumnFilter',
//     floatingFilter: true,
//   }), []);

//   if (isLoading) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6" style={{ height: "89vh" }}>      
//               <div className="flex gap-2 pb-4">                
//                 <Button className="ml-auto" size="sm" onClick={handleAdd}>                
//                   Add New
//                 </Button>
//               </div>
//       <AgGridReact
//         rowData={inventory}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         rowSelection="multiple"
//         suppressRowClickSelection={true}
//         pagination={true}
//         paginationPageSize={10}
//         paginationPageSizeSelector={[10, 20, 50, 100, 200, 500, 1000]}
//       />
//     </div>
//   );
// };

// export default GridExample;
