import React, { ReactNode } from 'react'

interface AcceptProductProps {
  children: ReactNode;
  disabled: {
    isSubmitting: boolean;
  };
}

function AcceptProduct({ children, disabled }: AcceptProductProps) {
  return (
    <button type="submit" disabled={disabled.isSubmitting} className="sans-bold bg-[#006BAD] px-10 py-[8px] mt-3 text-lg rounded-2xl text-white flex items-center justify-center gap-4 cursor-pointer hover:bg-green-600 duration-300 shadow hover:scale-90">
      {children}
    </button>
  );
}

export default AcceptProduct