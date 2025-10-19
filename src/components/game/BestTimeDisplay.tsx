import { formatTime } from "../../utils/formatTime";
import styles from "./BestTimeDisplay.module.css";

interface BestTimeDisplayProps {
  bestTime: number;
}

export default function BestTimeDisplay({ bestTime }: BestTimeDisplayProps) {
  return (
    <div className={styles.bestTime}>
      🏆 Best: {formatTime(bestTime)}
    </div>
  );
}
