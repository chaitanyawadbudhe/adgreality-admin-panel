import React, { useState } from 'react';
import {addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {db} from "../../../firebase/firebase.js"// Import necessary Firebase functions

const SaveUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Reference to Firestore 'users' collection
            const userCollection = collection(db, 'contacts');

            // Add user data along with a timestamp
            await addDoc(userCollection, {
                name: name,
                email: email,
                createdAt: serverTimestamp(), // Server timestamp
            });

            setMessage('User data stored successfully!');
            setName('');
            setEmail('');
        } catch (error) {
            setMessage(`Error storing data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Store User Data</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-lg">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-lg">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading && 'opacity-50 cursor-not-allowed'}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save User Data'}
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default SaveUser;
