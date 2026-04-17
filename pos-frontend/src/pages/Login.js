import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginUrls = [
        process.env.REACT_APP_API_URL || "http://localhost:5049",
        "https://localhost:7231"
    ];

    const handleLogin = async () => {
        setError("");
        let lastError = null;

        for (const apiUrl of loginUrls) {
            try {
                const res = await axios.post(`${apiUrl}/api/auth/login`, {
                    username,
                    password
                });

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("loggedIn", "true");
                onLogin();
                return;
            } catch (err) {
                lastError = err;
                if (err.response) {
                    if (err.response.status === 401) {
                        setError("Invalid username or password.");
                        return;
                    }
                    setError(`Login failed (${err.response.status}): ${err.response.data?.message || JSON.stringify(err.response.data)}`);
                    return;
                }
            }
        }

        setError(`Login request failed: ${lastError?.message || "Network error"}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    value={username}
                    placeholder="Username"
                    className="border p-2 w-full mb-3 rounded"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    className="border p-2 w-full mb-4 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
                    onClick={handleLogin}
                >
                    Login
                </button>

                {error && (
                    <p className="text-sm text-red-600 mt-3 text-center">{error}</p>
                )}

                <p className="text-sm text-gray-500 mt-2 text-center">demo: admin / 1234</p>
            </div>
        </div>
    );
}

export default Login;