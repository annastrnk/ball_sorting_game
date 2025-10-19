import type { ColorName } from "../../types";
import { COLORS, COLOR_LABELS } from "../../utils";
import { MIN_BALLS_PER_COLOR, MAX_BALLS_PER_COLOR } from "../../constants";
import styles from "./BallCountControl.module.css";

interface BallCountControlProps {
  color: string;
  count: number;
  onChange: (value: number) => void;
}

export default function BallCountControl({ color, count, onChange }: BallCountControlProps) {
  const colorHex = COLORS[color as ColorName];
  const label = COLOR_LABELS[color as ColorName];

  return (
    <div className={styles.container}>
      <div className={styles.labelSection}>
        <div
          className={styles.colorCircle}
          style={{
            background: colorHex,
            boxShadow: `0 0 10px ${colorHex}40`,
          }}
        />
        <span className={styles.colorLabel}>{label}</span>
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => onChange(count - 1)}
          disabled={count <= MIN_BALLS_PER_COLOR}
          className={styles.button}
        >
          −
        </button>

        <input
          type="number"
          value={count}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          min={MIN_BALLS_PER_COLOR}
          max={MAX_BALLS_PER_COLOR}
          className={styles.input}
        />

        <button
          onClick={() => onChange(count + 1)}
          disabled={count >= MAX_BALLS_PER_COLOR}
          className={styles.button}
        >
          +
        </button>
      </div>
    </div>
  );
}
