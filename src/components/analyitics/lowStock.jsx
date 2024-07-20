import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import api from "../../utils/api";

function ThisMonthProfite() {
  let today = new Date();
  let firstDayOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  let startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  let endDate = firstDayOfNextMonth.toISOString().split("T")[0];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["ThisMonthProfite"],
    queryFn: async () => {
      const response = await api.get(
        `/api/report/inventory-status?startDate=${startDate}&endDate=${endDate}`
      );
      return response?.data?.data;
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Poduct Name</TableHead>
          <TableHead>Minimum Stock</TableHead>
          <TableHead>Available stock</TableHead>
          <TableHead>Units</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">ORD001</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>2023-06-01</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">ORD002</TableCell>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>2023-06-02</TableCell>
          <TableCell>Shipped</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">ORD003</TableCell>
          <TableCell>Bob Smith</TableCell>
          <TableCell>2023-06-03</TableCell>
          <TableCell>Delivered</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">ORD004</TableCell>
          <TableCell>Emma Brown</TableCell>
          <TableCell>2023-06-04</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">ORD005</TableCell>
          <TableCell>Michael Lee</TableCell>
          <TableCell>2023-06-05</TableCell>
          <TableCell>Shipped</TableCell>
          <TableCell className="text-right">$550.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}


export default ThisMonthProfite;
