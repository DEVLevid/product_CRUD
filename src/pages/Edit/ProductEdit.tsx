import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./formStyles.module.scss";
import axiosInstance from "../../services/api/axiosInstance";
import { Product } from "../../types/Products";

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
        handleError(error, "Erro ao buscar produto");
      }
    };

    fetchProduct();
  }, [id]);

  const handleError = (error: unknown, message: string) => {
    if (error instanceof AxiosError && error.response) {
      setError(`${message}: ${error.response.data.message}`);
    } else {
      setError(`${message}: ${(error as Error).message}`);
    }
  };

  const validateProductData = (data: Product) => {
    const parsedStock = parseInt(data.stock as unknown as string, 10);
    if (isNaN(parsedStock) || parsedStock <= 0) {
      return "Stock deve ser um número inteiro positivo.";
    }

    const parsedPrice = parseFloat(data.price as unknown as string);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return "O preço deve ser um número positivo.";
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (product) {
      const errorMsg = validateProductData(product);
      if (errorMsg) {
        setError(errorMsg);
        return;
      }

      try {
        const { id, ...productData } = product;
        const response = await axiosInstance.patch(
          `products/update-product/${id}`,
          {
            ...productData,
            stock: parseInt(productData.stock as unknown as string, 10),
            price: parseFloat(productData.price as unknown as string),
          }
        );

        if (response.status === 200 || response.status === 204) {
          navigate("/products");
        } else {
          setError("Falha ao atualizar produto.");
        }
      } catch (error) {
        handleError(error, "Erro ao atualizar produto");
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
      <h2 className={styles.title}>Editar Produto</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nome do produto"
            value={product?.name || ""}
            onChange={handleInputChange}
            className={styles.textInput}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Preço"
            value={product?.price || 0}
            onChange={handleInputChange}
            className={styles.textInput}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Descrição</label>
          <textarea
            name="description"
            id="description"
            placeholder="Descrição"
            value={product?.description || ""}
            onChange={handleInputChange}
            className={styles.textInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="stock">Quantidade em estoque</label>
          <input
            type="number"
            name="stock"
            id="stock"
            placeholder="Quantidade em estoque"
            value={product?.stock || 0}
            onChange={handleInputChange}
            className={styles.textInput}
            required
          />
        </div>
        <button type="submit" className={styles.btnContainer}>
          Salvar alterações
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
