
import { useClientRating } from "../../store/client/clientratingstore";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import { IoIosStar } from "react-icons/io";
import { BsShieldFillCheck } from "react-icons/bs";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Pagination } from "../../component/shared/pagination";
import { useTableData } from "../../store/shared/pagination";
import { useEffect } from "react";
import { Entries } from "../../component/shared/entries";

export const Rating = () => {

    TimeAgo.addDefaultLocale(en)

    const getTableData = useTableData(state => state.getTableData);
    const returnedtTableDataFromPagination = useTableData(state => state.returnedtTableDataFromPagination);

    const ratingData = useClientRating(state => state.ratingData);
    const ProductIDForViewMore = useAdminProduct(state => state.ProductIDForViewMore);


    let ratingProductTemp = ratingData.filter(item => item.ratingproductID === ProductIDForViewMore.prodID);

    useEffect(() => {
        getTableData(ratingProductTemp);
    }, [])


    const totalStar = ratingProductTemp.reduce((sum, item) => sum + parseInt(item.star), 0);
    const commentCount = ratingProductTemp.length;

    var averageStarTemp = ratingProductTemp.length > 0 ? (totalStar / ratingProductTemp.length).toFixed(1) : 0;
    var numberOfstar = Math.floor(averageStarTemp);

    const s3 = <IoIosStar className="text-4xl text-yellow-500" />
    const s1 = <IoIosStar className="text-xl text-yellow-500" />
    const s0 = <IoIosStar className="text-xl text-gray-200" />

    var printedStar = [];
    for (let i = 0; i < numberOfstar; i++) {
        printedStar.push(s3);
    }

    const fiveStar = [s1, s1, s1, s1, s1];
    const fourStar = [s1, s1, s1, s1, s0];
    const threeStar = [s1, s1, s1, s0, s0];
    const twoStar = [s1, s1, s0, s0, s0];
    const oneStar = [s1, s0, s0, s0, s0];

    const fiveStarCount = ratingProductTemp.filter(value => value.star === '5').length;
    const fourStarCount = ratingProductTemp.filter(value => value.star === '4').length;
    const threeStarCount = ratingProductTemp.filter(value => value.star === '3').length;
    const twoStarCount = ratingProductTemp.filter(value => value.star === '2').length;
    const oneStarCount = ratingProductTemp.filter(value => value.star === '1').length;

    return (

        <div className="bg-white w-[60rem] h-fit flex flex-col items-center justify-start">

            <section className="bg-gray-100 w-full ">
                <p className="p-3">Ratings & Reviews of {ratingProductTemp[0].productname}</p>
            </section>

            <section className="flex justify-start w-full p-7 py-10 gap-x-20">
                <div className="flex flex-col justify-center gap-y-2">
                    <p className="text-6xl">{numberOfstar}<span className="text-gray-500 text-3xl">/5</span></p>
                    <p className="text-5xl flex">{printedStar}</p>
                    <p className="text-sm">{commentCount}{commentCount === 1 ? ' Rating' : ' Ratings'}</p>
                </div>

                <section className="flex">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-2">
                            <p className="flex">{fiveStar}</p>
                            <progress value={fiveStarCount} max={commentCount}></progress>
                            <p>{fiveStarCount}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="flex">{fourStar}</p>
                            <progress value={fourStarCount} max={commentCount}></progress>
                            <p>{fourStarCount}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="flex">{threeStar}</p>
                            <progress value={threeStarCount} max={commentCount}></progress>
                            <p>{threeStarCount}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="flex">{twoStar}</p>
                            <progress value={twoStarCount} max={commentCount}></progress>
                            <p>{twoStarCount}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="flex">{oneStar}</p>
                            <progress value={oneStarCount} max={commentCount}></progress>
                            <p>{oneStarCount}</p>
                        </div>
                    </div>
                </section>
            </section>

            <section className="w-full border-t border-gray-200 flex justify-between p-3">
                <p>Product Reviews</p>
                <Entries design={'border border-gray-300'} />
               
            </section>

            {
                returnedtTableDataFromPagination.map((item) => {
                    var printedStar = [];
                    for (let i = 0; i < item.star; i++) {
                        printedStar.push(s1);
                    }
                    return (
                        <section key={item.ratingprimarykey} className="w-full bg-white border-t border-gray-200 flex flex-col gap-y-2 p-4">
                            <div className="flex justify-between">
                                <p className="flex">{printedStar}</p>
                                <p className="text-sm text-gray-500">{item.commentdate}</p>
                                {/* <ReactTimeAgo date={item.commentdate} locale="en-US" /> */}
                            </div>

                            <p className="flex items-center gap-x-1">
                                <span className="text-gray-500">{item.commenter}</span>
                                <BsShieldFillCheck className="text-green-500" />
                                <span className="text-green-500 text-sm">Verified Purchase</span>
                            </p>

                            <p>{item.comment}</p>
                            <p className="text-gray-500 text-sm">Size : {item.productsize}</p>

                        </section>
                    )

                })
            }

            <section className="bg-gray-200 w-full flex justify-between py-3">
                <Pagination />
            </section>
        </div>

    )
}