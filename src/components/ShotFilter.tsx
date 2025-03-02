import { useState } from "react";
import { Filter } from "lucide-react";

interface ShotFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function ShotFilter({ value, onChange }: ShotFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "All Shots", value: null },
    { label: "1 Shot", value: 1 },
    { label: "2 Shots", value: 2 },
    { label: "3 Shots", value: 3 },
    { label: "4 Shots", value: 4 },
    { label: "5+ Shots", value: 5 },
  ];

  const handleSelect = (shotValue: number | null) => {
    onChange(shotValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-slate-200/50 px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={18} className="text-rink-blue" />
        <span>
          {value === null
            ? "Filter by Shots"
            : value === 5
            ? "5+ Shots"
            : `${value} Shot${value === 1 ? "" : "s"}`}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50 min-w-[180px]">
          {options.map(option => (
            <div
              key={option.value === null ? "all" : option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-slate-100 ${
                value === option.value
                  ? "bg-slate-100 text-rink-blue font-medium"
                  : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
