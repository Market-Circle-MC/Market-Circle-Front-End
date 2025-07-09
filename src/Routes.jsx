import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
