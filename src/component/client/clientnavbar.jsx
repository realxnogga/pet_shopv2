
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import ReactTooltip from 'react-tooltip';
import { Toggle } from "../../utils/toggle";
import { useAdminCustomer } from "../../store/admin/admincustomerstore";
import { useClientLogin } from "../../store/client/clientloginstore";
import { useClientSidebar } from "../../store/client/clientsidebarstore";
import { useClientBuy } from "../../store/client/clientbuystore";
import { BsCart4 } from "react-icons/bs";
import { useClientAddToCart } from "../../store/client/clientaddtocardstore";

export const ClientNavbar = () => {
    const navigate = useNavigate();

    const { clearWhatIsClickedInClientSidebar , getWhatIsClickedInClientSidebar } = useClientSidebar(state => ({
        clearWhatIsClickedInClientSidebar: state.clearWhatIsClickedInClientSidebar,
        getWhatIsClickedInClientSidebar: state.getWhatIsClickedInClientSidebar,
    }))

    const { getAddToCartData, addToCartProductData } = useClientAddToCart(state => ({
        getAddToCartData: state.getAddToCartData,
        addToCartProductData: state.addToCartProductData

    }));

    const getAllCustomerData = useAdminCustomer(state => state.getAllCustomerData);

    const getProductData = useAdminProduct(state => state.getProductData);

    const { clearIsRouteProtected, userData, clearUserData } = useClientLogin(state => ({
        userData: state.userData,
        clearIsRouteProtected: state.clearIsRouteProtected,
        clearUserData: state.clearUserData,
    }));

    const getAllBuyData = useClientBuy(state => state.getAllBuyData);

    const handleLogoutFunc = () => {
        navigate('/');
        clearIsRouteProtected();
        clearUserData();
        clearWhatIsClickedInClientSidebar();
    }

    const [spin, setSpin] = useState(false);

    const handleRefreshFunc = () => {
        setSpin(true);
        getProductData();
        getAllCustomerData();
        getAllBuyData();
        getAddToCartData(userData.clientusername);

        setTimeout(() => {
            setSpin(false);
        }, 1000);
    }

    const { toggle, handleToggleFunc } = Toggle();

    return (
        <nav className={`bg-blue-400 h-[4rem] px-12 mo:px-4 w-screen backdrop-blur absolute top-0 z-10 backdrop-brightness-75 flex items-center justify-between `}>
            <div className="flex items-center gap-x-2">
                <img src="../../asset/favicon/petshoplogo.jpg" alt="fav icon"
                    className="h-[2.5rem] w-[2.5rem] rounded-[10rem] " />
                <p className="font-bold text-2xl text-white mo:text-lg">North Star Petshop</p>
            </div>

            <div className="flex items-center justify-center gap-x-4">

                {/* <div className="bg-green-500 relative">
                    <p className="absolute top-0 right-0">1</p>
                    <BsCart4 className="text-2xl text-white" />
                </div> */}

                <div className={`relative h-[2.8rem] w-[3.8rem] cursor-pointer flex items-center justify-center`}>
                    <BsCart4 onClick={() => {getWhatIsClickedInClientSidebar('cart'); navigate('/cart')}} className="text-3xl text-white"/>
                    <div className={`absolute bg-yellow-500 top-0 right-0 rounded-[25px] flex items-center justify-center`}>
                        <p className="text-white text-xs px-[.3rem]">{addToCartProductData.length}</p>
                    </div>
                </div>

                {/* refresh */}
                <MdRefresh data-type="info" data-tip="Refresh" onClick={handleRefreshFunc} className={`${spin ? 'animate-spin' : ''} outline-none text-3xl text-white`} />
                <ReactTooltip />

                {/* profile */}
                <div className={`relative`}>
                    <img onClick={handleToggleFunc} className="h-[2.8rem] w-[2.8rem] mobile:h-[1.9rem] mobile:w-[1.9rem] rounded-[50%]" src={`../../asset/client/clientprofile/${userData.clientprofile}`} alt="" />

                    <div className={`${toggle ? '' : 'hidden'} bg-white h-fit p-3 w-fit border rounded-md shadow-md text-nowrap absolute right-0 mt-3 flex flex-col items-start gap-y-2 `}>
                        <p>Name: {userData.clientusername}</p>
                        {/* <hr className="h-[1px] border border-gray-400 w-full "/> */}
                        <button onClick={handleLogoutFunc} className='w-full hover:text-blue-400 border border-blue-400 rounded-lg py-2 px-2  cursor-pointer flex items-center justify-center gap-x-2'>
                            Sign Out<AiOutlineLogout className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}