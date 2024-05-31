

import { useSelector } from "react-redux";
import { ClientNavbar } from "../../component/client/clientnavbar";
import { ClientSidebar } from "../../component/client/clientsidebar";
import { whatIsClickedInClientSidebarTemp } from "../../feature/client/clientsidebarSlice";
import { ClientHome } from "./clienthome";
import { ClientYourOrder } from "./clientyourorder";
import { ClientCart } from "./clientcart";

export const ClientMainPage = () => {

    const whatIsClickedInClientSidebar = useSelector(whatIsClickedInClientSidebarTemp);

    var container = '';
    if (whatIsClickedInClientSidebar == 'home') container = <ClientHome />;
    if (whatIsClickedInClientSidebar == 'yourorder') container = <ClientYourOrder />;
    if (whatIsClickedInClientSidebar == 'cart') container = <ClientCart />;
  
    return (
        <>
            <ClientNavbar />
            <ClientSidebar />
            {container}
        </>
    )

}
