
import { useEffect, useState } from "react";
import { ShowToast } from "../../component/admin/toaster";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PreviewImage } from "../../utils/previewimage";
import { TextField, PasswordField, EmailField, TextAreaField, FileField } from "../../component/shared/inputfield";
import { PrimaryButton } from "../../component/shared/button";
import { useAdminCustomer } from "../../store/admin/admincustomerstore";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import { useClientRegister } from "../../store/client/clientregisterstore";
import { useClientBuy } from "../../store/client/clientbuystore";

export const ClientRegister = () => {

    const getProductData = useAdminProduct(state => state.getProductData);

    const { isClientAlreadyExist, insertRegisterData, clearIsClientAlreadyExist } = useClientRegister(state => ({
        isClientAlreadyExist: state.isClientAlreadyExist,
        insertRegisterData: state.insertRegisterData,
        clearIsClientAlreadyExist: state.clearIsClientAlreadyExist,
    }))

    const getAllCustomerData = useAdminCustomer(state => state.getAllCustomerData);
    const getAllBuyData = useClientBuy(state => state.getAllBuyData);

    const navigate = useNavigate();

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
    const handleUserProfileUploadChange = (e) => { setUserProfile(e.target.files[0]) }


    const handleRegisterDataSubmitFunc = () => {

        if (Object.values(userRegisterCredential).includes('') || (userProfile === null)) {
            ShowToast('All fields must not be empty', 'warning');
        }
        else if (userRegisterCredential.userregisterpassword.length < 8) {
            ShowToast('password length must be 8 and above', 'warning');
        }
        else {
            insertRegisterData({userRegisterCredential, userProfile});
        }
    }

    useEffect(() => {

        if (isClientAlreadyExist === true) {
            ShowToast('user already exist', 'error');
            clearIsClientAlreadyExist();
        }
        if (isClientAlreadyExist === false) {
            ShowToast('account created successfully', 'success');

            clearIsClientAlreadyExist();
            getProductData();
            getAllCustomerData();
            getAllBuyData();
            navigate('/');
        }

    }, [isClientAlreadyExist])

    return (
        <section className="relative h-screen w-screen flex items-center justify-center 
        bg-[url('../asset/loginregisterbg/loginregisterbg.png')] bg-no-repeat bg-cover bg-center
        ">
            <div className="absolute bg-black/25 inset-0 backdrop-blur-md"></div>

            {/* Login Form */}
            <div className="z-10 h-fit w-[32rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">

                <h3 className="text-3xl  text-center font-semibold">Register</h3>

                <div className="flex justify-between gap-x-2">
                    <TextField
                        label={'Enter Username'}
                        name="userregisterusername"
                        value={userRegisterCredential.userregisterusername}
                        onChange={handleRegisterDataChangeFunc}
                    />
                    <PasswordField
                        label={'Enter Password'}
                        name="userregisterpassword"
                        value={userRegisterCredential.userregisterpassword}
                        onChange={handleRegisterDataChangeFunc}
                    />
                </div>

                <EmailField
                    label={'Enter Email'}
                    name="userregisteremail"
                    value={userRegisterCredential.userregisteremail}
                    onChange={handleRegisterDataChangeFunc}
                />

                <TextAreaField
                    label={'Enter Address'}
                    name={'userregisteraddress'}
                    value={userRegisterCredential.userregisteraddress}
                    onChange={handleRegisterDataChangeFunc}
                />

                <FileField
                    label={'Choose Profile'}
                    id={'fileInput'}
                    onChange={handleUserProfileUploadChange}
                    previewImage={<PreviewImage targetFile={userProfile} />}
                />

                <PrimaryButton text={'Register'} onClick={handleRegisterDataSubmitFunc} />

                <p>Already have an account?<span className="hover:text-blue-500 cursor-pointer underline"><NavLink to={'/'}> Login</NavLink></span></p>

            </div>
        </section>
    )
}