import { forwardRef } from "react";
import PauseOverlay from "./PauseOverlay";
import styles from "./GameCanvas.module.css";

interface GameCanvasProps {
  width: number;
  height: number;
  gamePaused: boolean;
  onMouseMove: (x: number, y: number) => void;
}

const GameCanvas = forwardRef<HTMLCanvasElement, GameCanvasProps>(
  ({ width, height, gamePaused, onMouseMove }, ref) => {
    const convertToCanvasCoordinates = (clientX: number, clientY: number, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!gamePaused) {
        const { x, y } = convertToCanvasCoordinates(e.clientX, e.clientY, e.currentTarget);
        onMouseMove(x, y);
      }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (!gamePaused) {
        const touch = e.touches[0];
        const { x, y } = convertToCanvasCoordinates(touch.clientX, touch.clientY, e.currentTarget);
        onMouseMove(x, y);
      }
    };

    return (
      <div className={styles.wrapper}>
        <canvas
          ref={ref}
          width={width}
          height={height}
          className={`${styles.canvas} ${gamePaused ? styles.paused : ""}`}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        />
        
        {gamePaused && <PauseOverlay />}
      </div>
    );
  }
);

GameCanvas.displayName = "GameCanvas";

export default GameCanvas;

