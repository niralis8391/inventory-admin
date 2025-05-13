import React, { useEffect, useState } from 'react'
import API from '../API/API'

export const Dashboard = () => {

    const [productCount, setProductCount] = useState(0)
    const [totalOrder, setTotalOrders] = useState(0)

    const token = localStorage.getItem("token")
    useEffect(() => {

        async function fetchProductCount() {
            try {
                const response = await API.get('/product/productCounts', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                setProductCount(response.data.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchProductCount()
    }, [])


    return (
        <div className='m-10'>
            <div className='flex gap-5 items-center mt-5'>
                <div className='flex flex-col p-3 rounded-md border border-gray-300'>
                    <h2 className='text-xl'>Total Products</h2>
                    <p className='text-2xl font-semibold'>{productCount}</p>
                </div>
                <div className='flex flex-col p-3 rounded-md border border-gray-300'>
                    <h2 className='text-xl'>Total Orders</h2>
                    <p className='text-2xl font-semibold'>{totalOrder}</p>
                </div>
            </div>
            <h2 className='text-2xl mt-5 font-semibold'>Order Requests</h2>
            <div className='w-fit mt-3 border border-gray-300'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-gray-300 bg-gray-100 rounded-tl-xl'>
                            <th className='w-44 text-left p-2'>Name</th>
                            <th className='w-44 text-left p-2'>Time</th>
                            <th className='w-44 text-left p-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-gray-300'>
                            <td className='w-44 text-left p-2'>Apple</td>
                            <td className='w-44 text-left p-2'>2:00 PM</td>
                            <td className='w-44 text-left p-2'>Pending</td>
                        </tr>
                        <tr className=''>
                            <td className='w-44 text-left p-2'>Apple</td>
                            <td className='w-44 text-left p-2'>2:00 PM</td>
                            <td className='w-44 text-left p-2'>Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
