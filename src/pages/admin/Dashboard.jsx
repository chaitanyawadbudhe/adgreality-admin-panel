import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.js'; // Firebase setup with Firestore
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import ExcelJS from 'exceljs'; // Import ExcelJS for Excel file generation
import { saveAs } from 'file-saver'; // To save the Excel file locally
import { Timestamp } from 'firebase/firestore'; // Import Firestore Timestamp

const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    // Fetch user data from Firestore based on user-defined timestamp filter
    const fetchUserData = async () => {
        setLoading(true);
        if (!startDate || !endDate) {
            setMessage('Please provide both start and end dates.');
            setLoading(false);
            return;
        }

        try {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();

            if (start > end) {
                setMessage('Start date cannot be later than end date.');
                setLoading(false);
                return;
            }

            const userCollectionRef = collection(db, 'contacts');
            const q = query(
                userCollectionRef,
                where('createdAt', '>=', Timestamp.fromDate(new Date(start))),
                where('createdAt', '<=', Timestamp.fromDate(new Date(end))),
                orderBy('createdAt')
            );

            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));

            setUserData(data);
            setMessage(`${data.length} users found`);
        } catch (error) {
            setMessage(`Error fetching data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Export data to Excel file
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('User Data');

        // Define columns for the Excel file
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Created At', key: 'createdAt', width: 20 },
        ];

        // Add rows for each user in Firestore
        userData.forEach(user => {
            worksheet.addRow({
                name: user.name,
                email: user.email,
                createdAt: user.createdAt ? user.createdAt.toDate().toLocaleString() : 'N/A', // Format timestamp
            });
        });

        // Save the workbook to a file and download
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'user_data_filtered.xlsx');
        });
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Export User Data to Excel</h2>

            {/* Date Range Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="startDate" className="block text-lg text-gray-600">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-lg text-gray-600">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Fetch and Export Buttons */}
            <div className="mb-6">
                <button
                    onClick={fetchUserData}
                    className={`w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg ${loading && 'opacity-50 cursor-not-allowed'} transition duration-300 ease-in-out hover:bg-blue-700`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Fetch Data'}
                </button>
            </div>

            {/* Display Results */}
            {loading && <p className="text-gray-600">Loading user data...</p>}
            {message && <p className="mt-4 text-red-500 font-semibold">{message}</p>}

            {userData.length > 0 && (
                <>
                    <div className="mt-6 overflow-x-auto bg-gray-50 shadow-md rounded-lg">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Created At</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userData.map((user, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleString() : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={exportToExcel}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                        >
                            Export Data to Excel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
