
import { useEffect, useState } from "react";
import { ShowToast } from "../../component/admin/toaster";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, PasswordField } from "../../component/shared/inputfield";
import { PrimaryButton } from "../../component/shared/button";
import { useClientLogin } from "../../store/client/clientloginstore";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import { useClientRating } from "../../store/client/clientratingstore";
import { useClientBuy } from "../../store/client/clientbuystore";
import { useClientAddToCart } from "../../store/client/clientaddtocardstore";

export const ClientLogin = () => {

    const getProductData = useAdminProduct(state => state.getProductData);
    const getRatingData = useClientRating(state => state.getRatingData);
    const getBuyData = useClientBuy(state => state.getBuyData);
    const getAddToCartData = useClientAddToCart(state => state.getAddToCartData);

    const {clearIsLogin, returnedLoginData, testLogin, getLoginData} = useClientLogin(state => ({
        clearIsLogin: state.clearIsLogin,
        returnedLoginData: state.returnedLoginData,
        testLogin: state.testLogin,
        getLoginData: state.getLoginData,
    }))

    const navigate = useNavigate();

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
            testLogin({userLoginCredential});
        }
    }

    useEffect(() => {

        if (returnedLoginData.islogin === true) {
            ShowToast('successfully login', 'success');
            clearIsLogin();
            navigate('/home');

            getLoginData({userLoginCredential});

            getProductData();
            getBuyData(userLoginCredential.userloginusername);
            getAddToCartData(userLoginCredential.userloginusername);
            getRatingData();
        }
        if (returnedLoginData.islogin === false) {
            ShowToast('login failed', 'error');
            clearIsLogin();
        }

    }, [returnedLoginData.islogin])

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

                <p className="text-center cursor-pointer hover:text-blue-500"><NavLink to={'/sendemail'}> Forgot Password?</NavLink></p>

                <p>Don't have an account yet?<span className="hover:text-blue-500 cursor-pointer underline">
                    <NavLink to={'/register'}> Register</NavLink></span></p>

            </div>
            
        </section>
    )
}