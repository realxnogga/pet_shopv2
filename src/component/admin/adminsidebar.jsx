
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiShoppingBag4Line } from "react-icons/ri";
import { MdOutlinePeopleAlt } from "react-icons/md";

import { useAdminSidebar } from "../../store/admin/adminsidebarstore";

export const AdminSidebar = () => {

    const {isAdminSidebarOpen, clearIsAdminSidebarOpen, adminSidebarToggle, whatIsClickedInAdminSidebar, getWhatIsClickedInAdminSidebar} = useAdminSidebar(state => ({
        isAdminSidebarOpen: state.isAdminSidebarOpen,
        clearIsAdminSidebarOpen: state.clearIsAdminSidebarOpen,
        adminSidebarToggle: state.adminSidebarToggle,
        whatIsClickedInAdminSidebar: state.whatIsClickedInAdminSidebar,
        getWhatIsClickedInAdminSidebar: state.getWhatIsClickedInAdminSidebar,
    }));

    return (
        <aside onMouseLeave={() => clearIsAdminSidebarOpen()} className={`${isAdminSidebarOpen ? 'w-fit p-2 border border-r-gray-300' : 'w-0 p-0 border-none'} absolute left-0 z-10 bg-white shadow-xl h-screen top-[4rem] text-nowrap overflow-hidden`}>

            <ul>
                <li className="p-2 text-right flex justify-end ">
                    <IoCloseSharp onClick={() => adminSidebarToggle()} className="text-2xl hover:bg-red-400" />
                </li>
                <li
                    onClick={() => getWhatIsClickedInAdminSidebar('dashboard')}
                    className={`${whatIsClickedInAdminSidebar === 'dashboard' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <MdOutlineSpaceDashboard className="text-4xl text-blue-500" /> Dashboard
                </li>
                <li
                    onClick={() => getWhatIsClickedInAdminSidebar('inventory')}
                    className={`${whatIsClickedInAdminSidebar === 'inventory' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <MdOutlineInventory2 className="text-4xl text-blue-500" /> Inventory
                </li>
                <li
                   onClick={() => getWhatIsClickedInAdminSidebar('order')}
                    className={`${whatIsClickedInAdminSidebar === 'order' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}>
                    <RiShoppingBag4Line className="text-4xl text-blue-500" /> Order
                </li>
                <li
                  onClick={() => getWhatIsClickedInAdminSidebar('customer')}
                    className={`${whatIsClickedInAdminSidebar === 'customer' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}>
                    <MdOutlinePeopleAlt className="text-4xl text-blue-500" /> Customer
                </li>
            </ul>

        </aside>
    )
}