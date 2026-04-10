import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
import toast from "react-hot-toast";

function Products() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [revenue, setRevenue] = useState(0);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

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

        axios.get("http://localhost:5049/api/products")
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const addProduct = () => {
        console.log("BUTTON CLICKED");

        axios.post("http://localhost:5049/api/products", {
            name,
            price,
            quantity
        })
            .then(() => {
                toast.success("Product added!");
            })
            .catch(() => {
                toast.error("Something went wrong");
            });

        setName("");
        setPrice("");
        setQuantity("");

        axios.get("http://localhost:5049/api/products")
            .then(res => setProducts(res.data))
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
        <div>

            <div className="bg-white p-6 rounded-2xl w-96 shadow-xl animate-scaleIn">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Products</h2>

                        {products.length === 0 ? (
                            <p className="text-gray-500 text-container">No products yet</p>
                        ) : (

                            products.map(p => (
                                <div key={p.id} className="flex justify-between items-center border-b py-2">
                                    <span>
                                        {p.name} | Qty: {p.quantity} | R{p.price}
                                    </span>

                                    <div className="space-x-2">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                            onClick={() => sellProduct(p.id)}
                                        >
                                            Sell
                                        </button>

                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => deleteProduct(p.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))                           
                            )}                        

                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Add Product</h3>

                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
                            >
                                Add Product
                            </button>
                        </div>

                        <h2 className="mt-6 text-lg font-bold text-green-600">
                            Total Revenue: R{revenue.toFixed(2)}
                        </h2>
                    </div>
                )}
                </div>
                        
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                        <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">

                            <h3 className="text-xl font-bold mb-4">Add Product</h3>

                            <input
                                placeholder="Name"
                                className="border p-2 w-full mb-2 rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                placeholder="Price"
                                className="border p-2 w-full mb-2 rounded"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                placeholder="Quantity"
                                className="border p-2 w-full mb-4 rounded"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        addProduct();
                                        setShowModal(false);
                                    }}
                                    disabled={!name || !price || !quantity}
                                    className="bg-blue-500 disabled:bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}                              
            </div>
            );
        }

export default Products;