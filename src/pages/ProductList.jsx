import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../API/API'
import { motion } from 'framer-motion'

export const ProductList = () => {

    const [products, setProducts] = useState([])
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("");

    const token = localStorage.getItem("token");

    const navigate = useNavigate()

    async function fetchSuggestions(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await API.get(`/product/suggest?search=${query}`);
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    async function changeHandler(category) {
        setLoading(true)
        try {
            const response = await API.get(`/product/getProductByCategory/${category}`)
            if (response.status === 200) {
                setProducts(response.data.product)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        toggleDropdown()
    }


    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                const response = await API.get('/product/getAll', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                setProducts(response.data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, []);

    async function deleteHandler(productId) {
        setLoading(true)
        try {
            const response = await API.delete(`/product/deleteProduct/${productId}`)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <p className='h-screen'>Loading...</p>
    }

    if (products.length === 0) {
        return <p>No Products Found</p>
    }


    return (
        <div className='h-full'>
            <div className='flex max-md:flex-col-reverse items-center-safe'>
                <div className="relative group transition-all duration-300 ease-in-out">
                    <button
                        onClick={toggleDropdown}
                        className="px-4 py-2 rounded-lg flex gap-1 items-start cursor-pointer"
                    >
                        Categories
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z" /></svg>
                    </button>
                    {showDropdown && (
                        <motion.div
                            className="absolute left-0 top-12 z-50 w-40 bg-white shadow-lg rounded-lg border border-gray-300"
                            initial={{ y: -20, opacity: 0, scaleY: 0.9 }}
                            animate={{ y: 0, opacity: 1, scaleY: 1 }}
                            exit={{ y: -20, opacity: 0, scaleY: 0.9 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                        >
                            <ul className="text-gray-800 divide-y divide-gray-200">
                                <li className="px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => changeHandler('fashion')}>Fashion</li>
                                <li className="px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => changeHandler('jewellery')}>Jewellery</li>
                            </ul>
                        </motion.div>
                    )}

                </div>
                <form className='flex items-center' onSubmit={fetchSuggestions}>
                    <input
                        type='search'
                        className='bg-white border focus:outline-none focus:ring-1 focus:ring-amber-500 border-gray-300 p-2 w-full sm:w-sm rounded-l-md'
                        placeholder='Search this blog'
                        required
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className='p-2 bg-orange-200 rounded-r-md cursor-pointer text-white border border-orange-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
                    </button>
                </form>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full mt-5">
                <div className="overflow-x-auto p-4">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                        <thead className="bg-gray-100 text-gray-700 text-left">
                            <tr>
                                <th className="px-4 py-2">Sr no.</th>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className="border-t border-gray-300 hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        <img
                                            src={product.image}
                                            alt={product.productName}
                                            className="h-12 w-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2">{product.productName}</td>
                                    <td className="px-4 py-2">Rs. {product.price?.toFixed(2)}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <div className='flex gap-2 items-center'>
                                            <button className='bg-blue-600/60 text-white cursor-pointer rounded-md px-5 py-1' onClick={() => navigate(`/products/edit/${product._id}`)}>Edit</button>
                                            <button className='bg-red-600/60 text-white cursor-pointer rounded-md px-5 py-1' onClick={() => deleteHandler(product._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
