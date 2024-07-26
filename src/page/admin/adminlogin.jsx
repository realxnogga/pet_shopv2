
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { AuthAdminThunk } from "../../feature/admin/loginSlice"
import { isAdminAuthTemp } from "../../feature/admin/loginSlice";
import { clearIsAdminAuth } from "../../feature/admin/loginSlice";
import { useNavigate } from "react-router-dom";
import { GetProductDataThunk } from "../../feature/admin/adminproductSlice";
import { GetAllCustomerDataThunk } from "../../feature/admin/admincustomerSlice";
import { GetAllBuyDataThunk } from "../../feature/client/clientbuySlice";
import { TextField, PasswordField } from "../../component/shared/inputfield";
import { PrimaryButton } from "../../component/shared/button";

export const AdminLogin = () => {

    const dispatch = useDispatch();
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
        dispatch(AuthAdminThunk({ adminCredential }));
    }

    const isAdminAuth = useSelector(isAdminAuthTemp);
    useEffect(() => {
        if (isAdminAuth === true) {

            navigate('/admin/mainpage');
            dispatch(clearIsAdminAuth());
            dispatch(GetProductDataThunk());
            dispatch(GetAllCustomerDataThunk());
            dispatch(GetAllBuyDataThunk());

        }
        if (isAdminAuth === false) {
            dispatch(clearIsAdminAuth());
        }
    }, [isAdminAuth])

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
