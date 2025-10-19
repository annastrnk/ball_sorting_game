import { useState } from "react";
import type { ColorName } from "../../types";
import { ALL_COLORS } from "../../types";
import { DEFAULT_COLOR_COUNT, getDefaultCountsForColors } from "../../constants";
import ColorSelector from "./ColorSelector";
import BallCountControl from "./BallCountControl";
import styles from "./GameConfig.module.css";

interface GameConfigProps {
  onStart: (counts: Record<string, number>, activeColors: ColorName[]) => void;
}

export default function GameConfig({ onStart }: GameConfigProps) {
  const [numColors, setNumColors] = useState(DEFAULT_COLOR_COUNT);
  const [counts, setCounts] = useState<Record<string, number>>(
    getDefaultCountsForColors(DEFAULT_COLOR_COUNT)
  );

  const handleColorCountChange = (newNumColors: number) => {
    setNumColors(newNumColors);
    setCounts(getDefaultCountsForColors(newNumColors));
  };

  const handleCountChange = (color: string, value: number) => {
    setCounts((prev) => ({ ...prev, [color]: value }));
  };

  const activeColors = ALL_COLORS.slice(0, numColors);
  const totalBalls = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Game Configuration</h2>
      
      <ColorSelector selectedCount={numColors} onChange={handleColorCountChange} />

      <div className={styles.ballControls}>
        {activeColors.map((color) => (
          <BallCountControl
            key={color}
            color={color}
            count={counts[color] || 5}
            onChange={(value) => handleCountChange(color, value)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.totalText}>
          Total: {totalBalls} ball{totalBalls !== 1 ? "s" : ""}
        </div>
        <button
          onClick={() => onStart(counts, activeColors)}
          className={styles.startButton}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
