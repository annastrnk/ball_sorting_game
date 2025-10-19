import { COLORS, COLOR_LABELS } from "../../utils";
import type { ColorName } from "../../types";
import styles from "./GameLegend.module.css";

interface GameLegendProps {
  colors: ColorName[];
  counts: Record<string, number>;
  clusteredCounts: Record<string, boolean>;
}

export default function GameLegend({ colors, counts, clusteredCounts }: GameLegendProps) {
  return (
    <div className={styles.legend}>
      {colors.map((colorName) => (
        <LegendItem
          key={colorName}
          colorName={colorName}
          label={COLOR_LABELS[colorName]}
          active={clusteredCounts[colorName]}
          count={counts[colorName] || 0}
        />
      ))}
    </div>
  );
}

interface LegendItemProps {
  colorName: ColorName;
  label: string;
  active: boolean;
  count: number;
}

function LegendItem({ colorName, label, active, count }: LegendItemProps) {
  const bg = COLORS[colorName];
  return (
    <div className={styles.item}>
      <div
        className={`${styles.circle} ${active ? styles.active : ""}`}
        style={{
          background: bg,
          color: bg,
        }}
      />
      <div className={styles.label}>
        {label} ({count}){active ? " ✓" : ""}
      </div>
    </div>
  );
}
