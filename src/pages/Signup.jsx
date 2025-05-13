import React from 'react'
import { useState } from 'react'
import API from '../API/API';
import encryptData from '../Utils/encrypt'

export const Signup = () => {


    const [adminData, setAdminData] = useState({
        email: "",
        password: "",
        username: "",
        phone: ""
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setAdminData((preData) => ({
            ...preData,
            [name]: value
        }))
    }

    async function submitHandler(e) {
        e.preventDefault()
        try {
            const encryptedData = encryptData(adminData);
            const payload = { payload: encryptedData }

            const response = await API.post('/admin/signup', payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} className='border flex flex-col justify-start shadow-2xl mt-10 border-gray-300 w-1/2 mx-auto p-5 bg-white rounded-xl'>
                <label className='text-xl flex flex-col items-start'>
                    User Name:
                    <input type='text' name='username' onChange={changeHandler} className='p-2 rounded-md border border-gray-300 block w-full' />
                </label>
                <label className='text-xl flex flex-col items-start mt-3'>
                    Email:
                    <input type='email' name='email' onChange={changeHandler} className='p-2 rounded-md border border-gray-300 block w-full' />
                </label>
                <label className='text-xl mt-2 flex flex-col items-start'>
                    Password:
                    <input type='password' name='password' onChange={changeHandler} className='p-2 rounded-md border border-gray-300 block w-full' />
                </label>
                <label className='text-xl flex flex-col items-start mt-3'>
                    Phone:
                    <input type='text' name='phone' onChange={changeHandler} className='p-2 rounded-md border border-gray-300 block w-full' />
                </label>
                <button className='w-fit bg-amber-800 px-5 py-2 rounded-md text-white mt-5'>Log in</button>
            </form>
        </div>
    )
}
