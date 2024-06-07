



export const Empty = ({design, text1, text2 }) => {

    return (
        <div className={`${design} h-full w-full flex flex-col items-center justify-center`}>
            <img src="../../asset/emptyImg/emptyImg.png" alt="" className='h-[18rem]' />
            <h3 className={`text-gray-800 text-[2.5rem] font-bold mobile:text-[2rem]`}>{text1}</h3>
            <span className="text-gray-800">{text2}</span>
        </div>
    )
}