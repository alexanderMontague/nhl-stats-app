export enum Tabs {
  home = "home",
  history = "history",
  progress = "progress",
  settings = "settings",
}

// Base types for workout templates
export interface Exercise {
  id: string;
  name: string;
  sets: number | "";
  reps: number | "";
  weight: number | "";
  completed?: boolean;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  notes?: string;
}

export interface CompletedWorkout extends Workout {
  templateId: string;
  completedAt: string;
  duration?: number;
}

export const STRETCH_TEMPLATE_ID = "stretch-template";

export interface Team {
  abbrev: string;
  logo: string;
  id: number;
}

export interface Player {
  playerId: number;
  name: string;
  position: string;
  teamAbbrev: string;
  teamId: number;
  shotsLast5: number[];
  avgShotsLast5: number;
  shotTrend: number[];
  avgTOI: number;
  seasonShotsPerGame: number;
  predictedGameShots: number;
  confidence: number;
  restDays: number;
}

export interface Game {
  gameId: number;
  title: string;
  awayTeam: Team;
  homeTeam: Team;
  season: string;
  startTimeUTC: string;
  players: Player[];
}

export interface BetBuilderPlayer extends Player {
  gameTitle: string;
  gameId: number;
}
