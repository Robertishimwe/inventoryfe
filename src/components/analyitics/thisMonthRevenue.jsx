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
  let firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  // let startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
  let startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1)).toISOString().split("T")[0];
  let endDate = new Date(firstDayOfNextMonth.getTime() - 1).toISOString().split("T")[0];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["ThisMonthProfite"],
    queryFn: async () => {
      const response = await api.get(
        `/api/report/estimated-profit?startDate=${startDate}&endDate=${endDate}`
      );
      return response?.data?.data?.estimatedProfit;
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Estimated - Profite</CardTitle>
        <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data ? data : "0"} RFW
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Taxes are not dudacted
        </p>
      </CardContent>
    </Card>
  );
}


function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

export default ThisMonthProfite;
