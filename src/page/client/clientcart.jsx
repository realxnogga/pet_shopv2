


import { ClientHamburger } from "../../component/client/clienthamburger"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCartProductDataTemp } from "../../feature/client/addtocartSlice";
import { useState } from "react";
import { ClientViewProductModal1 } from "../../component/client/clientviewproductmodal1";
import { IoSearch } from "react-icons/io5";
import { Empty } from "../../component/client/empty";

export const ClientCart = () => {
    const dispatch = useDispatch();

    const addToCartProductData = useSelector(addToCartProductDataTemp);

    const [selectedProduct, setSelectedProduct] = useState([]);
    const GetSelectedProductFunc = (addtocartprimarykey) => {
        let selectedProductTemp = addToCartProductData.filter(item => item.addtocartprimarykey === addtocartprimarykey);
        setSelectedProduct(selectedProductTemp);
    };


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChangeFunc = (e) => {
        setSearchQuery(e.target.value)
    }
    const filteredAddToCardData = addToCartProductData.filter(item => {
        const temp = item.addtocartproductname.toLowerCase().includes(searchQuery.toLowerCase()); 
        return temp;   
    });

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">

                <div className='flex justify-end'>
                    <IoSearch className='h-[2.5rem] w-[2.5rem] p-[.5rem] bg-white' />
                    <input
                        value={searchQuery}
                        onChange={handleSearchQueryChangeFunc}
                        type="text"
                        placeholder='search product name'
                        className="h-[2.5rem] rounded-sm outline-none" />
                </div>

                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    {
                        filteredAddToCardData.length === 0 ?
                        (
                            <Empty design={`border border-gray-500 rounded-lg `} text1={'Nothing to show'} text2={'Its empty here, you can choose other product name.'}/> 
                        )
                        :
                        (
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
    
                            {filteredAddToCardData.map(item => (
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
                                        <button onClick={() => { GetSelectedProductFunc(item.addtocartprimarykey); document.getElementById('viewProductModal').showModal(); }} className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>View sample
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        )
                    }        
                </div>
            </div>
            <ClientViewProductModal1 selectedProduct={selectedProduct} />
        </section>
    )
}