const BEST_TIME_KEY = "sorting_game_best_time";

export function getBestTime(): number | null {
  const saved = localStorage.getItem(BEST_TIME_KEY);
  const time = saved ? parseFloat(saved) : null;
  return time && time > 0 ? time : null;
}

export function saveBestTime(time: number): void {
  localStorage.setItem(BEST_TIME_KEY, time.toString());
}

export function clearBestTime(): void {
  localStorage.removeItem(BEST_TIME_KEY);
}

