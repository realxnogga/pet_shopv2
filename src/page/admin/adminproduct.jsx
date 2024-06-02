
import { FaPlus } from "react-icons/fa6";
import { AdminHamburger } from "../../component/admin/adminhamburger"
import { useEffect, useState } from "react";
import { InsertProductDataThunk } from "../../feature/admin/adminproductSlice";
import { useDispatch, useSelector } from "react-redux";
import { isProductDataInsertedTemp } from "../../feature/admin/adminproductSlice";
import { clearIsProductDataInsertered } from "../../feature/admin/adminproductSlice";
import { fetchedProductDataTemp } from "../../feature/admin/adminproductSlice";
import { GetProductDataThunk } from "../../feature/admin/adminproductSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ReactTooltip from 'react-tooltip';
import { ShowToast } from "../../component/admin/toaster";
import { DeleteProductDataThunk } from "../../feature/admin/adminproductSlice";
import { clearIsProductDataDeleted } from "../../feature/admin/adminproductSlice";
import { isProductDataDeletedTemp } from "../../feature/admin/adminproductSlice";
import { UpdateProductThunk } from "../../feature/admin/adminproductSlice";
import { isAdminProductUpdatedTemp } from "../../feature/admin/adminproductSlice";
import { clearIsAdminProductUpdated } from "../../feature/admin/adminproductSlice";

