import React from "react";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div classname="container">
      <h1>POS System</h1>

      <Dashboard />
      <Products />
    </div>
  );
}

export default App;