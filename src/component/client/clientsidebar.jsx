
import { IoCloseSharp } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useClientSidebar } from "../../store/client/clientsidebarstore";
import { useNavigate } from "react-router-dom";

export const ClientSidebar = () => {
    const navigate = useNavigate();

    const { isClientSidebarOpen, clearIsClientSidebarOpen, clientSidebarToggle, whatIsClickedInClientSidebar, getWhatIsClickedInClientSidebar } = useClientSidebar(state => ({
        isClientSidebarOpen: state.isClientSidebarOpen,
        clearIsClientSidebarOpen: state.clearIsClientSidebarOpen,
        clientSidebarToggle: state.clientSidebarToggle,
        whatIsClickedInClientSidebar: state.whatIsClickedInClientSidebar,
        getWhatIsClickedInClientSidebar: state.getWhatIsClickedInClientSidebar,
    }))


    return (
        <aside onMouseLeave={() => clearIsClientSidebarOpen()} className={`${isClientSidebarOpen ? 'w-fit p-2 border border-r-gray-300' : 'w-0 p-0 border-none'} absolute left-0 z-10 bg-white shadow-xl h-screen top-[4rem] text-nowrap overflow-hidden`}>

            <ul>
                <li className="p-2 text-right flex justify-end ">
                    <IoCloseSharp onClick={() => clearIsClientSidebarOpen()} className="text-2xl hover:bg-red-400" />
                </li>
                <li
                    onClick={() => {getWhatIsClickedInClientSidebar('home'); navigate('/home')}}
                    className={`${whatIsClickedInClientSidebar === 'home' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <TiHomeOutline className="text-4xl text-blue-500" /> Home </li>
                <li
                    onClick={() => { getWhatIsClickedInClientSidebar('order'); navigate('/order') }}
                    className={`${whatIsClickedInClientSidebar === 'order' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}> <MdOutlineShoppingBag className="text-4xl text-blue-500" /> Your Order </li>
                <li
                    onClick={() => { getWhatIsClickedInClientSidebar('cart'); navigate('/cart')}}
                    className={`${whatIsClickedInClientSidebar === 'cart' ? '!bg-blue-400 !bg-opacity-50' : ''} p-4 hover:bg-blue-300 hover:bg-opacity-30 flex items-center gap-x-2 text-xl rounded-lg cursor-pointer`}>
                    <MdOutlineShoppingCart className="text-4xl text-blue-500" /> Cart </li>
            </ul>

        </aside>
    )
}