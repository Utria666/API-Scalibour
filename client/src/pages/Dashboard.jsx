
import Sidebar from "../components/Dashboard/Sidebar";
import UsersPage from "../pages/UsersPage";
import RoomTypesPage from "../pages/RoomTypesPage";

function Dashboard() {
  return (
    <div className="grid h-screen min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <div className="flex flex-col bg-black text-white">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
         <UsersPage></UsersPage>
         <RoomTypesPage></RoomTypesPage>
        </main>
      </div>
    </div>
  );
}


export default Dashboard;
