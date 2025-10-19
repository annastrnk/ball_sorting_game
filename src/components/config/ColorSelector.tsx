import { MIN_COLORS, MAX_COLORS } from "../../constants";
import styles from "./ColorSelector.module.css";

interface ColorSelectorProps {
  selectedCount: number;
  onChange: (count: number) => void;
}

export default function ColorSelector({ selectedCount, onChange }: ColorSelectorProps) {
  const colorOptions = Array.from(
    { length: MAX_COLORS - MIN_COLORS + 1 },
    (_, i) => MIN_COLORS + i
  );

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        Number of Colors
      </div>
      <div className={styles.buttons}>
        {colorOptions.map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`${styles.button} ${selectedCount === num ? styles.selected : ""}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
