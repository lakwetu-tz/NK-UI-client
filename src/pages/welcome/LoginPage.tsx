import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { useAppContext } from '../../context/AppProvider';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setIsLoggedIn } = useAppContext();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log(`${process.env.base_url}/user/login`)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(phone)
    try {
    
        // Make the actual API call when the server is working
      const response = await axios.post('http://127.0.0.1:4000/api/v1/user/login', {
          phone,
          password,
        });

        login({
          token: response.data.token,
          id: response.data.user._id,
          phone: response.data.user.phone,
          name: response.data.user.name,
          verified: response.data.user.account_verified
        });
        console.log(response.data.user._id)
        // console.log(login)
        
        setIsLoggedIn(true);
        navigate('/home');
      }
    catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Error from the server
        setError(err.response.data.message || 'An unexpected error occurred');
      } else {
        // Other errors (network issues, etc.)
        setError('An unexpected error occurred');
      }
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='max-w-md font-serif mx-auto h-screen flex flex-col items-center justify-center px-4'>
      <div>
        <img src={require("../../assets/logo.png")} alt='logo' className='w-32 h-32 absolute left-4 top-4 object-cover'/>
      </div>

      <div className='mb-6 text-5xl font-sans text-[#72c053] font-extrabold'>
        <h1>Loan Portal</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mb-4 px-2' >

        <div className="mb-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone number"
            className="px-4 py-2 text-black text-sm border-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required

          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            className="px-4 py-2 text-black text-sm border-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>

        </div>
     
        {error && <p className='text-red-600 mb-2'>{error}</p>}
        <button
          type='submit'
          className='w-full items-center bg-[#72c053] text-white lg:w-[400px] py-2 rounded-md text-lg font-bold shadow-lg'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Log In'}
        </button>

      </form>
      <div className='flex flex-col mt-6 text-blue-600 justify-center items-center'>
        <Link to="/reset" className='text-blue mb-2'>Reset Password</Link>
        <span className='text-gray-400'>
          No account?
          <Link to="/register" className='text-blue-600 text-base font-medium pl-[1px]'>
            Create one
          </Link>

        </span>
      </div>


    </section>
  )
}

export default Login