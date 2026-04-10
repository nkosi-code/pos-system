import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [salesCount, setSalesCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const chartData = products.map(p => ({ name: p.name, revenue: p.price * (p.quantitySold || 0) }));


    useEffect(() => {
        axios.get("http://localhost:5049/api/products")
            .then(res => setProducts(res.data));

        axios.get("http://localhost:5049/api/sales")
            .then(res => setSalesCount(res.data.length));

        axios.get("http://localhost:5049/api/sales/revenue")
            .then(res => setRevenue(res.data));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Products Card */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-gray-500 text-sm">Total Products</h3>
                    <p className="text-2xl font-bold">{products.length}</p>
                </div>

                {/* Sales Card */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-gray-500 text-sm">Total Sales</h3>
                    <p className="text-2xl font-bold">{salesCount}</p>
                </div>

                {/* Revenue Card */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                    <p className="text-2xl font-bold text-green-600">
                        R{revenue.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow mt-6">
                <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>

                <BarChart width={400} height={250} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" />
                </BarChart>
            </div>
        </div>
    );
}

export default Dashboard;