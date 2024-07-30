

// // ViewProductModal.js
// import React, { useState, useEffect } from 'react';
// import { IoCloseSharp } from "react-icons/io5";
// import { ShowToast } from '../../component/admin/toaster';
// import { useAdminProduct } from '../../store/admin/adminproductstore';
// import { useClientLogin } from '../../store/client/clientloginstore';
// import { useClientBuy } from '../../store/client/clientbuystore';
// import { useClientAddToCart } from '../../store/client/clientaddtocardstore';

// export const ClientViewProductModal = ({ selectedProduct }) => {

//     const userData = useClientLogin(state => state.userData);

//     const { getProductData, updateProductStock } = useAdminProduct(state => ({
//         getProductData: state.getProductData,
//         updateProductStock: state.updateProductStock,
//     }));

//     const { isBuyDataInserted, insertBuyData, clearIsBuyDataInserted, getAllBuyData, getBuyData } = useClientBuy(state => ({
//         isBuyDataInserted: state.isBuyDataInserted,
//         insertBuyData: state.insertBuyData,
//         clearIsBuyDataInserted: state.clearIsBuyDataInserted,
//         getAllBuyData: state.getAllBuyData,
//         getBuyData: state.getBuyData,
//     }))

//     const { isAddToCartDataInserted, insertAddToCartData, clearIsAddToCartDataInserted, getAddToCartData } = useClientAddToCart(state => ({
//         isAddToCartDataInserted: state.isAddToCartDataInserted,
//         insertAddToCartData: state.insertAddToCartData,
//         clearIsAddToCartDataInserted: state.clearIsAddToCartDataInserted,
//         getAddToCartData: state.getAddToCartData
//     }))

//     const [quantity, setQuantity] = useState(1);

//     const [paymentMode, setPaymentMode] = useState('');

//     // for add to cart button
//     const handleAddToCartFunc = () => {
//         selectedProduct.forEach(item => {
//             const addToCartDataTemp = {
//                 productID: item.productID,
//                 clientID: userData.clientID,
//                 clientusername: userData.clientusername,
//                 productname: item.productname,
//                 productsize: item.productsize,
//                 productstock: item.productstock,
//                 productprice: item.productprice,
//                 productdescription: item.productdescription,
//                 productcategory: item.productcategory,
//                 productimage: item.productimage,
//             };
//             insertAddToCartData({ addToCartDataTemp  })
//         });

//     }

//     useEffect(() => {
//         if (isAddToCartDataInserted === true) {
//             ShowToast('add to cart success', 'success');
//             document.getElementById('viewProductModal').close();
//             clearIsAddToCartDataInserted();
//             getAddToCartData(userData.clientusername);
//         }
//     }, [isAddToCartDataInserted]);


//     // for checkout button
//     const handleCheckoutFunc = () => {
//         selectedProduct.forEach(item => {
//             const productID = item.productID;
//             const producttotalstock = item.productstock - quantity;

//             const buyDataTemp = {
//                 productID: productID,
//                 clientID: userData.clientID,
//                 clientusername: userData.clientusername,
//                 productname: item.productname,
//                 productsize: item.productsize,
//                 productquantity: quantity,
//                 producttotalprice: item.productprice * quantity,
//                 clientaddress: userData.clientaddress,
//                 paymentMode: paymentMode,
//             };

//             insertBuyData({ buyDataTemp });

//             const temp = { productID, producttotalstock };
//             updateProductStock({ temp });

//         });
//     };

//     useEffect(() => {
//         if (isBuyDataInserted === true) {
//             ShowToast('checkout success', 'success');
//             document.getElementById('viewProductModal').close();
//             clearIsBuyDataInserted();
//             getAllBuyData();
//             getProductData();
//             getBuyData(userData.clientusername);
//         }
//         if (isBuyDataInserted === false) {
//             ShowToast('operation failed.', 'error');
//             document.getElementById('viewProductModal').close();
//             clearIsBuyDataInserted();
//         }
//     }, [isBuyDataInserted]);


