import React from 'react'
import Navbar from "./components/AdminNavbar.jsx";
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from "react-router-dom";
import {auth} from "../../firebase/firebase.js";
import Dashboard from "./Dashboard.jsx";
import ResetPass from "./components/UpdatePassword.jsx";
import {ProtectedRoute} from "../../components/protectedRoute.jsx";
import Login from "./Login.jsx";



const Admin = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const user = auth.currentUser;
    console.log(user)
    return (
        //
        <>
            <Navbar>
                <Link to="reset-password"></Link>
            </Navbar>
        </>
    )
}
export default Admin
