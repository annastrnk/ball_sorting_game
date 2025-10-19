import { formatTime } from "../../utils/formatTime";
import styles from "./EndGameModal.module.css";

interface EndGameModalProps {
  time: number;
  bestTime: number | null;
  isNewRecord: boolean;
  onRestart: () => void;
  onBackToConfig: () => void;
}

export default function EndGameModal({
  time,
  bestTime,
  isNewRecord,
  onRestart,
  onBackToConfig,
}: EndGameModalProps) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onRestart();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.emoji}>🎉</div>
          <h2 className={styles.title}>Success!</h2>
          <p className={styles.subtitle}>All balls grouped!</p>
        </div>

        <div className={styles.timeContainer}>
          <div className={styles.timeLabel}>Your Time</div>
          <div className={`${styles.time} ${isNewRecord ? styles.newRecord : ""}`}>
            {formatTime(time)}
          </div>
          {isNewRecord && (
            <div className={styles.recordBadge}>⭐ New Record!</div>
          )}
        </div>

        {bestTime !== null && !isNewRecord && (
          <div className={styles.bestTimeContainer}>
            <div className={styles.bestTimeLabel}>Best Time</div>
            <div className={styles.bestTime}>{formatTime(bestTime)}</div>
          </div>
        )}

        <div className={styles.buttons}>
          <button
            onClick={onRestart}
            className={`${styles.button} ${styles.primaryButton}`}
          >
            🔄 Play Again
          </button>

          <button
            onClick={onBackToConfig}
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            ⚙️ Change Settings
          </button>
        </div>
      </div>
    </div>
  );
}
