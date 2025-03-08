import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // 📌 Importando estilos de Bootstrap
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
          <Route path="/products" element={<SalesForm />} /> {/* 📌 Agregado */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} /> {/* 📌 Nueva ruta */}
          <Route path="/update-product/:id" element={<UpdateProduct />} /> {/* 📌 Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;