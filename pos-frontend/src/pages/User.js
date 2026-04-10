import React, { useState } from "react";

function User() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUser = () => {
        alert("User updated (placeholder)");
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Settings</h1>

            <input
                className="border p-2 mb-2 block"
                placeholder="New Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="border p-2 mb-2 block"
                placeholder="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={updateUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Update
            </button>
        </div>
    );
}

export default User;