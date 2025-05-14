import React, { useEffect, useState } from 'react'
import API from '../API/API'

export const Dashboard = () => {

    const [productCount, setProductCount] = useState(0)
    const [ordersCount, setOrdersCount] = useState(0)
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false)


    const token = localStorage.getItem("token")
    useEffect(() => {
        setLoading(true)
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
            } finally {
                setLoading(false)
            }
        }
        fetchProductCount()

        async function fetchOrderCount() {
            try {
                const response = await API.get('/order/orderCount', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                setOrdersCount(response.data.data)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOrderCount()

        async function fetchOrderData() {
            setLoading(true)
            try {
                const response = await API.get('/order/pendingOrders', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                setOrder(response.data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrderData()
    }, [])

    if (loading) {
        return <p className='h-screen pt-10'>Loading...</p>
    }

    return (
        <div className='h-screen'>
            <div className='flex gap-5 items-center mt-5'>
                <div className='flex flex-col p-3 rounded-md border border-gray-300'>
                    <h2 className='text-xl'>Total Products</h2>
                    <p className='text-2xl font-semibold'>{productCount}</p>
                </div>
                <div className='flex flex-col p-3 rounded-md border border-gray-300'>
                    <h2 className='text-xl'>Total Orders</h2>
                    <p className='text-2xl font-semibold'>{ordersCount}</p>
                </div>
            </div>
            <h2 className='text-2xl mt-5 font-semibold'>Order Requests</h2>
            <div className='w-fit mt-3 border border-gray-300'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-gray-300 bg-gray-100 rounded-tl-xl'>
                            <th className='w-44 text-left p-2'>Order Id</th>
                            <th className='w-44 text-left p-2'>Time</th>
                            <th className='w-44 text-left p-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((items, index) => {
                            const formattedDate = new Date(items.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            });

                            return <tr className='capitalize' key={index + 1}>
                                <td className='pr-8 p-2'>{items.orderNumber}</td>
                                <td className='pr-8 p-2'>{formattedDate}</td>
                                <td className='pr-8 p-2 text-amber-500'>{items.status}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
