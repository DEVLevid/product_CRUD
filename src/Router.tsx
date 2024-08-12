import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductCreate from "./pages/Create/ProductCreate";
import ProductEdit from "./pages/Edit/ProductEdit";
import ProductsList from "./pages/List/ProductsList";


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/create" element={<ProductCreate />} />
      <Route path="/products/edit/:id" element={<ProductEdit />} />
    </Routes>
  );
}
