

import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa6";
import { allBuyProductDataTemp } from "../../feature/client/clientbuySlice";
import { AdminHamburger } from "../../component/admin/adminhamburger";

export const AdminOrder = () => {
    const allBuyProductData = useSelector(allBuyProductDataTemp);

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <AdminHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">


                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    <table className="w-full bg-white">
                        <tr className="bg-blue-400 sticky top-0">
                            <td className="border font-semibold text-left p-[.6rem]">Customer Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product size</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Quantity</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Total Price</td>
                            <td className="border font-semibold text-left p-[.6rem]">Order Date</td>
                            <td className="border font-semibold text-left p-[.6rem]">Order Status</td>
                        </tr>

                        {allBuyProductData.map(item => (
                            <tr key={item.clientID}>
                                <td className="border px-2">{item.clientusername}</td>
                                <td className="border px-2">{item.productname}</td>
                                <td className="border px-2">{item.productsize}</td>
                                <td className="border px-2">{item.productquantity}</td>
                                <td className="border px-2">{item.producttotalprice}</td>
                                <td className="border px-2">{item.orderdate}</td>
                                <td className="border flex items-center justify-center p-2">
                                 {
                                    item.orderstatus === 'not recieve' ?
                                    (
                                        <button className={`bg-gray-400 px-3 py-1 text-white`}>Pending</button>
                                    )
                                    :
                                    (
                                        <button className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>Delivered<FaCheck /></button>
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