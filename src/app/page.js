"use client"

import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Link from 'next/link';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // بارگذاری کاربران از API فیک
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();

    // بارگذاری وضعیت چک باکس‌ها از localStorage
    const savedSelections = JSON.parse(localStorage.getItem('selectedUsers')) || [];
    setSelectedUsers(savedSelections);
  }, []);

  const handleCheckboxChange = (userId) => {
    const newSelection = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId) // لغو انتخاب
      : [...selectedUsers, userId]; // انتخاب جدید

    setSelectedUsers(newSelection);
    localStorage.setItem('selectedUsers', JSON.stringify(newSelection)); // ذخیره در localStorage
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
    URL.revokeObjectURL(url); // آزاد کردن URL
  };

  return (
    <>
      {
        users.length ? (
          <div className='w-full flex items-center justify-center'>
            <div className=' w-[90%] bg-green-200 mt-12 p-12 rounded-xl shadow-md'>
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
                {users.map(user => (
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
                      <span className=' text-gray-800'> کاربر شماره :</span>
                      <span className='text-green-900 font-bold'> {user.id}</span>
                    </div>
                    <div>
                      <span className=' text-gray-800'> نام کاربر  :</span>
                      <span className='text-green-900 font-bold'> {user.name} </span>
                    </div>
                    <div>
                      <span className=' text-gray-800'> ایمیل کاربر  :</span>
                      <span className='text-green-900 font-bold'> {user.email} </span>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        ) : <Loader />
      }

    </>
  );
};

export default Home;