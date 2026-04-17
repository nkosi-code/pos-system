import React from "react";

function Welcome() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome👋</h1>
            <p className="font-bold">This is V2.0.1. with major improvments.</p>

            <div className="mt-6 bg-gray-400 p-6 rounded shadow">
                <p>✅ Implimented ✅</p>
                <p>Crud Products</p>
                <p>Auth (JWT)</p>
                <p>Sales Logic</p>
                
                <p>🛠️ In Progress 🛠</p>
                <p>Cart + Checkout</p>
                <p>Receipts (print/PDF)</p>
                <p>Password Hashing</p>
                <p>Role-Based Access (admin& cashier)</p>
                <p>Dashboard (sales analytics)</p>
                <p>Inventory Management (stock + alerts)</p>
                <p>Order History</p>
                <p>Search & Filters</p>
                <p>Payment Handling (cash/card)</p>
                <p>Dark Mode</p>
                <p>Error Handling + Loading States</p>
                <p>Token Expiry + Route Protection</p>
                <p>UI Polish (toasts, empty states)</p>
            </div>
        </div>
    );
}

export default Welcome;