export const AdminInventory = () => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        productname: '',
        productsize: 'XS',
        productstock: 0,
        productprice: 0,
        productdescription: '',
        productcategory: 'Dog Food',
    })

    console.log(productData)

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
            productdescription: productData.productdescription,
            productcategory: productData.productcategory,
        }
        dispatch(InsertProductDataThunk({ productDataTemp, productImage }));
    }

    const isProductDataInserted = useSelector(isProductDataInsertedTemp);

    useEffect(() => {
        if (isProductDataInserted === true) {

            ShowToast('new product has been added', 'success');

            setProductData({ // clear input fields
                productname: '',
                productsize: 'XS',
                productstock: 0,
                productprice: 0,
                productdescription: '',
                productcategory: 'Dog Food',
            });
            document.getElementById('fileInput').value = "";
            document.getElementById('addProductModal').close();

            dispatch(GetProductDataThunk());
            dispatch(clearIsProductDataInsertered());
        }
    }, [isProductDataInserted])

    const fetchedProductData = useSelector(fetchedProductDataTemp);


    const DeleteProductFunc = (productID, productimage) => {
        dispatch(DeleteProductDataThunk({ productID, productimage }));
    }

    const isProductDataDeleted = useSelector(isProductDataDeletedTemp);

    useEffect(() => {
        if (isProductDataDeleted === true) {
            ShowToast('product deleted successfully', 'success');
            dispatch(GetProductDataThunk());
            dispatch(clearIsProductDataDeleted());
        }

    }, [isProductDataDeleted])


    const [selectedProduct, setSelectedProduct] = useState({});
    const handleEditProductFunc = (productID) => { 
        let selectedProductTemp = fetchedProductData.find(item => item.productID === productID);
        if (selectedProductTemp) {
            setSelectedProduct(selectedProductTemp);
        }
    }

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({...selectedProduct, [name]: value,});
    };

    const [productPic, setProductPic] = useState(null);
    const handleProductPicChange = (e) => {
        setProductPic(e.target.files[0]);
    }

    console.log(productPic);    

    const handleEditInputFunc = () => {
        dispatch(UpdateProductThunk({selectedProduct, productPic}));   
    }
     
    const isAdminProductUpdated = useSelector(isAdminProductUpdatedTemp);

    useEffect(() => {
        if (isAdminProductUpdated === true) {
            ShowToast('successfully edited', 'success');
            document.getElementById('editProductModal').close()
            dispatch(GetProductDataThunk());
            dispatch(clearIsAdminProductUpdated());
        }
        if (isAdminProductUpdated === false) {
            ShowToast('failed to edit', 'error');
            document.getElementById('editProductModal').close()
            dispatch(clearIsAdminProductUpdated());
        }

    }, [isAdminProductUpdated])


    return (
        <section className={`relative bg-gray-200 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <AdminHamburger />

            <div className="h-[90%] w-[70rem] flex flex-col gap-y-4">

                {/* edit product modal */}
                <dialog id="editProductModal" className="modal">

                    <div className="modal-box h-fit w-[25rem] flex flex-col gap-y-4 rounded-lg p-4 noScrollbar">

                        <div className="w-full">
                            <label className={`text-lg text-black`}>Enter product name<span className='text-red-500'>*</span></label>
                            <input
                                onChange={handleEditInputChange}
                                value={selectedProduct.productname}
                                name="productname"
                                type="text" className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`} />
                        </div>

                        <div className="w-full">
                            <label className={`text-lg text-black`}>Choose product size<span className='text-red-500'>*</span></label>
                            <select
                                onChange={handleEditInputChange}
                                value={selectedProduct.productsize}
                                name="productsize"
                                className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
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
                                    onChange={handleEditInputChange}
                                    value={selectedProduct.productstock}
                                    name="productstock"
                                    type="number" className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`} />
                            </div>
                            <div>
                                <label className={`text-lg text-black`}>Enter product price<span className='text-red-500'>*</span></label>
                                <input
                                    onChange={handleEditInputChange}
                                    value={selectedProduct.productprice}
                                    name="productprice"
                                    type="number" className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`} />
                            </div>
                        </div>

                        <div>
                            <label className={`text-lg text-black`}>Enter product description<span className='text-red-500'>*</span></label>
                            <textarea
                                onChange={handleEditInputChange}
                                value={selectedProduct.productdescription}
                                name="productdescription"
                                className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
                            </textarea>
                        </div>

                        <div className="w-full">
                            <label className={`text-lg text-black`}>Choose product category<span className='text-red-500'>*</span></label>
                            <select
                                onChange={handleEditInputChange}
                                value={selectedProduct.productcategory}
                                name="productcategory"
                                className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
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
                            <input onChange={handleProductPicChange} id="fileInput" type="file" className={`p-2 border border-gray-400 rounded-sm w-full outline-none text-black text-md`} />
                        </div>

                        <div className="w-full flex gap-x-3">
                            <button onClick={handleEditInputFunc} className="bg-green-500 hover:bg-green-400 py-2 px-4 rounded-sm text-white flex items-center gap-x-1">Edit</button>
                        </div>

                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>



                <div className="w-full flex justify-end ">
                    <button onClick={() => document.getElementById('addProductModal').showModal()} className="bg-green-500 hover:bg-green-400 p-2 rounded-sm text-white flex items-center gap-x-1"><FaPlus className="text-2xl" />add</button>
                </div>

                <div className="h-full w-full overflow-y-scroll noScrollbar rounded-lg">
                    <table className="w-full bg-white">
                        <tr className="bg-blue-400 sticky top-0">
                            <td className="border font-semibold text-left p-[.6rem]">Product ID</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Picture</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Name</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Size</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Stock</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Price</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Description</td>
                            <td className="border font-semibold text-left p-[.6rem]">Product Category</td>
                            <td className="border font-semibold text-left p-[.6rem]">Creation Date</td>
                            <td className="border font-semibold text-left p-[.6rem]">Action</td>
                        </tr>

                        {fetchedProductData.map(item => (
                            <tr key={item.productID}>
                                <td className="border px-2">{item.productID}</td>
                                <td className="border flex items-center justify-center">

                                    <img src={`../../asset/admin/productimage/${item.productimage}`} alt="" className="h-[5rem]" />


                                </td>
                                <td className="border px-2">{item.productname}</td>
                                <td className="border px-2">{item.productsize}</td>
                                <td className="border px-2">{item.productstock}</td>
                                <td className="border px-2">{item.productprice}</td>
                                <td className="border px-2">{item.productdescription}</td>
                                <td className="border px-2">{item.productcategory}</td>
                                <td className="border px-2">{item.creationdate}</td>
                                <td className="border px-2 min-w-[6rem]">
                                    <div className="flex items-center justify-evenly w-full h-full ">
                                        <MdEdit onClick={() => {handleEditProductFunc(item.productID); document.getElementById('editProductModal').showModal()}} data-type="info" data-tip="Edit" className="text-3xl p-1 bg-green-500 hover:bg-green-400 rounded-sm text-white" />
                                        <RiDeleteBin5Fill onClick={() => { DeleteProductFunc(item.productID, item.productimage) }} data-type="info" data-tip="Delete" className="text-3xl p-1 bg-red-500 hover:bg-red-400 rounded-sm text-white" />
                                        <ReactTooltip />
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </table>

                </div>
            </div>

            {/* add product modal */}
            <dialog id="addProductModal" className="modal">

                <div className="modal-box h-fit w-[25rem] flex flex-col gap-y-4 rounded-lg p-4 noScrollbar">

                    <div className="w-full">
                        <label className={`text-lg text-black`}>Enter product name<span className='text-red-500'>*</span></label>
                        <input
                            onChange={handleProductDataChangeFunc}
                            value={productData.productname}
                            name="productname"
                            type="text" className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`} />
                    </div>

                    <div className="w-full">
                        <label className={`text-lg text-black`}>Choose product size<span className='text-red-500'>*</span></label>
                        <select
                            onChange={handleProductDataChangeFunc}
                            value={productData.productsize}
                            name="productsize"
                            className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
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
                                type="number" className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`} />
                        </div>
                        <div>
                            <label className={`text-lg text-black`}>Enter product price<span className='text-red-500'>*</span></label>
                            <input
                                onChange={handleProductDataChangeFunc}
                                value={productData.productprice}
                                name="productprice"
                                type="number" className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`} />
                        </div>
                    </div>

                    <div>
                        <label className={`text-lg text-black`}>Enter product description<span className='text-red-500'>*</span></label>
                        <textarea
                            onChange={handleProductDataChangeFunc}
                            value={productData.productdescription}
                            name="productdescription"
                            className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
                        </textarea>
                    </div>

                    <div className="w-full">
                        <label className={`text-lg text-black`}>Choose product category<span className='text-red-500'>*</span></label>
                        <select
                            onChange={handleProductDataChangeFunc}
                            value={productData.productcategory}
                            name="productcategory"
                            className={`border border-gray-400 rounded-sm w-full outline-none p-2 text-black text-md`}>
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
                        <input id="fileInput" onChange={handleProductImageUploadChange} type="file" className={`p-2 border border-gray-400 rounded-sm w-full outline-none text-black text-md`} />
                    </div>

                    <div className="w-full flex gap-x-3">
                        <button onClick={handleProductDataSubmitFunc} className="bg-green-500 hover:bg-green-400 py-2 px-4 rounded-sm text-white flex items-center gap-x-1">Add</button>
                    </div>

                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </section>
    )
}