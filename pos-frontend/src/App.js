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

            <Router>
                <div className="flex h-screen">

                    <div className={`transition-all duration-300 ${isOpen ? "w-64" : "w-0"} overflow-hidden`}>
                        <Sidebar toggle={() => setIsOpen(!isOpen)} />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <Navbar toggle={() => setIsOpen(!isOpen)} />

                        <div className="p-6 overflow-y-auto">
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
        </>
    );    
}

export default App;