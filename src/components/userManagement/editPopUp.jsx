'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useMutation,useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from 'jotai';
import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";
import api from "../../utils/api";
import toast from 'react-hot-toast';

function EditPopUp({ user, setIsEditPopupOpen }) {
  const [suppliers, setUsers] = useAtom(suppliersAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(`0${user.phone}`);
  const [role, setRole] = useState(user.role);
  // const [password, setPassword] = useState("");
  const [fetchedUser, setFetchedUser] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(false);
        // console.log('**-/*-**'+user.id);
        const response = await api.get(`/api/user/${user.id}`);
        setFetchedUser(response.data)        
        return response?.data;
      } catch (error) {
        setIsError(true);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const validateContact = (value) => {
    // Regular expression to match phone number format: 0787885197
    const phoneRegex = /^(078|079|072|073)\d{7}$/;
    // Regular expression to match email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Check if the value matches either phone number or email format
    return phoneRegex.test(value) || emailRegex.test(value);
  };

  const { mutate: editUser } = useMutation({
    mutationFn: async () => {
      const response = await api.patch(`/api/User/${user.id}/update`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        role: role
        // password: password
      });
      setIsEditPopupOpen(false);
      console.log(response.data)
      return response.data;
    },
    onSuccess: () => {
      toast.success("User edited successfully");
      queryClient.invalidateQueries(['users']);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setRole("");
      // setPassword("");
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
  
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    editUser();    
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


  /// to be deleted
  // console.log("+++++",fetchedUser)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg z-50 relative w-1/3">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleEditFormSubmit}>
          {/* Add your form fields here, e.g., a select for choosing the product and an input for the quantity */}
          <div className="mb-4">
          <label htmlFor="First Name" className="block mb-2 font-medium">
              <span className="text-sm font-medium">First Name</span>
            </label>
            <input
              className="input w-full"
              // defaultValue={fetchedUser.firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              type="text"
              required
            />
            <label htmlFor="Last Name" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Last Name</span>
            </label>
            <input
              className="input w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              type="text"
              required
            />
            <label htmlFor="Email" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Email</span>
            </label>
            <input
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
              required
            />
            {email && !validateContact(email) && (
              <span className="text-xs text-red-500">Invalid contact format. Please enter a valid email.</span>
            )}
            <label htmlFor="Phone" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Phone</span>
            </label>
            <input
                className="input w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone"
                type="text"
                required
              />
               {phone && !validateContact(phone) && (
                  <span className="text-xs text-red-500">Invalid contact format. Please enter a valid phone number.</span>
                )}
            <label htmlFor="Role" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Role</span>
            </label>
            <select
                className="input w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
            {/* <label htmlFor="Password" className="block mb-2 font-medium">
              <span className="text-sm font-medium">Password</span>
            </label>
            <input
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                type="password"
                required
              />                        */}
          </div>         

          {/* Add form submit and cancel buttons */}
          <div className="flex justify-center">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setIsEditPopupOpen(false)}
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
        onClick={() => setIsEditPopupOpen(false)}
      ></div>
    </div>
  );
}

export default EditPopUp;





























// 'use strict';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import React, { useMemo, useRef, useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";
// import api from "../../utils/api";

// function EditPopUp({ setIsEditPopupOpen, selectedInventory }) {

//     const [suppliers, setUsers] = useAtom(suppliersAtom);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isError, setIsError] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedUser, setSelectedUser] = useState(null);

//     const productRef = useRef(null);
//     const quantityRef = useRef(null);
//     const buyingPriceRef = useRef(null);
//     const sellingPriceRef = useRef(null);

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await api.get("/api/User/getAll");
//           setUsers(response.data.suppliers);
//           setIsLoading(false);
//         } catch (error) {
//           setIsError(true);
//           setError(error);
//         }
//       };

//       fetchData();
//     }, []);

//     const handleEditFormSubmit = async (event) => {
//       event.preventDefault();

//       const product = selectedInventory.ID;
//       const quantity = quantityRef.current.value;
//       const buyingPrice = buyingPriceRef.current.value;
//       const sellingPrice = sellingPriceRef.current.value;

//       console.log("Product:", product);
//       console.log("Quantity:", quantity);
//       console.log("Buying Price:", buyingPrice);
//       console.log("Selling Price:", sellingPrice);
//       console.log("User:", selectedUser);

//       // Your form submission logic here, e.g., making an API request to update the stock

//       setIsEditPopupOpen(false);
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
//         <form onSubmit={handleEditFormSubmit}>
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
//               User
//             </label>
//             <select
//               id="supplier"
//               value={selectedUser}
//               onChange={(e) => setSelectedUser(e.target.value)}
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
//               onClick={() => setIsEditPopupOpen(false)}
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
//         onClick={() => setIsEditPopupOpen(false)}
//       ></div>
//     </div>
//   );
// }

// export default EditPopUp;
