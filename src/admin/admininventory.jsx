
import { FaPlus } from "react-icons/fa6";
import { AdminHamburger } from "../component/admin/adminhamburger"
import { useEffect, useState } from "react";
import { InsertProductDataThunk } from "../feature/admin/adminproductSlice";
import { useDispatch, useSelector } from "react-redux";
import { isProductDataInsertedTemp } from "../feature/admin/adminproductSlice";
import { clearIsProductDataInserteredState } from "../feature/admin/adminproductSlice";
import { fetchedProductDataTemp } from "../feature/admin/adminproductSlice";
import { GetProductDataThunk } from "../feature/admin/adminproductSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ReactTooltip from 'react-tooltip';

export const AdminInventory = () => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        productname: '',
        productsize: 'XS',
        productstock: 0,
        productprice: 0,
        productcategory: 'Dog Food',
    })

    const handleProductDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // for product image
    const [productImage, setProductImage] = useState(null);
    const handleProductImageUploadChange = (e) => setProductImage(e.target.files[0]);


    const handleProductDataSubmitFunc = () => {
        const productDataTemp = {
            productname: productData.productname,
            productsize: productData.productsize,
            productstock: productData.productstock,
            productprice: productData.productprice,
            productcategory: productData.productcategory,
        }
        dispatch(InsertProductDataThunk({ productDataTemp, productImage }));
    }

    const isProductDataInserted = useSelector(isProductDataInsertedTemp);

    useEffect(() => {
        if (isProductDataInserted === true) {
            setProductData({ // clear input fields
                productname: '',
                productsize: 'XS',
                productstock: 0,
                productprice: 0,
                productcategory: 'Dog Food',
            });
            document.getElementById('fileInput').value = "";
            document.getElementById('addProductModal').close();

            dispatch(GetProductDataThunk());
            dispatch(clearIsProductDataInserteredState());
        }
    }, [isProductDataInserted])

    const fetchedProductData = useSelector(fetchedProductDataTemp);

    console.log(fetchedProductData);


    return (
        <section className={`relative bg-gray-100 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <AdminHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">

                <dialog id="addProductModal" className="modal">

                    <div className="modal-box h-fit w-[25rem] flex flex-col gap-y-4 rounded-lg p-4">
                        <h3 className="text-2xl text-center">Add Product</h3>

                        <div className="w-full">
                            <label className={`text-lg text-black`}>Enter product name<span className='text-red-500'>*</span></label>
                            <input
                                onChange={handleProductDataChangeFunc}
                                value={productData.productname}
                                name="productname"
                                type="text" className={`border rounded-sm w-full outline-none p-2 text-black text-md`} />
                        </div>

                        <div className="w-full">
                            <label className={`text-lg text-black`}>Choose product size<span className='text-red-500'>*</span></label>
                            <select
                                onChange={handleProductDataChangeFunc}
                                value={productData.productsize}
                                name="productsize"
                                className={`border rounded-sm w-full outline-none p-2 text-black text-md`}>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>

                        <div className="w-full flex gap-x-4">
                            <div>
                                <label className={`text-lg text-black`}>Enter product stock<span className='text-red-500'>*</span></label>
                                <input
                                    onChange={handleProductDataChangeFunc}
                                    value={productData.productstock}
                                    name="productstock"
                                    type="number" className={`border rounded-sm w-full outline-none p-2 text-black text-md`} />
                            </div>
                            <div>
                                <label className={`text-lg text-black`}>Enter product price<span className='text-red-500'>*</span></label>
                                <input
                                    onChange={handleProductDataChangeFunc}
                                    value={productData.productprice}
                                    name="productprice"
                                    type="number" className={`border rounded-sm w-full outline-none p-2 text-black text-md`} />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className={`text-lg text-black`}>Choose product category<span className='text-red-500'>*</span></label>
                            <select
                                onChange={handleProductDataChangeFunc}
                                value={productData.productcategory}
                                name="productcategory"
                                className={`border rounded-sm w-full outline-none p-2 text-black text-md`}>
                                <option value="Dog Food">Dog Food</option>
                                <option value="Cat Food">Cat Food</option>
                                <option value="Bird Food">Bird Food</option>
                                <option value="Vitamins/Supplements">Vitamins/Supplements</option>
                                <option value="Flea/Tick Control">Flea/Tick Control</option>
                                <option value="Grooming Supplies">Grooming Supplies</option>
                            </select>
                        </div>

                        <div>
                            <label className={`text-lg text-black`}>Enter product image<span className='text-red-500'>*</span></label>
                            <input id="fileInput" onChange={handleProductImageUploadChange} type="file" className={`p-2 border rounded-sm w-full outline-none text-black text-md`} />
                        </div>

                        <div className="w-full flex gap-x-3">
                            <button onClick={handleProductDataSubmitFunc} className="bg-green-500 hover:bg-green-400 py-2 px-4 rounded-sm text-white flex items-center gap-x-1">Submit</button>
                        </div>

                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>


                <div className="w-full flex justify-end ">
                    <button onClick={() => document.getElementById('addProductModal').showModal()} className="bg-green-500 hover:bg-green-400 p-2 rounded-sm text-white flex items-center gap-x-1"><FaPlus className="text-2xl" /> add</button>
                </div>
                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    <table className="w-full bg-white">
                        <tr className="bg-blue-400 sticky top-0">
                            <td className="border font-semibold text-left p-[.6rem]">Product ID</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Size</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Stock</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Price</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Category</td>
                            <td className="border font-semibold text-left p-[.6rem]">Action</td>
                        </tr>

                        {fetchedProductData.map(item => (
                            <tr key={item.productID}>
                                <td className="border flex items-center justify-center">
                                    <img src={`../../asset/admin/productimage/${item.productimage}`} alt="" className="h-[5rem]" />
                                </td>
                                <td className="border px-2">{item.productname}</td>
                                <td className="border px-2">{item.productsize}</td>
                                <td className="border px-2">{item.productstock}</td>
                                <td className="border px-2">{item.productprice}</td>
                                <td className="border px-2">{item.productcategory}</td>
                                <td className="border px-2">
                                    <div className="flex items-center justify-evenly w-full h-full ">
                                        <MdEdit  className="text-3xl p-1 bg-green-500 hover:bg-green-400 rounded-sm text-white" data-tip="Edit"/>
                                        <RiDeleteBin5Fill className="text-3xl p-1 bg-red-500 hover:bg-red-400 rounded-sm text-white" />
                                        <ReactTooltip />
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </table>
                  
                </div>
            </div>

        </section>
    )
}