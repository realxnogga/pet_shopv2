// ClientHome.js
import React, { useEffect, useState } from 'react';
import { ClientHamburger } from "../../component/client/clienthamburger";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { fetchedProductDataTemp, GetProductDataThunk } from '../../feature/admin/adminproductSlice';
import { ClientViewProductModal } from '../../component/client/clientviewproductmodal';


export const ClientHome = () => {
    const dispatch = useDispatch();
    const fetchedProductData = useSelector(fetchedProductDataTemp);
    const [searchQuery, setSearchQuery] = useState('');
    const [productFilter, setProductFilter] = useState('all');

    const filteredProductData = fetchedProductData.filter(item => {
        const matchesSearchQuery = item.productname.toLowerCase().includes(searchQuery.toLowerCase());
        const allProductFilter = productFilter === 'all' || item.productcategory.toLowerCase() === productFilter.toLowerCase();
        return matchesSearchQuery && allProductFilter;
    });

    const [selectedProduct, setSelectedProduct] = useState([]);
    const GetSelectedProductFunc = (productID) => {
        let selectedProductTemp = filteredProductData.filter(item => item.productID === productID);
        setSelectedProduct(selectedProductTemp);
    };

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />
            <div className="h-[95%] w-[68rem] flex flex-col gap-y-4">
                <div className="w-full flex justify-end">
                    <div className='flex border border-gray-400'>
                        <IoSearch className='h-[2.5rem] w-[2.5rem] p-[.5rem] bg-white' />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder='search product name'
                            className="h-[2.5rem] rounded-sm outline-none" />
                    </div>
                </div>
                <div className="h-full w-full overflow-y-scroll noScrollbar">
                    <div className={`sticky top-0 bg-white h-[2.5rem] w-full overflow-scroll noScrollbar`}>
                        <ul className={`flex h-full w-full text-sm text-black text-nowrap`}>
                            <li onClick={() => setProductFilter('all')} className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>All</li>
                            <li onClick={() => setProductFilter('Dog Food')} className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Dog Food</li>
                            <li onClick={() => setProductFilter('Cat Food')} className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Cat Food</li>
                            <li onClick={() => setProductFilter('Bird Food')} className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Bird Food</li>
                            <li onClick={() => setProductFilter('Vitamins/Supplements')} className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Vitamins/Supplements</li>
                            <li onClick={() => setProductFilter('Flea/Tick Control')} className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Flea/Tick Control</li>
                            <li onClick={() => setProductFilter('Grooming Supplies')} className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Grooming Supplies</li>
                        </ul>
                    </div>
                    <div className='h-[calc(100%-(2.5rem+1rem))] w-full mt-[1rem] flex items-start flex-wrap gap-5'>
                        {filteredProductData.length === 0 ? (
                            <div className='h-full w-full flex flex-col items-center justify-center'>
                                <img src="../../asset/emptyImg/emptyImg.png" alt="" className='h-[18rem]' />
                                <h3 className={`text-gray-800 text-[2.5rem] font-bold mobile:text-[2rem]`}>Nothing to show</h3>
                                <span className="text-gray-800">It's empty here, you can choose another product category.</span>
                            </div>
                        ) : (
                            filteredProductData.map(item => (
                                <div key={item.productID} className='h-fit w-[16rem] rounded-lg overflow-hidden shadow-xl bg-white'>
                                    <div className={`h-[12rem] w-full bg-cover bg-center bg-[url('../../asset/admin/productimage/${item.productimage}')]`}></div>
                                    <div className='bg-blue-100 h-fit w-full font-semibold p-4'>
                                        <p className='text-xl font-semibold'>{item.productname}</p>
                                        <p className='text-blue-500'>₱{item.productprice}</p>
                                        <p className='text-sm text-gray-400'>Stock:{item.productstock}</p>
                                        <button onClick={() => { GetSelectedProductFunc(item.productID); document.getElementById('viewProductModal').showModal() }} className='bg-blue-500 hover:bg-blue-400 rounded-sm p-2 mt-1 text-xs text-white'>View More</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <ClientViewProductModal selectedProduct={selectedProduct} />

        </section>
    );
};
