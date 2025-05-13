import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token")


    return (
        <div>
            <nav className='w-full flex justify-between p-5 bg-amber-800 text-white'>
                <h2 className='text-2xl'>Logo</h2>
                <ul className='flex items-center gap-2 text-lg'>
                    {!token && <li className='cursor-pointer' onClick={() => navigate('/login')}>Login</li>}
                    {!token && <li className='cursor-pointer' onClick={() => navigate('/signup')}>Signup</li>}
                    {token && <li className='cursor-pointer' onClick={() => { navigate('/login'); localStorage.removeItem("token"); localStorage.removeItem("userId") }}>Log out</li>}
                </ul>
            </nav>
        </div>
    )
}
