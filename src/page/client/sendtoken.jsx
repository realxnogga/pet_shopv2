import { useEffect, useState } from "react"
import { clearIsTokenMatch, SendTokenThunk } from "../../feature/client/changepassword";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmailSendTemp } from "../../feature/client/changepassword";
import { clearIsEmailSend } from "../../feature/client/changepassword";
import { VerifyTokenThunk } from "../../feature/client/changepassword";
import { isTokenMatchTemp } from "../../feature/client/changepassword";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../component/admin/toaster";

export const SendToken = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailAppPassword, setEmailAppPassword] = useState('');

    const handleSendTokenFunc = () => {
        const emailtemp = {
            email: email,
            emailapppassword: emailAppPassword,
        }
        dispatch(SendTokenThunk({ emailtemp }));
    }

    var isEmailSend = useSelector(isEmailSendTemp);

    // ----------------------------------------------
    const [token, setToken] = useState('');

    const handleVerifyTokenFunc = () => {

        const tokentemp = {
            email: email,
            token: token,
        }
        dispatch(VerifyTokenThunk({ tokentemp }));
    }

    var isTokenMatch = useSelector(isTokenMatchTemp);

    useEffect(() => {
        if (isTokenMatch === true) {
            navigate('/resetpassword');
            dispatch(clearIsTokenMatch());
            ShowToast('Token match', 'success');
        }
        if (isTokenMatch === false) {
            dispatch(clearIsTokenMatch());
            ShowToast('Token does not match', 'error');
        }
    }, [isTokenMatch]);

    return (
        <section className="bg-gray-200 h-screen w-screen flex flex-col gap-y-2 items-center justify-center">

            <div className="z-10 h-fit w-[23rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">

                <div className="flex flex-col">
                    <label>Enter Email<span className='text-red-500'>*</span></label>
                    <input type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        name="email"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label>Enter Email's App Password<span className='text-red-500'>*</span></label>
                    <input type="text"
                        value={emailAppPassword}
                        onChange={(e) => { setEmailAppPassword(e.target.value) }}
                        name="emailAppPassword"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <button onClick={handleSendTokenFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Send Token</button>

                <p onClick={() => { dispatch(clearIsEmailSend()) }} className="hover:text-blue-500 cursor-pointer underline"><NavLink to={'/'}> Login</NavLink></p>
            </div>



            {
                isEmailSend.bool === true ?
                    (
                        <>
                            <p className="text-green-500">{isEmailSend.message}</p>
                            <div className="z-10 h-fit w-[23rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">

                                <div className="flex flex-col">
                                    <label>Please enter the token that we have sent to your email<span className='text-red-500'>*</span></label>
                                    <input type="text"
                                        value={token}
                                        onChange={(e) => { setToken(e.target.value) }}
                                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                                </div>

                                <button onClick={handleVerifyTokenFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Verify</button>

                            </div>

                        </>
                    )
                    :
                    (
                        isEmailSend.bool === false ? <p className="text-red-500">{isEmailSend.message}</p> : ''
                    )
            }














        </section>
    )
}

