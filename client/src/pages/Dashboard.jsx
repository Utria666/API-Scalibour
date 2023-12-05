import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import UsersPage from "../pages/UsersPage";
import RoomTypesPage from "../pages/RoomTypesPage";
import RoomsPage from "../pages/RoomsPage";

function Dashboard() {
  return (
    <div className="grid h-screen min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col bg-black text-white">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Routes>
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="room-types" element={<RoomTypesPage />} />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
