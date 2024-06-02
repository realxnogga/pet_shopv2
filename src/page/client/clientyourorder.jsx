
import { useDispatch, useSelector } from "react-redux"
import { ClientHamburger } from "../../component/client/clienthamburger"
import { buyProductDataTemp, isBuyDataStatusUpdatedTemp } from "../../feature/client/clientbuySlice"
import { useEffect } from "react";
import { UpdateBuyDataStatusThunk } from "../../feature/client/clientbuySlice";
import { GetBuyDataThunk } from "../../feature/client/clientbuySlice";
import { userDataTemp } from "../../feature/client/clientloginSlice";
import { clearIsBuyDataStatusUpdated } from "../../feature/client/clientbuySlice";
import { FaCheck } from "react-icons/fa6";

export const ClientYourOrder = () => {
    const dispatch = useDispatch();

    const userdata = useSelector(userDataTemp);
    if (Object.keys(userdata).length != 0) {
        var clientusername = userdata.clientusername;  
    }
    
    const buyProductData = useSelector(buyProductDataTemp);

    const handleRecieveFunc = (buyproductID) => {

        dispatch(UpdateBuyDataStatusThunk(buyproductID));
        console.log(buyproductID)
    }

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
                            <td className="border font-semibold text-left p-[.6rem]">Order Status</td>
                        </tr>

                        {buyProductData.map(item => (
                            <tr key={item.clientID}>
                                <td className="border px-2">{item.productname}</td>
                                <td className="border px-2">{item.productsize}</td>
                                <td className="border px-2">{item.productquantity}</td>
                                <td className="border px-2">{item.producttotalprice}</td>
                                <td className="border px-2">{item.orderdate}</td>
                                <td className="border flex items-center justify-center p-2">
                                 {
                                    item.orderstatus === 'not recieve' ?
                                    (
                                        <button onClick={() => { handleRecieveFunc(item.buyproductID) }} className={`bg-gray-400 px-3 py-1 text-white`}>Not Recieved</button>
                                    )
                                    :
                                    (
                                        <button onClick={() => { handleRecieveFunc(item.buyproductID) }} className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>Recieved<FaCheck /></button>
                                    )
                                 }
                                </td>
                            </tr>
                        ))}
                    </table>

                </div>
            </div>

        </section>
    )
}