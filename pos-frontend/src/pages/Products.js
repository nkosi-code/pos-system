import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

function Products() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [revenue, setRevenue] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5049/api/products")
            .then(res => {
                console.log("DATA:", res.data);
                setProducts(res.data);
            })
            .catch(err => {
                console.error("ERROR:", err);
            });

        axios.get("http://localhost:5049/api/sales/total")
            .then(res => setRevenue(res.data))
            .catch(err => console.error(err));

        axios.get("http://localhost:5049/api/sales/revenue")
            .then(res => setRevenue(res.data))
            .catch(err => console.error(err));
    },     []);

    const addProduct = () => {
        console.log("BUTTON CLICKED");

        axios.post("http://localhost:5049/api/products", {
            name,
            price,
            quantity
        })
            .then(() => {
                alert("Product added!");

                setName("");
                setPrice("");
                setQuantity("");

                axios.get("http://localhost:5049/api/products")
                .then(res => setProducts(res.data));
            })
            .catch(err => {
                console.error(err);
            });
    };

    const sellProduct = (id) => {
        axios.post("http://localhost:5049/api/sales", {
            productId: id,
            quantitySold: 1
        })
            .then(() => {
                axios.get("http://localhost:5049/api/products")
                    .then(res => setProducts(res.data));

                axios.get("http://localhost:5049/api/sales/total")
                    .then(res => setRevenue(res.data));
            })
                    .catch(err => console.error(err));
    };
    const deleteProduct = (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        axios.delete(`http://localhost:5049/api/products/${id}`)
            .then(() => {
                axios.get("http://localhost:5049/api/products")
                    .then(res => setProducts(res.data));
            })
            .catch(err => console.error(err));
    };
    
    return (
        <div className="container">

            <h2>Products</h2>

            {products.map(p => (
                <div className="product" key={p.id}>
                    <span>
                        {p.name} | Qty: {p.quantity} | R{p.price}
                    </span>

                    <div>
                        <button
                            className="sell-btn"
                            onClick={() => sellProduct(p.id)}
                        >
                            Sell
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => deleteProduct(p.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            <h3>Add Product</h3>

            <div>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button className="add-btn" onClick={addProduct}>
                    Add Product
                </button>
            </div>

            <h2>Total Revenue: R{revenue.toFixed(2)}</h2>

        </div>
    );
          
}

export default Products;