import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, toggle }) {
    return (
        <div
            className={`bg-gray-800 text-white h-full w-64 p-4">
                }`}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>

                <button onClick={toggle} className="text-xl hover:text-red-400">
                    ←
                </button>
            </div>

            <ul className="space-y-2 px-2">

                <li className="border-b border-gray-600 pb-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"
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
                        `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"
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
                            `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"
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
                            `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"
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