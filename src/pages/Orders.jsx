import React, { useEffect, useState } from 'react';
import API from '../API/API';

export const Orders = () => {

    const token = localStorage.getItem("token");

    const [order, setOrder] = useState([])
    const [details, setdetails] = useState(false)
    const [loading, setLoading] = useState(false)
    const [moreDetails, setMoreDetails] = useState([])

    useEffect(() => {
        async function fetchOrderData() {
            setLoading(true)
            try {
                const response = await API.get('/order/getOrders', {
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
    }, []);

    function moreDetailsHandler(items) {
        setdetails(true)
        setMoreDetails(items)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (order.length === 0) {
        return <p className='capitalize'>No Orders Yet. Shop something</p>
    }

    return (
        <div>
            <h2 className='text-xl font-semibold'>Orders</h2>
            <table className='mt-5'>
                <thead className='bg-gray-100'>
                    <tr className='p-2 capitalize'>
                        <td className='p-2 rounded-tl-md'>id</td>
                        <td className='p-2'>time</td>
                        <td className='p-2'>method</td>
                        <td className='p-2'>status</td>
                        <td className='p-2'>Total</td>
                        <td className='p-2 rounded-tr-md'>action</td>
                    </tr>
                </thead>
                <tbody>
                    {order.map((items) => {
                        const formattedDate = new Date(items.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        });

                        return <tr className='capitalize'>
                            <td className='pr-8 p-2'>{items.orderNumber}</td>
                            <td className='pr-8 p-2'>{formattedDate}</td>
                            <td className='pr-8 p-2'>{items.method || "Cash"}</td>
                            <td className='pr-8 p-2 text-amber-500'>{items.status}</td>
                            <td className='pr-8 p-2'>{items.totalAmount}</td>
                            <td><button className='p-1 rounded-xl bg-amber-600/50 text-white cursor-pointer' onClick={() => moreDetailsHandler(items)}>details</button></td>
                        </tr>
                    })}
                </tbody>
            </table>

            {/* order details */}
            {details && <div className='fixed top-0 left-0 inset-0 bg-black/50 backdrop:blur-md z-40 pt-20' onClick={() => setdetails(false)}>
                <div className='relative bg-white w-1/2 mx-auto flex flex-col gap-5 items-start p-5 rounded-md z-50'>
                    <div className='flex flex-wrap gap-5'>
                        {moreDetails.items.map((items, index) => {
                            return <div className='flex flex-col gap-2'>
                                <p className='text-gray-500'>{index + 1}.</p>
                                <img src={items.product.image} className='w-44 h-44' />
                                <div>
                                    <p className='text-xl text-gray-500'>{items.product.productName}</p>
                                    <p className='font-semibold text-gray-500'>Qty: {items.quantity}</p>
                                    <p className='text-xl font-semibold'>Rs. {items.product.price}</p>
                                </div>
                            </div>
                        })}
                    </div>
                    <p className='text-xl p-3 border-t border-gray-300 w-full'>Total Cost: Rs. {moreDetails.totalAmount}</p>
                    <div className='absolute right-5 top-5 cursor-pointer text-gray-500' onClick={() => setdetails(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z" /></g></svg>
                    </div>
                </div>
            </div>}
        </div>
    )
}
