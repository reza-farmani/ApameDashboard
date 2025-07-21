// components/Input.js
import React, { useState, cloneElement } from 'react';
import { IconType } from 'react-icons';

interface InputComponentsProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: string;
  placeholder?: string;
  color?: string;
  backgroundColor?: string;
  icon?: React.ReactElement<React.ComponentProps<IconType>>;
  iconColor?: string;
}

const InputComponents = ({
  onChange,
  size = 'md',
  placeholder = '',
  color = '#000',
  backgroundColor = '#fff',
  icon,
  iconColor = '#888',
}: InputComponentsProps) => {
  const [inputValue, setInputValue] = useState('');

  // Apply styles based on the size prop
  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'md':
        return 'py-2.5 px-3 text-sm sans-semibold';
      case 'lg':
        return 'py-3.5 px-6 text-base sans-semibold';
      default:
        return 'py-4.5 px-10 text-base sans-semibold';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className="relative flex justify-between items-center w-[250px] bg-[#f0f0f0] button-best rounded-xl">
      {icon && React.isValidElement(icon) && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {cloneElement(icon, { color: iconColor, size: 20 })}
        </div>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          color: color,
          backgroundColor: backgroundColor,
          paddingLeft: icon ? '2.5rem' : '1rem',
          border: 'none',
          fontFamily: 'sans-semiBold',
          paddingRight: icon ? '2.8rem' : '1rem',
        }}
        className={`border rounded-md focus:outline-none placeholder:text-gray-400 ${getSizeStyles(size)}`}
      />
    </div>
  );
};

export default InputComponents;
