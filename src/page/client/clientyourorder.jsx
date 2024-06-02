
import { useDispatch, useSelector } from "react-redux"
import { ClientHamburger } from "../../component/client/clienthamburger"
import { buyProductDataTemp } from "../../feature/client/clientbuySlice"

export const ClientYourOrder = () => {

    const dispatch = useDispatch();
    const buyProductData = useSelector(buyProductDataTemp);

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
                            <td className="border font-semibold text-left p-[.6rem]">status</td>
                        </tr>

                        {buyProductData.map(item => (
                            <tr key={item.clientID}>
                                <td className="border px-2">{item.productname}</td>
                                <td className="border px-2">{item.productsize}</td>
                                <td className="border px-2">{item.productquantity}</td>
                                <td className="border px-2">{item.producttotalprice}</td>
                                <td className="border px-2">{item.orderdate}</td>
                                <td className="border flex items-center justify-center p-2">
                                    <button className="bg-green-500 px-3 py-1 text-white">Recieved</button>
                                </td>
                              

                            </tr>
                        ))}

                    </table>

                </div>
            </div>

        </section>
    )
}