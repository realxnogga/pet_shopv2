


import { ClientHamburger } from "../../component/client/clienthamburger"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCartProductDataTemp } from "../../feature/client/addtocartSlice";
import { useState } from "react";
import { ClientViewProductModal1 } from "../../component/client/clientviewproductmodal1";

export const ClientCart = () => {
    const dispatch = useDispatch();

    const addToCartProductData = useSelector(addToCartProductDataTemp);

    const [selectedProduct, setSelectedProduct] = useState([]);
    const GetSelectedProductFunc = (addtocartprimarykey) => {
        let selectedProductTemp = addToCartProductData.filter(item => item.addtocartprimarykey === addtocartprimarykey);
        setSelectedProduct(selectedProductTemp);
    };

    console.log(selectedProduct)

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">


                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    <table className="w-full bg-white">
                        <tr className="bg-blue-400 sticky top-0">
                            <td className="border font-semibold text-left p-[.6rem]">Product ID</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Size</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Stock</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Price</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Description</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Category</td>
                            <td className="border font-semibold text-left p-[.6rem]">Add to Cart Date</td>
                            <td className="border font-semibold text-left p-[.6rem]">Order Status</td>
                        </tr>

                        {addToCartProductData.map(item => (
                            <tr key={item.addtocartprimarykey}>
                               <td className="border px-2">{item.addtocartproductID}</td>
                                <td className="border px-2">{item.addtocartproductname}</td>
                                <td className="border px-2">{item.addtocartproductsize}</td>
                                <td className="border px-2">{item.addtocartproductstock}</td>
                                <td className="border px-2">{item.addtocartproductprice}</td>
                                <td className="border px-2">{item.addtocartproductdescription}</td>
                                <td className="border px-2">{item.addtocartproductcategory}</td>
                                <td className="border px-2">{item.addtocartproductcreationdate}</td>
                                <td className="border flex items-center justify-center p-2">
                                    <button onClick={() => {GetSelectedProductFunc(item.addtocartprimarykey); document.getElementById('viewProductModal').showModal();}} className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>

                </div>
            </div>
            <ClientViewProductModal1 selectedProduct={selectedProduct} />
        </section>
    )
}