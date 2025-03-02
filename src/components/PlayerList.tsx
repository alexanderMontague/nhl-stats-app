import { Player } from "../types";
import { PlusCircle } from "lucide-react";

interface PlayerListProps {
  players: Player[];
  onAddToBetBuilder: (player: Player) => void;
}

export function PlayerList({ players, onAddToBetBuilder }: PlayerListProps) {
  // Sort players by predicted shots (highest first)
  const sortedPlayers = [...players].sort((a, b) => {
    return b.predictedGameShots - a.predictedGameShots;
  });

  const getShotTrendIcon = (player: Player) => {
    if (player.shotTrend.length < 2) return null;

    const lastTwo = player.shotTrend.slice(-2);
    const trend = lastTwo[1] - lastTwo[0];

    if (trend > 0) {
      return <span className="text-green-500">↑</span>;
    } else if (trend < 0) {
      return <span className="text-red-500">↓</span>;
    } else {
      return <span className="text-yellow-500">→</span>;
    }
  };

  return (
    <div className="space-y-3">
      {sortedPlayers.map(player => (
        <div
          key={player.playerId}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <button
              onClick={() => onAddToBetBuilder(player)}
              className="text-rink-blue hover:text-rink-lightBlue"
              aria-label="Add to bet builder"
            >
              <PlusCircle size={20} />
            </button>

            <div>
              <div className="font-medium flex items-center gap-2">
                {player.name}
                <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">
                  {player.position}
                </span>
                <span className="text-xs bg-rink-blue/10 text-rink-blue px-2 py-0.5 rounded-full">
                  {player.teamAbbrev}
                </span>
              </div>

              <div className="text-sm text-slate-500 flex items-center gap-2">
                <span>Avg: {player.avgShotsLast5.toFixed(1)}</span>
                <span>|</span>
                <span>Season: {player.seasonShotsPerGame.toFixed(1)}</span>
                <span className="flex items-center gap-1">
                  {getShotTrendIcon(player)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <div className="flex items-center gap-2">
              <div className="font-bold text-xl text-rink-blue">
                {player.predictedGameShots.toFixed(1)}
              </div>
              <div className="text-xs">Predicted Shots</div>
            </div>

            <div className="w-full sm:w-40 mt-1">
              {/* Confidence bar */}
              <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${(player.confidence / 10) * 100}%`,
                    background: `linear-gradient(to right, #4caf50, ${
                      player.confidence > 7
                        ? "#4caf50"
                        : player.confidence > 5
                        ? "#ffeb3b"
                        : "#f44336"
                    })`,
                  }}
                />
              </div>

              <div className="flex justify-between text-xs mt-1">
                <span>Last 5:</span>
                <div className="flex gap-1">
                  {player.shotsLast5.map((shots, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-5 h-5 rounded-sm"
                      style={{
                        backgroundColor:
                          shots <= 1
                            ? "#ffcdd2"
                            : shots <= 3
                            ? "#fff9c4"
                            : "#c8e6c9",
                      }}
                    >
                      {shots}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
