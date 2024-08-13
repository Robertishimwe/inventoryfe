import { Route, Routes, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import UserManagement from "./components/userManagement/dataGrid";
import Login from "./pages/login";
import Pos from "./pages/pos";
import DataGrid from "./components/productManagement/dataGrid";
import CategoryDataGrid from "./components/categoryManagement/dataGrid";
import UnitDataGrid from "./components/unitManagement/dataGrid";
import InventoryDataGrid from "./components/inventoryManagement/dataGrid";
import SupplierDataGrid from "./components/supplierManagement/dataGrid2";
import TransactionDataGrid from "./components/transactionManagement/dataGrid";
import NewProduct from "./components/productManagement/addNewProduct";
import EditProduct from "./components/productManagement/editPopUp";
import NewInventory from "./components/inventoryManagement/addNew";
import NewUnit from "./components/unitManagement/addNewUnit";
import EditUnit from "./components/unitManagement/editPopUp";
import NewUser from "./components/userManagement/addNewUser";
import EditUser from "./components/userManagement/editPopUp";
import NewSupplier from "./components/supplierManagement/addNewSupplier";
import EditSupplier from "./components/supplierManagement/editPopUp";
import NewCategory from "./components/categoryManagement/addNewCategory";
import EditCategory from "./components/supplierManagement/editPopUp";
import Analyitics from "./components/analyitics/main";

import PrivateRoutes from "./protection/PrivateRoutes";
import BounceRoute from "./protection/bounceRoute";
import MainReport from "./components/analyitics/main_reports";
import SalesReport from "./components/analyitics/salesReport";
import PurchasesReport from "./components/analyitics/purchaseReport";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Analyitics />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/addNew" element={<NewUser />} />
          <Route path="users/editUser/:id" element={<EditUser />} />
          <Route path="pos" element={<Pos />} />
          <Route path="products" element={<DataGrid />} />
          <Route path="products/addNew" element={<NewProduct />} />
          <Route path="products/editProduct/:id" element={<EditProduct />} />
          <Route path="inventory" element={<InventoryDataGrid />} />
          <Route path="inventory/addNew" element={<NewInventory />} />
          <Route path="categories" element={<CategoryDataGrid />} />
          <Route path="categories/addNew" element={<NewCategory />} />
          <Route path="categories/editCategory/:id" element={<EditCategory />} />
          <Route path="units" element={<UnitDataGrid />} />
          <Route path="units/addNew" element={<NewUnit />} />
          <Route path="units/editUnit/:id" element={<EditUnit />} />
          <Route path="suppliers" element={<SupplierDataGrid />} />
          <Route path="suppliers/addNew" element={<NewSupplier />} />
          <Route path="suppliers/editSupplier/:id" element={<EditSupplier />} />
          <Route path="transactions" element={<TransactionDataGrid />} />
          <Route path="report/main" element={<MainReport/>}/>
          <Route path="report/sales" element={<SalesReport/>}/>
          <Route path="report/purchases" element={<PurchasesReport/>}/>
        </Route>
      </Route>
      <Route element={ <BounceRoute /> }>
          <Route path="/login" element={<Login />} />
        </Route>
    </Routes>
  );
}

export default App;
