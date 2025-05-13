import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../API/API';

export const ProductForm = () => {

    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        subCategory: '',
        description: '',
        quantity: 0,
        price: 0,
        image: null,
    });


    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');



    const navigate = useNavigate();

    const token = localStorage.getItem("token")

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
            const response = await API.post('/product/createProduct', formData, {
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

    return (
        <div>
            {loading && <p>Loading...</p>}
            <form
                className='w-[40rem] max-sm:w-full mx-auto p-10 rounded-xl shadow-2xl border border-gray-200 mt-10'
                onSubmit={submitHandler}
            >
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
                        className='p-2 rounded-md border-3 border-dashed border-gray-200'
                        type='file'
                        name='productImage'
                        onChange={fileChangeHandler}
                        required
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
                        required
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
                        required
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
                    Quantity
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


                <div className='flex flex-col gap-2 items-start mt-5'>
                    <button className='px-10 py-2 bg-amber-600/50 rounded-md cursor-pointer text-white text-lg font-semibold'>
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}
