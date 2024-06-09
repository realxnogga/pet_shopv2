

import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa6";
import { allBuyProductDataTemp } from "../../feature/client/clientbuySlice";
import { AdminHamburger } from "../../component/admin/adminhamburger";
import { useEffect, useState } from "react";
import { Empty } from "../../component/client/empty";

export const AdminOrder = () => {
    const allBuyProductData = useSelector(allBuyProductDataTemp);

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateNow = `${year}-${month}-${day}`;

    const [dateValue, setDateValue] = useState(dateNow);

    const handleDateChangeFunc = (e) => {
        setDateValue(e.target.value);
    };

    const filteredAllBuyProductData = allBuyProductData.filter(item => {
        const temp = item.orderdate === dateValue; 
        return temp;   
    });

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <AdminHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">

                <div className="w-full flex justify-end">
                    <input className="p-2" value={dateValue} onChange={handleDateChangeFunc} type="date" />
                </div>

                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    {
                        filteredAllBuyProductData.length === 0 ?
                        (       
                           <Empty design={`border border-gray-500 rounded-lg `} text1={'Nothing to show'} text2={'Its empty here, you can choose other day.'}/>       
                        )
                        :
                        (
                            <table className="w-full bg-white">
                            <tr className="bg-blue-400 sticky top-0">
                                <td className="border font-semibold text-left p-[.6rem]">Customer Name</td>
                                <td className="border font-semibold text-left p-[.6rem]">Product Name</td>
                                <td className="border font-semibold text-left p-[.6rem]">Product size</td>
                                <td className="border font-semibold text-left p-[.6rem]">Product Quantity</td>
                                <td className="border font-semibold text-left p-[.6rem]">Product Total Price</td>
                                <td className="border font-semibold text-left p-[.6rem]">Order Date</td>
                                <td className="border font-semibold text-left p-[.6rem]">Customer Address</td>
                                <td className="border font-semibold text-left p-[.6rem]">Payment Method</td>
                                <td className="border font-semibold text-left p-[.6rem]">Order Status</td>
                            </tr>
    
                            {filteredAllBuyProductData.map(item => (
                                <tr key={item.buyproductprimarykey}>
                                    <td className="border px-2">{item.clientusername}</td>
                                    <td className="border px-2">{item.productname}</td>
                                    <td className="border px-2">{item.productsize}</td>
                                    <td className="border px-2">{item.productquantity}</td>
                                    <td className="border px-2">{item.producttotalprice}</td>
                                    <td className="border px-2">{item.orderdate}</td>
                                    <td className="border px-2">{item.clientaddress}</td>
                                    <td className="border px-2">{item.paymentmethod}</td>
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
                        )
                    
                    }

                </div>
            </div>

        </section>
    )
}