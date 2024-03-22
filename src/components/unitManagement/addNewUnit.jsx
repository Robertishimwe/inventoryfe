// import React, { useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useAtom } from "jotai";
// import toast from "react-hot-toast";
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import api from "../../utils/api";
// import { categoriesAtom } from "../../utils/atoms";
// import { suppliersAtom } from "../../utils/atoms";
// import { unitsAtom } from "../../utils/atoms";

// export default function NewProduct() {
//   const [categories, setCategories] = useAtom(categoriesAtom);
//   const [suppliers, setSuppliers] = useAtom(suppliersAtom);
//   const [units, setUnits] = useAtom(unitsAtom);

//   const [productName, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [supplierId, setSupplierId] = useState("");
//   const [unitId, setUnitId] = useState("");
//   const [price, setPrice] = useState("");

//   const { isLoading: categoriesLoading, data: categoriesData } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await api.get("/api/category/getAll");
//       return response?.data?.categories;
//     },
//     onSuccess: (data) => {
//       setCategories(data);
//     },
//   });

//   const { isLoading: suppliersLoading, data: suppliersData } = useQuery({
//     queryKey: ["suppliers"],
//     queryFn: async () => {
//       const response = await api.get("/api/Supplier/getAll");
//       return response?.data?.suppliers;
//     },
//     onSuccess: (data) => {
//       setSuppliers(data);
//     },
//   });

//   const { isLoading: unitsLoading, data: unitsData } = useQuery({
//     queryKey: ["units"],
//     queryFn: async () => {
//       const response = await api.get("/api/units/getAll");
//       return response?.data?.units;
//     },
//     onSuccess: (data) => {
//       setUnits(data);
//     },
//   });

//   if (categoriesData) {
//     setCategories(categoriesData);
//   }

//   if (suppliersData) {
//     setSuppliers(suppliersData);
//   }

//   if (unitsData) {
//     setUnits(unitsData);
//   }

//   const { mutate: addProduct } = useMutation({
//     mutationFn: async () => {
//       const response = await api.post("/api/product/create", {
//         product_name: productName,
//         description: description,
//         category: categoryId,
//         supplier_id: supplierId,
//         unit_id: unitId,
//         price: price,
//       });
//       return response.data;
//     },
//     onSuccess: (data) => {
//       console.log("Product added successfully:", data);
//     },
//     onError: (error) => {
//       console.error("Error adding product:", error);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addProduct();
//   };

//   if (categoriesLoading || suppliersLoading || unitsLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//       <Card>
//         <CardHeader className="pb-4">
//           <CardTitle>Add New Product</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 gap-4 md:grid-cols-2"
//           >
//             <label className="flex flex-col">
//               <span className="text-sm font-medium">Product Name</span>
//               <input
//                 className="input"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 placeholder="Enter product name"
//                 type="text"
//               />
//             </label>
//             <label className="flex flex-col">
//               <span className="text-sm font-medium">Description</span>
//               <textarea
//                 className="input"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter product description"
//               />
//             </label>
//             <div className="flex flex-col">
//               <span className="text-sm font-medium">Category</span>
//               <select
//                 className="input"
//                 value={categoryId}
//                 onChange={(e) => setCategoryId(e.target.value)}
//               >
//                 <option>Select Category</option>
//                 {categories?.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-medium">Supplier</span>
//               <select
//                 className="input"
//                 value={supplierId}
//                 onChange={(e) => setSupplierId(e.target.value)}
//               >
//                 <option>Select Supplier</option>
//                 {suppliers?.map((supplier) => (
//                   <option key={supplier.id} value={supplier.id}>
//                     {supplier.supplierName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-medium">Unit</span>
//               <select
//                 className="input"
//                 value={unitId}
//                 onChange={(e) => setUnitId(e.target.value)}
//               >
//                 <option>Select Unit</option>
//                 {units?.map((unit) => (
//                   <option key={unit.id} value={unit.id}>
//                     {unit.unit_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <label className="flex flex-col">
//               <span className="text-sm font-medium">Price(frw)</span>
//               <input
//                 className="input"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="Enter price"
//                 type="text"
//               />
//             </label>
//             <Button className="col-span-2" size="sm" type="submit">
//               Add Product
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }







import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../../utils/api";
import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";

export default function NewProduct() {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [suppliers, setSuppliers] = useAtom(suppliersAtom);
  const [units, setUnits] = useAtom(unitsAtom);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isLoading: dataLoading } = useQuery({
    queryKey: "data",
    queryFn: async () => {
      const [categoriesRes, suppliersRes, unitsRes] = await Promise.all([
        api.get("/api/category/getAll"),
        api.get("/api/Supplier/getAll"),
        api.get("/api/units/getAll")
      ]);
      setCategories(categoriesRes.data.categories);
      setSuppliers(suppliersRes.data.suppliers);
      setUnits(unitsRes.data.units);
      // Return some value to ensure it's not undefined
      return { categories: categoriesRes.data.categories, suppliers: suppliersRes.data.suppliers, units: unitsRes.data.units };
    }
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    addProduct();
  };

  if (dataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Product Name</span>
              <input
                className="input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                type="text"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Description</span>
              <textarea
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </label>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Category</span>
              <select
                className="input"
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
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Supplier</span>
              <select
                className="input"
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
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Unit</span>
              <select
                className="input"
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
            </div>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Price(frw)</span>
              <input
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                type="text"
              />
            </label>
            <Button className="col-span-2" size="sm" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
