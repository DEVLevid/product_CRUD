import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProductsForm from "./pages/Products/Form/ProductsForm";
import ProductsList from "./pages/Products/List/ProductsList";
import Register from "./pages/Register/Register";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/new" element={<ProductsForm />} />
      <Route path="/products/edit/:id" element={<ProductsForm />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
