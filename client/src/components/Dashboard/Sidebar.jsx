import { Link } from "react-router-dom";

import IconPackage2 from "../icons/IconPackage2";
import IconHome from "../icons/IconHome";
import IconCalendar from "../icons/IconCalendar";
import IconUsers from "../icons/IconUsers";
import IconLinechart from "../icons/IconLinechart";
import IconSettings from "../icons/IconSettings";

function Sidebar() {
  return (
    <div className="hidden border-r bg-black lg:block dark:bg-gray-800/40">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link
            className="flex items-center gap-2 font-semibold text-white"
            to="#"
          >
            <IconPackage2 className="h-6 w-6" />
            <span className="">Hotel Inc</span>
          </Link>
        </div>
        <div className="flex-1">
        <nav className="grid items-start px-4 text-sm font-medium">
            <SidebarLink icon={<IconHome />} text="Home" to="#" />
            <SidebarLink icon={<IconCalendar />} text="Reservations" to="#" isHighlighted={true} />
            <SidebarLink icon={<IconUsers />} text="Customers" to="#" />
            <SidebarLink icon={<IconLinechart />} text="Reports" to="#" />
            <SidebarLink icon={<IconSettings />} text="Settings" to="#" />
          </nav>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ icon, text, to, isHighlighted }) {
  const defaultClasses =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
  const highlightedClasses =
    "flex items-center gap-3 rounded-lg bg-black px-3 py-2 text-white transition-all hover:text-gray-900 dark:bg-black dark:text-gray-50 dark:hover:text-gray-50";

  return (
    <Link
      className={isHighlighted ? highlightedClasses : defaultClasses}
      to={to}
    >
      {icon}
      {text}
    </Link>
  );
}

export default Sidebar;
