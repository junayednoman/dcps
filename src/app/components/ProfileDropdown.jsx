import { IconButton } from '@mui/material';
import React, { useState, useRef, useContext } from 'react';
import man from "../../media/man.jpg";
import Image from 'next/image';
import Link from 'next/link';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { AuthContext } from '@/authContext/AuthContext';
import handleLogout from '@/lib/handleLogout';

function ProfileDropdown() {
    const { name, role } = useContext(AuthContext);
    console.log(role);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleIconClick = () => {
        setIsOpen(!isOpen);
    }
    const handleLogoutUser = async () => {
        try {
            const logOut = await handleLogout();
            if (logOut && logOut.isLoggedOut) {
                window.location = "/";
            }
        } catch (error) {
            console.log("Error logging out!");
        }
    }

    return (
        <div className="dropdown relative" ref={dropdownRef}>
            <div className=''>
                <IconButton
                    size="large"
                    onClick={handleIconClick}
                >
                    <Image className='rounded-full md:w-[35px] w-[28px] cursor-pointer' src={man} alt='man-image' width={200} height={100}></Image>
                </IconButton>
            </div>
            {
                isOpen && (
                    <ul className="dropdown-content absolute right-0 bg-white shadow-md w-[290px] overflow-y-scroll z-10 space-y-4 text-sm capitalize border rounded-md notificationDropdown py-5">
                        <div className='flex items-center gap-3 mb-6 px-5'>
                            <div>
                                {/* <img src={man} alt="avatar" /> */}
                                <Image className='rounded-md max-w-[60px]' src={man} alt='man-image' width={200} height={100}></Image>
                            </div>
                            <div>
                                <h5 className='font-semibold text-[16px]'>{name}</h5>
                                <p className='text-[14px] mt-1'>{role}</p>
                            </div>
                        </div>
                        <ul className='text-textColor space-y-3 px-5'>
                            <li>
                                <Link href="#" className='flex items-center gap-2'>
                                    <FaRegUser className='text-lg' />
                                    <span>প্রোফাইল</span>
                                </Link>
                            </li>
                        </ul>
                        <hr className='w-full b-0' />
                        <ul className='text-accentColor space-y-3 px-5' onClick={handleLogoutUser}>
                            <li>
                                <Link href="" className='flex items-center gap-2'>
                                    <MdOutlineLogout className='text-lg' />
                                    <span>লগ আউট</span>
                                </Link>
                            </li>
                        </ul>

                    </ul>)
            }
        </div >
    );
}

export default ProfileDropdown;