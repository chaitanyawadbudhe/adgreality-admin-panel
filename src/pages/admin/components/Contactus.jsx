'use client'

import React, {useEffect, useState} from 'react'
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../../../firebase/firebase.js";

export default function Contactus() {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [response , setResponse] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Reference to Firestore 'users' collection
            const userCollection = collection(db, 'contacts');

            // Add user data along with a timestamp
            await addDoc(userCollection, {
                name: firstName+" "+lastName,
                email: email,
                phone:phone,
                message:message,
                createdAt: serverTimestamp(), // Server timestamp
            });

            setMessage('');
            setFirstName('');
            setLastName(" ")
            setPhone(" ")
            setEmail('');
            setResponse("Thank you for contacting us! We'll get back soon with you")

        } catch (error) {
            setResponse(`Error storing data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (response) {
            const timeout = setTimeout(() => setResponse(''), 5000); // Clear response after 5 seconds
            return () => clearTimeout(timeout); // Cleanup the timeout on component unmount or response change
        }
    }, [response]);


    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6cb4b0] to-[#549cac] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact sales</h2>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                id="first-name"
                                value={firstName}
                                name="first-name"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#6cb4b0]"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                id="last-name"
                                value={lastName}
                                name="last-name"
                                type="text"
                                autoComplete="family-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#6cb4b0]"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                value={email}
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#6cb4b0]"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                            Phone number
                        </label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#6cb4b0]">
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    id="phone-number"
                                    value={phone}
                                    name="phone-number"
                                    type="text"
                                    placeholder="123-456-7890"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#6cb4b0]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                            Message
                        </label>
                        <div className="mt-2.5">
              <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  name="message"
                  value={message}
                  rows={4}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#6cb4b0]"
                  defaultValue={''}
              />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        type="button"
                        className={`block w-full rounded-md bg-[#6cb4b0] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#549cac] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6cb4b0] ${loading && 'opacity-50 cursor-not-allowed'}`}
                    >
                        {loading ? 'Will get back to you' : "Let's Talk"}
                    </button>
                </div>
            </form>
            {response && (
                <div className="mt-4 flex justify-center">
                    <p className="text-center text-[#6cb4b0]">{response}</p>
                </div>
            )}
        </div>
    )
}
