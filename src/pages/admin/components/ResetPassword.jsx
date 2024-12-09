import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../../../firebase/firebase.js"
import logo from "../../../assets/adim_navbar/Logo Footer-02.svg";
import styles from "../style/mystyle.module.css";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleResetPass = async (e)=>{
        e.preventDefault();
        try{
            await sendPasswordResetEmail(auth,email);
            toast.success("Password reset email sent")
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src={logo}
                        className="mx-auto h-16 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Reset Your Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleEmailChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleResetPass}
                                className= {styles.atlas_cedar_color +" flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        <a className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={()=>navigate("/login")}>
                            Back to Login Page
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
