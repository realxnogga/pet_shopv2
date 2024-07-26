
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearIsEmailSend } from "../../feature/client/changepassword";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../component/admin/toaster";
import { emailTemp } from "../../feature/client/changepassword";
import { ChangePasswordThunk } from "../../feature/client/changepassword";
import { isPasswordChangeTemp } from "../../feature/client/changepassword";
import { clearIsPasswordChange } from "../../feature/client/changepassword";

export const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const email = useSelector(emailTemp);

    const handleUpadatePassword = () => {
        if (password != confirmPassword) {
            ShowToast('password mismatch', 'warning');
        }
        else {
            const passwordtemp = {
                email: email,
                password: password,
            }
            dispatch(ChangePasswordThunk({ passwordtemp }));
        }
    }

    const isPasswordChange = useSelector(isPasswordChangeTemp);

    useEffect(() => {
        if (isPasswordChange === true) {
            ShowToast('password change successfully', 'success');
            dispatch(clearIsPasswordChange());
            dispatch(clearIsEmailSend());
            navigate('/');
        }
        if (isPasswordChange === false) {
            ShowToast('faied to change password', 'error');
            dispatch(clearIsPasswordChange());
            dispatch(clearIsEmailSend());
        }

    }, [isPasswordChange]);

    return (
        <section className="bg-gray-200 h-screen w-screen flex flex-col gap-y-2 items-center justify-center">

            <div className="z-10 h-fit w-[23rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">

                <div className="flex flex-col">
                    <label>Enter Password<span className='text-red-500'>*</span></label>
                    <input type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        name="password"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label>Confirm Password<span className='text-red-500'>*</span></label>
                    <input type="password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        name="confirmPassword"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <button onClick={handleUpadatePassword} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Change Password</button>

                <p onClick={() => { dispatch(clearIsEmailSend()) }} className="hover:text-blue-500 cursor-pointer underline"><NavLink to={'/'}> Login</NavLink></p>
            </div>

        </section>
    )
}