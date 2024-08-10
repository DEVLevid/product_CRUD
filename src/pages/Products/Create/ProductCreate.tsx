import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import axiosInstance from "../../../services/api/axiosInstance";
import { AxiosError } from "axios";

export default function ProductCreate() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const response = await axiosInstance.post('products/create-product', {
          name,
          price: parseFloat(price),
          description,
          stock: parseInt(stock, 10)
        });
  
        if (response.status === 201) {
          navigate('/products');
        } else {
          setError('Falha ao criar produto.');
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError('Erro: ' + error.response.data.message);
        } else {
          setError('Erro desconhecido: ' + (error as Error).message);
        }
      }
    };
  
    return (
      <div className={styles.container}>
        <h2>Criar Produto</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.textInput}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.textInput}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textInput}
          />
          <input
            type="number"
            placeholder="Quantidade em estoque"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={styles.textInput}
            required
          />
          <button type="submit" className={styles.btnContainer}>Criar</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    );
  };
