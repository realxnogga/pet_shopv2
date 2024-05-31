

import { isClientSidebarOpenState } from "../../feature/client/clientsidebarSlice";
import { TfiMenu } from "react-icons/tfi";
import { useDispatch } from "react-redux";

export const ClientHamburger = () => {
    const dispatch = useDispatch();

    return (
        <TfiMenu onMouseOver={() => {dispatch(isClientSidebarOpenState());}} className={`absolute top-4 left-4 text-2xl`} /> 
    )
}