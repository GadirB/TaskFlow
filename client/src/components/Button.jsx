import React from 'react'
import clsx from 'clsx'

const Button = ({ icon, className, label, type, onClick = () =>
{} }) => {
  return (
    <button
      type={type || 'button'}
      className={clsx(
        'px-3 py-2 outline-none rounded bg-blue-700 text-white hover:bg-blue-800',
        className
      )}
      onClick={onClick}
      >
      <span>{label}</span>
      {icon && icon}
    </button>
  )
}

export default Button;