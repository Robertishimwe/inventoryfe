import { Route, Routes, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import UserManagement from "./components/UserManagement";
import Login from "./pages/login";
import Pos from "./pages/pos";
import DataGrid from "./components/productManagement/dataGrid";
import CategoryDataGrid from "./components/categoryManagement/dataGrid";
import UnitDataGrid from "./components/unitManagement/dataGrid";
import InventoryDataGrid from "./components/inventoryManagement/dataGrid";
import SupplierDataGrid from "./components/supplierManagement/dataGrid";
import TransactionDataGrid from "./components/transactionManagement/dataGrid";
import NewProduct from "./components/productManagement/addNewProduct"

import PrivateRoutes from "./protection/PrivateRoutes";
import BounceRoute from "./protection/bounceRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<b>Home</b>} />
          <Route path="users" element={<UserManagement />} />
          <Route path="pos" element={<Pos />} />
          <Route path="products" element={<DataGrid />} />
          <Route path="products/addNew" element={<NewProduct />} />
          <Route path="inventory" element={<InventoryDataGrid />} />
          <Route path="categories" element={<CategoryDataGrid />} />
          <Route path="units" element={<UnitDataGrid />} />
          <Route path="suppliers" element={<SupplierDataGrid />} />
          <Route path="transactions" element={<TransactionDataGrid />} />
        </Route>
      </Route>
      <Route element={ <BounceRoute /> }>
          <Route path="/login" element={<Login />} />
        </Route>
    </Routes>
  );
}

export default App;
