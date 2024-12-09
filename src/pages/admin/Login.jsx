/* eslint-disable react/prop-types */
import { useState } from "react";
import {Link, Navigate} from "react-router-dom";

import {
    signInWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "../../firebase/firebase.js"
import logo from "../../assets/adim_navbar/Logo Footer-02.svg"
import styles from './style/mystyle.module.css';
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = ({ user }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // const [isSignUpActive, setIsSignUpActive] = useState(true);
    // const handleMethodChange = () => {
    //     setIsSignUpActive(!isSignUpActive);
    // };
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleSignIn = () => {
        if (!email || !password) {
            toast.error("Please enter a valid email and Password");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success("Login successful");
                navigate('/dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
                console.log(errorCode, errorMessage);
            });
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    if (user) {
        return <Navigate to="/dashboard"></Navigate>;
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
                    Sign in to your account
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a className={styles.text_atlas_cedar_color + " font-semibold "} onClick={() => navigate("/reset-password")}>
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2 relative w-full">
                            <input
                                onChange={handlePasswordChange}
                                id="password"
                                name="password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />

                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {isPasswordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12l4.5 4.5M19.5 7.5L15 12m0 0l-4.5-4.5M15 12l4.5-4.5"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 18c3.313 0 6-2.687 6-6s-2.687-6-6-6-6 2.687-6 6 2.687 6 6 6zM12 18V6M12 18l-3-3"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleSignIn}
                            className={styles.atlas_cedar_color + " flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/*<p className="mt-10 text-center text-sm/6 text-gray-500">*/}
                {/*    Not a member?{' '}*/}
                {/*    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                {/*        Start a 14 day free trial*/}
                {/*    </a>*/}
                {/*</p>*/}
            </div>
        </div>
        </>
    );
};

export default Login;