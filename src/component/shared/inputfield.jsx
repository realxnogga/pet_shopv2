
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Toggle } from "../../utils/toggle";

// for textfield
export const TextField = ({ label, name, onChange, value }) => {
    return (
        <div className="w-full flex flex-col">
            <label htmlFor={name}>{label}<span className='text-red-500'>*</span></label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="h-[2.5rem] outline-none border border-gray-400 px-2" />
        </div>
    )
}

// for email field
export const EmailField = ({ label, name, onChange, value }) => {
    return (
        <div className="w-full flex flex-col">
            <label htmlFor={name}>{label}<span className='text-red-500'>*</span></label>
            <input
                type="email"
                name={name}
                value={value}
                onChange={onChange}
                className="h-[2.5rem] outline-none border border-gray-400 px-2" />
        </div>
    )
}

// for textarea field
export const TextAreaField = ({ label, name, onChange, value }) => {
    return (
        <div className="w-full flex flex-col">
            <label>{label}<span className='text-red-500'>*</span></label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" >
            </textarea>
        </div>
    )
}

// for file field
export const FileField = ({ label, id, onChange, previewImage }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-end justify-between">
                <label>{label}<span className='text-red-500'>*</span></label>
                {previewImage}
            </div>
            <input
                id={id}
                type={'file'}
                onChange={onChange}
                className="border h-[2.5rem] p-1 border border-gray-400 " />
        </div>)
}


//  for password field
export const PasswordField = ({ label, name, onChange, value }) => {

    const { toggle, handleToggleFunc } = Toggle();

    return (
        <div className="w-full flex flex-col">
            <label htmlFor={name}>{label}<span className='text-red-500'>*</span></label>
            <div className="flex">
                <input
                    type={`${toggle ? 'text' : 'password'}`}
                    name={name}
                    onChange={onChange}
                    value={value}
                    className="h-[2.5rem] w-full outline-none border border-r-transparent border-gray-400 px-2" />

                <div className='border border-gray-400 h-[2.5rem] w-[2.5rem] min-h-[2.5rem] min-w-[2.5rem] flex items-center justify-center'>
                    {toggle ?
                        <FaRegEye onClick={handleToggleFunc} />
                        :
                        <FaRegEyeSlash onClick={handleToggleFunc} />}
                </div>
            </div>

        </div>
    )
}