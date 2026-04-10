import React from "react";
function Navbar({ toggle }) {
    return (
        <div className="bg-gray-900 text-white p-4 flex items-center">
            <button onClick={toggle} className="text=2xl mr-4">
                ☰
            </button>
            <button onClick={() => { localStorage.removeItem("loggedIn"); window.location.reload(); }}
                className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Logout
            </button>
        </div>
    );
}

export default Navbar;