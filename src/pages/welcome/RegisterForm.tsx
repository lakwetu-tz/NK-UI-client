import React, { useEffect, useRef, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUserCheck, FiUserX } from 'react-icons/fi';
import { FaCircleInfo } from 'react-icons/fa6';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,24}$/;

const RegisterForm: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState('');
    const [nameFocus, setNameFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const navigate = useNavigate();
    // const { login } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);

    useEffect(() => {
        setError('');
    }, [name, phone, password, matchPwd]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const v1 = PWD_REGEX.test(password);

        if (!v1) {
            setError("Invalid Entry");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post("http://127.0.0.1:4000/api/v1/user/register", {
                phone,
                name,
                password,
            });
            
            console.log(response.data.status);
            console.log(typeof(response.data.status));

            if (response.data.status === 200) {
                setError('');
                setIsLoading(false);
                console.log(response.data.message);
                navigate('/verify', { state: { phone } });
            }

            
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Error from the server
                setError(err.response.data.message || 'An unexpected error occurred');
            } else {
                // Other errors (network issues, etc.)
                setError('An unexpected error occurred');
            }
            console.error('Error during registration:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='max-w-md font-serif mx-auto h-screen flex flex-col items-center justify-center px-4'>
            <div>
                <img src={require("../../assets/logo.png")} alt='logo' className='w-32 h-32 absolute left-4 top-4 object-cover' />
            </div>


            <p ref={errRef} className={error ? "text-red-500" : "text-green-500"} aria-live="assertive">{error}</p>

            <div className='mb-6 text-3xl font-bold'>
                <h1>Create Account!</h1>
            </div>

            <form onSubmit={handleSubmit} className='w-full mb-4 px-2'>
                <div className="mb-2">
                    <label>
                        <span className="text-sm text-gray-600">Name
                            <span className={` ${ name ? "text-green-500": "text-red-500"}`}>*</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        autoComplete="off"
                        ref={nameRef}
                        aria-describedby="name-error"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        className="px-4 py-2 text-black text-sm border-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <p id="name-error" className={nameFocus && name ? "font-sm border-2 bg-black text-white p-1 relative bottom-[-10px]" : "absolute left-[-9999px]"}>
                        <FaCircleInfo className="inline-block mr-1" />
                        Must be a valid name address.
                    </p>
                </div>

                <div className="mb-2">
                    <label>
                        <span className="text-sm text-gray-600">Phone Number(TZ)
                            <span className={` ${phone ? "text-green-500" : "text-red-500"}`}>*</span>
                        </span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete='off'
                        ref={phoneRef}
                        aria-describedby="phone-note"
                        onFocus={() => setPhoneFocus(true)}
                        onBlur={() => setPhoneFocus(false)}
                        placeholder="+255723424234"
                        className="px-4 py-2 text-black text-sm border-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <p id="phone-note" className={phoneFocus && phone ? "font-sm border-2 bg-black text-white p-1 relative bottom-[-10px]" : "absolute left-[-9999px]"}>
                        <FaCircleInfo className="inline-block mr-1" />
                        Must be a valid phone number.
                    </p>
                </div>

                <div className="mb-2">
                    <label>
                        <span className="text-sm text-gray-600">Password
                            <FiUserCheck className={validPwd ? "text-green-500 ml-2" : "hidden"} />
                            <FiUserX className={!validPwd || !password ? "text-red-500 ml-2" : "hidden"} />
                        </span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="px-4 py-2 text-black text-sm border-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "font-sm border-2 bg-black text-white p-1 relative bottom-[-10px]" : "absolute left-[-9999px]"}>
                        <FaCircleInfo className="inline-block mr-1" />
                        Must be between 8 and 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>

                <div className="mb-2">
                    <label>
                        <span className="text-sm text-gray-600">Confirm Password
                            <FiUserCheck className={validMatch && matchPwd ? "text-green-500 ml-2" : "hidden"} />
                            <FiUserX className={validMatch || !matchPwd ? "hidden" : "text-red-500 ml-2"} />
                        </span>
                    </label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Please confirm your password"
                        className="px-4 py-2 text-black text-sm border-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={matchPwd}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirm-note"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirm
                    note" className={matchFocus && !validMatch ? "font-sm border-2 bg-black text-white p-1 relative bottom-[-10px]" : "absolute left-[-9999px]"}>
                        <FaCircleInfo className="inline-block mr-1" />
                        Must match the first password input field.
                    </p>
                </div>

                <button
                    type='submit'
                    className='w-full items-center bg-[#72c053] text-white lg:w-[400px] py-2 rounded-md text-lg font-bold shadow-lg'
                // disabled={!validname || !validPhone || !validUsername || !validPwd || !validMatch || isLoading}
                >
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>

            {/* <div className='flex flex-col mt-6 text-blue-600 justify-center items-center'>
                <p className='mb-2'>Or</p>
                <button type='button' className='flex w-full justify-center border lg:w-[400px] py-2 px-8 rounded-md mb-4'>
                    <FcGoogle size="22px" />
                    <p className=' px-2 font-bold'>Signup with Google </p>
                </button>
            </div> */}
        </section>
    );
}

export default RegisterForm;