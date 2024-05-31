
import { ClientHamburger } from "../../component/client/clienthamburger"

export const ClientYourOrder = () => {
    return (
        <section className={`relative bg-gray-100 mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <ClientHamburger />
            <p>Your order</p>
        </section>
    )
}