import {SelectHTMLAttributes} from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({children, ...rest}: Props) {
  return (
    <select
      className="my-2 w-24 rounded-md border-gray-300 py-4 text-base text-gray-500 disabled:opacity-50"
      {...rest}
    >
      {children}
    </select>
  );
}
