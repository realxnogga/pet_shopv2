
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiShoppingBag4Line } from "react-icons/ri";
import { isAdminSidebarOpenState } from "../../feature/admin/adminsidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { isAdminSidebarOpenTemp } from "../../feature/admin/adminsidebarSlice";
import { whatIsClickedInAdminSidebarState } from "../../feature/admin/adminsidebarSlice";
import { whatIsClickedInAdminSidebarTemp } from "../../feature/admin/adminsidebarSlice";

export const AdminSidebar = () => {
    const dispatch = useDispatch();

    const isAdminSidebarOpen = useSelector(isAdminSidebarOpenTemp);
    const whatIsClickedInAdminSidebar = useSelector(whatIsClickedInAdminSidebarTemp);

    return (
        <aside className={`${isAdminSidebarOpen ? 'w-[15rem] p-2 border border-r-gray-300' : 'w-0 p-0 border-none'} absolute left-0 z-10 bg-white shadow-xl h-screen top-[4rem] text-nowrap overflow-hidden`}>
  
            <ul>
                <li className="p-2 text-right flex justify-end ">
                    <IoCloseSharp onClick={() => { dispatch(isAdminSidebarOpenState()) }} className="text-2xl hover:bg-red-400" />
                </li>
                <li
                    onClick={() => { dispatch(whatIsClickedInAdminSidebarState('dashboard')) }}
                    className={`${whatIsClickedInAdminSidebar === 'dashboard' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <MdOutlineSpaceDashboard className="text-4xl text-blue-500" /> Dashboard </li>
                <li
                    onClick={() => { dispatch(whatIsClickedInAdminSidebarState('inventory')) }}
                    className={`${whatIsClickedInAdminSidebar === 'inventory' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <MdOutlineInventory2 className="text-4xl text-blue-500" /> Inventory </li>
                <li
                    onClick={() => { dispatch(whatIsClickedInAdminSidebarState('order')) }}
                    className={`${whatIsClickedInAdminSidebar === 'order' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}>
                    <RiShoppingBag4Line className="text-4xl text-blue-500" /> Order </li>
            </ul>


        </aside>
    )
}