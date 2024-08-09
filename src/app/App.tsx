import { BrowserRouter } from "react-router-dom";
import Router from "../Router";
import styles from "./global.module.scss";

function App() {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
