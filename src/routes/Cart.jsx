import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartSummary, setCartSummary] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("carts")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
    generateCartSummary(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
    setTotalItems(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    calculateTotal(updatedCart);
    generateCartSummary(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    generateCartSummary(updatedCart);
  };

  const generateCartSummary = (cartItems) => {
    const summary = cartItems.map((item) => `${item.title} x${item.quantity}`).join(",   ");
    setCartSummary(summary);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
          <div className="alert alert-warning text-center p-4 shadow-lg rounded">
            <h4 className="fw-bold">⚠️ Tu carrito está vacío</h4>
            <p className="mb-0">Agrega productos para verlos aquí.</p>
          </div>
        </div>
      ) : (
        <>
          <h5 className="text-center text-infos">📦 {totalItems} productos</h5>
          <div className="row">
            {cart.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top img-fluid p-3"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body shadow-lg">
                    <h5 className="card-title text-primary">{item.title}</h5>
                    <p className="badge bg-secondary">{item.category}</p>
                    <p className="card-text text-muted">
                      <strong>Precio: 💲{item.price}</strong>
                    </p>
                    <div className="d-flex align-items-center">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="form-control w-50"
                      />
                      <button
                        className="btn btn-light ms-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h4 className="text-success fw-bold">💰 Total: ${totalPrice.toFixed(2)}</h4>
            <p className="mt-2"><strong>🛍️ Resumen:</strong> {cartSummary}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
