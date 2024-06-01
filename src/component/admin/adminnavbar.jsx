import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { clearIsAdminAuth } from "../../feature/admin/loginSlice";

export const AdminNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogoutFunc = () => {
        navigate('/admin/login');
        dispatch(clearIsAdminAuth());
    }


    return (
        <nav className={`bg-blue-400 h-[4rem] px-12 mobile:px-4 w-screen backdrop-blur absolute top-0  z-10 backdrop-brightness-75 flex items-center justify-between `}>
            <div className="flex items-center gap-x-3">
                <img src="../../asset/favicon/petshoplogo.jpg" alt="fav icon"
                    className="h-[2.5rem] w-[2.5rem] rounded-[10rem] " />

                <p className="font-bold text-2xl text-white">Welcome, Admin</p>
            </div>


            <button onClick={handleLogoutFunc} className="py-2 px-3 border border-white rounded-lg font-semibold text-white ">Sign Out</button>
        </nav>
    )
}