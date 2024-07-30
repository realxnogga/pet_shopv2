import { useNavigate } from "react-router-dom"
import { MdRefresh } from "react-icons/md";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { useAdminLogin } from "../../store/admin/adminloginstore";
import { useAdminCustomer } from "../../store/admin/admincustomerstore";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import { useClientBuy } from "../../store/client/clientbuystore";

export const AdminNavbar = () => {

    const clearIsAdminLogin = useAdminLogin(state => state.clearIsAdminLogin);
    const getAllCustomerData = useAdminCustomer(state => state.getAllCustomerData);
    const getProductData = useAdminProduct(state => state.getProductData);
    const getAllBuyData = useClientBuy(state => state.getAllBuyData);

    const navigate = useNavigate();

    const handleLogoutFunc = () => {
        navigate('/admin/login');
        clearIsAdminLogin();
    }

    const [spin, setSpin] = useState(false);

    const handleRefreshFunc = () => {
        setSpin(true);
        getAllBuyData();
        getProductData();
        getAllCustomerData();

        setTimeout(() => {
            setSpin(false);
        }, 1000);
    }

    return (
        <nav className={`bg-blue-400 h-[4rem] px-12 mo:px-4 w-screen backdrop-blur absolute top-0  z-10 backdrop-brightness-75 flex items-center justify-between `}>
            <div className="flex items-center gap-x-3">
                <img src="../../asset/favicon/petshoplogo.jpg" alt="fav icon"
                    className="h-[2.5rem] w-[2.5rem] rounded-[10rem] " />

                <p className="font-bold text-2xl text-white mo:hidden">Welcome, Admin</p>
            </div>

            <div className="flex items-center justify-center">
                <MdRefresh data-type="info" data-tip="Refresh" onClick={handleRefreshFunc} className={`${spin ? 'animate-spin' : ''} outline-none text-3xl text-white`} />
                <ReactTooltip />
                 <hr className="h-[2px] bg-white w-[2.5rem] rotate-90 "/>
                <button onClick={handleLogoutFunc} className="py-2 px-3 rounded-lg font-semibold hover:bg-blue-500 duration-500 text-white flex items-center">Sign Out</button>
            </div>

        </nav>
    )
}