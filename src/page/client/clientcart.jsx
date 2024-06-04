


import { ClientHamburger } from "../../component/client/clienthamburger"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCartProductDataTemp } from "../../feature/client/addtocartSlice";


export const ClientCart = () => {
    const dispatch = useDispatch();

    const addToCartProductData = useSelector(addToCartProductDataTemp);


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

                        {addToCartProductData.map(item => (
                            <tr key={item.clientID}>
                                <td className="border px-2">{item.addtocartproductname}</td>
                                <td className="border px-2">{item.addtocartproductsize}</td>
                                <td className="border px-2">{item.addtocartproductquantity}</td>
                                <td className="border px-2">{item.addtocartproducttotalprice}</td>
                                <td className="border px-2">{item.addtocartdate}</td>
                                <td className="border px-2">{item.clientaddress}</td>
                                <td className="border flex items-center justify-center p-2">
                                    <button className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>

                </div>
            </div>

        </section>
    )
}