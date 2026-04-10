import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";
import User from "./pages/User";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
    const [isOpen, setIsOpen] = useState(false);
    if (!isLoggedIn) {
        return <Login onLogin={() => setIsLoggedIn(true)} />;
    }
    
    return (
        <>
        <Toaster />

        <div classname="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">POS System</h1>
         
        <Router>
            <div className="flex">
                            
                    <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

                <div className="flex-1">
                                    
                    <Navbar toggle={() => setIsOpen(!isOpen)} />
                                       
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/user" element={<User />} />
                        </Routes>
                    </div>

                </div>
            </div>
            </Router>

            </div>
            </>
        );    
}

export default App;