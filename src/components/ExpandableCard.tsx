import { ReactNode, useState } from "react";
import { Card } from "./Card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GameStatus } from "../types";
interface ExpandableCardProps {
  status: GameStatus;
  header: ReactNode;
  children: ReactNode;
  playerCount: number;
}

export function ExpandableCard({
  status,
  header,
  children,
  playerCount,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card status={status}>
      <div
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          {header}
          <div className="flex items-center">
            <span className="text-slate-500 mr-2 text-center">
              {playerCount} Players
            </span>
            {isExpanded ? (
              <ChevronUp size={20} className="text-slate-400" />
            ) : (
              <ChevronDown size={20} className="text-slate-400" />
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100">{children}</div>
      )}
    </Card>
  );
}
