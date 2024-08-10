import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Login() {
  const [taxNumber, setTaxNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://interview.t-alpha.com.br/api/auth/login",
        {
          taxNumber,
          password,
        }
      );
      localStorage.setItem("authToken", response.data.data.token);
      navigate("/products");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro ao fazer login:", error.response.data);
      } else {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.formContainer}>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Digite seu CPF ou CNPJ"
          value={taxNumber}
          onChange={(e) => setTaxNumber(e.target.value)}
        />
        <input
          className={styles.textInput}
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.btnContainer}
          onClick={handleLogin}
          type="submit"
        >
          entrar
        </button>
      </div>
      <div className={styles.linkContainer}>
        <a href="/Register">registre-se</a>
      </div>
    </div>
  );
}
