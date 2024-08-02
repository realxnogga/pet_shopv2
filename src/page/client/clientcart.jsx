


import { ClientHamburger } from "../../component/client/clienthamburger"
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Empty } from "../../component/client/empty";
import { useClientAddToCart } from "../../store/client/clientaddtocardstore";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import { useNavigate } from "react-router-dom";

export const ClientCart = () => {

    const navigate = useNavigate();

    const getProductIDForViewMore = useAdminProduct(state => state.getProductIDForViewMore);

    const addToCartProductData = useClientAddToCart(state => state.addToCartProductData);
 
    console.log(addToCartProductData);

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

            <div className="h-[95%] w-[70rem] max-w-[95%] flex flex-col gap-y-4">

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
                                <Empty design={`border border-gray-500 rounded-lg `} text1={'Nothing to show'} text2={'Its empty here, you can choose other product name.'} />
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
     <button onClick={() => {getProductIDForViewMore(item.addtocartproductID, 'cartpage'); navigate('/viewproduct')}} className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>View
                                                </button>
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