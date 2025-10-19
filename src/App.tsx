import "./App.css";
import Game from "./components/game/Game";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sort the balls!</h1>
        <Game />
      </div>
    </div>
  );
}

export default App;
