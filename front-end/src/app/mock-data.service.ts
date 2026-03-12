import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Competition } from './competition';
import { DataServiceInterface } from './data.service.interface';
import { Season } from './season';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements DataServiceInterface {

  private readonly seasons$: BehaviorSubject<Season[]> = new BehaviorSubject<Season[]>([]);
  readonly seasons: Observable<Season[]> = this.seasons$.asObservable();

  private readonly competitions$: BehaviorSubject<Competition[]> = new BehaviorSubject<Competition[]>([]);
  readonly competitions: Observable<Competition[]> = this.competitions$.asObservable();

}
