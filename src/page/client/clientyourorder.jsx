
import { useDispatch, useSelector } from "react-redux"
import { ClientHamburger } from "../../component/client/clienthamburger"
import { buyProductDataTemp, isBuyDataStatusUpdatedTemp } from "../../feature/client/clientbuySlice"
import { useEffect, useState } from "react";
import { UpdateBuyDataStatusThunk } from "../../feature/client/clientbuySlice";
import { GetBuyDataThunk } from "../../feature/client/clientbuySlice";
import { userDataTemp } from "../../feature/client/clientloginSlice";
import { clearIsBuyDataStatusUpdated } from "../../feature/client/clientbuySlice";
import { FaCheck } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";


export const ClientYourOrder = () => {
    const dispatch = useDispatch();

    const userdata = useSelector(userDataTemp);
    if (Object.keys(userdata).length != 0) {
        var clientusername = userdata.clientusername;
    }

    const buyProductData = useSelector(buyProductDataTemp);

    const [idToRecieve, setIdToRecieve] = useState(0);

    const handleRecieveFunc = () => {
        dispatch(UpdateBuyDataStatusThunk(idToRecieve));     
    }

    console.log(idToRecieve);

    const isBuyDataStatusUpdated = useSelector(isBuyDataStatusUpdatedTemp);

    useEffect(() => {
        if (isBuyDataStatusUpdated === true) {
            dispatch(GetBuyDataThunk(clientusername));
            dispatch(clearIsBuyDataStatusUpdated());
        }
        if (isBuyDataStatusUpdated === false) {
            dispatch(clearIsBuyDataStatusUpdated());
        }
    }, [isBuyDataStatusUpdated])


    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">


                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    <table className="w-full bg-white">
                        <tr className="bg-blue-400 sticky top-0">
                            <td className="border font-semibold text-left p-[.6rem]">Product Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product size</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Quantity</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Total Price</td>
                            <td className="border font-semibold text-left p-[.6rem]">Order Date</td>
                            <td className="border font-semibold text-left p-[.6rem]">Your Address</td>
                            <td className="border font-semibold text-left p-[.6rem]">Order Status</td>
                        </tr>

                        {buyProductData.map(item => (
                            <tr key={item.clientID}>
                                <td className="border px-2">{item.productname}</td>
                                <td className="border px-2">{item.productsize}</td>
                                <td className="border px-2">{item.productquantity}</td>
                                <td className="border px-2">{item.producttotalprice}</td>
                                <td className="border px-2">{item.orderdate}</td>
                                <td className="border px-2">{item.clientaddress}</td>
                                <td className="border flex items-center justify-center p-2">
                                    {
                                        item.orderstatus === 'not recieve' ?
                                            (
                                                <button onClick={() => { setIdToRecieve(item.buyproductprimarykey); document.getElementById('confirmRecieveModal').showModal(); }} className={`bg-gray-400 px-3 py-1 text-white`}>To Recieve</button>
                                            )
                                            :
                                            (
                                                <button className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>Recieved<FaCheck /></button>
                                            )
                                    }
                                </td>
                            </tr>
                        ))}
                    </table>

                </div>
            </div>

            <dialog id="confirmRecieveModal" className="modal">
                <div className="modal-box w-full rounded-none p-0 flex flex-col gap-y-4 items-center justify-center p-5 rounded-xl">
                <IoCloseSharp onClick={() => {document.getElementById('confirmRecieveModal').close();}} className="absolute top-4 right-4 text-2xl hover:bg-red-500"/>
                    <MdCheckCircleOutline className="text-[10rem]"/>
                    <p className="text-4xl font-bold">Confirm</p>
                    <button
                    className="bg-blue-500 px-7 py-2 rounded-lg hover:bg-blue-400 text-xl font-semibold text-white"
                     onClick={() => {
                        handleRecieveFunc();
                        document.getElementById('confirmRecieveModal').close();
                    }}>
                        Yes
                    </button>
                </div>
            </dialog>

        </section>
    )
}