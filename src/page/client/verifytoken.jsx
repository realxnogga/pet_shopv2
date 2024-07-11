
import { useSelector } from "react-redux";
import { emailTemp } from "../../feature/client/changepassword";
import { useNavigate } from "react-router-dom";
import { VerifyTokenThunk } from "../../feature/client/changepassword";
import { clearIsTokenMatch } from "../../feature/client/changepassword";
import { isTokenMatchTemp } from "../../feature/client/changepassword";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ShowToast } from "../../component/admin/toaster";

export const VerifyToken = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useSelector(emailTemp);

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
    )
}