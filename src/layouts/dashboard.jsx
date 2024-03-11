import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function Dashboard() {
  return (
    <div key="1" className="grid min-h-screen bg-gray-100/40 lg:grid-cols-[280px_1fr] dark:bg-gray-800/40">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
