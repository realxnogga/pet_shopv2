
import { FaArrowUp } from "react-icons/fa";

export const PrimaryButton = ({ text, design, onClick }) => {

    return (
        <button
            onClick={onClick}
            className={`${design} w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white`}>
            {text}
        </button>
    )
}

export const RotateButton = ({ text, design, onClick }) => {

    return (
        <button onClick={onClick} className='top-4 right-4 absolute h-[3rem] w-[6rem] bg-blue-700 overflow-hidden flex items-center justify-center rounded-[25rem]'>
            <div className='h-[6rem] w-[6rem] bg-red-500 bg-transparent animate-spin'>
                <div className='z-20 h-[50%] w-[100%] bg-gradient-to-l from-green-300'></div>
            </div>

            <div className='absolute h-[2.7rem] w-[5.7rem] bg-blue-700 rounded-[15rem] flex items-center justify-center text-white'>
                {text}
            </div>
        </button>
    )
}

export const BackToTopButton = ({ design }) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop} className={`${design} absolute bottom-4 left-4 h-[2.5rem] w-[2.5rem] bg-green-500 flex items-center justify-center opacity-50 hover:opacity-100`}>
            <FaArrowUp className="text-white" />
        </button>
    )
}