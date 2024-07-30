
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { TextField, PasswordField } from "../../component/shared/inputfield";
import { PrimaryButton } from "../../component/shared/button";
import { useAdminLogin } from "../../store/admin/adminloginstore";
import { useAdminCustomer } from "../../store/admin/admincustomerstore";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import { useClientBuy } from "../../store/client/clientbuystore";

export const AdminLogin = () => {

    const {isAdminLogin, clearIsAdminLogin, insertAdminLoginData} = useAdminLogin(state => ({
        isAdminLogin: state.isAdminLogin,
        clearIsAdminLogin: state.clearIsAdminLogin,
        insertAdminLoginData: state.insertAdminLoginData,
    }));

    const getAllCustomerData = useAdminCustomer(state => state.getAllCustomerData);
    const getProductData = useAdminProduct(state => state.getProductData);
    const getAllBuyData = useClientBuy(state => state.getAllBuyData);


    const navigate = useNavigate();

    const [adminCredential, setAdminCredentials] = useState({
        username: '',
        password: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminCredentials({ ...adminCredential, [name]: value });
    };

    const handleSubmitFunc = () => {
       insertAdminLoginData({adminCredential});
    }

    useEffect(() => {
        if (isAdminLogin === true) {

            navigate('/admin/mainpage');
            getAllBuyData();
            getProductData();
            getAllCustomerData();
            clearIsAdminLogin();

        }
        if (isAdminLogin === false) {
           clearIsAdminLogin();
        }
    }, [isAdminLogin])

    console.log(isAdminLogin);

    return (
        <section className="relative h-screen w-screen flex items-center justify-center 
        bg-[url('../asset/loginregisterbg/loginregisterbg.png')] bg-no-repeat bg-cover bg-center
        ">

        <div className="absolute bg-black/25 inset-0 backdrop-blur-md"></div>


            <div className="z-10 h-fit w-[20rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">
                <h3 className="text-center text-3xl font-semibold">Login Admin</h3>

                <TextField
                    label={'Enter Username'}
                    name={'username'}
                    value={adminCredential.username}
                    onChange={handleInputChange}
                />

                <PasswordField
                    label={'Enter Password'}
                    name="password"
                    onChange={handleInputChange}
                    value={adminCredential.password}
                />

                <PrimaryButton text={'Admin Login'} onClick={handleSubmitFunc} />

            </div>
        </section>
    )
}
