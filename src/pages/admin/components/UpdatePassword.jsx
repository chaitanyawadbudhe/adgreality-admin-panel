import React from 'react'
import {updatePassword } from "firebase/auth";
import {auth} from "../../../firebase/firebase.js";

import {toast} from "react-toastify";

const UpdatePassword = () => {

    const user = auth.currentUser;
    const [newPassword, setnewPassword] = React.useState('');
    const [confirmPassword, setconfirmPassword] = React.useState('');

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }


        if (user) {
            try{
                await updatePassword(user,newPassword);
                toast.success("Passwords updated successfully");
                setnewPassword("")
                setconfirmPassword("")
            } catch (err){
                toast.error(`Error: ${err.message}`);
            }
        }else{
            toast.error("No user is currently logged in")
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                               htmlFor="inline-full-name">
                            New Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6cb4b0]"
                            id="inline-full-name" type="password" value={newPassword} onChange={(e)=>setnewPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                               htmlFor="inline-password">
                            Re-enter Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6cb4b0]"
                            id="inline-password" type="password"  value={confirmPassword} onChange={(e) =>setconfirmPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            onClick={handleUpdatePassword}
                            className="shadow bg-[#6cb4b0] hover:bg-[#549cac] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button">
                            Update Password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default UpdatePassword;
