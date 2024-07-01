import { useState } from "react"

export const Toggle = () => {

    const [toggle, setToggle] = useState(false);

    const handleToggleFunc = () => {
        setToggle(!toggle);
    }
     
    return {toggle, handleToggleFunc};
}