import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [sum, setSum] = useState(0);
  const [editIndex, setEditIndex] = useState(-1); // To track which item is being edited

  function Calculation() {
    const newItem = { name, qty, price, sum };
    let newUsers;
    if (editIndex > -1) {
      newUsers = [...users];
      newUsers[editIndex] = newItem;
      setEditIndex(-1);
    } else {
      newUsers = [...users, newItem];
    }
    setUsers(newUsers);

    const newTotal = newUsers.reduce((acc, user) => acc + Number(user.sum), 0);
    setTotal(newTotal);

    setName('');
    setQty(0);
    setPrice(0);
    setSum(0);
  }

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      calculateTotal(newPrice, qty);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
      calculateTotal(price, newQuantity);
    }
  };

  const calculateTotal = (price, qty) => {
    const newTotal = price * qty;
    setSum(newTotal);
  };

  const handleEdit = (index) => {
    const user = users[index];
    setName(user.name);
    setPrice(user.price);
    setQty(user.qty);
    setSum(user.sum);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newUsers = users.filter((_, i) => i !== index);
      setUsers(newUsers);
      const newTotal = newUsers.reduce((acc, user) => acc + Number(user.sum), 0);
      setTotal(newTotal);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Inventory Management System</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">{editIndex > -1 ? 'Edit Product' : 'Add Products'}</h3>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Item Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Price"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Qty"
                    value={qty}
                    onChange={handleQuantityChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Total"
                    value={sum}
                    disabled
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-success w-100"
                    type="button"
                    onClick={Calculation}
                  >
                    {editIndex > -1 ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Products</h3>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.price}</td>
                      <td>{row.qty}</td>
                      <td>{row.sum}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Total</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Total"
                  required
                  disabled
                  value={total}
                />
              </div>
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={refreshPage}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
