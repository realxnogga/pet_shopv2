import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { clearIsAdminAuth } from "../../feature/admin/loginSlice";
import { MdRefresh } from "react-icons/md";
import { GetProductDataThunk } from "../../feature/admin/adminproductSlice";
import { GetAllCustomerDataThunk } from "../../feature/admin/admincustomerSlice";
import { GetAllBuyDataThunk } from "../../feature/client/clientbuySlice";
import { useState } from "react";
import ReactTooltip from "react-tooltip";


export const AdminNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogoutFunc = () => {
        navigate('/admin/login');
        dispatch(clearIsAdminAuth());
    }

    const [spin, setSpin] = useState(false);

    const handleRefreshFunc = () => {
        setSpin(true);
        dispatch(GetProductDataThunk());
        dispatch(GetAllCustomerDataThunk());
        dispatch(GetAllBuyDataThunk());

        setTimeout(() => {
            setSpin(false);
        }, 1000);

    }


    return (
        <nav className={`bg-blue-400 h-[4rem] px-12 mobile:px-4 w-screen backdrop-blur absolute top-0  z-10 backdrop-brightness-75 flex items-center justify-between `}>
            <div className="flex items-center gap-x-3">
                <img src="../../asset/favicon/petshoplogo.jpg" alt="fav icon"
                    className="h-[2.5rem] w-[2.5rem] rounded-[10rem] " />

                <p className="font-bold text-2xl text-white">Welcome, Admin</p>
            </div>

            <div className="flex items-center justify-center">
                <MdRefresh data-type="info" data-tip="Refresh" onClick={handleRefreshFunc} className={`${spin ? 'animate-spin' : ''} outline-none text-2xl text-3xl text-white`} />
                <ReactTooltip />
                 <hr className="h-[2px] bg-white w-[2.5rem] rotate-90 "/>
                <button onClick={handleLogoutFunc} className="py-2 px-3 rounded-lg font-semibold hover:bg-blue-500 duration-500 text-white flex items-center gap-x-1 ">Sign Out</button>
            </div>

        </nav>
    )
}