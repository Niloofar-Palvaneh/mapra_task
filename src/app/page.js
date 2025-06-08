"use client";

import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Link from 'next/link';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;  // تعداد آیتم‌ها در هر صفحه

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('خطا در بارگذاری داده‌ها');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();

    const savedSelections = JSON.parse(localStorage.getItem('selectedUsers')) || [];
    setSelectedUsers(savedSelections);
  }, []);

  const handleCheckboxChange = (userId) => {
    const newSelection = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];

    setSelectedUsers(newSelection);
    localStorage.setItem('selectedUsers', JSON.stringify(newSelection));
  };

  const downloadUsers = () => {
    const selectedUserData = users.filter(user => selectedUsers.includes(user.id));
    const fileData = JSON.stringify(selectedUserData, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected_users.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // محاسبه ایندکس شروع و پایان آیتم‌های در حال نمایش
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // تابع تغییر صفحه
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // محاسبه تعداد کل صفحات
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {error && <div className="text-red-500 text-center">{error}</div>}

      {
        users.length ? (
          <div className='w-full flex items-center justify-center relative'>
            <div className='w-[90%] bg-green-200 mt-12 p-12 rounded-xl shadow-md'>
              <div className='flex items-center justify-between'>
                <h1 className='text-center font-bold text-2xl m-4'>لیست کاربران</h1>
                <Link href={"/addUser"}>
                  رفتن به صفحه افزودن کاربر
                </Link>
                <button onClick={downloadUsers} disabled={selectedUsers.length === 0}
                  className={`bg-green-900 text-white px-4 py-1 rounded shadow  ${selectedUsers.length === 0 ? "opacity-50" : "opacity-100 cursor-pointer"}`}>
                  دانلود کاربران انتخاب شده
                </button>
              </div>
              <ul className='grid grid-cols-2 gap-4'>
                {currentUsers.map(user => (
                  <li key={user.id} className='bg-white border p-2 rounded w-full'>
                    <label className='my-4'>
                      <input
                        className=''
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                      انتخاب کاربر
                    </label>
                    <div>
                      <span className='text-gray-800'> کاربر شماره :</span>
                      <span className='text-green-900 font-bold'> {user.id}</span>
                    </div>
                    <div>
                      <span className='text-gray-800'> نام کاربر  :</span>
                      <span className='text-green-900 font-bold'> {user.name} </span>
                    </div>
                    <div>
                      <span className='text-gray-800'> ایمیل کاربر  :</span>
                      <span className='text-green-900 font-bold'> {user.email} </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='flex justify-center mt-4'>
                {pageNumbers.map(number => (
                  <button key={number} onClick={() => paginate(number)} className={`mx-2 px-4 py-2 rounded ${currentPage === number ? 'bg-green-900 text-white' : 'bg-gray-200 text-black'}`}>
                    {number}
                  </button>
                ))}
              </div>
            </div>
            <Link className=' underline px-2 py-1 rounded absolute bottom-0 left-24' href={"/moreInfo"}>مشاهده توضیحات</Link>
          </div>
        ) : <Loader />
      }
    </>
  );
};

export default Home;