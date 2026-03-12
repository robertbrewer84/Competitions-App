import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Competition } from '../competition';
import { CompetitionStandingsRow } from '../competition-standings-row';
import { DataService } from '../data.service';
import { Season } from '../season';

@Component({
  selector: 'app-competitions',
  imports: [],
  templateUrl: './competitions.html',
  styleUrl: './competitions.css'
})
export class Competitions {

  private dataService = inject(DataService);

  seasonsList: Signal<Season[]> = toSignal(this.dataService.seasons, {initialValue: []});
  competitionsList: Signal<Competition[]> = toSignal(this.dataService.competitions, {initialValue: []});

  competitionStandings: WritableSignal<CompetitionStandingsRow[]> = signal([]);

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
    } else {
      const competitionStandings = await this.dataService.getCompetitionStandings(competition);
      this.competitionStandings.set(competitionStandings);
    }
  }

}
