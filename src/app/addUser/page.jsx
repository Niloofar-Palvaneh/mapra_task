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
        profilePicture: null, // برای نگهداری فایل تصویر
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
            setPreview(null); // اگر فایلی انتخاب نشد، پیش‌نمایش را پاک می‌کنیم
        }
    };

    return (
        <div>
            <h1>فرم اطلاعات کاربر</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div>
                            <label htmlFor="firstName">نام:</label>
                            <Field name="firstName" type="text" />
                            <ErrorMessage name="firstName" component="div" />
                        </div>
                        <div>
                            <label htmlFor="lastName">نام خانوادگی:</label>
                            <Field name="lastName" type="text" />
                            <ErrorMessage name="lastName" component="div" />
                        </div>
                        <div>
                            <label htmlFor="email">ایمیل:</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="profilePicture">تصویر پروفایل:</label>
                            <input
                                name="profilePicture"
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={(event) => handleFileChange(event, setFieldValue)}
                            />
                            <ErrorMessage name="profilePicture" component="div" />
                        </div>
                        {preview && (
                            <div>
                                <h3>پیش‌نمایش تصویر:</h3>
                                <img src={preview} alt="پیش‌نمایش" style={{ width: '100px', height: '100px' }} />
                            </div>
                        )}
                        <button type="submit">ارسال</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddUser;