import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const IconCart = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const storedCart = JSON.parse(localStorage.getItem("carts")) || [];
            const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(totalItems);
        };

        updateCartCount();
        window.addEventListener("storage", updateCartCount);
        return () => window.removeEventListener("storage", updateCartCount);
    }, []);

    return (
        <Link to="/carts" className="btn btn-warning position-relative">
            🛒 Carrito
            {cartCount > 0 && (
                <span className="position-absolute top-0 start-250 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                </span>
            )}
        </Link>
    );
};

export default IconCart;
