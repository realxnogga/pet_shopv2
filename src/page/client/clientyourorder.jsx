
import { ClientHamburger } from "../../component/client/clienthamburger"
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { ShowToast } from "../../component/admin/toaster";
import { IoSearch } from "react-icons/io5";
import { Empty } from "../../component/client/empty";
import { useClientRating } from "../../store/client/clientratingstore";
import { useClientLogin } from "../../store/client/clientloginstore";
import { useClientBuy } from "../../store/client/clientbuystore";
import { useTableData } from "../../store/shared/tabledata";
import { Pagination } from "../../component/shared/pagination";
import { Entries } from "../../component/shared/entries";

export const ClientYourOrder = () => {

    const userData = useClientLogin(state => state.userData);

    const getTableData = useTableData(state => state.getTableData);
    const returnedtTableDataFromPagination = useTableData(state => state.returnedtTableDataFromPagination);


    const { isRatingDataInserted, insertRatingData, clearIsRatingDataInserted, getRatingData } = useClientRating(state => ({
        isRatingDataInserted: state.isRatingDataInserted,
        insertRatingData: state.insertRatingData,
        clearIsRatingDataInserted: state.clearIsRatingDataInserted,
        getRatingData: state.getRatingData,
    }))
    // -------------------------------------------
    const { buyProductData, getBuyData, isBuyDataStatusUpdated, updateBuyDataStatus, clearIsBuyDataStatusUpdated } = useClientBuy(state => ({
        buyProductData: state.buyProductData,
        getBuyData: state.getBuyData,
        isBuyDataStatusUpdated: state.isBuyDataStatusUpdated,
        updateBuyDataStatus: state.updateBuyDataStatus,
        clearIsBuyDataStatusUpdated: state.clearIsBuyDataStatusUpdated,
    }))

    // -------------------------------------------
    // get the table data
    useEffect(() => {
        getTableData(buyProductData);
    }, [buyProductData]);


    const [idToRecieve, setIdToRecieve] = useState(0);

    const handleRecieveFunc = () => updateBuyDataStatus(idToRecieve);

    useEffect(() => {
        if (isBuyDataStatusUpdated === true) {
            getBuyData(userData.clientusername);
            clearIsBuyDataStatusUpdated();
        }
        if (isBuyDataStatusUpdated === false) {
            clearIsBuyDataStatusUpdated();
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
        insertRatingData({ ratingDataTemp });
    }


    useEffect(() => {
        if (isRatingDataInserted === true) {
            ShowToast('your rating has been added successfully', 'success');
            setRating({
                star: 1,
                comment: '',
            })
            getRatingData();
            document.getElementById('AddRatingModal').close();
            clearIsRatingDataInserted();
        }
        if (isRatingDataInserted === false) {
            ShowToast('failed to add your rating', 'error');
            setRating({
                star: 1,
                comment: '',
            })
            clearIsRatingDataInserted();
        }

    }, [isRatingDataInserted])


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChangeFunc = (e) => {
        setSearchQuery(e.target.value)
    }
    const filteredProductData = returnedtTableDataFromPagination.filter(item => {
        const temp = item.productname.toLowerCase().includes(searchQuery.toLowerCase());
        return temp;
    });


    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />

            <div className="h-[95%] w-[70rem] max-w-[95%] flex flex-start flex-col gap-y-2">

                <section className="flex items-end justify-between">
                    <Entries />

                    <div className='flex justify-end'>
                        <IoSearch className='h-[2.5rem] w-[2.5rem] p-[.5rem] bg-white' />
                        <input
                            value={searchQuery}
                            onChange={handleSearchQueryChangeFunc}
                            type="text"
                            placeholder='search product name'
                            className="h-[2.5rem] rounded-sm outline-none" />
                    </div>
                </section>

                <div className="h-fit max-h-[28rem] w-full overflow-y-scroll noScrollbar">
                    {
                        filteredProductData.length === 0 ?
                            (
                                <Empty design={`border border-gray-500 rounded-lg `} text1={'Nothing to show'} text2={'Its empty here, you can choose other product name.'} />
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
                {/* pagination */}
                <div className="flex items-start justify-between ">
                    <Pagination />
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