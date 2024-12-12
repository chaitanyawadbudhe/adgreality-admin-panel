import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.js";
import { ProtectedRoute } from "./components/protectedRoute";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Login from "./pages/admin/Login.jsx";
import "./App.css";
import { useEffect, useState } from "react";
import UpdatePassword from "./pages/admin/components/UpdatePassword.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/admin/components/ResetPassword.jsx";
import AdminProfile from "./pages/admin/components/AdminProfile.jsx";
import SaveUser from "./pages/admin/components/SaveUser.jsx";
import AdminNavbar from "./pages/admin/components/AdminNavbar.jsx";
function App() {
    const [userLogged, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setIsFetching(!!user)
        });
        return () => unsubscribe();
    }, []);


    const handleSignout=()=>{
        setIsFetching(false)
    }
    return (
       <Router>
           <ToastContainer/>
           {isFetching ? (
               <>
               <AdminNavbar onSignOut={handleSignout}/>
                   <Routes>
                       <Route index path="/dashboard" element={<Dashboard />} />
                       <Route path="/update-password" element={<UpdatePassword/>} />
                       <Route path={"/your-profile"} element={<AdminProfile/>}></Route>
                       <Route path={"/save-user"} element={<SaveUser/>}></Route>
                   </Routes>
               </>
           ) : (
               <Routes>
                   <Route path={"/"} element={<Login onLogin={() => setIsFetching(true)} />} />
                   <Route path={"/login"} element={<Login onLogin={() => setIsFetching(true)} />} />
                   <Route path={"/reset-password"} element={<ResetPassword/>}></Route>
               </Routes>
           )}
           <Routes>
               <Route path={"/reset-password"} element={<ResetPassword/>}></Route>
           </Routes>

       </Router>
    )
}

export default App;