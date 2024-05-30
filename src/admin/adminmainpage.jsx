
import { useSelector } from "react-redux";
import { AdminNavbar } from "../component/admin/adminnavbar";
import { AdminSidebar } from "../component/admin/adminsidebar";
import { whatIsClickedInAdminSidebarTemp } from "../feature/admin/adminsidebarSlice";

import { AdminDashboard } from "./admindashboard";
import { AdminInventory } from "./admininventory";
import { AdminOrder } from "./adminorder";

export const AdminMainPage = () => {

    const whatIsClickedInAdminSidebar = useSelector(whatIsClickedInAdminSidebarTemp);

    var container = '';
    if (whatIsClickedInAdminSidebar == 'dashboard') container = <AdminDashboard />;
    if (whatIsClickedInAdminSidebar == 'inventory') container = <AdminInventory />;
    if (whatIsClickedInAdminSidebar == 'order') container = <AdminOrder />;
  
    return (
        <>
            <AdminNavbar />
            <AdminSidebar />
            {container}
        </>
    )

}
