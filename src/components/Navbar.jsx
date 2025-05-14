import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/purecotslogo.png.jpg'

export const Navbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token")


    return (
        <div>
            <nav className='w-full flex justify-between p-5 bg-white border-b border-gray-300'>
                <img src={logo} className='w-50 max-[580px]:mx-auto h-fit cursor-pointer' onClick={() => navigate('/')} />
                <ul className='flex items-center gap-2 text-lg'>
                    {!token && <li className='cursor-pointer' onClick={() => navigate('/login')}>Login</li>}
                    {!token && <li className='cursor-pointer' onClick={() => navigate('/signup')}>Signup</li>}
                    {token && <li className='cursor-pointer' onClick={() => { navigate('/login'); localStorage.removeItem("token"); localStorage.removeItem("userId") }}>Log out</li>}
                </ul>
            </nav>
        </div>
    )
}
