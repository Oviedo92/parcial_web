import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = () => {


    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        image: "",
    });

    const [categories, setCategories] = useState([]); // Estado para categorías

    // 🔹 useEffect para obtener categorías al montar el componente

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error cargando categorías:", error));
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewProduct({ ...newProduct, image: reader.result, preview: reader.result });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.category || !newProduct.price || !newProduct.image) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];

        const updatedProducts = [...storedProducts, { ...newProduct, id: Date.now() }];

        localStorage.setItem("productos", JSON.stringify(updatedProducts));

        navigate("/products");
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">➕ Agregar Nuevo Producto</h2>
            <button className="btn btn-success" onClick={() => navigate("/products")}>
                Volver a inicio
            </button>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input type="text" name="title" className="form-control" value={newProduct.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select name="category" className="form-control" value={newProduct.category} onChange={handleChange} required>
                        <option value="">Seleccione una categoría</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea name="description" className="form-control" value={newProduct.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" name="price" className="form-control" value={newProduct.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="file" name="image" className="form-control" onChange={handleChange} accept="image/*" required />
                </div>
                {newProduct.preview && (
                    <div className="text-center mb-3">
                        <img src={newProduct.preview} alt="Vista previa" className="img-fluid rounded" style={{ maxWidth: "200px", height: "auto", objectFit: "contain" }} />
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-100">Agregar Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;
