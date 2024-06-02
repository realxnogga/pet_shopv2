

import { AdminHamburger } from "../../component/admin/adminhamburger"
import { useSelector } from "react-redux";
import { allClientDataTemp } from "../../feature/admin/admincustomerSlice";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ReactTooltip from 'react-tooltip';
import { DeleteCustomerDataThunk } from "../../feature/admin/admincustomerSlice";
import { useDispatch } from "react-redux";
import { clearIsCustomerDataDeleted } from "../../feature/admin/admincustomerSlice";
import { isCustomerDataDeletedTemp } from "../../feature/admin/admincustomerSlice";
import { useEffect } from "react";
import { ShowToast } from "../../component/admin/toaster";
import { GetAllCustomerDataThunk } from "../../feature/admin/admincustomerSlice";


export const AdminCustomer = () => {

    const dispatch = useDispatch();

    const allClientData = useSelector(allClientDataTemp);

    const DeleteCustomerFunc = (clientID, clientprofile) => {
        dispatch(DeleteCustomerDataThunk({clientID, clientprofile}));   
    }
    const isCustomerDataDeleted = useSelector(isCustomerDataDeletedTemp);
    useEffect(() => {
        if (isCustomerDataDeleted === true) {
            ShowToast('customer deleted successfully', 'success');
           dispatch(GetAllCustomerDataThunk());
           dispatch(clearIsCustomerDataDeleted());
        }
    }, [isCustomerDataDeleted])

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <AdminHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">


                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    <table className="w-full bg-white">
                        <tr className="bg-blue-400 sticky top-0">
                            <td className="border font-semibold text-left p-[.6rem]">Customer ID</td>
                            <td className="border font-semibold text-left p-[.6rem]">Customer Profile</td>
                            <td className="border font-semibold text-left p-[.6rem]">Customer Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Join Date</td>
                            <td className="border font-semibold text-left p-[.6rem]">Customer Address</td>
                            <td className="border font-semibold text-left p-[.6rem]">Action</td>
                        </tr>

                        {allClientData.map(item => (
                            <tr key={item.clientID}>
                                <td className="border px-2">{item.clientID}</td>
                                <td className="border flex items-center justify-center">
                                    <img src={`../../asset/client/clientprofile/${item.clientprofile}`} alt="" className="h-[5rem]" />
                                </td>
                                <td className="border px-2">{item.clientusername}</td>
                                <td className="border px-2">{item.joindate}</td>
                                <td className="border px-2">{item.clientaddress}</td>
                                <td className="border px-2">
                                <div className="flex items-center justify-evenly w-full h-full ">             
                                        <RiDeleteBin5Fill onClick={() => {DeleteCustomerFunc(item.clientID, item.clientprofile)}} data-type="info" data-tip="Delete" className="text-3xl p-1 bg-red-500 hover:bg-red-400 rounded-sm text-white" />
                                        <ReactTooltip />
                                    </div>
                                </td>

                            
                            </tr>
                        ))}

                    </table>

                </div>
            </div>

        </section>
    )
}