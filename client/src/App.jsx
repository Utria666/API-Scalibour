import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UsersContext";
import { RoomTypesProvider } from "./context/RoomTypesContext";
import { RoomProvider } from "./context/RoomContext";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RoomTypesProvider>
          <RoomProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />            
                  <Route path="/dashboard/*" element={<Dashboard />} />
                <Route element={<ProtectedRoute />}>
                </Route>
              </Routes>
            </BrowserRouter>
          </RoomProvider>
        </RoomTypesProvider>
      </UserProvider>
    </AuthProvider>
  );
}
