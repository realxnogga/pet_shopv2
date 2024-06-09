

// ViewProductModal.js
import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { InsertAddToCartDataThunk, clearIsAddToCartDataInserted, GetAddToCartDataThunk, isAddToCartDataInsertedTemp } from '../../feature/client/addtocartSlice';
import { InsertBuyDataThunk, clearIsBuyDataInserted, GetBuyDataThunk, GetAllBuyDataThunk, isBuyDataInsertedTemp } from '../../feature/client/clientbuySlice';
import { UpdateProductStockThunk } from '../../feature/admin/adminproductSlice';
import { userDataTemp } from '../../feature/client/clientloginSlice';
import { ShowToast } from '../../component/admin/toaster';
import { whatIsClickedInClientSidebarState } from '../../feature/client/clientsidebarSlice';
import { GetProductDataThunk } from '../../feature/admin/adminproductSlice';
import { addToCartProductDataTemp } from '../../feature/client/addtocartSlice';

export const ClientViewProductModal = ({ selectedProduct }) => {
    const dispatch = useDispatch();
    const userdata = useSelector(userDataTemp);
    const [quantity, setQuantity] = useState(1);

    const [paymentMode, setPaymentMode] = useState('');

    let clientID, clientusername, clientprofile, clientaddress;

    if (Object.keys(userdata).length !== 0) {
        clientID = userdata.clientID;
        clientusername = userdata.clientusername;
        clientprofile = userdata.clientprofile;
        clientaddress = userdata.clientaddress;
    }

    // for add to cart button
    const handleAddToCartFunc = () => {
        selectedProduct.forEach(item => {
            const addToCartDataTemp = {
                productID: item.productID,
                clientID: clientID,
                clientusername: clientusername,
                productname: item.productname,
                productsize: item.productsize,
                productstock: item.productstock,
                productprice: item.productprice,
                productdescription: item.productdescription,
                productcategory: item.productcategory,
                productimage: item.productimage,
            };
            dispatch(InsertAddToCartDataThunk({ addToCartDataTemp }));
        });

    }

    const isAddToCartDataInserted = useSelector(isAddToCartDataInsertedTemp);
    useEffect(() => {
        if (isAddToCartDataInserted === true) {
            ShowToast('add to cart success', 'success');
            document.getElementById('viewProductModal').close();
            dispatch(clearIsAddToCartDataInserted());
            dispatch(GetAddToCartDataThunk(clientusername));
            dispatch(whatIsClickedInClientSidebarState('cart'));
        }
    }, [isAddToCartDataInserted]);


    // for checkout button
    const handleCheckoutFunc = () => {
        selectedProduct.forEach(item => {
            const productID = item.productID;
            const producttotalstock = item.productstock - quantity;

            const buyDataTemp = {
                productID: productID,
                clientID: clientID,
                clientusername: clientusername,
                productname: item.productname,
                productsize: item.productsize,
                productquantity: quantity,
                producttotalprice: item.productprice * quantity,
                clientaddress: clientaddress,
                paymentMode: paymentMode,
            };

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
            dispatch(whatIsClickedInClientSidebarState('yourorder'));
        }
        if (isBuyDataInserted === false) {
            ShowToast('operation failed.', 'error');
            document.getElementById('viewProductModal').close();
            dispatch(clearIsBuyDataInserted());
        }
    }, [isBuyDataInserted]);


    return (
        <>
        {/* view product modal */}
            <dialog id="viewProductModal" className="modal">
                <div className="modal-box h-fit w-fit max-h-full max-w-full rounded-none p-5 flex items-center justify-center rounded-xl">
                    <IoCloseSharp onClick={() => { document.getElementById('viewProductModal').close(); }}
                        className='absolute top-4 right-4 text-2xl hover:bg-red-500 hover:text-white' />
                    {selectedProduct.map((item) => (
                        <section key={item.productID} className='h-[30rem] w-[60rem] flex'>
                            <div className={`h-full w-[30rem] bg-cover bg-center flex items-center justify-center overflow-hidden bg-[url('../../asset/admin/productimage/${item.productimage}')]`}>
                            </div>
                            <div className='h-full w-[30rem] flex flex-col justify-evenly gap-y-5 p-8'>
                                <p className='text-5xl font-bold '>{item.productname}</p>
                                <p className='text-2xl'>Size: {item.productsize}</p>
                                <p className='text-2xl'>Available Stock: {item.productstock - quantity}</p>
                                <div className='h-fit max-h-[14rem] w-full overflow-scroll noScrollbar'>
                                    <p>Description: {item.productdescription}</p>
                                </div>
                                {/* <p>Quantity:
                                    <input
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        type="number" className="h-[2.5rem] w-[5rem] ml-2 outline-none rounded-sm border border-gray-400 px-2" />
                                </p> */}
                                <p className='font-semibold text-3xl'>₱{item.productprice * quantity}.00</p>
                                <div className='flex gap-x-3'>
                                    <button onClick={() => { document.getElementById('placeOrderModal').showModal(); }} className='p-2 bg-blue-500 hover:bg-blue-400 duration-700 text-white'>Checkout</button>
                                    <button onClick={handleAddToCartFunc} className='p-2 bg-green-500 hover:bg-green-400 duration-700 text-white'>Add To Cart</button>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </dialog>

            {/* place order modal */}
            <dialog id="placeOrderModal" className="modal">
                <div className="modal-box h-fit w-fit rounded-none p-0 flex flex-col gap-y-4 items-center justify-center p-5 rounded-xl">
                    <IoCloseSharp onClick={() => { document.getElementById('placeOrderModal').close(); }} className="absolute top-4 right-4 text-2xl hover:bg-red-500" />

                    <section className='flex flex-col gap-y-5 p-5'>
                        {
                            selectedProduct.map((item) => (
                                <>
                                    <p className='text-2xl'>Available Stock: {item.productstock - quantity}</p>
                                    <p className='font-semibold text-3xl'>₱{item.productprice * quantity}.00</p>
                                </>
                            ))
                        }
                        <p>Quantity:
                            <input
                            min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number" className="h-[2.5rem] w-[5rem] ml-2 outline-none rounded-sm border border-gray-400 px-2" />
                        </p>

                        <div className='flex'>
                            <div className='flex w-[50%] gap-x-2'>
                                <input onChange={(e) => setPaymentMode(e.target.value)} value={'cod'} type="radio" name='paymentmethod'/>
                                <img src="../../asset/paymentmethodImg/cod.png" alt="" className='h-[3rem]' />
                            </div>

                            <div className='flex w-[50%] gap-x-2'>
                                <input onChange={(e) => setPaymentMode(e.target.value)} value={'gcash'} type="radio" name='paymentmethod'/>
                                <img src="../../asset/paymentmethodImg/gcash.png" alt="" className='h-[3rem] grayscale' />
                            </div>

                        </div>

                        <div className='flex gap-x-3'>
                            <button onClick={handleCheckoutFunc} className='p-2 bg-blue-500 hover:bg-blue-400 duration-700 text-white'>Place Order</button>
                            <button onClick={() => document.getElementById('placeOrderModal').close()} className='p-2 bg-green-500 hover:bg-green-400 duration-700 text-white'>Cancel</button>
                        </div>

                    </section>
                </div>
            </dialog>
        </>

    );
};

