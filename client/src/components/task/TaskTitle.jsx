import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import TaskColor from './TaskColor.jsx'

const TaskTitle = ({ label, className }) => {
  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-[#1e293b] flex items-center justify-between border border-[#334155]'>
        <div className='flex gap-2 items-center'>
            <TaskColor className={className} />
            <p className='text-sm md:text-base text-white'>
                {label}
            </p>
        </div>

        <button onClick={onclick} className='hidden md:block'>
            <IoMdAdd className='text-lg text-white' />
        </button>
    </div>
  )
}

export default TaskTitle