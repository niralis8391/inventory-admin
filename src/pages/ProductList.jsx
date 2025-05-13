import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../API/API'

export const ProductList = () => {

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem("token");

    const navigate = useNavigate()

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
        return <p>Loading...</p>
    }

    if (products.length === 0) {
        return <p>No Products Found</p>
    }


    return (
        <div className="flex flex-wrap items-center gap-3 w-full">
            {products.map((product) => (
                <div className="bg-white border-2 w-sm h-xl flex flex-col justify-start items-start border-gray-200 rounded-lg p-4" key={product._id}>
                    <img
                        src={product.image}
                        alt={product.productName}
                        className='w-full h-64 object-contain my-5 rounded-md'
                    />
                    <div className='flex flex-col justify-between items-start'>
                        <h2 className="text-lg font-semibold capitalize mt-4">{product.productName}</h2>
                        <h3 className="text-lg text-gray-600 capitalize py-2">{product.description}</h3>
                        <p className="text-amber-600 font-semibold">₹{product.price}</p>
                    </div>
                    <div className='flex gap-2 items-center mt-3'>
                        <button className='bg-blue-600 text-white cursor-pointer rounded-md px-5 py-1 text-xl' onClick={() => navigate(`/products/edit/${product._id}`)}>Edit</button>
                        <button className='bg-red-600 text-white cursor-pointer rounded-md px-5 py-1 text-xl' onClick={() => deleteHandler(product._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
