import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from './UserAvatar.jsx';
import NotificationPanel from './NotificationPanel.jsx';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
     
    return (
        <div className='flex justify-between items-center bg-[#0f172a] px-4 py-3 2xl:py-4 sticky z-10 top-0'>
            <div className='flex gap-4'>
                <button
                    onClick={() => dispatch(setOpenSidebar(true))}
                    className='text-2xl text-white block md:hidden'
                >
                    ☰
                </button>
                <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#1e293b] border border-[#334155]'>
                    <MdOutlineSearch className='text-white text-xl' />

                    <input
                        type='text'
                        placeholder='Search...'
                        className='flex-1 outline-none bg-transparent placeholder:text-[#94a3b8] text-white' 
                    /> 
                </div>
            </div>

            <div className='flex gap-2 items-center'>
                <NotificationPanel />
                <UserAvatar />
            </div>
        </div>
    )
}

export default Navbar