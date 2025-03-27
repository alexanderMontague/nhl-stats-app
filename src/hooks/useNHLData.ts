import { useState, useEffect, useCallback } from "react";
import { Game, BetBuilderPlayer, GameStatus } from "../types";

export function useNHLData() {
  const [games, setGames] = useState<Game[]>([]);
  const [totalAccuracy, setTotalAccuracy] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shotFilter, setShotFilter] = useState<number | null>(null);
  const [betBuilder, setBetBuilder] = useState<BetBuilderPlayer[]>([]);

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:8088/nhl"
      : "https://api.alexmontague.ca/nhl";

  const formatDateForAPI = (date: Date): string => {
    return date.toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });
  };

  const fetchNHLData = useCallback(async (date: Date) => {
    setIsLoading(true);
    setError(null);
    console.log("fetching data for", date);

    try {
      const formattedDate = formatDateForAPI(date);
      const response = await fetch(`${BASE_URL}/shots?date=${formattedDate}`);

      if (!response.ok) {
        throw new Error("Failed to fetch NHL data");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      setGames(data.gamesWithPlayers);
      setTotalAccuracy(data.totalAccuracy);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error fetching NHL data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNHLData(selectedDate);
  }, [selectedDate, fetchNHLData]);

  const getGameStatus = useCallback((startTimeUTC: string): GameStatus => {
    const now = new Date();
    const gameTime = new Date(startTimeUTC);

    // Game duration is approximately 3 hours
    const gameEndTime = new Date(gameTime.getTime() + 3 * 60 * 60 * 1000);

    if (now < gameTime) {
      return GameStatus.Upcoming;
    } else if (now >= gameTime && now <= gameEndTime) {
      return GameStatus.InProgress;
    } else {
      return GameStatus.Finished;
    }
  }, []);

  const addToBetBuilder = (player: BetBuilderPlayer) => {
    if (!betBuilder.some(p => p.playerId === player.playerId)) {
      setBetBuilder([...betBuilder, player]);
    }
  };

  const removeFromBetBuilder = (playerId: number) => {
    setBetBuilder(betBuilder.filter(p => p.playerId !== playerId));
  };

  const clearBetBuilder = () => {
    setBetBuilder([]);
  };

  const changeDate = (date: Date) => {
    setSelectedDate(date);
  };

  const filteredGames = useCallback(() => {
    if (!shotFilter) return games;

    return games
      .map(game => {
        const filteredPlayers = game.players.filter(player => {
          if (shotFilter === 5) {
            return player.predictedGameShots >= 5;
          }
          return Math.round(player.predictedGameShots) === shotFilter;
        });

        return {
          ...game,
          players: filteredPlayers,
        };
      })
      .filter(game => game.players.length > 0);
  }, [games, shotFilter]);

  return {
    games: filteredGames(),
    totalAccuracy: totalAccuracy * 100,
    isLoading,
    error,
    selectedDate,
    shotFilter,
    betBuilder,
    changeDate,
    setShotFilter,
    addToBetBuilder,
    removeFromBetBuilder,
    clearBetBuilder,
    getGameStatus,
    refreshData: () => fetchNHLData(selectedDate),
  };
}
