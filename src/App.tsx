import { Background } from "./components/Background";
import { Card } from "./components/Card";
import { ShotFilter } from "./components/ShotFilter";
import { DateSelector } from "./components/DateSelector";
import { GameFeed } from "./components/GameFeed";
import { BetBuilder } from "./components/BetBuilder";
import { useNHLData } from "./hooks/useNHLData";
import Sticks from "./assets/sticks.svg";

function App() {
  const {
    games,
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
  } = useNHLData();

  return (
    <div className="min-h-screen text-slate-800">
      <Background />

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={Sticks} alt="NHL Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold">NHL Shot Predictor</h1>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <ShotFilter value={shotFilter} onChange={setShotFilter} />
              <DateSelector
                selectedDate={selectedDate}
                onDateChange={changeDate}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-28">
        {isLoading ? (
          <Card className="p-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-28 bg-slate-200 rounded mb-4"></div>
              <div className="h-4 w-48 bg-slate-200 rounded"></div>
            </div>
          </Card>
        ) : error ? (
          <Card className="p-8 text-center text-red-500">
            <p>Error loading data: {error}</p>
            <p className="text-sm mt-2 text-slate-500">
              Please check your connection and try again.
            </p>
          </Card>
        ) : (
          <GameFeed
            games={games}
            getGameStatus={getGameStatus}
            onAddToBetBuilder={addToBetBuilder}
          />
        )}
      </main>

      <BetBuilder
        players={betBuilder}
        onRemovePlayer={removeFromBetBuilder}
        onClear={clearBetBuilder}
      />
    </div>
  );
}

export default App;
