import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Outlet, Navigate } from 'react-router-dom'
import { SideBar } from '../components/SideBar'

export const RootLayout = () => {

    const token = localStorage.getItem("token")

    const [menu, setMenu] = useState(false);


    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className={`max-md:w-xs max-md:h-full max-md:fixed max-md:-left-hull ${menu ? 'left-0' : '-left-full'} transition-all duration-300 ease-in-out bg-white z-50  md:w-sm `}>
                    <div className='block md:hidden'>
                        {!menu && <button className='fixed z-60 top-22 left-5 p-1 rounded-md border bg-white' onClick={() => setMenu(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6h10M4 12h16M7 12h13M4 18h10" /></svg>
                        </button>}
                    </div>

                    <SideBar menu={menu} setMenu={() => setMenu(false)} />
                </div>
                <div className='w-full h-full max-sm:p-5 sm:m-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
