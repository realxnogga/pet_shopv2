
import { useEffect, useState } from "react";
import { ShowToast } from "../../component/admin/toaster";
import { NavLink } from "react-router-dom";
import { InsertRegisterDataThunk } from "../../feature/client/clientregisterSlice";
import { useDispatch, useSelector } from "react-redux";
import { isClientAlreadyExistTemp } from "../../feature/client/clientregisterSlice";
import { clearIsClientAlreadyExist } from "../../feature/client/clientregisterSlice";
import { useNavigate } from "react-router-dom";
import { GetProductDataThunk } from "../../feature/admin/adminproductSlice";
import { GetAllCustomerDataThunk } from "../../feature/admin/admincustomerSlice";
import { GetAllBuyDataThunk } from "../../feature/client/clientbuySlice";
import { Toggle } from "../../utils/toggle";
import { PreviewImage } from "../../utils/previewimage";

export const ClientRegister = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [userRegisterCredential, setUserRegisterCredential] = useState({
        userregisterusername: '',
        userregisterpassword: '',
        userregisteraddress: '',
        userregisteremail: '',
    })

    const handleRegisterDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setUserRegisterCredential({ ...userRegisterCredential, [name]: value });
    };

    // for product image
    const [userProfile, setUserProfile] = useState(null);

    console.log(userProfile)

    const handleUserProfileUploadChange = (e) => {setUserProfile(e.target.files[0])}

    const handleRegisterDataSubmitFunc = () => {

        if (userRegisterCredential.userregisterusername === '') {
            ShowToast('username must not be empty', 'warning');
        }
        else if (userRegisterCredential.userregisterpassword === '') {
            ShowToast('password must not be empty', 'warning');
        }
        else if (userRegisterCredential.userregisteraddress === '') {
            ShowToast('address must not be empty', 'warning');
        }
        else if (userRegisterCredential.userregisteremail === '') {
            ShowToast('email must not be empty', 'warning');
        }
        else if (userRegisterCredential.userregisterusername === '' || userRegisterCredential.userregisterpassword === '' || userRegisterCredential.userregisteraddress === '' || userRegisterCredential.userregisteremail === '') {
            ShowToast('fields must not be empty', 'warning');
        }
        else if (userRegisterCredential.userregisterpassword.length < 8) {
            ShowToast('password length must be 8 and above', 'warning');
        }
        else if (userRegisterCredential.userregisterusername != '' || userRegisterCredential.userregisterpassword != '' || userRegisterCredential.userregisteraddress != '' || userRegisterCredential.userregisteremail === '') {
            const registerDataTemp = {
                userregisterusername: userRegisterCredential.userregisterusername,
                userregisterpassword: userRegisterCredential.userregisterpassword,
                userregisteraddress: userRegisterCredential.userregisteraddress,
                userregisteremail: userRegisterCredential.userregisteremail,
            }
            dispatch(InsertRegisterDataThunk({ registerDataTemp, userProfile }));
        }



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
            dispatch(GetProductDataThunk());
            dispatch(GetAllCustomerDataThunk());
            dispatch(GetAllBuyDataThunk());

            navigate('/');
        }

    }, [isClientAlreadyExist])

    const { toggle, handleToggleFunc } = Toggle();

    return (
        <section className="h-screen w-screen flex items-center justify-center relative">

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('../asset/loginregisterbg/loginregisterbg.png')] bg-no-repeat bg-cover bg-center filter blur-sm"></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>


            {/* Login Form */}
            <div className="z-10 h-fit w-[32rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">
                {/* <div className="flex items-center flex-col  ">
                    <img src="../../asset/favicon/petshoplogo.jpg" alt="" className="h-[5rem] w-[5rem] rounded-[50%] " />
                    <h3 className="text-2xl text-gray-800 font-semibold">North Star Petshop</h3>
                </div> */}
                <h3 className="text-3xl  text-center font-semibold">Register</h3>

                <div className="flex justify-between gap-4">
                    <div className="w-full">
                        <label htmlFor="username">Enter Username<span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            name="userregisterusername"
                            value={userRegisterCredential.userregisterusername}
                            onChange={handleRegisterDataChangeFunc}
                            className="h-[2.5rem] w-full outline-none rounded-sm border border-gray-400 px-2" />
                    </div>

                    <div className="w-full">
                        <div className="flex justify-between">
                            <label htmlFor="password">Enter Password<span className='text-red-500'>*</span></label>

                            <input onClick={handleToggleFunc} type="checkbox" />
                        </div>

                        <input
                            type={`${toggle ? 'text' : 'password'}`}
                            name="userregisterpassword"
                            value={userRegisterCredential.userregisterpassword}
                            onChange={handleRegisterDataChangeFunc}
                            className="h-[2.5rem] w-full outline-none rounded-sm border border-gray-400 px-2" />
                    </div>
                </div>

                {/* fgdfgdfg */}
                <div className="flex flex-col">
                    <label>Enter Email<span className='text-red-500'>*</span></label>
                    <input type="email"
                        value={userRegisterCredential.userregisteremail}
                        onChange={handleRegisterDataChangeFunc}
                        name="userregisteremail"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label>Enter Address<span className='text-red-500'>*</span></label>
                    <textarea
                        value={userRegisterCredential.userregisteraddress}
                        onChange={handleRegisterDataChangeFunc}
                        name="userregisteraddress"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" >

                    </textarea>
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-between items-end">
                        <label>Choose Profile<span className='text-red-500'>*</span></label>

                        <PreviewImage targetFile={userProfile} />

                    </div>

                    <input id="fileInput" onChange={handleUserProfileUploadChange} type="file" className="border h-[2.5rem] p-1 border border-gray-400 " />

                </div>

                <button onClick={handleRegisterDataSubmitFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Register</button>

                <p>Already have an account?<span className="hover:text-blue-500 cursor-pointer underline"><NavLink to={'/'}> Login</NavLink></span></p>

            </div>
        </section>
    )
}