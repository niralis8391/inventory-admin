import React, { useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'

export const SideBar = ({ menu, setMenu }) => {

    // const [token, setToken] = useState(null)

    // useEffect(() => {
    //     setToken(localStorage.getItem("token"))
    // }, [])

    // if (!token) {
    //     return <Navigate to="/login" />
    // }



    return (
        <div className='relative border-r-2 border-gray-300 h-full p-5'>
            {menu && <button className='md:hidden absolute z-60 top-1 right-1' onClick={setMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
            </button>}
            <ul className='flex flex-col gap-3'>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `p-3 rounded-md font-semibold text-gray-500 cursor-pointer border-2 border-transparent hover:border-2 hover:border-amber-800 ${isActive ? ' bg-orange-100' : ' '}`} onClick={setMenu}>
                    Dashboard
                </NavLink>
                <NavLink
                    to="/addProduct"
                    className={({ isActive }) => `p-3 rounded-md font-semibold text-gray-500 cursor-pointer border-2 border-transparent hover:border-2 hover:border-amber-800 ${isActive ? ' bg-orange-100' : ' '}`} onClick={setMenu}>
                    Add Product
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive }) => `p-3 rounded-md font-semibold text-gray-500 cursor-pointer border-2 border-transparent hover:border-2 hover:border-amber-800 ${isActive ? ' bg-orange-100' : ' '}`} onClick={setMenu}>
                    Product List
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive }) => `p-3 rounded-md font-semibold text-gray-500 cursor-pointer border-2 border-transparent hover:border-2 hover:border-amber-800 ${isActive ? ' bg-orange-100' : ' '}`} onClick={setMenu}>
                    Orders
                </NavLink>
            </ul>
        </div>
    )
}
