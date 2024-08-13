// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import api from "../../utils/api";

// export default function NewUnit() {
//   const [unitName, setUnitName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { mutate: addUnit } = useMutation({
//     mutationFn: async () => {
//       const response = await api.post("/api/units/create", {
//         unit_name: unitName
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       toast.success("Unit added successfully");
//       setUnitName("");
//       setIsLoading(false);
//     },
//     onError: (error) => {
//       toast.error(`${error?.response?.data?.error}`, {
//         duration: 9000,
//         position: 'top-center'});
//         setIsLoading(false);
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     addUnit();
//   };

//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//       <Card>
//         <CardHeader className="pb-4">
//           <CardTitle>Add New Unit</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <label className="flex flex-col">
//               <span className="text-sm font-medium">Unit Name</span>
//               <input
//                 className="input"
//                 value={unitName}
//                 onChange={(e) => setUnitName(e.target.value)}
//                 placeholder="Enter unit name"
//                 type="text"
//                 required
//               />
//             </label><br></br>
//             <Button className="col-span-1" size="sm" type="submit" disabled={isLoading}>
//               {isLoading ? "Adding..." : "Add Unit"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }


import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../../utils/api";

export default function NewUnit({ onClose, onUnitAdded }) {
  const [unitName, setUnitName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: addUnit } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/units/create", {
        unit_name: unitName
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Unit added successfully");
      setUnitName("");
      setIsLoading(false);
      // Invalidate the 'units' query
      queryClient.invalidateQueries(['units']);
      // Notify parent component that a new unit was added
      onUnitAdded(data.unit);
      // Close the popup
      onClose();
    },
    onError: (error) => {
      toast.error(`${error?.response?.data?.error}`, {
        duration: 9000,
        position: 'top-center'
      });
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    addUnit();
  };

  return (
    <Card className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <CardHeader className="pb-4">
          <CardTitle>Add New Unit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Unit Name</span>
              <input
                className="input mt-1 w-full"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Enter unit name"
                type="text"
                required
              />
            </label>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Unit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}