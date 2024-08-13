'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from 'jotai';
import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";
import api from "../../utils/api";
import toast from 'react-hot-toast';

function DeletePopUp({ category, setIsDeletePopupOpen }) {
  const [suppliers, setSuppliers] = useAtom(suppliersAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const queryClient = useQueryClient();

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

  const { mutate: deleteCategory } = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/api/category/${category.id}/softDelete`, {
        name: categoryName,
      });
      setIsDeletePopupOpen(false);
      console.log(response.data)
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries(['categories']);
      setCategoryName("");
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error)
      toast.error(`${error?.response?.data?.error}`, {
        duration: 9000,
        position: 'top-center'});
        setIsLoading(false);
    },
  });
  
  const handleDeleteFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    deleteCategory();    
  };

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
        <h2 className="text-lg font-semibold mb-4 text-center">Delete Category</h2>
        <form onSubmit={handleDeleteFormSubmit}>
          {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
          <div className="mb-4">
            <label htmlFor="product" className="block mb-2 font-medium">
              <span className="text-sm font-medium flex justify-center">Are you sure you want to delete this?</span>
            </label>
            {/* <input
                className="input w-full"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category name"
                type="text"
                required
              />             */}
          </div>         

          {/* Add form submit and cancel buttons */}
          <div className="flex justify-center">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setIsDeletePopupOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsDeletePopupOpen(false)}
      ></div>
    </div>
  );
}

export default DeletePopUp;





























// 'use strict';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import React, { useMemo, useRef, useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// function DeletePopUp({ setIsDeletePopupOpen, selectedInventory }) {

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

//     const handleDeleteFormSubmit = async (event) => {
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

//       setIsDeletePopupOpen(false);
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
//         <form onSubmit={handleDeleteFormSubmit}>
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
//               onClick={() => setIsDeletePopupOpen(false)}
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
//         onClick={() => setIsDeletePopupOpen(false)}
//       ></div>
//     </div>
//   );
// }

// export default DeletePopUp;
