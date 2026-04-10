import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, toggle }) {
    return (
        <div
            className={`bg-gray-800 text-white h-screen p-0 fixed transition-all duration-300 ${isOpen ? "w-64" : "w-0 overflow-hidden"
                }`}
        >
            {/* Top section with close button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>

                <button onClick={toggle} className="text-xl hover:text-red-400 transition">
                    ←
                </button>
            </div>

            {/* Links */}
            <ul className="space-y-2">

                <li className="border-b border-gray-600 pb-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block p-2 rounded transition ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Welcome
                    </NavLink>
                </li>

                <li className="border-b border-gray-600 pb-2">
                    <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `block p-2 rounded transition ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
                        }`
                    }
                >
                        Dashboard
                    </NavLink>
                </li>

                <li className="border-b border-gray-600 pb-2">
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `block p-2 rounded transition ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Products
                    </NavLink>
                </li>

                <li className="border-b border-gray-600 pb-2">
                    <NavLink
                        to="/user"
                        className={({ isActive }) =>
                            `block p-2 rounded transition ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        User
                    </NavLink>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;