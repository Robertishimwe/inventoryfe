import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../../utils/api";
import { categoriesAtom, suppliersAtom, unitsAtom } from "../../utils/atoms";

export default function TopUpInventory() {
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
          <CardTitle>Top Up Stock</CardTitle>
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
              {isLoading ? "Adding..." : "Top up Inventory"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
