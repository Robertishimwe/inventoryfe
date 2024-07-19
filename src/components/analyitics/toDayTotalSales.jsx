import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import api from "../../utils/api";

function ToDayTotalSales() {

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let startDate = today.toISOString().split('T')[0];
  let endDate = tomorrow.toISOString().split('T')[0];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["ToDayTotalSales"],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard/getSalesByDate?startDate=${startDate}&endDate=${endDate}`);
      return response?.data?.sales;
    },
  });

  return (
    <CardContent>
      <div className="text-2xl font-bold">{data? data: "No data to show"} RFW</div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Daily Sales Total</p>
    </CardContent>
  );
}

export default ToDayTotalSales;

