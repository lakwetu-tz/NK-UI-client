import React, { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa6';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { useAppContext } from '../../context/AppProvider';
const profilePic = require('../../assets/profile.jpg');

const Header = () => {
    const { showBalances, enableNotification, toggleBalances, toggleNotification } = useAppContext();
    const [profileImage, setProfileImage] = useState(profilePic);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfileImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);

            // Simulate upload process
            setUploading(true);
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress += 10;
                    setUploadProgress(progress);
                } else {
                    setUploading(false);
                    clearInterval(interval);
                }
            }, 200);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <section className='max-w-screen-full mx-auto bg-[#72c053] text-white overflow-hidden h-[190px] md:h-[230px] px-6 sm:px-8 md:px-12 lg:px-24'>
            <div className='my-8 px-4 flex flex-col'>
                <div className='flex justify-between items-center mb-8'>
                    <div className='flex w-full justify-between items-center'>
                        <p className='text-3xl font-bold mr-4'>My Account</p>
                        <div className='relative'>
                            <img
                                src={profileImage}
                                alt="profile"
                                className='rounded-full object-center bg-yellow-300 w-12 h-12'
                            />
                            <button
                                onClick={handleUploadClick}
                                className='absolute bottom-0 right-0 bg-white p-1 rounded-full'
                            >
                                <FaCamera className='text-black' />
                            </button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className='hidden'
                            accept="image/*"
                        />
                    </div>
                </div>
                {uploading && (
                    <div className='w-full bg-gray-200 rounded-full'>
                        <div
                            className='bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
                            style={{ width: `${uploadProgress}%` }}
                        >
                            {uploadProgress}%
                        </div>
                    </div>
                )}

                <div className='flex flex-col justify-center md:mx-auto'>
                    <div className='flex items-center mb-4'>
                        <p className='mr-4 text-sm'>Show Dashboard Account Balances</p>
                        <button onClick={toggleBalances}>
                            {showBalances ? <FiToggleLeft className='w-6 h-6' /> : <FiToggleRight className='w-6 h-6 text-orange-300' />}
                        </button>
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-4 text-sm'>Enable Notification</p>
                        <button onClick={toggleNotification}>
                            {enableNotification ? <FiToggleRight className='w-6 h-6 text-orange-300' /> : <FiToggleLeft className='w-6 h-6' />}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
