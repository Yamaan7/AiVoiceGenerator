import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ children, className = '', ...props }) => {
  return (
    <select
      className={`block w-full rounded-md border-gray-300 shadow-sm 
        focus:border-blue-500 focus:ring-blue-500 
        dark:bg-gray-700 dark:border-gray-600 dark:text-white 
        py-2 px-3 text-sm sm:text-base ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export { Select };