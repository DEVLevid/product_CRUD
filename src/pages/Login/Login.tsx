import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface LoginState {
  taxNumber: string;
  password: string;
  error: string | null;
}

const authenticateUser = async (
  taxNumber: string,
  password: string
): Promise<string> => {
  const response = await axios.post(
    "https://interview.t-alpha.com.br/api/auth/login",
    { taxNumber, password }
  );
  return response.data.data.token;
};

export default function Login() {
  const [loginState, setLoginState] = useState<LoginState>({
    taxNumber: "",
    password: "",
    error: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const token = await authenticateUser(
        loginState.taxNumber,
        loginState.password
      );
      localStorage.setItem("authToken", token);
      navigate("/products");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLoginState((prevState) => ({
          ...prevState,
          error: "Não foi possível realizar o login, verifique seus dados",
        }));
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
          name="taxNumber"
          placeholder="Digite seu CPF ou CNPJ"
          value={loginState.taxNumber}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.textInput}
          type="password"
          name="password"
          placeholder="Digite sua Senha"
          value={loginState.password}
          onChange={handleInputChange}
          required
        />
        <button
          className={styles.btnContainer}
          onClick={handleLogin}
          type="submit"
        >
          entrar
        </button>
        {loginState.error && (
          <p className={styles.error}>{loginState.error}</p>
        )}
      </div>
      <div className={styles.linkContainer}>
        <a href="/Register">registre-se</a>
      </div>
    </div>
  );
}
