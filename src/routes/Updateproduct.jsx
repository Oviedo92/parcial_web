import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        image: "",
        preview: "",
    });

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
        const productToEdit = storedProducts.find((p) => p.id === Number(id));
        if (productToEdit) {
            setProduct({ ...productToEdit, preview: productToEdit.image }); // Cargar vista previa
        } else {
            alert("Producto no encontrado");
            navigate("/products");
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProduct((prev) => ({ ...prev, image: reader.result, preview: reader.result }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product.title || !product.category || !product.price || !product.image) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
        const updatedProducts = storedProducts.map((p) => (p.id === Number(id) ? product : p));

        localStorage.setItem("productos", JSON.stringify(updatedProducts));
        alert("Producto actualizado correctamente");
        navigate("/products");
    };


    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">✏️ Editar Producto</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input type="text" name="title" className="form-control" value={product.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <input type="text" name="category" className="form-control" value={product.category} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea name="description" className="form-control" value={product.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="file" name="image" className="form-control" onChange={handleChange} accept="image/*" />
                </div>
                {product.preview && (
                    <div className="text-center mb-3">
                        <img src={product.preview} alt="Vista previa" className="img-fluid rounded" style={{ maxWidth: "200px", height: "auto", objectFit: "contain" }} />
                    </div>
                )}
                <button type="submit" className="btn btn-success w-100">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
