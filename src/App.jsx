import { Routes, Route, Navigate } from "react-router-dom";
import ProductIndex from "./features/staff-portal/products/ProductIndex";
import DashboardLayout from "./features/staff-portal/main/DashboardLayout";
import DashboardMain from "./features/staff-portal/main/DashboardMain";
import DocsIndex from "./features/staff-portal/docs/DocsIndex";
import GovIndex from "./features/staff-portal/gov/GovIndex";
import CatalogIndex from "./features/staff-portal/catalog/CatalogIndex";
import ToolsIndex from "./features/staff-portal/tools/ToolsIndex";
import CustomersIndex from "./features/staff-portal/customers/CustomersIndex";
import SubscriptionsIndex from "./features/staff-portal/subscriptions/SubscriptionsIndex";
import ReportsIndex from "./features/staff-portal/reports/ReportsIndex";
import WarehouseIndex from "./features/staff-portal/warehouse/WarehouseIndex";
import OrdersIndex from "./features/staff-portal/orders/OrdersIndex";
import DriversRoutesIndex from "./features/staff-portal/drivers-routes/DriversRoutesIndex";

function App() {
  return (
    <Routes>
      {/* ברירת מחדל - נווט ל־דשבורד */}
      <Route path="/" element={<Navigate to="/dashboard/worker" />} />

      {/* דשבורד של עובד */}
      <Route path="/dashboard/worker" element={<DashboardLayout />}>
        <Route path="" element={<Navigate to="main" />} />
        <Route path="main" element={<DashboardMain />} />
        <Route path="products" element={<ProductIndex />} />
        <Route path="docs" element={<DocsIndex />} />
        <Route path="gov" element={<GovIndex />} />
        <Route path="catalog" element={<CatalogIndex />} />
        <Route path="tools" element={<ToolsIndex />} />
        <Route path="customers" element={<CustomersIndex />} />
        <Route path="subscriptions" element={<SubscriptionsIndex />} />
        <Route path="reports" element={<ReportsIndex />} />
        <Route path="warehouse" element={<WarehouseIndex />} />
        <Route path="orders" element={<OrdersIndex />} />
        <Route path="drivers-routes" element={<DriversRoutesIndex />} />
      </Route>
    </Routes>
  );
}

export default App;
