
import { useSelector } from "react-redux";
import { AdminNavbar } from "../../component/admin/adminnavbar";
import { AdminSidebar } from "../../component/admin/adminsidebar";
import { whatIsClickedInAdminSidebarTemp } from "../../feature/admin/adminsidebarSlice";

import { AdminDashboard } from "./admindashboard";
import { AdminInventory } from "./adminproduct";
import { AdminOrder } from "./adminorder";
import { AdminCustomer } from "./admincustomer";

export const AdminMainPage = () => {

    const whatIsClickedInAdminSidebar = useSelector(whatIsClickedInAdminSidebarTemp);

    var container = '';
    if (whatIsClickedInAdminSidebar == 'dashboard') container = <AdminDashboard />;
    if (whatIsClickedInAdminSidebar == 'inventory') container = <AdminInventory />;
    if (whatIsClickedInAdminSidebar == 'order') container = <AdminOrder />;
    if (whatIsClickedInAdminSidebar == 'customer') container = <AdminCustomer />;
  
    return (
        <>
            <AdminNavbar />
            <AdminSidebar />
            {container}
        </>
    )

}
