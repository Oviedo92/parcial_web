import 'bootstrap/dist/css/bootstrap.min.css'; // 📌 Importando estilos de Bootstrap
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Cart from './routes/Cart';
//import Home from './routes/Home';
import SalesForm from './routes/Salesform'; // 📌 Agregado
import AddProduct from './routes/Addproduct';
import UpdateProduct from './routes/Updateproduct'; // 📌 Importación

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products"/>} /> {/* 📌 Cambiado */}
          <Route path="/products" element={<SalesForm />} /> {/* 📌 Agregado */}
          <Route path="/carts" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} /> {/* 📌 Nueva ruta */}
          <Route path="/products/:id" element={<UpdateProduct />} /> {/* 📌 Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;