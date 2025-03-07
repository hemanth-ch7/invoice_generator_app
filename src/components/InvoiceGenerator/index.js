import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductManagement from "../ProductManagement";

export default function InvoiceGenerator() {
  const [storeName, setStoreName] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, store: "Store A", name: "Product 1", price: 100 },
    { id: 2, store: "Store B", name: "Product 2", price: 200 },
    { id: 3, store: "Store A", name: "Product 3", price: 150 },
  ]);
  const [newItem, setNewItem] = useState({
    orderId: "",
    date: "",
    quantity: "",
    regularPrice: "",
    dealPrice: "",
    tax: "",
  });

  const addItem = () => {
    const itemTotal = newItem.quantity * newItem.dealPrice;
    const newOrder = { ...newItem, itemTotal };
    setOrderDetails([...orderDetails, newOrder]);
    setProducts([...products, { id: products.length + 1, store: storeName, name: newItem.orderId, price: newItem.dealPrice }]);
    setNewItem({ orderId: "", date: "", quantity: "", regularPrice: "", dealPrice: "", tax: "" });
  };

  const calculateTotals = () => {
    const grandTotalWithoutTax = orderDetails.reduce((sum, item) => sum + item.itemTotal, 0);
    const grandTotalWithTax = orderDetails.reduce((sum, item) => sum + item.itemTotal * (1 + item.tax / 100), 0);
    return { grandTotalWithoutTax, grandTotalWithTax };
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Store Name" 
            value={storeName} 
            onChange={(e) => setStoreName(e.target.value)} 
          />
          <div className="row g-2">
            {Object.keys(newItem).map((key) => (
              <div key={key} className="col">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder={key} 
                  value={newItem[key]} 
                  onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })} 
                />
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={addItem}>Add Item</button>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Regular Price</th>
                <th>Deal Price</th>
                <th>Item Total</th>
                <th>Tax (%)</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <h5>Grand Total Without Tax: ${calculateTotals().grandTotalWithoutTax.toFixed(2)}</h5>
            <h5>Grand Total With Tax: ${calculateTotals().grandTotalWithTax.toFixed(2)}</h5>
          </div>
        </div>
      </div>
      <ProductManagement products={products} />
    </div>
  );
}
