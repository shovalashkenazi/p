import { Routes, Route, Navigate } from "react-router-dom";
import ProductIndex from "./features/staff-portal/products/ProductIndex";
import DashboardLayout from "./features/staff-portal/main/DashboardLayout";
import DashboardMain from "./features/staff-portal/main/DashboardMain";

function App() {
  return (
    <Routes>
      {/* ברירת מחדל - נווט ל־/auth */}
      <Route path="/" element={<Navigate to="/auth" />} />

      {/* דוגמה לנתיב /auth */}
      {/* <Route path="/auth" element={<AuthPage />} /> */}

      {/* דשבורד של עובד */}
      <Route path="/dashboard/worker" element={<DashboardLayout />}>
        <Route path="" element={<Navigate to="main" />} />
        <Route path="main" element={<DashboardMain />} />
        <Route path="products/:category" element={<ProductIndex />} />
      </Route>
    </Routes>
  );
}

export default App;
