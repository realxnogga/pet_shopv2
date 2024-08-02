
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { ProductCardInViewMore } from "./productcardinviewmore";
import { Rating } from './rating';
import { BackToTopButton } from '../../component/shared/button';
import { useAdminProduct } from '../../store/admin/adminproductstore';
import { RotateButton } from '../../component/shared/button';

export const ViewProduct = () => {
    const navigate = useNavigate();

    const ProductIDForViewMore = useAdminProduct(state => state.ProductIDForViewMore);

    const handleBackFunc = () => {

        if (ProductIDForViewMore.clickfrom === 'homepage') {
            navigate('/home');
        }
        else if (ProductIDForViewMore.clickfrom === 'cartpage') {
            navigate('/cart');
        }

    }

    console.log(ProductIDForViewMore);

    return (
        <section className={`bg-gray-200 h-screen w-screen flex flex-col items-center py-10 gap-y-10 justify-start overflow-y-scroll`}>

            <BackToTopButton />

            {/* <button onClick={handleBackFunc} className='absolute top-4 right-4 py-2 px-4 bg-blue-500 text-lg text-white rounded-[25rem] flex items-center justify-center gap-x-2 hover:gap-x-3 hover:bg-blue-400'><FaArrowLeft />back</button>  */}

            <RotateButton onClick={handleBackFunc} text={'Back'} />
          


            <ProductCardInViewMore />
            <Rating />

        </section>

    );
};

