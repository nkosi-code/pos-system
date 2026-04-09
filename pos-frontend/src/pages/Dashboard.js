import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [salesCount, setSalesCount] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5049/api/products")
            .then(res => setProducts(res.data));

        axios.get("http://localhost:5049/api/sales")
            .then(res => setSalesCount(res.data.length));

        axios.get("http://localhost:5049/api/sales/revenue")
            .then(res => setRevenue(res.data));
    }, []);

    return (
  <div className="dashboard">

    <div className="card">
      <h3>Products</h3>
      <p>{products.length}</p>
    </div>

    <div className="card">
      <h3>Sales</h3>
      <p>{salesCount}</p>
    </div>

    <div className="card">
      <h3>Revenue</h3>
      <p>R{revenue.toFixed(2)}</p>
    </div>

  </div>
);
}

export default Dashboard;