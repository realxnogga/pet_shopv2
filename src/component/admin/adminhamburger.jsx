

import { TfiMenu } from "react-icons/tfi";
import { useAdminSidebar } from "../../store/admin/adminsidebarstore";

export const AdminHamburger = () => {
    
    const adminSidebarToggle = useAdminSidebar(state => state.adminSidebarToggle);

    return (
        <TfiMenu onMouseOver={() => adminSidebarToggle()} className={`absolute top-4 left-4 text-2xl`} /> 
    )
}