
import { useDispatch, useSelector } from "react-redux"
import { ClientHamburger } from "../../component/client/clienthamburger"
import { buyProductDataTemp, isBuyDataStatusUpdatedTemp } from "../../feature/client/clientbuySlice"
import { useEffect, useState } from "react";
import { UpdateBuyDataStatusThunk } from "../../feature/client/clientbuySlice";
import { GetBuyDataThunk } from "../../feature/client/clientbuySlice";
import { userDataTemp } from "../../feature/client/clientloginSlice";
import { clearIsBuyDataStatusUpdated } from "../../feature/client/clientbuySlice";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { InsertRatingDataThunk } from "../../feature/client/ratingSlice";
import { clearIsRatingDataInserted } from "../../feature/client/ratingSlice";
import { isRatingDataInsertedTemp } from "../../feature/client/ratingSlice";
import { ShowToast } from "../../component/admin/toaster";
import { GetAllRatingDataThunk } from "../../feature/client/ratingSlice";
import { IoSearch } from "react-icons/io5";
import { Empty } from "../../component/client/empty";


export const ClientYourOrder = () => {
    const dispatch = useDispatch();

    const userdata = useSelector(userDataTemp);
    if (Object.keys(userdata).length != 0) {
        var clientusername = userdata.clientusername;
    }

    const buyProductData = useSelector(buyProductDataTemp);

    const [idToRecieve, setIdToRecieve] = useState(0);

    const handleRecieveFunc = () => {
        dispatch(UpdateBuyDataStatusThunk(idToRecieve));
    }

    const isBuyDataStatusUpdated = useSelector(isBuyDataStatusUpdatedTemp);

    useEffect(() => {
        if (isBuyDataStatusUpdated === true) {
            dispatch(GetBuyDataThunk(clientusername));
            dispatch(clearIsBuyDataStatusUpdated());
        }
        if (isBuyDataStatusUpdated === false) {
            dispatch(clearIsBuyDataStatusUpdated());
        }
    }, [isBuyDataStatusUpdated])
    //-----------------------------------------------

    const [productIDRating, setProductIDRating] = useState(0);
    const [rating, setRating] = useState({
        star: 1,
        comment: '',
    })
    const handleRatingDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setRating({ ...rating, [name]: value });
    };

    const handleRatingSubmitFunc = () => {
        const foundObject = buyProductData.find(item => item.buyproductID === productIDRating);
        const buyproductID = foundObject.buyproductID;
        const productname = foundObject.productname;
        const productsize = foundObject.productsize;
        const commenter = foundObject.clientusername;

        const ratingDataTemp = {
            ratingproductID: buyproductID,
            productname: productname,
            productsize: productsize,
            commenter: commenter,
            star: rating.star,
            comment: rating.comment,
        }
        dispatch(InsertRatingDataThunk({ ratingDataTemp }));
    }

    const isRatingDataInserted = useSelector(isRatingDataInsertedTemp);
    useEffect(() => {
        if (isRatingDataInserted === true) {
            ShowToast('your rating has been added successfully', 'success');
            setRating({
                star: 1,
                comment: '',
            })
            dispatch(GetAllRatingDataThunk());
            document.getElementById('AddRatingModal').close();
            dispatch(clearIsRatingDataInserted());
        }
        if (isRatingDataInserted === false) {
            ShowToast('failed to add your rating', 'error');
            setRating({
                star: 1,
                comment: '',
            })
            dispatch(clearIsRatingDataInserted());
        }

    }, [isRatingDataInserted])


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChangeFunc = (e) => {
        setSearchQuery(e.target.value)
    }
    const filteredProductData = buyProductData.filter(item => {
        const temp = item.productname.toLowerCase().includes(searchQuery.toLowerCase()); 
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
                       filteredProductData.length === 0 ?
                       (
                        <Empty design={`border border-gray-500 rounded-lg `} text1={'Nothing to show'} text2={'Its empty here, you can choose other product name.'}/>  
                       )
                       :
                       (
                        <table className="w-full bg-white">
                        <tr className="bg-blue-400 sticky top-0">
                            <td className="border font-semibold text-left p-[.6rem]">Product Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product size</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Quantity</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Total Price</td>
                            <td className="border font-semibold text-left p-[.6rem]">Order Date</td>
                            <td className="border font-semibold text-left p-[.6rem]">Your Address</td>
                            <td className="border font-semibold text-left p-[.6rem]">Payment Method</td>
                            <td className="border font-semibold text-left p-[.6rem]">Order Status</td>
                        </tr>

                        {filteredProductData.map(item => (
                            <tr key={item.buyproductprimarykey}>
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
                                                <button onClick={() => { setIdToRecieve(item.buyproductprimarykey); document.getElementById('confirmRecieveModal').showModal(); }} className={`bg-gray-400 px-3 py-1 text-white`}>To Recieve</button>
                                            )
                                            :
                                            (
                                                <div className="flex gap-x-2">
                                                    <button onClick={() => { setIdToRecieve(item.buyproductprimarykey); document.getElementById('AddRatingModal').showModal(); setProductIDRating(item.buyproductID) }} className={`bg-blue-400 px-3 py-1 text-white flex items-center gap-x-1`}>Rate</button>

                                                    <button className={`bg-green-400 px-3 py-1 text-white flex items-center gap-x-1`}>Recieved<FaCheck /></button>
                                                </div>
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
            {/* rating modal */}
            <dialog id="AddRatingModal" className="modal">
                <div className="modal-box w-full rounded-none p-0 flex flex-col gap-y-4 items-center justify-center p-5 rounded-xl">
                    <IoCloseSharp onClick={() => { document.getElementById('AddRatingModal').close(); }} className="absolute top-4 right-4 text-2xl hover:bg-red-500" />

                    <div className="w-full">
                        <label className={`text-lg text-black`}>Rate<span className='text-red-500'>*</span></label>
                        <select
                            name="star"
                            onChange={handleRatingDataChangeFunc}
                            value={rating.star}
                            className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label>Comment<span className='text-red-500'>*</span></label>
                        <textarea
                            name="comment"
                            onChange={handleRatingDataChangeFunc}
                            value={rating.comment}
                            className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
                        </textarea>
                    </div>
                    <button onClick={handleRatingSubmitFunc} className="bg-blue-500 px-7 py-2 rounded-lg hover:bg-blue-400 text-xl font-semibold text-white">Submit Review</button>
                </div>
            </dialog>



            {/* recieve modal */}
            <dialog id="confirmRecieveModal" className="modal">
                <div className="modal-box w-full rounded-none p-0 flex flex-col gap-y-4 items-center justify-center p-5 rounded-xl">
                    <IoCloseSharp onClick={() => { document.getElementById('confirmRecieveModal').close(); }} className="absolute top-4 right-4 text-2xl hover:bg-red-500" />
                    <MdCheckCircleOutline className="text-[10rem]" />
                    <p className="text-4xl font-bold">Confirm</p>
                    <button
                        className="bg-blue-500 px-7 py-2 rounded-lg hover:bg-blue-400 text-xl font-semibold text-white"
                        onClick={() => {
                            handleRecieveFunc();
                            document.getElementById('confirmRecieveModal').close();
                        }}>
                        Yes
                    </button>
                </div>
            </dialog>

        </section>
    )
}