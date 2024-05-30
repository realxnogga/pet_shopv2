
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { AuthAdminThunk } from "../feature/admin/loginSlice"
import { isAdminAuthTemp } from "../feature/admin/loginSlice";
import { clearIsAdminAuth } from "../feature/admin/loginSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [adminCredential, setAdminCredentials] = useState({
        username: '',
        password: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminCredentials({
            ...adminCredential,
            [name]: value,
        });
    };

    const handleSubmitFunc = () => {

        dispatch(AuthAdminThunk({
            username: adminCredential.username,
            password: adminCredential.password,
        }));
    }

    const isAdminAuth = useSelector(isAdminAuthTemp);
    useEffect(() => {
        if (isAdminAuth === true) {

            navigate('/admin/mainpage');
            dispatch(clearIsAdminAuth());
        }
        if (isAdminAuth === false) {

            dispatch(clearIsAdminAuth());
        }

    }, [isAdminAuth])

    const [showPassword, setShowPassword] = useState(false)

    const showpassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <section className="h-screen w-screen flex items-center justify-center relative">

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('../asset/admin/loginbg/animalbg.jpg')] bg-no-repeat bg-cover bg-center filter blur-sm"></div>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>

            {/* Login Form */}
            <div className="z-10 h-fit w-[20rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">
                <div className="flex flex-col">
                    <label htmlFor="username">Enter Username</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        value={adminCredential.username}
                        className="h-[2.5rem] rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="password"
                        onChange={handleInputChange}
                        value={adminCredential.password}
                        className="h-[2.5rem] rounded-sm border border-gray-400 px-2" />

                    <div className='flex items-center gap-x-2'>
                        <input onClick={showpassword} type="checkbox" />
                        <p className='text-[.8rem] text-gray-400'>show password</p>
                    </div>
                </div>

                <button onClick={handleSubmitFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Login Admin</button>
            </div>
        </section>
    )
}
