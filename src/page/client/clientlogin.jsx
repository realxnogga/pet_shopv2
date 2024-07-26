
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
import { TextField, PasswordField } from "../../component/shared/inputfield";
import { PrimaryButton } from "../../component/shared/button";

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

    return (
        <section className="relative h-screen w-screen flex items-center justify-center 
        bg-[url('../asset/loginregisterbg/loginregisterbg.png')] bg-no-repeat bg-cover bg-center
        ">
            <div className="absolute bg-black/25 inset-0 backdrop-blur-md"></div>

            {/* Login Form */}
            <div className="z-10 h-fit w-[23rem] max-w-[95%] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5 ">
                <div className="flex items-center flex-col  ">
                    <img src="../../asset/favicon/petshoplogo.jpg" alt="" className="h-[5rem] w-[5rem] rounded-[50%] " />
                    <h3 className="text-2xl text-gray-800 font-semibold">North Star Petshop</h3>
                </div>

                <TextField
                    label={'Enter Username'}
                    name="userloginusername"
                    value={userLoginCredential.userloginusername}
                    onChange={handleLoginDataChangeFunc}
                />

                <PasswordField
                    label={'Enter Password'}
                    name="userloginpassword"
                    value={userLoginCredential.userloginpassword}
                    onChange={handleLoginDataChangeFunc}
                />

                <PrimaryButton text={'Login'} onClick={handleLoginDataSubmitFunc} />

                <p className="text-center cursor-pointer hover:text-blue-500"><NavLink to={'/sendtoken'}> Forgot Password?</NavLink></p>

                <p>Don't have an account yet?<span className="hover:text-blue-500 cursor-pointer underline">
                    <NavLink to={'/register'}> Register</NavLink></span></p>

            </div>
            
        </section>
    )
}