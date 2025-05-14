import React, { useEffect, useState } from 'react';
import API from '../API/API';
import { motion } from 'framer-motion'

export const Orders = () => {

    const token = localStorage.getItem("token");

    const [order, setOrder] = useState([])
    const [completedOrder, setCompletedOrder] = useState([])
    const [cancelleddOrder, setCancelledOrder] = useState([])
    const [details, setdetails] = useState(false)
    const [loading, setLoading] = useState(false)
    const [moreDetails, setMoreDetails] = useState([])
    const [status, setStatus] = useState('');
    const [action, setAction] = useState(false);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
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

        async function fetchCompletedOrder() {
            setLoading(true)
            try {
                const response = await API.get('/order/conmpletedOrders', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                setCompletedOrder(response.data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCompletedOrder()

        async function fetchcancelledOrder() {
            setLoading(true)
            try {
                const response = await API.get('/order/cancelledOrders', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                setCancelledOrder(response.data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchcancelledOrder()
    }, []);

    function moreDetailsHandler(items) {
        setdetails(true)
        setMoreDetails(items)
    }

    if (loading) {
        return <p className='capitalize h-screen pt-10'>Loading...</p>
    }

    if (order.length === 0) {
        return <p className='capitalize h-screen pt-10'>No Orders Yet. Shop something</p>
    }

    async function updateStatusHandler(e) {
        e.preventDefault()
        try {
            const response = await API.put(`/order/updateStatus/${orderId}`, { status: status }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setAction(false)
        }
    }


    return (
        <div className='max-md:pt-10 max-md:overflow-x-scroll max-md:overflow-y-scroll h-screen'>
            <h2 className='text-xl font-semibold'>Orders</h2>
            <h2 className='text-lg p-2 m-3 w-fit border-b border-gray-300'>Pending Orders</h2>
            <div className='flex flex-col mt-5 max-md:h-[30rem]'>
                <table className='w-full border-b border-gray-300'>
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

                            return <tr className='capitalize' key={items._id}>
                                <td className='pr-8 p-2'>{items.orderNumber}</td>
                                <td className='pr-8 p-2'>{formattedDate}</td>
                                <td className='pr-8 p-2'>{items.method || "Cash"}</td>
                                <td className={`pr-8 p-2 ${items.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>{items.status}</td>
                                <td className='pr-8 p-2'>{items.totalAmount}</td>
                                <td>
                                    <div className='flex gap-2 rounded-xl cursor-pointer' >
                                        <button className='text-amber-800 hover:scale-105 cursor-pointer' onClick={() => moreDetailsHandler(items)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.783 18.828a8.05 8.05 0 0 0 7.439-4.955a8.03 8.03 0 0 0-1.737-8.765a8.045 8.045 0 0 0-13.735 5.68c0 2.131.846 4.174 2.352 5.681a8.05 8.05 0 0 0 5.68 2.359m5.706-2.337l4.762 4.759" /></svg>
                                        </button>
                                        <button className='text-blue-800 hover:scale-105 cursor-pointer' onClick={() => { setAction(true); setOrderId(items._id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><g className="edit-outline"><g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd"><path d="M2 6.857A4.857 4.857 0 0 1 6.857 2H12a1 1 0 1 1 0 2H6.857A2.857 2.857 0 0 0 4 6.857v10.286A2.857 2.857 0 0 0 6.857 20h10.286A2.857 2.857 0 0 0 20 17.143V12a1 1 0 1 1 2 0v5.143A4.857 4.857 0 0 1 17.143 22H6.857A4.857 4.857 0 0 1 2 17.143z" /><path d="m15.137 13.219l-2.205 1.33l-1.033-1.713l2.205-1.33l.003-.002a1.2 1.2 0 0 0 .232-.182l5.01-5.036a3 3 0 0 0 .145-.157c.331-.386.821-1.15.228-1.746c-.501-.504-1.219-.028-1.684.381a6 6 0 0 0-.36.345l-.034.034l-4.94 4.965a1.2 1.2 0 0 0-.27.41l-.824 2.073a.2.2 0 0 0 .29.245l1.032 1.713c-1.805 1.088-3.96-.74-3.18-2.698l.825-2.072a3.2 3.2 0 0 1 .71-1.081l4.939-4.966l.029-.029c.147-.15.641-.656 1.24-1.02c.327-.197.849-.458 1.494-.508c.74-.059 1.53.174 2.15.797a2.9 2.9 0 0 1 .845 1.75a3.15 3.15 0 0 1-.23 1.517c-.29.717-.774 1.244-.987 1.457l-5.01 5.036q-.28.281-.62.487m4.453-7.126s-.004.003-.013.006z" /></g></g></svg>
                                        </button>
                                        <button className='text-red-500 hover:scale-105 cursor-pointer' onClick={() => moreDetailsHandler(items)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" fillRule="evenodd" d="m6.774 6.4l.812 13.648a.8.8 0 0 0 .798.752h7.232a.8.8 0 0 0 .798-.752L17.226 6.4zm11.655 0l-.817 13.719A2 2 0 0 1 15.616 22H8.384a2 2 0 0 1-1.996-1.881L5.571 6.4H3.5v-.7a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v.7zM14 3a.5.5 0 0 1 .5.5v.7h-5v-.7A.5.5 0 0 1 10 3zM9.5 9h1.2l.5 9H10zm3.8 0h1.2l-.5 9h-1.2z" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                <h2 className='text-lg p-2 m-3 w-fit border-b border-gray-300'>Completed Orders</h2>
                <table className='w-full border-b border-gray-300'>
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
                        {completedOrder.map((items) => {
                            const formattedDate = new Date(items.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            });

                            return <tr className='capitalize' key={items._id}>
                                <td className='pr-8 p-2'>{items.orderNumber}</td>
                                <td className='pr-8 p-2'>{formattedDate}</td>
                                <td className='pr-8 p-2'>{items.method || "Cash"}</td>
                                <td className={`pr-8 p-2 text-green-500`}>{items.status}</td>
                                <td className='pr-8 p-2'>{items.totalAmount}</td>
                                <td>
                                    <div className='flex gap-2 rounded-xl cursor-pointer' >
                                        <button className='text-amber-800 hover:scale-105 cursor-pointer' onClick={() => moreDetailsHandler(items)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.783 18.828a8.05 8.05 0 0 0 7.439-4.955a8.03 8.03 0 0 0-1.737-8.765a8.045 8.045 0 0 0-13.735 5.68c0 2.131.846 4.174 2.352 5.681a8.05 8.05 0 0 0 5.68 2.359m5.706-2.337l4.762 4.759" /></svg>
                                        </button>
                                        <button className='text-blue-800 hover:scale-105 cursor-pointer' onClick={() => { setAction(true); setOrderId(items._id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><g className="edit-outline"><g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd"><path d="M2 6.857A4.857 4.857 0 0 1 6.857 2H12a1 1 0 1 1 0 2H6.857A2.857 2.857 0 0 0 4 6.857v10.286A2.857 2.857 0 0 0 6.857 20h10.286A2.857 2.857 0 0 0 20 17.143V12a1 1 0 1 1 2 0v5.143A4.857 4.857 0 0 1 17.143 22H6.857A4.857 4.857 0 0 1 2 17.143z" /><path d="m15.137 13.219l-2.205 1.33l-1.033-1.713l2.205-1.33l.003-.002a1.2 1.2 0 0 0 .232-.182l5.01-5.036a3 3 0 0 0 .145-.157c.331-.386.821-1.15.228-1.746c-.501-.504-1.219-.028-1.684.381a6 6 0 0 0-.36.345l-.034.034l-4.94 4.965a1.2 1.2 0 0 0-.27.41l-.824 2.073a.2.2 0 0 0 .29.245l1.032 1.713c-1.805 1.088-3.96-.74-3.18-2.698l.825-2.072a3.2 3.2 0 0 1 .71-1.081l4.939-4.966l.029-.029c.147-.15.641-.656 1.24-1.02c.327-.197.849-.458 1.494-.508c.74-.059 1.53.174 2.15.797a2.9 2.9 0 0 1 .845 1.75a3.15 3.15 0 0 1-.23 1.517c-.29.717-.774 1.244-.987 1.457l-5.01 5.036q-.28.281-.62.487m4.453-7.126s-.004.003-.013.006z" /></g></g></svg>
                                        </button>
                                        <button className='text-red-500 hover:scale-105 cursor-pointer' onClick={() => moreDetailsHandler(items)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" fillRule="evenodd" d="m6.774 6.4l.812 13.648a.8.8 0 0 0 .798.752h7.232a.8.8 0 0 0 .798-.752L17.226 6.4zm11.655 0l-.817 13.719A2 2 0 0 1 15.616 22H8.384a2 2 0 0 1-1.996-1.881L5.571 6.4H3.5v-.7a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v.7zM14 3a.5.5 0 0 1 .5.5v.7h-5v-.7A.5.5 0 0 1 10 3zM9.5 9h1.2l.5 9H10zm3.8 0h1.2l-.5 9h-1.2z" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                <h2 className='text-lg p-2 m-3 w-fit border-b border-gray-300'>Cancelled Orders</h2>
                <table className='w-full border-b border-gray-300'>
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
                        {cancelleddOrder.map((items) => {
                            const formattedDate = new Date(items.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            });

                            return <tr className='capitalize' key={items._id}>
                                <td className='pr-8 p-2'>{items.orderNumber}</td>
                                <td className='pr-8 p-2'>{formattedDate}</td>
                                <td className='pr-8 p-2'>{items.method || "Cash"}</td>
                                <td className={`pr-8 p-2 text-amber-800`}>{items.status}</td>
                                <td className='pr-8 p-2'>{items.totalAmount}</td>
                                <td>
                                    <div className='flex gap-2 rounded-xl cursor-pointer' >
                                        <button className='text-amber-800 hover:scale-105 cursor-pointer' onClick={() => moreDetailsHandler(items)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.783 18.828a8.05 8.05 0 0 0 7.439-4.955a8.03 8.03 0 0 0-1.737-8.765a8.045 8.045 0 0 0-13.735 5.68c0 2.131.846 4.174 2.352 5.681a8.05 8.05 0 0 0 5.68 2.359m5.706-2.337l4.762 4.759" /></svg>
                                        </button>
                                        <button className='text-blue-800 hover:scale-105 cursor-pointer' onClick={() => { setAction(true); setOrderId(items._id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><g className="edit-outline"><g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd"><path d="M2 6.857A4.857 4.857 0 0 1 6.857 2H12a1 1 0 1 1 0 2H6.857A2.857 2.857 0 0 0 4 6.857v10.286A2.857 2.857 0 0 0 6.857 20h10.286A2.857 2.857 0 0 0 20 17.143V12a1 1 0 1 1 2 0v5.143A4.857 4.857 0 0 1 17.143 22H6.857A4.857 4.857 0 0 1 2 17.143z" /><path d="m15.137 13.219l-2.205 1.33l-1.033-1.713l2.205-1.33l.003-.002a1.2 1.2 0 0 0 .232-.182l5.01-5.036a3 3 0 0 0 .145-.157c.331-.386.821-1.15.228-1.746c-.501-.504-1.219-.028-1.684.381a6 6 0 0 0-.36.345l-.034.034l-4.94 4.965a1.2 1.2 0 0 0-.27.41l-.824 2.073a.2.2 0 0 0 .29.245l1.032 1.713c-1.805 1.088-3.96-.74-3.18-2.698l.825-2.072a3.2 3.2 0 0 1 .71-1.081l4.939-4.966l.029-.029c.147-.15.641-.656 1.24-1.02c.327-.197.849-.458 1.494-.508c.74-.059 1.53.174 2.15.797a2.9 2.9 0 0 1 .845 1.75a3.15 3.15 0 0 1-.23 1.517c-.29.717-.774 1.244-.987 1.457l-5.01 5.036q-.28.281-.62.487m4.453-7.126s-.004.003-.013.006z" /></g></g></svg>
                                        </button>
                                        <button className='text-red-500 hover:scale-105 cursor-pointer' onClick={() => moreDetailsHandler(items)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" fillRule="evenodd" d="m6.774 6.4l.812 13.648a.8.8 0 0 0 .798.752h7.232a.8.8 0 0 0 .798-.752L17.226 6.4zm11.655 0l-.817 13.719A2 2 0 0 1 15.616 22H8.384a2 2 0 0 1-1.996-1.881L5.571 6.4H3.5v-.7a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v.7zM14 3a.5.5 0 0 1 .5.5v.7h-5v-.7A.5.5 0 0 1 10 3zM9.5 9h1.2l.5 9H10zm3.8 0h1.2l-.5 9h-1.2z" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            {/* order details */}
            <div className={`fixed ${details ? ' right-0' : ' -right-full'} transition-all duration-300 ease-in-out top-0 h-screen w-1/2 shadow-2xl z-60`}>
                {details && <div className='fixed inset-0 backdrop-blur-xs bg-black/30 z-40'></div>}
                <div className={`relative transition-all duration-300 ease-in-out overflow-y-scroll bg-white h-full mx-auto flex flex-col  items-start p-5 z-50`}>
                    {/* order details */}
                    <h2 className='text-xl font-semibold'>Order Details</h2>
                    {moreDetails?.items?.length > 0 && <div className='flex flex-wrap gap-5 p-2'>
                        {moreDetails.items.map((item, index) => {
                            return <div className='flex flex-col gap-2' key={index}>
                                <p className='text-gray-500'>{index + 1}.</p>
                                <img src={item.product.image} className='w-44 h-44' />
                                <div>
                                    <p className='text-xl'>{item.product.productName}</p>
                                    <p className='font-semibold text-gray-500'>Qty: {item.quantity}</p>
                                    <p className='text-xl font-semibold'>Rs. {item.product.price}</p>
                                </div>
                            </div>
                        })}
                        <p className='text-lg text-gray-500 p-3 border-t border-b border-gray-300 w-full'>Total Cost:<span className='text-xl text-black font-semibold'> Rs. {moreDetails.totalAmount}</span></p>
                    </div>}
                    <h2 className='text-xl font-semibold mt-10'>Shipping Details</h2>
                    <div className='flex flex-col gap-2 mt-2'>
                        <p className='font-semibold'>Name: <span className='font-normal text-gray-500'>{moreDetails.name}</span></p>
                        <p className='font-semibold'>Contact: <span className='font-normal text-gray-500'>{moreDetails.phone}</span></p>
                        <p className='font-semibold'>Address: <span className='font-normal text-gray-500'>{moreDetails.address}</span></p>
                    </div>
                    <div className='absolute right-5 top-5 cursor-pointer text-gray-500' onClick={() => setdetails(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z" /></g></svg>
                    </div>
                </div>
            </div>

            {/* action */}
            {action && <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className='fixed top-10 left-2/5 shadow-2xl w-xs bg-white p-8 rounded-md'>
                <form className='flex flex-col gap-2' onSubmit={updateStatusHandler}>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                            type="radio"
                            name="payment"
                            value="upi"
                            required
                            checked={status === 'completed'}
                            onChange={() => setStatus('completed')}
                            className="form-radio h-4 w-4 text-amber-600"
                        />
                        <span className="ml-3 text-gray-700">Completed</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                            type="radio"
                            name="payment"
                            value="upi"
                            required
                            checked={status === 'cancelled'}
                            onChange={() => setStatus('cancelled')}
                            className="form-radio h-4 w-4 text-amber-600"
                        />
                        <span className="ml-3 text-gray-700">Cancel</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                            type="radio"
                            name="payment"
                            value="upi"
                            required
                            checked={status === 'pending'}
                            onChange={() => setStatus('pending')}
                            className="form-radio h-4 w-4 text-amber-600"
                        />
                        <span className="ml-3 text-gray-700">Pending</span>
                    </label>
                    <button className='px-5 py-1 rounded-md bg-amber-800 text-white cursor-pointer'>Update Status</button>
                </form>
                <div className='absolute right-2 top-2 cursor-pointer text-gray-500' onClick={() => setAction(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z" /></g></svg>
                </div>
            </motion.div>}
        </div >
    )
}
