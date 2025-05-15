import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import API from '../API/API';
import { Loading } from '../components/Loading';

export const EditProduct = () => {

    const { productId } = useParams();

    const token = localStorage.getItem("token")
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        subCategory: '',
        description: '',
        size: '',
        quantity: 0,
        price: 0,
        image: null,
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((preData) => ({
                ...preData,
                image: reader.result
            }));
        };
        reader.readAsDataURL(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await API.put(`/product/updateProduct/${productId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                navigate('/products')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        // setFormData({
        //     productName: '',
        //     category: '',
        //     subCategory: '',
        //     description: '',
        //     quantity: 0,
        //     price: 0,
        //     image: null,
        // })
    };


    useEffect(() => {
        async function fetchProductById() {
            setLoading(true)
            try {
                const response = await API.get(`/product/getProductById/${productId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                console.log(response)
                setFormData(response.data.data)
                setPreviewUrl(response.data.data.image)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProductById()
    }, [])

    return (
        <form
            className='w-[40rem] max-sm:w-full mx-auto p-10 rounded-xl shadow-2xl border border-gray-200 mt-10'
            onSubmit={submitHandler}
        >
            {loading && <Loading />}
            <label className='flex flex-col text-lg text-gray-700'>
                Product Name
                <input
                    className='p-2 rounded-md border-3 border-gray-200'
                    type='text'
                    name='productName'
                    onChange={changeHandler}
                    value={formData.productName}
                    required
                />
            </label>

            <label className='flex flex-col text-lg text-gray-700 mt-5'>
                Product Image
                <input
                    className='p-2 rounded-md border-3 border-gray-200'
                    type='file'
                    name='productImage'
                    onChange={fileChangeHandler}
                />
            </label>

            {previewUrl &&
                <>
                    <p className='text-lg text-gray-700 mt-5'>Preview: </p>
                    <img
                        src={previewUrl}
                        className='w-fit h-36 mt-2'
                        alt='product image'
                    />
                </>
            }


            <label className='flex flex-col text-lg text-gray-700 mt-5'>
                Product Category
                <select
                    className='p-2 rounded-md border-3 border-gray-200'
                    name='category'
                    onChange={changeHandler}
                    value={formData.category}
                >
                    <option value=''>Select Category</option>
                    <option value='fashion'>Fashion</option>
                    <option value='jewellery'>Jewellery</option>
                    <option value='electronics'>Electronics</option>
                    {/* Add more categories as needed */}
                </select>
            </label>

            <label className='flex flex-col text-lg text-gray-700 mt-5'>
                Sub Category
                <select
                    className='p-2 rounded-md border-3 border-gray-200'
                    name='subCategory'
                    onChange={changeHandler}
                    value={formData.subCategory}
                >
                    <option value=''>Select Sub Category</option>
                    <option value='groceries'>Cereals</option>
                    <option value='electronics'>Mobile</option>
                    <option value='clothing'>Genders</option>
                    {/* Add more categories as needed */}
                </select>
            </label>

            <label className='flex flex-col text-lg text-gray-700 mt-5'>
                Description
                <textarea
                    className='p-2 rounded-md border-3 border-gray-200'
                    name='description'
                    onChange={changeHandler}
                    value={formData.description}
                    required
                />
            </label>

            <label className='flex flex-col text-lg text-gray-700 mt-5'>
                Size
                <input
                    className='p-2 rounded-md border-3 border-gray-200'
                    name='size'
                    onChange={changeHandler}
                    value={formData.size}
                    required
                />
            </label>

            <label className='flex flex-col text-lg text-gray-700 mt-5'>
                Quantiry
                <input
                    className='p-2 rounded-md border-3 border-gray-200'
                    type='number'
                    name='quantity'
                    onChange={changeHandler}
                    value={formData.quantity}
                    required
                    min='0'
                />
            </label>

            <label className='flex flex-col text-lg text-gray-700 mt-5'>
                Price
                <input
                    className='p-2 rounded-md border-3 border-gray-200'
                    type='number'
                    name='price'
                    onChange={changeHandler}
                    value={formData.price}
                    required
                    min='0'
                />
            </label>




            <div className='flex gap-2 items-start mt-5'>
                <button className='px-10 py-2 bg-amber-600/50 rounded-md cursor-pointer text-white text-lg font-semibold'>
                    Update Product
                </button>
                <button className='px-10 py-2 bg-gray-600 rounded-md cursor-pointer text-white text-lg font-semibold' onClick={() => navigate('/products')}>
                    Cancel
                </button>
            </div>
        </form>)
}
