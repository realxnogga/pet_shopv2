
export const PrimaryButton = ({ text, design, onClick }) => {

    return (
        <button
            onClick={onClick}
            className={`${design} w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white`}>
            {text}
        </button>
    )
}