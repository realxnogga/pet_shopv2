
import { useSelector } from "react-redux";
import { AdminNavbar } from "../../component/admin/adminnavbar";
import { AdminSidebar } from "../../component/admin/adminsidebar";

import { AdminDashboard } from "./admindashboard";
import { AdminInventory } from "./adminproduct";
import { AdminOrder } from "./adminorder";
import { AdminCustomer } from "./admincustomer";

import { useAdminSidebar } from "../../store/admin/adminsidebarstore";

export const AdminMainPage = () => {

    const whatIsClickedInAdminSidebar = useAdminSidebar(state => state.whatIsClickedInAdminSidebar);

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
