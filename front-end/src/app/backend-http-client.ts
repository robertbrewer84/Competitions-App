import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Competition } from './competition';
import { CompetitionStandingsRow } from './competition-standings-row';
import { PlayerStatsRow } from './player-stats-row';
import { Season } from './season';

@Injectable({
  providedIn: 'root'
})
export class BackendHttpClient {
  
  private http = inject(HttpClient);

  async getSeasons(): Promise<Season[]> {
    const url = 'http://127.0.0.1:5000/seasons';
    interface Response { message: Season[] }
    let response: Response = {
      message: []
    };
    response = await firstValueFrom(this.http.get<Response>(url));
    return response.message;
  }

  async getCompetitions(): Promise<Competition[]> {
    const url = 'http://127.0.0.1:5000/competitions';
    interface Response { message: Competition[] }
    let response: Response = {
      message: []
    };
    response = await firstValueFrom(this.http.get<Response>(url));
    return response.message;
  }

  async getCompetitionStandings(competition: string): Promise<CompetitionStandingsRow[]> {
    const url = 'http://127.0.0.1:5000/competition_standings/' + competition;
    interface Response { message: CompetitionStandingsRow[] }
    let response: Response = {
      message: []
    };
    response = await firstValueFrom(this.http.get<Response>(url));
    return response.message;
  }

  async getPlayerStats(competitions: string[]): Promise<PlayerStatsRow[]> {
    const url = 'http://127.0.0.1:5000/player_stats/' + competitions;
    interface Response { message: PlayerStatsRow[] }
    let response: Response = {
      message: []
    };
    response = await firstValueFrom(this.http.get<Response>(url));
    return response.message;
  }

}
