import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../API/API';
import { Loading } from '../components/Loading';

export const ProductForm = () => {

    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        subCategory: '',
        description: '',
        quantity: 0,
        size: '',
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
        if (!file) return;

        setFormData((prevData) => ({
            ...prevData,
            image: file, // Directly set the File object
        }));

        // For preview only
        setPreviewUrl(URL.createObjectURL(file));
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('subCategory', formData.subCategory);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('quantity', formData.quantity);
            formDataToSend.append('size', formData.size);
            formDataToSend.append('image', formData.image); // image is a File object

            const response = await API.post('/product/createProduct', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                navigate('/products');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {loading && <Loading />}
            <h2 className='text-xl font-semibold'>Add Products</h2>
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
                        className='p-2 rounded-md border-3 border-gray-200'
                        type='file'
                        name='image' // ✅ match with formData field
                        accept='image/*' // ✅ limit to images
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
                        required
                    >
                        <option value=''>Select Category</option>
                        <option value='fashion'>Fashion</option>
                        <option value='jewellery'>Jewellery</option>
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
                        <option value='gold'>Gold</option>
                        <option value='silver'>Silver</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='kids'>kids</option>
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
