
import { AdminHamburger } from "../component/admin/adminhamburger"
import { IoPeopleOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";

export const AdminDashboard = () => {
    return (
        <section className={`relative bg-gray-100 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <AdminHamburger />

            <div className="h-[90%] w-[60rem] flex justify-between">

                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <AiOutlineProduct className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Product</p>
                    <p className="text-2xl">4</p>
                </div>

                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <IoPeopleOutline className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Client</p>
                    <p className="text-2xl">4</p>
                </div>

                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <MdAttachMoney className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Sale</p>
                    <p className="text-2xl">4</p>
                </div>

                <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                    <GoGraph className="text-6xl" />
                    <hr />
                    <p className="text-3xl ">Total Income</p>
                    <p className="text-2xl">4</p>
                </div>

            </div>
        </section>
    )
}