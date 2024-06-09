
import { AdminHamburger } from "../../component/admin/adminhamburger";
import { useSelector } from "react-redux";
import { IoPeopleOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";
import { fetchedProductDataTemp } from "../../feature/admin/adminproductSlice";
import { allClientDataTemp } from "../../feature/admin/admincustomerSlice";
import { allBuyProductDataTemp } from "../../feature/client/clientbuySlice";


export const AdminDashboard = () => {

    const fetchedProductData = useSelector(fetchedProductDataTemp);
    const allClientData = useSelector(allClientDataTemp);
    const allBuyProductData = useSelector(allBuyProductDataTemp);

    const totalSoldItem = allBuyProductData.reduce((sum, item) => sum + parseInt(item.productquantity, 10), 0);
    const totalIncome = allBuyProductData.reduce((sum, item) => sum + parseInt(item.producttotalprice, 10), 0);

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <AdminHamburger />

            <div className="h-[90%] w-[60rem] flex justify-between">

                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <AiOutlineProduct className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Product</p>
                    <p className="text-2xl">{fetchedProductData.length}</p>
                </div>

                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <IoPeopleOutline className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Client</p>
                    <p className="text-2xl">{allClientData.length}</p>
                </div>

                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <GoGraph className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Sold Item</p>
                    <p className="text-2xl">{totalSoldItem}</p>
                </div>
                
                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <MdAttachMoney className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Income</p>
                    <p className="text-2xl">₱{totalIncome}.00</p>
                </div>

            </div>
        </section>
    )
}