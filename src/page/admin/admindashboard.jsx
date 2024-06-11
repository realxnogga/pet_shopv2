
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoPeopleOutline } from 'react-icons/io5';
import { MdAttachMoney } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';
import { AiOutlineProduct } from 'react-icons/ai';
import { fetchedProductDataTemp } from '../../feature/admin/adminproductSlice';
import { allClientDataTemp } from '../../feature/admin/admincustomerSlice';
import { allBuyProductDataTemp } from '../../feature/client/clientbuySlice';
import { AdminHamburger } from '../../component/admin/adminhamburger';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AdminDashboard = () => {
    const fetchedProductData = useSelector(fetchedProductDataTemp);
    const allClientData = useSelector(allClientDataTemp);
    const allBuyProductData = useSelector(allBuyProductDataTemp);

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateNow = `${year}-${month}-${day}`;

    const [dateValue, setDateValue] = useState(dateNow);
    const [rangeType, setRangeType] = useState('today'); // State for range type
    const [filteredFetchedProductData, setFilteredFetchedProductData] = useState([]);
    const [filteredAllClientData, setFilteredAllClientData] = useState([]);
    const [filteredAllBuyProductData, setFilteredAllBuyProductData] = useState([]);

    const handleDateChangeFunc = (e) => {
        setDateValue(e.target.value);
    };

    const handleRangeTypeChangeFunc = (e) => {
        setRangeType(e.target.value);
    };

    useEffect(() => {
        const filterByDateRange = (data, rangeType, dateValue) => {
            const currentDate = new Date(dateValue);
            let startDate, endDate;

            if (rangeType === 'week') {

                const dayOfWeek = currentDate.getDay();
                const firstDayOfWeek = new Date(currentDate);
                firstDayOfWeek.setDate(currentDate.getDate() - dayOfWeek + 1);
                startDate = new Date(firstDayOfWeek);
                endDate = new Date(firstDayOfWeek);
                endDate.setDate(firstDayOfWeek.getDate() + 6);

            } else if (rangeType === 'month') {

                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            } else {

                startDate = currentDate;
                endDate = currentDate;

            }

            return data.filter(item => {
                const itemDate = new Date(item.creationdate || item.joindate || item.orderdate);
                return itemDate >= startDate && itemDate <= endDate;
            });
        };

        setFilteredFetchedProductData(filterByDateRange(fetchedProductData, rangeType, dateValue));
        setFilteredAllClientData(filterByDateRange(allClientData, rangeType, dateValue));
        setFilteredAllBuyProductData(filterByDateRange(allBuyProductData, rangeType, dateValue));
    }, [dateValue, rangeType, fetchedProductData, allClientData, allBuyProductData]);

    const totalSoldItem = filteredAllBuyProductData.reduce((sum, item) => sum + parseInt(item.productquantity, 10), 0);
    const totalIncome = filteredAllBuyProductData.reduce((sum, item) => sum + parseInt(item.producttotalprice, 10), 0);

    const productsold = filteredAllBuyProductData.map(item => item.producttotalprice);
    const productname = filteredAllBuyProductData.map(item => item.productname);

    const data = {
        labels: productname,
        datasets: [
            {
                label: 'Product Name/Total Product Price',
                data: productsold,
                backgroundColor: 'rgb(255, 165, 0)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Total Income (${dateValue})`,
            },
        },
    };

    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex flex-col items-center justify-start`}>
            <AdminHamburger />

            <div className="h-[94%] w-[60rem] mt-5 flex flex-col gap-y-5 overflow-y-scroll noScrollbar">
                <div className="flex justify-between">
                    <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                        <AiOutlineProduct className="text-6xl" />
                        <hr />
                        <p className="text-3xl">Total Product</p>
                        <p className="text-2xl">{filteredFetchedProductData.length}</p>
                    </div>

                    <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                        <IoPeopleOutline className="text-6xl" />
                        <hr />
                        <p className="text-3xl">Total Client</p>
                        <p className="text-2xl">{filteredAllClientData.length}</p>
                    </div>

                    <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                        <GoGraph className="text-6xl" />
                        <hr />
                        <p className="text-3xl">Total Sold Item</p>
                        <p className="text-2xl">{totalSoldItem}</p>
                    </div>

                    <div className="bg-white h-[12rem] w-[14rem] flex flex-col justify-center gap-y-2 p-3 rounded-xl shadow-lg">
                        <MdAttachMoney className="text-6xl" />
                        <hr />
                        <p className="text-3xl">Total Income</p>
                        <p className="text-2xl">₱{totalIncome}.00</p>
                    </div>
                </div>

                <div className="flex justify-end gap-x-3">
                    <select
                        value={rangeType}
                        onChange={handleRangeTypeChangeFunc}
                        className="p-2 outline-none">
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>

                    <input className="p-2 outline-none" value={dateValue} onChange={handleDateChangeFunc} type="date" />
                </div>

                <div className="w-full h-[30rem] mobile:h-[10rem] flex items-center justify-center">
                    <Bar data={data} options={options} />
                </div>

            </div>
        </section>
    );
};
