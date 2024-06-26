import React from 'react';
import { MdPayment, MdDashboardCustomize, MdAccountBox } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';

const BottomNavBar = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <nav className="fixed bottom-2 rounded-b-3xl shadow-lg border-2 left-2 right-2 bg-white p-2 flex justify-around items-center md:hidden">
      <Link
        to="/home"
        onClick={() => handleTabChange('home')}
        className={`${activeTab === 'home' ? 'active flex bg-green-100 py-2 px-4 gap-x-2 rounded-2xl text-green-700 items-center' : ''}`}
      >
        <MdDashboardCustomize size={22} color="green" />
        <p className={`${activeTab === 'home' ? 'text-lg font-bold' : 'hidden'}`}>Home</p>
      </Link>

      <Link
        to="/loans"
        onClick={() => handleTabChange('payment')}
        className={`${activeTab === 'payment' ? 'active flex bg-green-100 py-2 px-4 gap-x-2 rounded-2xl text-green-700 items-center' : ''}`}
      >
        <MdPayment size={22} color="green" />
        <p className={`${activeTab === 'payment' ? 'text-lg font-bold' : 'hidden'}`}>Loan</p>
      </Link>

      <Link
        to="/profile"
        onClick={() => handleTabChange('profile')}
        className={`${activeTab === 'profile' ? 'active flex bg-green-100 py-2 px-4 gap-x-2 rounded-b-2xl text-green-700 items-center' : ''}`}
      >
        <MdAccountBox size={22} color='green' />
        <p className={`${activeTab === 'profile' ? 'font-semibold text-sm' : 'hidden'}`}>Profile</p>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
