import { Club } from "./club"

export interface PlayerStatsRow {
  playerId: string
  playerName: string
  club: Club[]
  played: number
  goals: number
  goalsPerGame: number
  mvps: number
  yellowCards: number
  redCards: number
}
