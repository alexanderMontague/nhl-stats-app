import { Game, BetBuilderPlayer, GameStatus } from "../types";
import { GameCard } from "./GameCard";
import { Player } from "../types";

interface GameFeedProps {
  games: Game[];
  getGameStatus: (startTimeUTC: string) => GameStatus;
  onAddToBetBuilder: (player: BetBuilderPlayer) => void;
}

export function GameFeed({
  games,
  getGameStatus,
  onAddToBetBuilder,
}: GameFeedProps) {
  return (
    <div className="space-y-4">
      {games.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-slate-500">
            No games found for the selected criteria.
          </p>
        </div>
      ) : (
        games.map(game => (
          <GameCard
            key={game.gameId}
            game={game}
            status={getGameStatus(game.startTimeUTC)}
            onAddToBetBuilder={(
              player: Player & { gameTitle: string; gameId: number }
            ) => onAddToBetBuilder(player as BetBuilderPlayer)}
          />
        ))
      )}
    </div>
  );
}
