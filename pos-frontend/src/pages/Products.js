import React, { useState } from "react";
import axios from "axios";
import "../style.css";
import toast from "react-hot-toast";

function Products() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: ""
    });

    const [revenue, setRevenue] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateRevenue = () => {
        const price = parseFloat(form.price) || 0;
        const quantity = parseInt(form.quantity) || 0;
        setRevenue(price * quantity);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.price || !form.quantity) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            await axios.post("YOUR_API_ENDPOINT_HERE", {
                name: form.name,
                price: Number(form.price),
                quantity: Number(form.quantity)
            });

            toast.success("Product saved successfully");

            setForm({ name: "", price: "", quantity: "" });
            setRevenue(0);
        } catch (error) {
            toast.error("Failed to save product");
            console.error(error);
        }
    };

    return (
        <div className="products-container">
            <h2>Products</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                />

                <button type="button" onClick={calculateRevenue}>
                    Calculate Revenue
                </button>

                <button type="submit">Save Product</button>
            </form>

            <h3>Total Revenue: {revenue}</h3>
        </div>
    );
}

export default Products;