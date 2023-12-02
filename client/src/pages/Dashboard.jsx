import { Link } from "react-router-dom";

import IconPackage2 from "../components/icons/IconPackage2";

import Sidebar from "../components/Dashboard/Sidebar";
import UsersPage from "../pages/UsersPage";

function Dashboard() {
  return (
    <div className="grid h-screen min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <div className="flex flex-col bg-black text-white">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-black dark:bg-gray-800/40 px-6">
          <Link className="lg:hidden" href="#">
            <IconPackage2 className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Reservations</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
         <UsersPage></UsersPage>
        </main>
      </div>
    </div>
  );
}


export default Dashboard;
