import React from 'react'
import { useState } from 'react'
import API from '../API/API';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import encryptData from '../Utils/encrypt';

export const Login = () => {


    const [adminData, setAdminData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    function changeHandler(event) {
        const { name, value } = event.target;
        setAdminData((preData) => ({
            ...preData,
            [name]: value
        }))
    }

    async function submitHandler(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const encryptedData = encryptData(adminData);
            const payload = { payload: encryptedData }
            const response = await API.post('/admin/login', payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            if (response.status === 200) {
                navigate('/')
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userId", response.data.userId)
            }
        } catch (error) {
            console.log(error)
            setMessage(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }




    return (
        <div className="p-5">
            {loading && <Loading />}
            <form onSubmit={submitHandler} className='border flex flex-col justify-start shadow-2xl mt-10 border-gray-300 w-full md:w-1/2 mx-auto p-5 bg-white rounded-xl'>
                {message && <div className='w-full p-3 rounded-md text-center capitalize bg-amber-600/10 mb-5'>{message}</div>}
                <label className='text-xl flex flex-col items-start'>
                    Email:
                    <input type='email' name='email' onChange={changeHandler} className='p-2 rounded-md border border-gray-300 block w-full' />
                </label>
                <label className='text-xl mt-5 flex flex-col items-start'>
                    Password:
                    <input type='password' name='password' onChange={changeHandler} className='p-2 rounded-md border border-gray-300 block w-full' />
                </label>
                <button className='text-left py-2 text-gray-500 capitalize'>forgot password?</button>
                <button className='w-fit bg-amber-800 px-5 py-2 rounded-md text-white cursor-pointer'>Log in</button>
            </form>
        </div>
    )
}
