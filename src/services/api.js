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



