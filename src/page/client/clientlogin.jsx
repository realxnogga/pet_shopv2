
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShowToast } from "../../component/admin/toaster";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { InsertLoginDataThunk } from "../../feature/client/clientloginSlice";
import { isClientLoggedInTemp } from "../../feature/client/clientloginSlice";
import { clearIsClientLoggedIn } from "../../feature/client/clientloginSlice";
import { useNavigate } from "react-router-dom";
import { GetLoginDataThunk } from "../../feature/client/clientloginSlice";
import { GetProductDataThunk } from "../../feature/admin/adminproductSlice";
import { GetBuyDataThunk } from "../../feature/client/clientbuySlice";
import { GetAddToCartDataThunk } from "../../feature/client/addtocartSlice";
import { GetAllRatingDataThunk } from "../../feature/client/ratingSlice";
import { clearIsRouteProtected } from "../../feature/client/clientloginSlice";

export const ClientLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userLoginCredential, setUserLoginCredential] = useState({
        userloginusername: '',
        userloginpassword: '',
    })
    const handleLoginDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setUserLoginCredential({ ...userLoginCredential, [name]: value });
    };

    const handleLoginDataSubmitFunc = () => {
        if (userLoginCredential.userloginusername === '') {
            ShowToast('username must not be empty', 'warning');
        }
        else if (userLoginCredential.userloginpassword === '') {
            ShowToast('password must not be empty', 'warning');
        }
        else if (userLoginCredential.userloginusername === '' === '' && userLoginCredential.userloginpassword === '') {
            ShowToast('username and password must not be empty', 'warning');
        }
        else if (userLoginCredential.userloginusername != '' || userLoginCredential.userloginpassword != '') {
            const loginDataTemp = {
                userloginusername: userLoginCredential.userloginusername,
                userloginpassword: userLoginCredential.userloginpassword,
            }
            dispatch(InsertLoginDataThunk({ loginDataTemp }));
        }


    }

    const isClientLoggedIn = useSelector(isClientLoggedInTemp);
    useEffect(() => {

        if (isClientLoggedIn === true) {
            ShowToast('successfully login', 'success');
            dispatch(clearIsClientLoggedIn());
            navigate('/mainpage');

            const loginDataTemp = {
                userloginusername: userLoginCredential.userloginusername,
                userloginpassword: userLoginCredential.userloginpassword,
            }
            dispatch(GetLoginDataThunk({ loginDataTemp }));
            dispatch(GetProductDataThunk());
            dispatch(GetBuyDataThunk(userLoginCredential.userloginusername));
            dispatch(GetAddToCartDataThunk(userLoginCredential.userloginusername));
            dispatch(GetAllRatingDataThunk());
        }
        if (isClientLoggedIn === false) {
            ShowToast('login failed', 'error');

            dispatch(clearIsRouteProtected());
            dispatch(clearIsClientLoggedIn());
        }

    }, [isClientLoggedIn])

    console.log(isClientLoggedIn)
    
    const [showPassword, setShowPassword] = useState(false)
    const showpassword = () => setShowPassword(!showPassword);

    return (
        <section className="h-screen w-screen flex items-center justify-center relative">

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('../asset/loginregisterbg/loginregisterbg.png')] bg-no-repeat bg-cover bg-center filter blur-sm"></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>


            {/* Login Form */}
            <div className="z-10 h-fit w-[23rem] max-w-[95%] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5 ">
                <div className="flex items-center flex-col  ">
                    <img src="../../asset/favicon/petshoplogo.jpg" alt="" className="h-[5rem] w-[5rem] rounded-[50%] " />
                    <h3 className="text-2xl text-gray-800 font-semibold">North Star Petshop</h3>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="username">Enter Username<span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="userloginusername"
                        value={userLoginCredential.userloginusername}
                        onChange={handleLoginDataChangeFunc}
                        className="h-[2.5rem] rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Enter Password<span className='text-red-500'>*</span></label>
                    <input
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="userloginpassword"
                        value={userLoginCredential.userloginpassword}
                        onChange={handleLoginDataChangeFunc}
                        className="h-[2.5rem] rounded-sm border border-gray-400 px-2" />

                    <div className='flex items-center gap-x-2'>
                        <input onClick={showpassword} type="checkbox" />
                        <p className='text-[.8rem] text-gray-400'>show password</p>
                    </div>
                </div>

                <button onClick={handleLoginDataSubmitFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Login</button>

                <p>Don't have an account yet?<span className="hover:text-blue-500 cursor-pointer underline">
                    <NavLink to={'/register'}> Register</NavLink></span></p>

            </div>




        </section>
    )
}