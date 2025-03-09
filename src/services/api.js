import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve los productos
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return []; // Retorna un array vacío en caso de error
  }
};


export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data; 
  } catch (error) {
    console.error("Error actualizando producto:", error);
    return null; 
  }
};


export const addToCart = async (productId, quantity = 1) => {
  try {
    const cart = {
      products: [{ productId, quantity }],
    };
    const response = await axios.post(API_URL, cart);
    return response.data; 
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    return null;
  }
};



