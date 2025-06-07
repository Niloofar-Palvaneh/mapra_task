"use client"

import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>لیست کاربران</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.name} - {user.email}</span>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
              انتخاب
            </label>
          </li>
        ))}
      </ul>
      <button onClick={downloadUsers} disabled={selectedUsers.length === 0}>
        دانلود کاربران انتخاب شده
      </button>
    </div>
  );
};

export default Home;