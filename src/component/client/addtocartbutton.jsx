
import { BsCart4 } from "react-icons/bs";
import { useAdminProduct } from "../../store/admin/adminproductstore";
import { useClientLogin } from "../../store/client/clientloginstore";
import { useClientAddToCart } from "../../store/client/clientaddtocardstore";
import { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';

export const AddToCartButton = ({ onClick }) => {

    const userData = useClientLogin(state => state.userData);

    const insertAddToCartData = useClientAddToCart(state => state.insertAddToCartData);
    const isAddToCartDataInserted = useClientAddToCart(state => state.isAddToCartDataInserted);
    const getAddToCartData = useClientAddToCart(state => state.getAddToCartData);
    const clearIsAddToCartDataInserted = useClientAddToCart(state => state.clearIsAddToCartDataInserted);


    const ProductIDForCart = useAdminProduct(state => state.ProductIDForCart);
    const fetchedProductData = useAdminProduct(state => state.fetchedProductData);

    const filteredProductData = fetchedProductData.filter(value => value.productID === ProductIDForCart);

    const handleAddToCartFunc = () => {
        filteredProductData.forEach(item => {
            const addToCartDataTemp = {
                productID: item.productID,
                clientID: userData.clientID,
                clientusername: userData.clientusername,
                productname: item.productname,
                productsize: item.productsize,
                productstock: item.productstock,
                productprice: item.productprice,
                productdescription: item.productdescription,
                productcategory: item.productcategory,
                productimage: item.productimage,
            };
            insertAddToCartData({ addToCartDataTemp })
            console.log(addToCartDataTemp);
        });

    }

    useEffect(() => {
        isAddToCartDataInserted &&  getAddToCartData(userData.clientusername);

        clearIsAddToCartDataInserted();
    }, [isAddToCartDataInserted])

    const [count, setCount] = useState(0);
    return (
        count != 1 ?
            <BsCart4 disabled onClick={() => { setCount(count + 1); onClick(); handleAddToCartFunc() }} className='text-3xl text-yellow-500 hover:text-yellow-400 cursor-pointer outline-none' />
            :
            <>
                <BsCart4 data-type="info" data-tip="This Product is already in your cart" className='text-3xl text-gray-500 cursor-pointer outline-none' />
                <ReactTooltip />
            </>

    )
}