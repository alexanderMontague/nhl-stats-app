import { useState } from "react";
import { Card } from "./Card";
import { BetBuilderPlayer } from "../types";
import { Clipboard, X, MinusCircle } from "lucide-react";
import { Button } from "./Button";

interface BetBuilderProps {
  players: BetBuilderPlayer[];
  onRemovePlayer: (playerId: number) => void;
  onClear: () => void;
}

export function BetBuilder({
  players,
  onRemovePlayer,
  onClear,
}: BetBuilderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const text = players
      .map(player => {
        return `${player.name} (${
          player.teamAbbrev
        }) - ${player.predictedGameShots.toFixed(1)} shots - ${
          player.gameTitle
        }`;
      })
      .join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (players.length === 0) {
    return (
      <div className="fixed bottom-6 right-6">
        <Button
          variant="primary"
          className="rounded-full shadow-lg px-6 py-3 bg-rink-blue hover:bg-rink-blue/90"
          onClick={() => setIsOpen(!isOpen)}
        >
          Bet Builder (0)
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <Card className="mb-4 p-4 max-w-md shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Your Picks ({players.length})</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </Button>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {players.map(player => (
              <div
                key={player.playerId}
                className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">
                    {player.name} ({player.teamAbbrev})
                  </div>
                  <div className="text-sm text-slate-500">
                    {player.gameTitle} • {player.predictedGameShots.toFixed(1)}{" "}
                    shots
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemovePlayer(player.playerId)}
                >
                  <MinusCircle size={18} className="text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="secondary" size="sm" onClick={onClear}>
              Clear All
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleCopyToClipboard}
              className="bg-rink-blue hover:bg-rink-blue/90"
            >
              <Clipboard size={18} className="mr-2" />
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </div>
        </Card>
      )}

      <Button
        variant="primary"
        className={`rounded-full shadow-lg px-6 py-3 ${
          isOpen
            ? "bg-slate-700 hover:bg-slate-800"
            : "bg-rink-blue hover:bg-rink-blue/90"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Bet Builder ({players.length})
      </Button>
    </div>
  );
}
