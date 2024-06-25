import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '']);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${process.env.base_url}/resend-otp`, { phone });
      setResendMessage(response.data.message);
    } catch (error: any) {
      setResendMessage(error.response?.data?.message || 'Failed to resend OTP');
    }
  };


  // const debounceResendOtp = useDebounce(handleResendOtp, 500000);

  if (!phone) {
    // Redirect back to the register page if no phone number is provided
    navigate('/register');
    return null;
  }

  const handleOtpChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const otpCode = otp.join('');
      const response = await axios.post('http://127.0.0.1:4000/api/v1/user/verify-otp', { phone, otp: otpCode });
      setMessage(response.data.message);
      console.log(response.data.message);
      console.log(typeof(response.data.message));

      if (response.data.message === 'User verified successfully') {
        navigate('/home');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full dark:bg-gray-900 px-2">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
        <p className="text-gray-600 text-center mb-4">Code sent to {phone}</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 gap-x-4 my-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleOtpChange(index)}
                className="rounded-lg bg-gray-100 dark:bg-gray-800 w-14 aspect-square flex items-center justify-center text-center text-lg"
                required
              />
            ))}
          </div>
          <div className="flex items-center flex-col justify-between mb-6">
            <p className="text-gray-600 text-sm">Didn't receive code?</p>
            <button
              type="button"
              // onClick={handleResendOtp}
              className="text-green-600 hover:underline"
            >
              Resend OTP
            </button>
            {resendMessage && <p className="text-green-600">{resendMessage}</p>}
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-lg font-medium text-white bg-green-600 rounded-md hover:bg-green-700 ${isLoading ? 'bg-gray-400' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
