import { formatTime } from "../../utils/formatTime";
import styles from "./GameHeader.module.css";

interface GameHeaderProps {
  groupedCount: number;
  totalColors: number;
  gameTime: number;
  onPauseToggle: () => void;
  onBackToConfig: () => void;
  onRestart: () => void;
  isPaused: boolean;
}

export default function GameHeader({
  groupedCount,
  totalColors,
  gameTime,
  onPauseToggle,
  onBackToConfig,
  onRestart,
  isPaused,
}: GameHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.groupedText}>
          Grouped: {groupedCount}/{totalColors}
        </div>
        <div className={styles.timer}>
          ⏱️ {formatTime(gameTime)}
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={onPauseToggle}
          className={`${styles.button} ${styles.pauseButton} ${isPaused ? styles.paused : ""}`}
        >
          {isPaused ? "▶️ Resume" : "⏸️ Pause"}
        </button>
        <button
          onClick={onBackToConfig}
          className={`${styles.button} ${styles.configButton}`}
        >
          ← Config
        </button>
        <button
          onClick={onRestart}
          className={`${styles.button} ${styles.restartButton}`}
        >
          🔄 Restart
        </button>
      </div>
    </div>
  );
}
