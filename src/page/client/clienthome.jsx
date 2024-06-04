

import React, { useEffect } from 'react';
import { ClientHamburger } from "../../component/client/clienthamburger";
import { IoSearch } from "react-icons/io5";
import { fetchedProductDataTemp } from '../../feature/admin/adminproductSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { GetProductDataThunk } from '../../feature/admin/adminproductSlice';
import { useDispatch } from 'react-redux';
import { InsertBuyDataThunk } from '../../feature/client/clientbuySlice';
import { userDataTemp } from '../../feature/client/clientloginSlice';
import { clearIsBuyDataInserted } from '../../feature/client/clientbuySlice';
import { isBuyDataInsertedTemp } from '../../feature/client/clientbuySlice';
import { ShowToast } from '../../component/admin/toaster';
import { GetBuyDataThunk } from '../../feature/client/clientbuySlice';
import { GetAllBuyDataThunk } from '../../feature/client/clientbuySlice';
import { UpdateProductStockThunk } from '../../feature/admin/adminproductSlice';
import { whatIsClickedInClientSidebarState } from '../../feature/client/clientsidebarSlice';

export const ClientHome = () => {
    const dispatch = useDispatch();

    const userdata = useSelector(userDataTemp);
    if (Object.keys(userdata).length != 0) {
        var clientID = userdata.clientID;
        var clientusername = userdata.clientusername;
        var clientprofile = userdata.clientprofile;
        var clientaddress = userdata.clientaddress;
    }

    // dispatch get product data whenever the admin add a new product
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
    }
    const [quantity, setQuantity] = useState(1);

     
    // for checkout button
    const handleCheckoutFunc = () => {
        selectedProduct.map(item => {
            const productID = item.productID;
            const productname = item.productname;
            const productsize = item.productsize;
            const producttotalstock = item.productstock - quantity;
            const productquantity = quantity;
            const producttotalprice = item.productprice * quantity;

            const buyDataTemp = {
                clientID: clientID,
                clientusername: clientusername,
                productname: productname,
                productsize: productsize,
                productquantity: productquantity,
                producttotalprice: producttotalprice,
                clientaddress: clientaddress,
            }
            dispatch(InsertBuyDataThunk({ buyDataTemp }));
            dispatch(UpdateProductStockThunk({ productID, producttotalstock }));
            
        });
    };

    const isBuyDataInserted = useSelector(isBuyDataInsertedTemp);
    useEffect(() => {
        if (isBuyDataInserted === true) {
            ShowToast('checkout success', 'success');
            document.getElementById('viewProductModal').close();
            dispatch(clearIsBuyDataInserted());

            dispatch(GetAllBuyDataThunk());
            dispatch(GetProductDataThunk()); //get all updated product after clicking the checkout btn
            dispatch(GetBuyDataThunk(clientusername));

            //if the checkout is sucesfull, it gonna navigate to "your order" tab
            dispatch(whatIsClickedInClientSidebarState('yourorder'))
            
        }
        if (isBuyDataInserted === false) {
            ShowToast('operation failed.', 'error');
            document.getElementById('viewProductModal').close();
            dispatch(clearIsBuyDataInserted());

        }
    }, [isBuyDataInserted])


    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />

            <div className="h-[95%] w-[68rem] flex flex-col gap-y-4">

                <div className="w-full flex justify-end ">
                    <div className='flex border border-gray-400'>
                        <IoSearch className='h-[2.5rem] w-[2.5rem] p-[.5rem] bg-white ' />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            name="userloginusername"
                            placeholder='search product name'
                            className="h-[2.5rem] rounded-sm outline-none" />
                    </div>

                </div>

                <div className="h-full w-full overflow-y-scroll noScrollbar">

                    <div className={`sticky top-0 bg-white h-[2.5rem] w-full overflow-scroll noScrollbar`}>
                        <ul className={`flex h-full w-full text-sm text-black text-nowrap`}>

                            <li onClick={() => { setProductFilter('all') }}
                                className={` relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>All
                            </li>

                            <li onClick={() => { setProductFilter('Dog Food') }}
                                className={` relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Dog Food
                            </li>

                            <li onClick={() => { setProductFilter('Cat Food') }}
                                className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Cat Food
                            </li>

                            <li onClick={() => { setProductFilter('Bird Food') }}
                                className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Bird Food
                            </li>

                            <li onClick={() => { setProductFilter('Vitamins/Supplements') }}
                                className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Vitamins/Supplements
                            </li>

                            <li onClick={() => { setProductFilter('Flea/Tick Control') }}
                                className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Flea/Tick Control
                            </li>

                            <li onClick={() => { setProductFilter('Grooming Supplies') }}
                                className={`relative h-full w-full px-5 hover:border-b-4 border-blue-500 cursor-pointer flex items-center justify-center`}>Grooming Supplies
                            </li>

                        </ul>

                    </div>

                    <div className='h-[calc(100%-(2.5rem+1rem))] w-full mt-[1rem] flex items-start flex-wrap gap-5'>
                        {
                            filteredProductData.length === 0 ?
                                (
                                    <div className='h-full w-full flex flex-col items-center justify-center'>
                                        <img src="../../asset/emptyImg/emptyImg.png" alt="" className='h-[18rem]' />
                                        <h3 className={`text-gray-800 text-[2.5rem] font-bold mobile:text-[2rem] `}>
                                            Nothing to show </h3>
                                        <span className="text-gray-800">It's empty here, you can choose another product category.</span>
                                    </div>
                                )
                                :
                                (
                                    filteredProductData.map(item => (
                                        <div key={item.productID} className='h-fit w-[14rem] rounded-lg overflow-hidden shadow-xl bg-white '>
                                            <div className={`h-[12rem] w-full bg-cover bg-center bg-[url('../../asset/admin/productimage/${item.productimage}')]`}>

                                            </div>
                                            <div className='bg-blue-100 h-fit w-full font-semibold p-4'>
                                                <p className='text-xl font-semibold'>{item.productname}</p>
                                                <p className='text-blue-500'>₱{item.productprice}</p>
                                                <p className='text-sm text-gray-400'>Stock:{item.productstock}</p>
                                                <button onClick={() => { GetSelectedProductFunc(item.productID); document.getElementById('viewProductModal').showModal() }} className='bg-blue-500 hover:bg-blue-400 rounded-sm p-2 mt-1 text-xs text-white'>View More</button>

                                            </div>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </div>
            </div>

            {/* View product modal */}

            <dialog id="viewProductModal" className="modal">
                <div className="modal-box h-fit w-fit max-h-full max-w-full rounded-none p-5 flex items-center justify-center rounded-xl">

                    <IoCloseSharp onClick={() => { document.getElementById('viewProductModal').close(); }}
                        className='absolute top-4 right-4 text-2xl hover:bg-red-500 hover:text-white' />

                    {selectedProduct.map((item) => (

                        <section className='h-[30rem] w-[60rem] flex'>
                            <div className={`h-full w-[30rem] bg-cover bg-center flex items-center justify-center overflow-hidden bg-[url('../../asset/admin/productimage/${item.productimage}')]`}>
                            </div>

                            <div className='h-full w-[30rem] flex flex-col justify-evenly gap-y-5 p-8'>
                                <p className='text-5xl font-bold '>{item.productname}</p>
                                <p className='text-2xl'>Size: {item.productsize}</p>
                                <p className='text-2xl'>Available Stock: {item.productstock - quantity}</p>

                                <div className='h-fit max-h-[14rem] w-full overflow-scroll noScrollbar'>
                                    <p>Description: {item.productdescription}</p>
                                </div>
                                <p>Quantity:
                                    <input
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        type="number" className="h-[2.5rem] w-[5rem] ml-2 outline-none rounded-sm border border-gray-400 px-2" />
                                </p>

                                <p className='font-semibold text-3xl'>₱{item.productprice * quantity}.00</p>

                                <div className='flex gap-x-3'>
                                    <button onClick={handleCheckoutFunc} className='p-2 bg-blue-500 hover:bg-blue-400 duration-700 text-white'>Checkout</button>
                                    <button className='p-2 bg-green-500 hover:bg-green-400 duration-700 text-white'>Add To Cart</button>
                                </div>


                            </div>
                        </section>
                    ))}

                </div>
            </dialog>

        </section>
    );
}
