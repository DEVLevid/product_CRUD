import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api/axiosInstance";
import styles from "./formStyles.module.scss";
import { Product } from "../../../types/Products";

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `products/get-one-product/${id}`
        );
        setProduct(response.data.data.product);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError("Erro ao buscar produto: " + error.response.data.message);
        } else {
          setError("Erro desconhecido: " + (error as Error).message);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (product) {
      try {
        const response = await axiosInstance.patch(
          `products/update-product/${id}`,
          product 
        );

        if (response.status === 200) {
          navigate("/products");
        } else {
          setError("Falha ao atualizar produto.");
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError("Erro: " + error.response.data.message);
        } else {
          setError("Erro desconhecido: " + (error as Error).message);
        }
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) =>
      prevProduct ? { ...prevProduct, [name]: value } : null
    );
  };

  return (
    <div className={styles.container}>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          value={product?.name || ''}
          onChange={handleInputChange}
          className={styles.textInput}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={product?.price || 0}
          onChange={handleInputChange}
          className={styles.textInput}
          required
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={product?.description || ''}
          onChange={handleInputChange}
          className={styles.textInput}
        />
        <input
          type="number"
          name="stock"
          placeholder="Quantidade em estoque"
          value={product?.stock || 0}
          onChange={handleInputChange}
          className={styles.textInput}
          required
        />
        <button type="submit" className={styles.btnContainer}>
          Atualizar
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
