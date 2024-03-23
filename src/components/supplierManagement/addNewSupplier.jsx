import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../../utils/api";

export default function NewSupplier() {
  const [supplierName, setSupplierName] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateContact = (value) => {
    // Regular expression to match phone number format: 0787885197
    const phoneRegex = /^(078|079|072|073)\d{7}$/;
    // Regular expression to match email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Check if the value matches either phone number or email format
    return phoneRegex.test(value) || emailRegex.test(value);
  };

  const { mutate: addSupplier } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/Supplier/create", {
        supplierName: supplierName,
        contact: contact
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Supplier added successfully");
      setSupplierName("");
      setContact("");
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
    addSupplier();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Add New Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Supplier Name</span>
              <input
                className="input"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Enter supplier name"
                type="text"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Contact</span>
              <input
                className="input"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter contact number or email"
                type="text"
                required
              />
              {contact && !validateContact(contact) && (
                <span className="text-xs text-red-500">Invalid contact format. Please enter a valid phone number or email.</span>
              )}
            </label>
            <Button className="col-span-2" size="sm" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Supplier"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
