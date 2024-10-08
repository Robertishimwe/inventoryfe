import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../../utils/api";

export default function NewUnit() {
  const [unitName, setUnitName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: addUnit } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/units/create", {
        unit_name: unitName
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Unit added successfully");
      setUnitName("");
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
    addUnit();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Add New Unit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Unit Name</span>
              <input
                className="input"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Enter unit name"
                type="text"
                required
              />
            </label><br></br>
            <Button className="col-span-1" size="sm" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Unit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
