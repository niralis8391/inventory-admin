import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Outlet, Navigate } from 'react-router-dom'
import { SideBar } from '../components/SideBar'

export const RootLayout = () => {

    const token = localStorage.getItem("token")


    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className=' w-1/5'>
                    <SideBar />
                </div>
                <div className='w-full m-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
