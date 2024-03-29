// import React from "react";
// import {
//   CardDescription,
//   CardTitle,
//   CardHeader,
//   CardContent,
//   Card,
// } from "@/components/ui/card";

// import { useMutation, useQuery } from "@tanstack/react-query";
// import { ResponsiveBar } from "@nivo/bar";
// import api from "../../utils/api";

// function MostSellingProduct() {
//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await api.get("/api/dashboard/mostSellingProduct");
//       return response?.data?.mostSellingProduct;
//     },
//   });

//   if(data) console.log(data)

//   return (
//     <Card>
//       <CardHeader>
//         <CardDescription>Most Selling Product</CardDescription>
//         <CardTitle>Best 4</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <BarChart className="aspect-[2/1]" />
//       </CardContent>
//     </Card>
//   );
// }

// function BarChart(props) {
//   return (
//     <div {...props}>
//       <ResponsiveBar
//         data={[
//           { name: "Jan", count: 111 },
//           { name: "Feb", count: 157 },
//           { name: "Mar", count: 129 },
//           { name: "Apr", count: 150 },
//           { name: "May", count: 119 },
//           { name: "Jun", count: 72 },
//         ]}
//         keys={["count"]}
//         indexBy="name"
//         margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
//         padding={0.3}
//         colors={["#2563eb"]}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 4,
//           tickPadding: 16,
//         }}
//         gridYValues={4}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         tooltipLabel={({ id }) => `${id}`}
//         enableLabel={false}
//         role="application"
//         ariaLabel="A bar chart showing data"
//       />
//     </div>
//   );
// }

// export default MostSellingProduct;


















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
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function MostSellingProduct() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/api/dashboard/mostSellingProduct");
      return response?.data?.mostSellingProduct;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription>Most Selling Product</CardDescription>
        <CardTitle>Best 4</CardTitle>
      </CardHeader>
      <CardContent>
        {data && <BarChart data={data} className="aspect-[2/1]" />}
      </CardContent>
    </Card>
  );
}


// function BarChart({ data }) {
//   // Format the data
//   const formattedData = data.map((item) => ({
//     name: toCamelCase(item.product.product_name),
//     count: Math.abs(item.total_sold * -1), // Using Math.abs to make sure the count is positive
//   }));


//   console.log(formattedData);

//   return (
//     <div>
//       <ResponsiveBar
//         data={formattedData}
//         keys={["count"]}
//         indexBy="name"
//         margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
//         padding={0.3}
//         colors={["#2563eb"]}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 4,
//           tickPadding: 16,
//         }}
//         gridYValues={4}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         tooltipLabel={({ id }) => `${id}`}
//         enableLabel={false}
//         role="application"
//         ariaLabel="A bar chart showing data"
//       />
//     </div>
//   );
// }

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

