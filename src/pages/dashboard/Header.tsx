import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiClipboard, FiEye, FiEyeOff, FiAirplay, FiPaperclip, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthProvider';
import { useAppContext } from '../../context/AppProvider';

interface NavItem {
    name: string;
    icon: JSX.Element;
    link: string;
}

const Header: React.FC = () => {
    const loan_balance = "0"; // Placeholder for loan balance
    const { user } = useAuth();
    const navigate = useNavigate();

    const { activeTab, setActiveTab, toggleBalances, showBalances } = useAppContext();

    

    const nav: NavItem[] = [
        { name: 'Apply Loan', icon: <FiClipboard size={22}/>, link: "/personal" },
        { name: 'Pay Loan', icon: <FiAirplay size={22}/>, link: "/pay" },
        { name: 'Agreement', icon: <FiPaperclip size={22}/>, link: "/contract" }
    ];

    const [currentCard, setCurrentCard] = useState(0);

    // const handleNextCard = () => {
    //     setCurrentCard((prevCard) => (prevCard + 1) % cardDetails.length);
    // };

    // const handlePrevCard = () => {
    //     setCurrentCard((prevCard) => (prevCard - 1 + cardDetails.length) % cardDetails.length);
    // };

    const toggleShowAmounts = () => {
        toggleBalances();
    };

    const handleTabChange = () => {
        setActiveTab('profile')
        navigate('/profile')
    }

    const cardDetails = [
       
        { label: 'Total Balance', amount: loan_balance },
        { label: 'Sum Loan', amount: loan_balance },
        // { label: 'Monthly Amount', amount: loan_balance }
    ];

    return (
        <header className="max-w-screen-full mx-auto bg-[#72c053] text-white overflow-hidden h-[360px] md:h-[230px] px-6 sm:px-8 md:px-12 font-serif lg:px-24">
            <div className="lg:px-8 font-bold m-4">
                <div className='flex justify-between mb-6 items-center'>
                    <div>
                        <p className='text-base'>Welcome,</p>
                        <span className='text-xl'>{user?.name}</span>
                    </div>
                    <div className='md:flex space-x-4 items-center'>
                        <nav className='hidden md:flex gap-x-2 items-center'>
                            {nav.map((item, key) => (
                                <Link key={key} to={item.link} className="items-center mt-2">
                                    <p className="ml-2">{item.name}</p>
                                </Link>
                            ))}
                        </nav>
                        
                        <FiUser onClick={handleTabChange} className="rounded-full object-center bg-gray-100 text-gray-600 w-8 h-8 md:w-8 mr-2 cursor-pointer p-2" />
                        
                    </div>
                </div>
                <div className='relative flex flex-col md:flex-row gap-x-4 justify-center'>
                    {/* <FiArrowLeft onClick={handlePrevCard} className='md:hidden absolute left-2 w-6 h-6 cursor-pointer' /> */}
                    {cardDetails.map((card, index) => (
                        <div key={index} className={`${currentCard === index ? 'block' : 'hidden'} md:flex border-[1px] rounded-lg items-center justify-center bg-green-500 shadow-md px-4 py-2 w-full md:w-auto`}>
                            <div className='px-4 py-2'>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600 text-center">
                                        {card.label}
                                    </p>
                                    <button onClick={toggleShowAmounts} className="ml-2">
                                        {showBalances ? <FiEyeOff className="inline" /> : <FiEye className="inline" />}
                                    </button>
                                </div>
                                <p className='text-4xl text-center mt-4'>
                                    {showBalances ? `TZS ${card.amount}` : '****'}
                                </p>
                                <div className='mt-8 md:hidden border-[1px] mb-4'></div>
                                <div className="flex md:hidden justify-center gap-x-8">
                                    {nav.map((item, key) => (
                                        <Link key={key} to={item.link} className="text-center text-gray-600">
                                            <button className='bg-white px-2 py-2 rounded-md'>
                                                {item.icon}
                                            </button>
                                            <p className="text-[10px] mt-[4px]">{item.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <FiArrowRight onClick={handleNextCard} className='md:hidden absolute right-2 w-6 h-6 cursor-pointer' /> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
