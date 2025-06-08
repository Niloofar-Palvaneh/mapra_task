"use client"
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import Link from 'next/link';

const FileUploader = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileExtension = file.name.split('.').pop();

    if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        console.log(json);
      };
      reader.readAsArrayBuffer(file);
    } else if (fileExtension === 'csv') {
      Papa.parse(file, {
        complete: (results) => {
          console.log(results.data);
        },
        header: true,
      });
    } else {
      console.error('فرمت فایل پشتیبانی نمی‌شود. لطفاً یک فایل XLSX یا CSV بارگذاری کنید.');
    }
  };

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-[90%] bg-green-200 mt-12 p-12 rounded-xl shadow-md'>
        <div>
          <h1 className='text-center font-bold text-2xl mb-8'>Excel بده json تحویل بگیر!</h1>
          <p className='text-red-500 text-center'>
            برای این قسمت تو تسک نوشته شده بود که json نهایی رو به api بفرستید و من متوجه نشدم که به چه api باید ارسالش کنم ولی نتیجه نهایی رو میتونید تو کنسول ببینید
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <input type="file" accept=".xlsx,.csv" onChange={handleFileChange} className='mt-12 ' />
        </div>
        <div className='flex items-center justify-center'>
          <Link className='bg-green-900 text-white px-8 py-1 rounded w-max mt-8' href={"/"}>رفتن به صفحه اصلی</Link>
        </div>
      </div>
    </div>

  );
};

export default FileUploader;