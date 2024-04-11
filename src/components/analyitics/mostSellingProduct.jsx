

import React from "react";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ResponsiveBar } from "@nivo/bar";
import api from "../../utils/api";


function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function MostSellingProduct() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["mostSellingProduct"],
    queryFn: async () => {
      const response = await api.get("/api/dashboard/mostSellingProduct");
      return response?.data?.mostSellingProduct;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription>Most Selling Product</CardDescription>
        {/* <CardTitle>Top: {data[0].total_sold * -1}</CardTitle> */}
        <CardTitle>
          Top: <span style={{ fontSize: '14px' }}>{data && data[0] ? data[0].product?.product_name : 'No data to show'}</span>
        </CardTitle>

      </CardHeader>
      <CardContent>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        {data && <BarChart data={data} className="aspect-[2/1]" />}
      </CardContent>
    </Card>
  );
}

function BarChart(props) {
  const { data } = props;

  // Format the data
  const formattedData = data.map((item) => ({
    name: toCamelCase(item.product.product_name),
    count: Math.abs(item.total_sold * -1), // Using Math.abs to make sure the count is positive
  }));
  return (
    <div {...props}>
      <ResponsiveBar
        data={formattedData}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

export default MostSellingProduct;

