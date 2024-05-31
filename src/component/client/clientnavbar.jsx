
import { useNavigate } from "react-router-dom"
import { userDataTemp } from "../../feature/client/clientloginSlice";
import { useSelector } from "react-redux";
import { clearUserData } from "../../feature/client/clientloginSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { clearIsClientSidebarOpen } from "../../feature/client/clientsidebarSlice";
import { clearWhatIsClickedInClientSidebar } from "../../feature/client/clientsidebarSlice";

export const ClientNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userdata = useSelector(userDataTemp);
    if (Object.keys(userdata).length != 0) {
        var clientID = userdata.clientID;
        var clientusername = userdata.clientusername;
        var clientprofile = userdata.clientprofile;
    }

    const handleLogoutFunc = () => {
        navigate('/');
        dispatch(clearUserData());
        dispatch(clearIsClientSidebarOpen());
        dispatch(clearWhatIsClickedInClientSidebar());
    }

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className={`bg-blue-400 h-[4rem] px-12 mobile:px-4 w-screen backdrop-blur absolute top-0  z-10 backdrop-brightness-75 flex items-center justify-between `}>
            <div className="flex items-center gap-x-2">
                <img src="../asset/admin/favicon/favicon.avif" alt="fav icon"
                    className="h-[2.5rem] w-[2.5rem] rounded-[10rem] " />
              
                <p className="font-bold text-2xl text-white">North Star Petshop</p>
            </div>

            <div className={`relative`}>
                <img onClick={() => { setShowDropdown(!showDropdown) }} className="h-[2.8rem] w-[2.8rem] mobile:h-[1.9rem] mobile:w-[1.9rem] rounded-[50%]" src={`../../asset/client/clientprofile/${clientprofile}`} alt="" />

                <div className={`${showDropdown ? '' : 'hidden'} bg-white h-fit p-3 w-fit border rounded-md shadow-md text-nowrap absolute right-0 mt-3 flex flex-col items-start gap-y-2 `}>
                    <p>Name: {clientusername}</p>
                    {/* <hr className="h-[1px] border border-gray-400 w-full "/> */}
                    <button onClick={handleLogoutFunc} className='hover:text-blue-400 border border-blue-400 rounded-lg py-2 px-2  cursor-pointer flex items-center gap-x-2'>
                        Sign Out<AiOutlineLogout className="text-xl" />
                    </button>
                </div>
            </div>
        </nav>
    )
}