import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BackendHttpClient } from './backend-http-client';
import { Competition } from './competition';
import { CompetitionStandingsRow } from './competition-standings-row';
import { DataServiceInterface } from './data.service.interface';
import { PlayerStatsRow } from './player-stats-row';
import { Season } from './season';

@Injectable({
  providedIn: 'root'
})
export class DataService implements DataServiceInterface {
  
  private backendHttpClient = inject(BackendHttpClient);

  private readonly seasons$: BehaviorSubject<Season[]> = new BehaviorSubject<Season[]>([]);
  readonly seasons: Observable<Season[]> = this.seasons$.asObservable();

  private readonly competitions$: BehaviorSubject<Competition[]> = new BehaviorSubject<Competition[]>([]);
  readonly competitions: Observable<Competition[]> = this.competitions$.asObservable();

  constructor() {
    this.setSeasons();
    this.setCompetitions();
  }

  async setSeasons(): Promise<void> {
    const seasons = await this.backendHttpClient.getSeasons();
    this.seasons$.next(seasons);
  }

  async setCompetitions(): Promise<void> {
    const competitions = await this.backendHttpClient.getCompetitions();
    this.competitions$.next(competitions);
  }

  async getCompetitionStandings(competition: string): Promise<CompetitionStandingsRow[]> {
    return await this.backendHttpClient.getCompetitionStandings(competition);
  }

  async getPlayerStats(competitions: string[]): Promise<PlayerStatsRow[]> {
    return await this.backendHttpClient.getPlayerStats(competitions);
  }
}
