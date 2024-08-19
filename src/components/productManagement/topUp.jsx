'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from 'jotai';
import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";
import api from "../../utils/api";
import QrCodeGenerator from "../QrCodeGenerator";
import toast from 'react-hot-toast';

function TopUpPopUp({ setIsTopUpPopupOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [suppliers, setSuppliers] = useAtom(suppliersAtom);
  const [units, setUnits] = useAtom(unitsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const { mutate: addProduct } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/product/create", {
        product_name: productName,
        description: description,
        category: categoryId,
        supplier_id: supplierId,
        unit_id: unitId,
        price: price,
      });
      setIsTopUpPopupOpen(false);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      setProductName("");
      setDescription("");
      setCategoryId("");
      setSupplierId("");
      setUnitId("");
      setPrice("");
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(`${error?.response?.data?.error}`, {
        duration: 9000,
        position: 'top-center'});
        setIsLoading(false);
    },
  });
  
  const handleTopUpFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    addProduct();    
  };

  const { isLoading: dataLoading, data } = useQuery({
    queryKey: "data",
    queryFn: async () => {
      const [categoriesRes, suppliersRes, unitsRes] = await Promise.all([
        api.get("/api/category/getAll"),
        api.get("/api/Supplier/getAll"),
        api.get("/api/units/getAll")
      ]);
      return { categories: categoriesRes.data.categories, suppliers: suppliersRes.data.suppliers, units: unitsRes.data.units };
    },
    staleTime: Infinity, // Data is considered fresh forever
    cacheTime: Infinity, // Data is kept in the cache forever
    onSuccess: (data) => {
      setCategories(data.categories);
      setSuppliers(data.suppliers);
      setUnits(data.units);
    }
  });

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      setSuppliers(data.suppliers);
      setUnits(data.units);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg z-50 relative w-1/3">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleTopUpFormSubmit}>
          {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
          <div className="mb-4">
            <label htmlFor="product" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Product Name</span>
            </label>
            <input
                className="input w-full"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                type="text"
                required
              />
            <label htmlFor="Description" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Description</span>
            </label>
            <textarea
              className="input w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
            />
            <label htmlFor="Category" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Category</span>
            </label>
            <select
              className="input w-full"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="Supplier" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Supplier</span>
            </label>
            <select
              className="input w-full"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
            >
              <option>Select Supplier</option>
              {suppliers?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>
            <label htmlFor="Unit" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Unit</span>
            </label>
            <select
              className="input w-full"
              value={unitId}
              onChange={(e) => setUnitId(e.target.value)}
            >
              <option>Select Unit</option>
              {units?.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.unit_name}
                </option>
              ))}
            </select>
            {/* <label htmlFor="Price(frw)" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Price(frw)</span>
            </label>
            <input
              className="input w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              type="text"
            /> */}
          </div>         

          <QrCodeGenerator/>

          {/* Add form submit and cancel buttons */}
          <div className="flex justify-center">
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
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsTopUpPopupOpen(false)}
      ></div>
    </div>
  );
}

export default TopUpPopUp;





























// 'use strict';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import React, { useMemo, useRef, useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// function TopUpPopUp({ setIsTopUpPopupOpen, selectedInventory }) {

//     const [suppliers, setSuppliers] = useAtom(suppliersAtom);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isError, setIsError] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedSupplier, setSelectedSupplier] = useState(null);

//     const productRef = useRef(null);
//     const quantityRef = useRef(null);
//     const buyingPriceRef = useRef(null);
//     const sellingPriceRef = useRef(null);

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await api.get("/api/Supplier/getAll");
//           setSuppliers(response.data.suppliers);
//           setIsLoading(false);
//         } catch (error) {
//           setIsError(true);
//           setError(error);
//         }
//       };

//       fetchData();
//     }, []);

//     const handleTopUpFormSubmit = async (event) => {
//       event.preventDefault();

//       const product = selectedInventory.ID;
//       const quantity = quantityRef.current.value;
//       const buyingPrice = buyingPriceRef.current.value;
//       const sellingPrice = sellingPriceRef.current.value;

//       console.log("Product:", product);
//       console.log("Quantity:", quantity);
//       console.log("Buying Price:", buyingPrice);
//       console.log("Selling Price:", sellingPrice);
//       console.log("Supplier:", selectedSupplier);

//       // Your form submission logic here, e.g., making an API request to update the stock

//       setIsTopUpPopupOpen(false);
//     };

//     if (isLoading) {
//       return (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       );
//     }

//     if (isError) {
//       return <p>Error: {error.message}</p>;
//     }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg z-50 relative">
//         <h2 className="text-lg font-semibold mb-4">Top Up Stock</h2>
//         <form onSubmit={handleTopUpFormSubmit}>
//           {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
//           <div className="mb-4">
//             <label htmlFor="product" className="block mb-2 font-medium">
//               Product
//             </label>
//             <input
//               type="text"
//               id="product"
//               ref={productRef}
//               value={selectedInventory?.Product}
//               className="border border-gray-300 p-2 w-full rounded"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="supplier" className="block mb-2 font-medium">
//               Supplier
//             </label>
//             <select
//               id="supplier"
//               value={selectedSupplier}
//               onChange={(e) => setSelectedSupplier(e.target.value)}
//               className="border border-gray-300 p-2 w-full rounded"
//             >
//               <option value="">Select a supplier</option>
//               {suppliers.map(supplier => (
//                 <option key={supplier.id} value={supplier.id}>
//                   {supplier.supplierName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="quantity" className="block mb-2 font-medium">
//               Quantity
//             </label>
//             <input
//               type="number"
//               min={0}
//               id="quantity"
//               ref={quantityRef}
//               className="border border-gray-300 p-2 w-full rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="buyingPrice" className="block mb-2 font-medium">
//               Buying Price
//             </label>
//             <div className="flex items-center border border-gray-300 p-2 w-full rounded">
//               <input
//                 type="number"
//                 min={0}
//                 step={0.01}
//                 id="buyingPrice"
//                 ref={buyingPriceRef}
//                 className="w-full appearance-none outline-none"
//               />
//               <span className="ml-2">RWF</span>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="sellingPrice" className="block mb-2 font-medium">
//               Selling Price
//             </label>
//             <div className="flex items-center border border-gray-300 p-2 w-full rounded">
//               <input
//                 type="number"
//                 min={0}
//                 step={0.01}
//                 id="sellingPrice"
//                 ref={sellingPriceRef}
//                 className="w-full appearance-none outline-none"
//               />
//               <span className="ml-2">RWF</span>
//             </div>
//           </div>

//           {/* Add form submit and cancel buttons */}
//           <div className="flex justify-end">
//             <button
//               type="button"
//               className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
//               onClick={() => setIsTopUpPopupOpen(false)}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//       <div
//         className="fixed inset-0 bg-black opacity-50"
//         onClick={() => setIsTopUpPopupOpen(false)}
//       ></div>
//     </div>
//   );
// }

// export default TopUpPopUp;
