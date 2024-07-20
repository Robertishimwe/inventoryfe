import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
// import background from "../../img/green.jpg";

import MostSellingProduct from "./mostSellingProduct";
import ToDayTotalSales from "./toDayTotalSales";
import ThisMonthProfite from "./thisMonthRevenue";
import ThisMonthTotalSales from "./thisMonthTotalSales";
import ThisMonthTotalPurchases from "./thisMonthTotalPurchases";
import LowStock from "./lowStock";

export default function Component() {
  return (
    <div
      className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6"
      style={{ backgroundColor: "whitesmoke", opacity: "0.7" }}
    >
      <h1 className="font-semibold text-lg md:text-xl">Analyitics</h1>

      <ScrollArea className="h-1/2 w-full">
        {/* <img src={background} alt="rrr" srcset="" /> */}
        <div className="grid gap-4 md:grid-cols-2">
          <ThisMonthTotalPurchases />

          <ThisMonthTotalSales />

          <ThisMonthProfite />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <ToDayTotalSales />
          </Card>
        </div>

        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
            </div>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardDescription>Daily Sales</CardDescription>
                    <CardTitle>$12,345.00</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CurvedlineChart className="aspect-[2/1]" />
                  </CardContent>
                </Card>
                <MostSellingProduct />
                <Card>
                  <CardHeader>
                    <CardDescription>Customer Satisfaction</CardDescription>
                    <CardTitle>85%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CurvedlineChart className="aspect-[2/1]" />
                  </CardContent>
                </Card>
              </div>
              <h2 className="font-semibold text-lg md:text-xl">Low Stock</h2>
              <div className="border shadow-sm rounded-lg">
                <LowStock />
              </div>
            </div>
          </main>
        </div>
      </ScrollArea>
    </div>
  );
}

function CurvedlineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          // {
          //   id: "Mobile",
          //   data: [
          //     { x: "Jan", y: 60 },
          //     { x: "Feb", y: 48 },
          //     { x: "Mar", y: 177 },
          //     { x: "Apr", y: 78 },
          //     { x: "May", y: 96 },
          //     { x: "Jun", y: 204 },
          //   ],
          // },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
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
        role="application"
      />
    </div>
  );
}


function ActivityIcon(props) {
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
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
