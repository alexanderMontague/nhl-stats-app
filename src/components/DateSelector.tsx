import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "./Button";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DateSelector({
  selectedDate,
  onDateChange,
}: DateSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    onDateChange(newDate);
  };

  const setToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-slate-200/50 p-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeDate(-1)}
        aria-label="Previous day"
      >
        <ChevronLeft size={20} />
      </Button>

      <div
        className="flex items-center gap-2 cursor-pointer px-3 py-1 hover:bg-slate-100 rounded-md"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <Calendar size={18} className="text-rink-blue" />
        <span className="font-medium">{formatDate(selectedDate)}</span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeDate(1)}
        aria-label="Next day"
      >
        <ChevronRight size={20} />
      </Button>

      {isCalendarOpen && (
        <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between mb-4">
            <Button variant="secondary" size="sm" onClick={setToday}>
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCalendarOpen(false)}
            >
              <ChevronLeft size={16} className="transform rotate-90" />
            </Button>
          </div>
          {/* Simple calendar implementation */}
          <div className="grid grid-cols-7 gap-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
              <div
                key={day}
                className="text-center text-xs font-medium text-slate-500"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const d = new Date(selectedDate);
              d.setDate(1);
              const firstDay = d.getDay();
              d.setDate(i - firstDay + 1);

              const isCurrentMonth = d.getMonth() === selectedDate.getMonth();
              const isSelected =
                d.toDateString() === selectedDate.toDateString();

              return (
                <div
                  key={i}
                  className={`text-center p-1 rounded-full cursor-pointer text-sm ${
                    isCurrentMonth ? "text-slate-700" : "text-slate-300"
                  } ${
                    isSelected
                      ? "bg-rink-blue text-white"
                      : "hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    onDateChange(new Date(d));
                    setIsCalendarOpen(false);
                  }}
                >
                  {d.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
