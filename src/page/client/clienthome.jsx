

import { ClientHamburger } from "../../component/client/clienthamburger"

export const ClientHome = () => {
    return (
        <section className={`relative bg-gray-100 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />
            <p>Home</p>
        </section>
    )
}