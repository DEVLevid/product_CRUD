import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { AxiosError } from "axios";
import axiosInstance from "../../services/api/axiosInstance";

export default function ProductCreate() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleError = (error: unknown, message: string) => {
    if (error instanceof AxiosError && error.response) {
      setError(`${message}: ${error.response.data.message}`);
    } else {
      setError(`${message}: ${(error as Error).message}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof price === "string" || typeof stock === "string") {
      setError("Preço e estoque devem ser números válidos.");
      return;
    }

    try {
      const response = await axiosInstance.post("products/create-product", {
        name,
        price,
        description,
        stock,
      });

      if (response.status === 201) {
        navigate("/products");
      } else {
        setError("Falha ao criar produto.");
      }
    } catch (error) {
      handleError(error, "Erro ao criar produto");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Criar Produto</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="name"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.textInput}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="number"
            id="price"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            className={styles.textInput}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <textarea
            id="description"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="number"
            id="stock"
            placeholder="Quantidade em estoque"
            value={stock}
            onChange={(e) => setStock(e.target.valueAsNumber)}
            className={styles.textInput}
            required
          />
        </div>
        <button type="submit" className={styles.btnContainer}>
          Criar
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
