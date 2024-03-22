import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../../utils/api";

export default function NewCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: addCategory } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/category/add", {
        name: categoryName
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      setCategoryName("");
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
    addCategory();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Category Name</span>
              <input
                className="input"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                type="text"
                required
              />
            </label>
            <Button className="col-span-2" size="sm" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
