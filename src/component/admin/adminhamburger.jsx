

import { isAdminSidebarOpenState } from "../../feature/admin/adminsidebarSlice";
import { TfiMenu } from "react-icons/tfi";
import { useDispatch } from "react-redux";

export const AdminHamburger = () => {
    const dispatch = useDispatch();

    return (
        <TfiMenu onMouseOver={() => {dispatch(isAdminSidebarOpenState());}} className={`absolute top-4 left-4 text-2xl`} /> 
    )
}