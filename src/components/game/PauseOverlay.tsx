import styles from "./PauseOverlay.module.css";

export default function PauseOverlay() {
  return (
    <div className={styles.overlay}>
      ⏸️ PAUSED
    </div>
  );
}
