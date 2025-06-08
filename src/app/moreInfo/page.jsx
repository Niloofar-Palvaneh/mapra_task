import Link from 'next/link'
import React from 'react'

function MoreInfo() {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-[90%] bg-green-200 mt-12 p-12 rounded-xl shadow-md'>
                <h1 className='text-center font-bold text-2xl mb-8'>راهنمای پروژه</h1>
                <div className='flex flex-col gap-4'>
                    <div>
                        <div className='flex flex-col'>
                            <p className='text-green-600 font-bold'>مورد اول:</p>
                            <p>
                                تو صفحه اول لیست 10 تا کاربر رو از یه api فیک میگیرم و صفحه بندی روش انجام میدم که تو هر صفحه دوتا کاربر رو نشون بده
                            </p>
                        </div>
                        <div className='flex gap-2 mt-2'>
                            <p className='text-red-500 font-bold'>نکته:</p>
                            <p>تو تسک گفته بود که تعداد کاربرا خیلی زیاد باشه و من api پیدا نکردم که اون تعداد کاربر رو بهم بده. حدس زدم که ممکنه بخواین فرآیند صفحه بندی رو نشون بدین و خب رو همین 10 تا کاربر اعمالش کردم</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col'>
                            <p className='text-green-600 font-bold'>مورد دوم:</p>
                            <p>
                                یه دکمه داریم بالای لیست کاربرا که اگه کاربر یا کاربرهایی رو انتخاب کنید اون دکمه فعال میشه و میتونید فایل json اون کاربرایی که انتخاب کردین رو دانلود کنید.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col'>
                            <p className='text-green-600 font-bold'>مورد سوم:</p>
                            <p>
                                یه لینک بالای صفحه هست با عنوان "رفتن به صفحه افزودن کاربر" تو این صفحه از formik & yup استفاده شده و شما باید اون فیلد ها رو پر کنید و یک عکس هم انتخاب کنید که بعد از انتخاب عکس یک پیش نمایش بهتون نشون میده و هروقت فرم رو submit کنید کاربر تو یه جدول پایین فرم نشون داده میشه و هرچندتا بخواین میتونید کاربر اضافه کنید
                            </p>
                        </div>
                        <div className='flex gap-2 mt-2'>
                            <p className='text-red-500 font-bold'>نکته:</p>
                            <p>
                                این لیست کاربرا به لیستی که تو صفحه اول هست هیچگونه ارتباطی نداره. این local هستش ولی اون از یک api گرفته میشه
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-2 mt-2'>
                            <p className='text-red-500 font-bold'>نکته آخر:</p>
                            <p>
                                میدونم که این توضیحات باید به فایل README اضافه میشد ولی ترجیحم این بود که بیشتر تو چشم باشه
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Link className='bg-green-900 text-white px-8 py-1 rounded w-max mt-8' href={"/"}>رفتن به صفحه اصلی</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo