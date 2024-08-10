import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [taxNumber, setTaxNumber] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post("https://interview.t-alpha.com.br/api/auth/register", {
        name,
        taxNumber,
        mail,
        phone,
        password,
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Registro falhou. Verifique os dados fornecidos.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Registrar</h2>
      <div className={styles.formContainer}>
        <input
          type="text"
          placeholder="Nome Completo"
          className={styles.textInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF ou CNPJ"
          className={styles.textInput}
          value={taxNumber}
          onChange={(e) => setTaxNumber(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          className={styles.textInput}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          className={styles.textInput}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className={styles.textInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          className={styles.textInput}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className={styles.btnContainer} onClick={handleRegister}>
          Registrar
        </button>
      </div>
      <div className={styles.linkContainer}>
        <a href="/">Já tem uma conta? Faça login</a>
      </div>
    </div>
  );
}
