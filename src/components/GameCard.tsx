import { Game, Player } from "../types";
import { PlayerList } from "./PlayerList";
import { ExpandableCard } from "./ExpandableCard";

interface GameCardProps {
  game: Game;
  status: "upcoming" | "inProgress" | "finished";
  onAddToBetBuilder: (
    player: Player & { gameTitle: string; gameId: number }
  ) => void;
}

export function GameCard({ game, status, onAddToBetBuilder }: GameCardProps) {
  const formatGameTime = (utcTime: string): string => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  const statusText = (): string => {
    switch (status) {
      case "upcoming":
        return formatGameTime(game.startTimeUTC);
      case "inProgress":
        return "In Progress";
      case "finished":
        return "Final";
    }
  };

  const handleAddToBetBuilder = (player: Player) => {
    onAddToBetBuilder({
      ...player,
      gameTitle: game.title,
      gameId: game.gameId,
    });
  };

  const gameHeader = (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <img
          src={game.awayTeam.logo}
          alt={game.awayTeam.abbrev}
          className="h-12 w-12"
        />
        <span className="text-sm font-medium">{game.awayTeam.abbrev}</span>
      </div>

      <div className="text-center">
        <div className="font-bold">@</div>
        <div className="text-sm text-slate-500">{statusText()}</div>
      </div>

      <div className="flex flex-col items-center">
        <img
          src={game.homeTeam.logo}
          alt={game.homeTeam.abbrev}
          className="h-12 w-12"
        />
        <span className="text-sm font-medium">{game.homeTeam.abbrev}</span>
      </div>
    </div>
  );

  return (
    <ExpandableCard
      status={status}
      header={gameHeader}
      playerCount={game.players.length}
    >
      <PlayerList
        players={game.players}
        onAddToBetBuilder={handleAddToBetBuilder}
      />
    </ExpandableCard>
  );
}
