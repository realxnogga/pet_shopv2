// ClientHome.js
import React, { useEffect, useState } from 'react';
import { ClientHamburger } from "../../component/client/clienthamburger";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { fetchedProductDataTemp, GetProductDataThunk } from '../../feature/admin/adminproductSlice';
import { ClientViewProductModal } from '../../component/client/clientviewproductmodal';
import { ratingDataTemp } from '../../feature/client/ratingSlice';
import { IoCloseSharp } from "react-icons/io5";
import { Empty } from '../../component/client/empty';

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
    //------------------------------------------------

    const ratingData = useSelector(ratingDataTemp);

    const [ratingProduct, setRatingProduct] = useState([]);

    const [minStar, setMinStar] = useState(0);
    const [maxStar, setMaxStar] = useState(0);
    const [aveStar, setAveStar] = useState(0);

    const handleViewRatingFunc = (productID) => {
        let ratingProductTemp = ratingData.filter(item => item.ratingproductID === productID);
        const totalStar = ratingProductTemp.reduce((sum, item) => sum + parseInt(item.star), 0);
        var averageStar = ratingProductTemp.length > 0 ? (totalStar / ratingProductTemp.length).toFixed(1) : 0;

        const starRatings = ratingProductTemp.map(item => parseInt(item.star));
        const minStar = starRatings.length > 0 ? Math.min(...starRatings) : 0;
        const maxStar = starRatings.length > 0 ? Math.max(...starRatings) : 0;

        setMinStar(minStar)
        setMaxStar(maxStar)
        setAveStar(averageStar);
        setRatingProduct(ratingProductTemp);
        document.getElementById('viewRatingModal').showModal();
    }


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

                            <Empty text1={'Nothing to show'} text2={'Its empty here, you can choose another product category.'} />
                           
                        ) : (
                            // Assuming ratingData is available in the context or props
                            filteredProductData.map(item => {

                                const ratingTemp = ratingData.filter(ratingitem => ratingitem.ratingproductID === item.productID);

                                const totalStar = ratingTemp.reduce((sum, item) => sum + parseInt(item.star), 0);

                                var averageStar = ratingTemp.length > 0 ? totalStar / ratingTemp.length : 0;

                                var element = '';
                                for (let index = 0; index < averageStar; index++) {
                                    element += '⭐';
                                }

                                return (
                                    <div key={item.productID} className='h-fit w-[16rem] rounded-lg overflow-hidden shadow-xl bg-white'>
                                        <div className={`h-[12rem] w-full bg-cover bg-center bg-[url('../../asset/admin/productimage/${item.productimage}')]`}></div>
                                        <div className='bg-blue-100 h-fit w-full font-semibold p-4'>

                                            <div className='flex items-center justify-between '>
                                                <p className='text-sm'>{averageStar === 0 ? <p className='text-gray-400 italic font-thin'>No Ratings Yet</p> : element}</p>

                                                <p onClick={() => handleViewRatingFunc(item.productID)} className='text-sm cursor-pointer hover:text-blue-500'>View Review</p>
                                            </div>



                                            <p className='text-xl font-semibold'>{item.productname}</p>
                                            <p className='text-blue-500'>₱{item.productprice}</p>
                                            <p className='text-sm text-gray-400'>Stock:{item.productstock}</p>
                                            <button
                                                onClick={() => {
                                                    GetSelectedProductFunc(item.productID);
                                                    document.getElementById('viewProductModal').showModal()
                                                }}
                                                className='bg-blue-500 hover:bg-blue-400 rounded-sm p-2 mt-1 text-xs text-white'
                                            >
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                );
                            })

                        )}
                    </div>
                </div>
            </div>

            {/* view rating modal */}
            <dialog id="viewRatingModal" className="modal">
                <div className="modal-box bg-gray-200 h-full w-full max-h-full max-w-full rounded-none p-0 flex flex-col gap-y-4 items-center justify-start pt-[3rem]">
                    <IoCloseSharp onClick={() => { document.getElementById('viewRatingModal').close(); }} className="absolute top-4 right-4 text-2xl hover:bg-red-500" />

                    <div className='bg-white rounded-lg shadow-xl w-[60rem] h-[4rem] flex items-center justify-around'>

                        <div className='flex items-end'>
                            <p className='text-3xl font-bold text-gray-800'>{aveStar}/5</p>
                            <p>({ratingProduct.length}ratings)</p>
                        </div>

                        <p className='text-lg font-semibold'>Highest Star : {maxStar}</p>
                        <p className='text-lg font-semibold'>Lowest Star : {minStar}</p>

                    </div>

                    <div className='bg-white rounded-lg shadow-xl w-[60rem] h-fit max-h-[30rem] overflow-y-scroll noScrollbar'>
                        {
                            ratingProduct.map(item => {


                                var allstar = allstar + item.star;

                                var element = '';
                                for (let index = 0; index < item.star; index++) {
                                    element += '⭐';
                                }

                                return (
                                    <div className='border-b p-5'>
                                        <div className='flex items-center justify-between'>
                                            <p>{element}</p>
                                            <p>{item.commentdate}</p>
                                        </div>
                                        <p className='text-gray-500 '>{item.commenter}</p>
                                        <p className='text-xl'>{item.comment}</p>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </dialog>

            <ClientViewProductModal selectedProduct={selectedProduct} />

        </section>
    );
};
