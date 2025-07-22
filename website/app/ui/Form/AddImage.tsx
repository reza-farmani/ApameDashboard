"use client";

import { useState } from 'react';

export default function CustomFileUpload() {
  const [fileName, setFileName] = useState('فایلی انتخاب نشده');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('فایلی انتخاب نشده');
    }
  };

  return (
    <div className="flex items-center gap-4 border rounded-md w-[250px] mr-10">
      <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
        انتخاب فایل
        <input
          type="file"
          onChange={handleChange}
          className="hidden"
        />
      </label>
      <span>{fileName}</span>
    </div>
  );
}