//     return (
//         <>
//             {/* view product modal */}
//             <dialog id="viewProductModal" className="modal">
//                 <div className="modal-box h-fit w-fit max-h-full max-w-full mo:h-full mo:w-full mo:rounded-none rounded-none p-5 flex items-center justify-center mo:items-start rounded-xl">
//                     <IoCloseSharp onClick={() => { document.getElementById('viewProductModal').close(); }}
//                         className='absolute top-4 right-4 text-2xl hover:bg-red-500 hover:text-white' />
//                     {selectedProduct.map((item) => (
//                         <section key={item.productID} className='h-[30rem] w-[60rem] max-w-full flex flex-wrap '>
//                             <div className={`h-full w-[30rem] bg-cover bg-center flex items-center justify-center overflow-hidden bg-[url('../../asset/admin/productimage/${item.productimage}')]`}>
//                             </div>
//                             <div className='h-full w-[30rem] flex flex-col justify-evenly gap-y-5 p-8 mo:gap-y-2 mo:p-4'>
//                                 <p className='text-5xl font-bold '>{item.productname}</p>
//                                 <p className='text-2xl'>Size: {item.productsize}</p>
//                                 <p className='text-2xl'>Available Stock: {item.productstock - quantity}</p>
//                                 <div className='h-fit max-h-[14rem] w-full overflow-scroll noScrollbar'>
//                                     <p>Description: {item.productdescription}</p>
//                                 </div>
//                                 {/* <p>Quantity:
//                                     <input
//                                         value={quantity}
//                                         onChange={(e) => setQuantity(e.target.value)}
//                                         type="number" className="h-[2.5rem] w-[5rem] ml-2 outline-none rounded-sm border border-gray-400 px-2" />
//                                 </p> */}
//                                 <p className='font-semibold text-3xl'>₱{item.productprice * quantity}.00</p>
//                                 <div className='flex gap-x-3'>
//                                     <button onClick={() => { document.getElementById('placeOrderModal').showModal(); }} className='p-2 bg-blue-500 hover:bg-blue-400 duration-700 text-white'>Checkout</button>
//                                     <button onClick={handleAddToCartFunc} className='p-2 bg-green-500 hover:bg-green-400 duration-700 text-white'>Add To Cart</button>
//                                 </div>
//                             </div>
//                         </section>
//                     ))}
//                 </div>
//             </dialog>

//             {/* place order modal */}
//             <dialog id="placeOrderModal" className="modal">
//                 <div className="modal-box h-fit w-fit rounded-none p-0 flex flex-col gap-y-4 items-center justify-center p-5 rounded-xl">
//                     <IoCloseSharp onClick={() => { document.getElementById('placeOrderModal').close(); }} className="absolute top-4 right-4 text-2xl hover:bg-red-500" />

//                     <section className='flex flex-col gap-y-5 p-5'>
//                         {
//                             selectedProduct.map((item) => (
//                                 <>
//                                     <p className='text-2xl'>Available Stock: {item.productstock - quantity}</p>
//                                     <p className='font-semibold text-3xl'>₱{item.productprice * quantity}.00</p>
//                                 </>
//                             ))
//                         }
//                         <p>Quantity:
//                             <input
//                                 min={1}
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(e.target.value)}
//                                 type="number" className="h-[2.5rem] w-[5rem] ml-2 outline-none rounded-sm border border-gray-400 px-2" />
//                         </p>

//                         <div className='flex'>

//                             <div className='flex w-[50%] gap-x-2'>
//                                 <input onChange={(e) => setPaymentMode(e.target.value)} value={'cod'} type="radio" name='paymentmethod' />
//                                 <img src="../../asset/paymentmethodImg/cod.png" alt="" className='h-[3rem]' />
//                             </div>

//                             <div className='flex w-[50%] gap-x-2'>
//                                 <input onClick={() => { document.getElementById('qrModal').showModal(); }} onChange={(e) => setPaymentMode(e.target.value)} value={'gcash'} type="radio" name='paymentmethod' />
//                                 <img src="../../asset/paymentmethodImg/gcash.png" alt="" className='h-[3rem]' />
//                             </div>

//                         </div>


//                         <div className='flex gap-x-3'>
//                             <button onClick={handleCheckoutFunc} className='p-2 bg-blue-500 hover:bg-blue-400 duration-700 text-white'>Place Order</button>
//                             <button onClick={() => document.getElementById('placeOrderModal').close()} className='p-2 bg-green-500 hover:bg-green-400 duration-700 text-white'>Cancel</button>
//                         </div>

//                     </section>
//                 </div>
//             </dialog>

//             {/* qr modal */}
//             <dialog id="qrModal" className="modal">
//                 <div className="modal-box bg-blue-500 w-fit rounded-none p-0 flex items-center justify-center p-5 rounded-xl">
//                     <IoCloseSharp onClick={() => { document.getElementById('qrModal').close(); }} className="absolute top-4 right-4 text-2xl hover:bg-red-500" />

//                     <section className='flex flex-col items-center'>
//                         <img src="../../asset/qrImg/gcashmahaba.png" alt="" className='h-[4rem]' />
//                         <h3 className='text-white text-2xl'>SCAN TO PAY HERE</h3>
//                         <div className='border h-full w-full bg-white rounded-xl flex flex-col items-center p-3 gap-y-1'>
//                             <p className='font-semibold text-lg'>Petshop Admin</p>
//                             <p className='font-semibold text-lg'>09123456789</p>

//                             <img src="../../asset/qrImg/qr.png" alt="" />
//                         </div>
//                     </section>


//                 </div>
//             </dialog>
//         </>

//     );
// };

