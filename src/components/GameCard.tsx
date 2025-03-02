import { useState } from "react";
import { Game, Player } from "../types";
import { Card } from "./Card";
import { PlayerList } from "./PlayerList";
import { ChevronDown, ChevronUp } from "lucide-react";

interface GameCardProps {
  game: Game;
  status: "upcoming" | "inProgress" | "finished";
  onAddToBetBuilder: (
    player: Player & { gameTitle: string; gameId: number }
  ) => void;
}

export function GameCard({ game, status, onAddToBetBuilder }: GameCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <Card
      status={status}
      className="mb-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div
        className="flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={game.awayTeam.logo}
              alt={game.awayTeam.abbrev}
              className="h-12 w-12"
            />
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-sm font-medium">
              {game.awayTeam.abbrev}
            </span>
          </div>

          <div className="text-center">
            <div className="font-bold">@</div>
            <div className="text-sm text-slate-500">{statusText()}</div>
          </div>

          <div className="relative">
            <img
              src={game.homeTeam.logo}
              alt={game.homeTeam.abbrev}
              className="h-12 w-12"
            />
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-sm font-medium">
              {game.homeTeam.abbrev}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 mr-2">
            {game.players.length} Players
          </span>
          {isExpanded ? (
            <ChevronUp size={20} className="text-slate-400" />
          ) : (
            <ChevronDown size={20} className="text-slate-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <PlayerList
            players={game.players}
            onAddToBetBuilder={handleAddToBetBuilder}
          />
        </div>
      )}
    </Card>
  );
}
