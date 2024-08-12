import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./listStyles.module.scss";
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import axiosInstance from "../../services/api/axiosInstance";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        handleError(error, "Erro ao buscar produtos:");
      }
    };
    fetchProducts();
  }, []);

  const getProducts = async (): Promise<Product[]> => {
    const response = await axiosInstance.get("products/get-all-products");
    return response.data.data.products;
  };

  const deleteProduct = async (id: number) => {
    await axiosInstance.delete(`products/delete-product/${id}`);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      handleError(error, "Erro ao excluir produto:");
    }
  };

  const handleError = (error: unknown, message: string) => {
    if (axios.isAxiosError(error)) {
      console.error(message, error.response?.data || error.message);
    } else {
      console.error(message, error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Produtos</h2>
      <Link to="/products/create" className={styles.addBtnContainer}>
        Adicionar Novo Produto <Plus size={25} />
      </Link>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>R${product.price}</p>
            <div className={styles.editContainer}>
              <Link
                to={`/products/edit/${product.id}`}
                className={styles.editBtnContainer}
              >
                <PencilSimple size={25} />
              </Link>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(product.id)}
              >
                <Trash size={25} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
