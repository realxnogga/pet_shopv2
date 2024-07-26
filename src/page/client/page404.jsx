

import { NavLink } from "react-router-dom"
import { PrimaryButton } from "../../component/shared/button"

export const Page404 = () => {

  return (
    <section className="h-screen w-screen flex flex-col gap-y-4 items-center justify-center">

      <p className="text-5xl">Error 404 Page</p>
      <NavLink to={'/'}>
        <PrimaryButton text={'Back'} design={'w-[8rem] rounded-none'} />
      </NavLink>
    </section >
  )

}
