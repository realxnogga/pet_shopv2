
import { TfiMenu } from "react-icons/tfi";
import { useClientSidebar } from "../../store/client/clientsidebarstore";

export const ClientHamburger = () => {
   
    const clientSidebarToggle = useClientSidebar(state => state.clientSidebarToggle);

    return (
        <TfiMenu onMouseOver={() => clientSidebarToggle()} className={`absolute top-4 left-4 text-2xl`} /> 
    )
}