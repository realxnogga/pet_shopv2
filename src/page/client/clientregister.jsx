
import { useEffect, useState } from "react";
import { ShowToast } from "../../component/admin/toaster";
import { NavLink } from "react-router-dom";
import { InsertRegisterDataThunk } from "../../feature/client/clientregisterSlice";
import { useDispatch, useSelector } from "react-redux";
import { isClientAlreadyExistTemp } from "../../feature/client/clientregisterSlice";
import { clearIsClientAlreadyExist } from "../../feature/client/clientregisterSlice";
import { useNavigate } from "react-router-dom";

export const ClientRegister = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [userRegisterCredential, setUserRegisterCredential] = useState({
        userregisterusername: '',
        userregisterpassword: '',
    })
    const handleRegisterDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setUserRegisterCredential({ ...userRegisterCredential, [name]: value });
    };
    // for product image
    const [userProfile, setUserProfile] = useState(null);
    const handleUserProfileUploadChange = (e) => setUserProfile(e.target.files[0]);

    const handleRegisterDataSubmitFunc = () => {
        const registerDataTemp = {
            userregisterusername: userRegisterCredential.userregisterusername,
            userregisterpassword: userRegisterCredential.userregisterpassword,
        }
        dispatch(InsertRegisterDataThunk({ registerDataTemp, userProfile }));
    }

    const isClientAlreadyExist = useSelector(isClientAlreadyExistTemp);
    useEffect(() => {

        if (isClientAlreadyExist === true) {
           ShowToast('user already exist', 'error'); 
           
           dispatch(clearIsClientAlreadyExist());
        }
        if (isClientAlreadyExist === false) {
            ShowToast('account created successfully', 'success');

            dispatch(clearIsClientAlreadyExist());
            navigate('/');  
         }

    }, [isClientAlreadyExist])







    const [showPassword, setShowPassword] = useState(false)
    const showpassword = () => setShowPassword(!showPassword);

    return (
        <section className="h-screen w-screen flex items-center justify-center relative">

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('../asset/loginregisterbg/loginregisterbg.png')] bg-no-repeat bg-cover bg-center filter blur-sm"></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>


            {/* Login Form */}
            <div className="z-10 h-fit w-[23rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">
                <div className="flex items-center flex-col  ">
                    <img src="../../asset/admin/favicon/favicon.avif" alt="" className="h-[5rem] w-[5rem] rounded-[50%] " />
                    <h3 className="text-2xl text-gray-800 font-semibold">North Star Petshop</h3>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="username">Enter Username<span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="userregisterusername"
                        value={userRegisterCredential.userregisterusername}
                        onChange={handleRegisterDataChangeFunc}
                        className="h-[2.5rem] rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Enter Password<span className='text-red-500'>*</span></label>
                    <input
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="userregisterpassword"
                        value={userRegisterCredential.userregisterpassword}
                        onChange={handleRegisterDataChangeFunc}
                        className="h-[2.5rem] rounded-sm border border-gray-400 px-2" />

                    <div className='flex items-center gap-x-2'>
                        <input onClick={showpassword} type="checkbox" />
                        <p className='text-[.8rem] text-gray-400'>show password</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label>Choose Profile<span className='text-red-500'>*</span></label>
                    <input id="fileInput" onChange={handleUserProfileUploadChange} type="file" className="border h-[2.5rem] p-1 border border-gray-400 " />
                </div>

                <button onClick={handleRegisterDataSubmitFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Register</button>

                <p>Already have an account?<span className="hover:text-blue-500 cursor-pointer underline"><NavLink to={'/'}> Login</NavLink></span></p>

            </div>
        </section>
    )
}