


import { IoCloseSharp } from "react-icons/io5";
import { isAdminSidebarOpenState } from "../../feature/admin/adminsidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { isAdminSidebarOpenTemp } from "../../feature/admin/adminsidebarSlice";

import { whatIsClickedInClientSidebarState } from "../../feature/client/clientsidebarSlice";
import { whatIsClickedInClientSidebarTemp } from "../../feature/client/clientsidebarSlice";

import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { isClientSidebarOpenState } from "../../feature/client/clientsidebarSlice";
import { isClientSidebarOpenTemp } from "../../feature/client/clientsidebarSlice";
import { clearIsClientSidebarOpen } from "../../feature/client/clientsidebarSlice";


export const ClientSidebar = () => {
    const dispatch = useDispatch();

    const isClientSidebarOpen = useSelector(isClientSidebarOpenTemp);
    const whatIsClickedInClientSidebar = useSelector(whatIsClickedInClientSidebarTemp);

    return (
        <aside onMouseLeave={() => dispatch(clearIsClientSidebarOpen())} className={`${isClientSidebarOpen ? 'w-fit p-2 border border-r-gray-300' : 'w-0 p-0 border-none'} absolute left-0 z-10 bg-white shadow-xl h-screen top-[4rem] text-nowrap overflow-hidden`}>
  
            <ul>
                <li className="p-2 text-right flex justify-end ">
                    <IoCloseSharp onClick={() => { dispatch(isClientSidebarOpenState()) }} className="text-2xl hover:bg-red-400" />
                </li>
                <li
                    onClick={() => { dispatch(whatIsClickedInClientSidebarState('home')) }}
                    className={`${whatIsClickedInClientSidebar === 'home' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <TiHomeOutline className="text-4xl text-blue-500" /> Home </li>
                <li
                    onClick={() => { dispatch(whatIsClickedInClientSidebarState('yourorder')) }}
                    className={`${whatIsClickedInClientSidebar === 'yourorder' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <MdOutlineShoppingBag className="text-4xl text-blue-500" /> Your Order </li>
                <li
                    onClick={() => { dispatch(whatIsClickedInClientSidebarState('cart')) }}
                    className={`${whatIsClickedInClientSidebar === 'cart' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}>
                    <MdOutlineShoppingCart className="text-4xl text-blue-500" /> Cart </li>
            </ul>

        </aside>
    )
}