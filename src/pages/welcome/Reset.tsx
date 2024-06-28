import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiSend } from'react-icons/fi';
import { FaCircleInfo } from'react-icons/fa6';

const Reset = () => {
    const [phone, setPhone] = React.useState('');
    const phoneRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

  
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(phone)

        try {
            setIsLoading(true);
            // send phone number to server to reset password using axios
            const response = await axios.post('http://127.0.0.1:4000/api/v1/user/reset-password', { phone });

            console.log(response.data);
            if (response.data.status === 'Ok') {
                navigate('/login');
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Error from the server
                setIsError(err.response.data.message || 'An unexpected error occurred');
            } else {
                // Other errors (network issues, etc.)
                setIsError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
            setIsError('');
            // Clear the phone number input field
   
        }
    };

    return (
        <section className='w-full h-screen flex flex-col items-center justify-center px-8 font-serif'>
            

            <form onSubmit={handleSubmit} className='flex flex-col mb-6 gap-y-3 w-full lg:w-[400px]'>
                <label className='text-2xl font-bold'>
                    <h1>Reset your password</h1>
                    <p className='text-sm text-gray-600'>Enter your phone number to reset your password.</p>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete='off'
                    ref={phoneRef}
                    maxLength={13}
                    minLength={10}
                    aria-describedby="phone-note"
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => setPhoneFocus(false)}
                    placeholder="+255723424234"
                    className="px-4 py-2 text-black text-sm border-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <p id="phone-note" className={phoneFocus && phone ? "font-sm border-2 bg-black text-white p-1 relative bottom-[-10px]" : "absolute left-[-9999px]"}>
                    <FaCircleInfo className="inline-block mr-1" />
                    Must be a valid phone number.
                </p>
                <button
                    type='submit'
                    className='bg-[#72c053] text-white w-full py-2 rounded-md text-lg font-bold shadow-lg'
                    disabled={isLoading}
                >
                    
                        <FiSend className='w-6 h-6 absolute ml-2'/>
                        <p>{isLoading ? 'Sending...' : 'Send'}</p>
                    
                    
                </button>
            </form>

            {isError && <p className='text-red-500'>An error occurred. Please try again.</p>}

            <Link to="/login" className='mt-8 text-blue-600 justify-center items-center underline cursor-pointer'>
                Cancel
            </Link>
        </section>
    );
}

export default Reset;
