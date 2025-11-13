import { Routes, Route, Navigate } from "react-router-dom";
import ProductIndex from "./features/staff-portal/products/ProductIndex";
import ProductCategoriesIndex from "./features/staff-portal/categories/ProductCategoriesIndex";
import DashboardLayout from "./features/staff-portal/main/DashboardLayout";
import DashboardMain from "./features/staff-portal/main/DashboardMain";
import DocsIndex from "./features/staff-portal/docs/DocsIndex";
import GovIndex from "./features/staff-portal/gov/GovIndex";
import CatalogIndex from "./features/staff-portal/catalog/CatalogIndex";
import CustomersAccountIndex from "./features/staff-portal/accounts/CustomersAccountIndex";
import WorkersIndex from "./features/staff-portal/accounts/WorkersIndex";
import AgentsIndex from "./features/staff-portal/accounts/AgentsIndex";
import InstallersIndex from "./features/staff-portal/accounts/InstallersIndex";
import StorekeepersIndex from "./features/staff-portal/accounts/StorekeepersIndex";
import SuppliersIndex from "./features/staff-portal/accounts/SuppliersIndex";
import SubscriptionsIndex from "./features/staff-portal/subscriptions/SubscriptionsIndex";
import ServiceContractsIndex from "./features/staff-portal/subscriptions/ServiceContractsIndex";
import ServiceCallsIndex from "./features/staff-portal/subscriptions/ServiceCallsIndex";
import SubscriptionsListIndex from "./features/staff-portal/subscriptions/SubscriptionsListIndex";
import WarehousesPortalIndex from "./features/staff-portal/warehouses/WarehousesPortalIndex";
import WarehousesManagementIndex from "./features/staff-portal/warehouses/WarehousesManagementIndex";
import DriversRoutesIndex from "./features/staff-portal/drivers-routes/DriversRoutesIndex";
import StatusesManagementIndex from "./features/staff-portal/settings/StatusesManagementIndex";

function App() {
  return (
    <Routes>
      {/* ברירת מחדל - נווט ל־דשבורד */}
      <Route path="/" element={<Navigate to="/dashboard/worker" />} />

      {/* דשבורד של עובד */}
      <Route path="/dashboard/worker" element={<DashboardLayout />}>
        <Route path="" element={<Navigate to="main" />} />
        <Route path="main" element={<DashboardMain />} />

        {/* Products Routes */}
        <Route path="products" element={<ProductIndex />} />
        <Route
          path="products/categories"
          element={<ProductCategoriesIndex />}
        />

        {/* Accounts Routes */}
        <Route path="accounts/customers" element={<CustomersAccountIndex />} />
        <Route path="accounts/workers" element={<WorkersIndex />} />
        <Route path="accounts/agents" element={<AgentsIndex />} />
        <Route path="accounts/installers" element={<InstallersIndex />} />
        <Route path="accounts/storekeepers" element={<StorekeepersIndex />} />
        <Route path="accounts/suppliers" element={<SuppliersIndex />} />

        {/* Warehouses Routes */}
        <Route path="warehouses/portal" element={<WarehousesPortalIndex />} />
        <Route
          path="warehouses/management"
          element={<WarehousesManagementIndex />}
        />

        {/* Settings Routes */}
        <Route path="settings/statuses" element={<StatusesManagementIndex />} />

        {/* Subscriptions Routes */}
        <Route path="subscriptions" element={<SubscriptionsIndex />} />
        <Route
          path="subscriptions/service-contracts"
          element={<ServiceContractsIndex />}
        />
        <Route
          path="subscriptions/service-calls"
          element={<ServiceCallsIndex />}
        />
        <Route path="subscriptions/list" element={<SubscriptionsListIndex />} />

        {/* Other Routes */}
        <Route path="docs" element={<DocsIndex />} />
        <Route path="gov" element={<GovIndex />} />
        <Route path="catalog" element={<CatalogIndex />} />
        <Route path="drivers-routes" element={<DriversRoutesIndex />} />
      </Route>
    </Routes>
  );
}

export default App;
