import { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "admin" && password === "1234") {
            localStorage.setItem("loggedIn", "true");
            onLogin();
        } else {
            alert("Invalid login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    placeholder="Username"
                    className="border p-2 w-full mb-3 rounded"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">demo: admin / 1234</p>
            </div>
        </div>
    );
}

export default Login;