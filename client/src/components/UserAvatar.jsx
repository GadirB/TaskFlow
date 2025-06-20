import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaUser, FaUserLock } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserAvatar = () => {
    const [open, setOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        console.log("logout");
    };


    return (
        <>
            <div>
                <Menu as='div' className='relative inline-block text-left'>
                    <div>
                        <Menu.Button className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
                            <span className='text-white font-semibold'>
                                {getInitials(user?.name)}
                            </span>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
                            <div className='p-4'>
                                <Menu.Item>
                                    
                                </Menu.Item>
                            </div>
                            
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    )
}

export default UserAvatar