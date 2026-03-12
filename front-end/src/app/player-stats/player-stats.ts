import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Competition } from '../competition';
import { DataService } from '../data.service';
import { PlayerStatsRow } from '../player-stats-row';
import { Season } from '../season';

@Component({
  selector: 'app-player-stats',
  imports: [],
  templateUrl: './player-stats.html',
  styleUrl: './player-stats.css'
})
export class PlayerStats {

  private dataService = inject(DataService);

  seasonsList: Signal<Season[]> = toSignal(this.dataService.seasons, {initialValue: []});
  competitionsList: Signal<Competition[]> = toSignal(this.dataService.competitions, {initialValue: []});

  playerStats: WritableSignal<PlayerStatsRow[]> = signal([]);

  selectedSeason: WritableSignal<string> = signal("");
  filteredCompetitionsList: Signal<Competition[]> = computed(() => this.competitionsList().filter((comp) => comp.seasonId == this.selectedSeason()));

  onSeasonChange(season: string):void {
    this.selectedSeason.set(season);
  }

  async submit(season: string, competition: string): Promise<void> {
    if (!season && !competition) {
      console.log("Season is not selected.");      
      console.log("Competition is not selected.");
    } else if (season == "") {
      console.log("Season is not selected.");
    } else if (competition == "") {
      console.log("Competition is not selected.");
    } else if (competition == "All Competitions") {
      const competitions = this.filteredCompetitionsList().map(competition => competition.competitionId);
      const playerStats = await this.dataService.getPlayerStats(competitions);
      this.playerStats.set(playerStats);
    } else {
      const competitions = [competition];
      const playerStats = await this.dataService.getPlayerStats(competitions);
      this.playerStats.set(playerStats);
    }
  }

}
