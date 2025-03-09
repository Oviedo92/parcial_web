import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import IconCart from "../components/Iconcart";


const SalesForm = () => {
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const apiProducts = await getProducts();
            const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
            setProductos([...apiProducts, ...storedProducts]);
        };
        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("carts")) || [];
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("carts", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
        alert("Producto agregado al carrito");
    };

    const filteredProducts = productos.filter((producto) =>
        producto.title.toLowerCase().includes(search.toLowerCase()) ||
        producto.category.toLowerCase().includes(search.toLowerCase()) ||
        producto.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-2">
            <div className="jumbotron text-center bg-dark text-white py-5 mb-4">
                <h1 className="display-4">🛍️ ¡Descubre las mejores ofertas en moda y accesorios!</h1>
                <button className="btn btn-success" onClick={() => navigate("/add-product")}>
                    ➕ Agregar Producto
                </button>
                <IconCart />

            </div>

            <div className="search-container mb-3">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre, descripción y categoría."
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((producto) => (
                        <div key={producto.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={producto.image}
                                    alt={producto.title}
                                    className="card-img-top img-fluid p-3"
                                    style={{ maxHeight: "200px", objectFit: "contain" }}
                                />
                                <div className="card-body shadow-lg">
                                    <h5 className="card-title text-primary">{producto.title}</h5>
                                    <p className="badge bg-secondary">{producto.category}</p>
                                    <p className="card-text text-muted"><strong>{producto.description.substring(0, 80)}...</strong></p>
                                    <h6 className="text-success">💲 {producto.price}</h6>
                                    <button className="btn btn-warning w-100 mt-2" onClick={() => handleAddToCart(producto)}>
                                        🛍️ Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>
                        <div className="alert alert-warning text-center p-4 shadow-lg rounded" role="alert">
                            <h4 className="fw-bold">⚠️ No se encontraron productos</h4>
                            <p className="mb-0">Prueba con otro término de búsqueda.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesForm;
