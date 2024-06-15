

import { NavLink } from "react-router-dom"

export const Page404 = () => {

  return (
    <section className="h-screen w-screen flex flex-col gap-y-4 items-center justify-center">

      <p className="text-5xl">Error 404 Page</p>
      <NavLink to={'/'}>
        <button className='bg-blue-500 hover:bg-blue-400 rounded-sm py-2 px-5 text-3xl text-white'>
          Back
        </button>
      </NavLink>
    </section >
  )

}
