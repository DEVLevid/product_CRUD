import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./listStyles.module.scss";
import axiosInstance from "../../../services/api/axiosInstance";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('products/get-all-products');
        setProducts(response.data.data.products)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Erro ao buscar produtos:', error.response.data);
        } else {
          console.error('Erro ao buscar produtos:', error);
        }
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`products/delete-product/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao excluir produto:', error.response?.data || error.message);
      } else {
        console.error('Erro desconhecido ao excluir produto:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Produtos</h2>
      <Link to="/products/create" className={styles.btnContainer}>Adicionar Novo Produto</Link>
      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.id} className={styles.productItem}>
            <h3>{product.name}</h3>
            <p>Preço: {product.price}</p>
            <p>{product.description}</p>
            <Link to={`/products/edit/${product.id}`} className={styles.btnContainer}>Editar</Link>
            <button className={styles.btnContainer} onClick={() => handleDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};