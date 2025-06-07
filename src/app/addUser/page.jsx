"use client"
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddUser = () => {
    const [preview, setPreview] = useState(null);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: null, 
    };

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(15, 'نام باید حداکثر 15 کاراکتر باشد')
            .required('فیلد نام الزامی است'),
        lastName: Yup.string()
            .max(20, 'نام خانوادگی باید حداکثر 20 کاراکتر باشد')
            .required('فیلد نام خانوادگی الزامی است'),
        email: Yup.string()
            .email('ایمیل نامعتبر است')
            .required('فیلد ایمیل الزامی است'),
        profilePicture: Yup.mixed()
            .required('فیلد تصویر پروفایل الزامی است')
            .test('fileType', 'فقط فایل‌های JPEG و PNG مجاز هستند', value => {
                return value && (value.type === 'image/jpeg' || value.type === 'image/png');
            }),
    });

    const onSubmit = (values) => {
        console.log('فرم ارسال شد:', values);
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue('profilePicture', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null); 
        }
    };

    return (
        <div className='w-full flex items-center justify-center'>
            <div className=' w-[90%] bg-green-200 mt-12 p-12 rounded-xl shadow-md'>
                <h1 className='text-center font-bold text-2xl mb-8'>فرم اطلاعات کاربر</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form >
                            <div className='w-full grid grid-cols-4 gap-2'>
                                <div className='flex gap-2 '>
                                    <label className='font-bold' htmlFor="firstName">نام:</label>
                                    <div className='flex flex-col'>
                                        <Field name="firstName" type="text" className="bg-white border shadow py-1 px-2 rounded outline-none focus:bg-green-100" />
                                        <ErrorMessage name="firstName" component="div" className='text-red-500 ' />
                                    </div>
                                </div>
                                <div className='flex gap-2 '>
                                    <label className='font-bold' htmlFor="lastName">نام خانوادگی:</label>
                                    <div className='flex flex-col'>
                                        <Field name="lastName" type="text" className="bg-white border shadow py-1 px-2 rounded outline-none focus:bg-green-100 " />
                                        <ErrorMessage name="lastName" component="div" className='text-red-500 ' />
                                    </div>
                                </div>
                                <div className='flex gap-2 '>
                                    <label className='font-bold' htmlFor="email">ایمیل:</label>
                                    <div className='flex flex-col'>
                                        <Field name="email" type="email" className="bg-white border shadow py-1 px-2 rounded outline-none focus:bg-green-100 " />
                                        <ErrorMessage name="email" component="div" className='text-red-500 ' />
                                    </div>
                                </div>
                                <div className='relative'>
                                    <div>
                                        <label className='font-bold' htmlFor="profilePicture">تصویر پروفایل:</label>
                                        <input
                                            name="profilePicture"
                                            type="file"
                                            accept="image/jpeg, image/png"
                                            onChange={(event) => handleFileChange(event, setFieldValue)}
                                        />
                                        <ErrorMessage name="profilePicture" component="div" />
                                    </div>
                                    {preview && (
                                        <div className="absolute left-0">
                                            <img src={preview} alt="پیش‌نمایش" className='w-24 h-24 rounded-full border shadow' />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center justify-center w-full mt-6'>
                                <button type="submit" className='bg-green-900 text-white px-8 py-1 rounded w-max'>ارسال</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddUser;