import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductManagement = ({ products }) => {
  const [productList, setProductList] = useState(products);
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleDelete = (id) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
  };

  const handleUpdate = () => {
    setProductList(productList.map((p) => (p.id === editProduct.id ? editProduct : p)));
    setEditProduct(null);
  };

  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedStore === "" || product.store === selectedStore)
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center">Product Management</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            <option value="">All Stores</option>
            {[...new Set(productList.map((p) => p.store))].map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Store</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.store}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct && (
        <div className="card mt-3 p-3">
          <h4>Edit Product</h4>
          <input
            type="text"
            className="form-control mb-2"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
          />
          <button className="btn btn-success" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductManagement