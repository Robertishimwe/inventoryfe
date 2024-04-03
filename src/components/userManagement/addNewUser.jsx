import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "../../utils/api";

export default function NewUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: addUser } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/auth/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        role: role,
        password: password
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("User added successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setRole("");
      setPassword("");
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
    addUser();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-sm font-medium">First Name</span>
              <input
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                type="text"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Last Name</span>
              <input
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                type="text"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Email</span>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                type="email"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Phone</span>
              <input
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone"
                type="text"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Role</span>
              <select
                className="input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select role</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Password</span>
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                type="password"
                required
              />
            </label>
            <Button className="col-span-2" size="sm" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
