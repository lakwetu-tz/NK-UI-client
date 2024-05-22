import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

interface PersonalDetailsFormProps {
    setActive: React.Dispatch<React.SetStateAction<'personal' | 'other' | 'require'>>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ setActive }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [state, setState] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [error, setError] = useState('');

    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!photo) {
            setError('Please upload a photo.');
            setLoading(false);
            return;
        }


        try {
            await axios.post('http://127.0.0.1:4000/api/v1/form/create/', firstName,
            
            
            );

            setLoading(false);
            setActive('other');
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
            setLoading(false);
        }
    };

    return (
        <>
             <form onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12 mb-12 px-4">
                    <div className="grid grid-cols-4 gap-6 rounded-md shadow-sm bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1 text-center mb-2">
                            <h1 className="mb-2 font-bold text-lg">Add your personal Details</h1>
                            <p className="text-medium">You can update your personal details after account creation</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 p-6">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="firstName" className="text-sm">
                                    First name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="lastName" className="text-sm">
                                    Last name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="email" className="text-sm">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="phone" className="text-sm">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="+255712345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="address" className="text-sm">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="city" className="text-sm">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="state" className="text-sm">Region</label>
                                <input
                                    id="state"
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="zip" className="text-sm">ZIP / Postal</label>
                                <input
                                    id="zip"
                                    type="number"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-green-600 border-gray-300"
                                />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="photo" className="text-sm">Photo</label>
                                <div className="flex items-center space-x-2">
                                    {photo ? (
                                        <img src={URL.createObjectURL(photo)} alt="" className="w-10 h-10 rounded-full bg-gray-300" />
                                    ) : (
                                        <img src="https://source.unsplash.com/30x30/?random" alt="" className="w-10 h-10 rounded-full bg-gray-300" />
                                    )}
                                    <input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setPhoto(e.target.files[0]);
                                            }
                                        }}
                                        className="px-4 py-2 border rounded-md border-gray-300"
                                    />
                                </div>
                            </div> 
                            {error && <div className="col-span-full text-red-500">{error}</div>}
                            <div className="col-span-full mt-8">
                                <button type="submit" className="relative w-full bg-green-800 px-4 py-2 rounded-lg text-white font-bold">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
        </>
    );
};

export default PersonalDetailsForm;