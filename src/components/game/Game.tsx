import GameConfig from "../config/GameConfig";
import EndGameModal from "../modals/EndGameModal";
import GameHeader from "./GameHeader";
import GameLegend from "./GameLegend";
import GameCanvas from "./GameCanvas";
import BestTimeDisplay from "./BestTimeDisplay";
import { useGameLogic } from "../../hooks/game/useGameLogic";
import styles from "./Game.module.css";

export default function Game() {
  const {
    canvasRef,
    width,
    height,
    setMouseTarget,
    
    gameState,
    gameTime,
    gameWon,
    bestTime,
    
    colorsWithBalls,
    groupedCount,
    totalColors,
    clusteredCounts,
    
    togglePause,
    handleStartGame,
    handleBackToConfig,
    handleRestart,
  } = useGameLogic();

  if (!gameState.gameStarted) {
    return <GameConfig onStart={handleStartGame} />;
  }

  return (
    <>
      {gameWon && (
        <EndGameModal
          time={gameTime}
          bestTime={bestTime}
          isNewRecord={bestTime !== null && gameTime < bestTime}
          onRestart={handleRestart}
          onBackToConfig={handleBackToConfig}
        />
      )}
      
      <div className={styles.container} style={{ width }}>
        <GameHeader
          groupedCount={groupedCount}
          totalColors={totalColors}
          gameTime={gameTime}
          onPauseToggle={togglePause}
          onBackToConfig={handleBackToConfig}
          onRestart={handleRestart}
          isPaused={gameState.gamePaused}
        />

        <GameCanvas
          ref={canvasRef}
          width={width}
          height={height}
          gamePaused={gameState.gamePaused}
          onMouseMove={setMouseTarget}
        />

        <GameLegend
          colors={colorsWithBalls}
          counts={gameState.counts}
          clusteredCounts={clusteredCounts}
        />
        
        {bestTime !== null && <BestTimeDisplay bestTime={bestTime} />}
      </div>
    </>
  );
}
