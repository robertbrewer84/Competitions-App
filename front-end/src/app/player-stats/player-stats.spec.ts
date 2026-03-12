import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataService } from '../data.service';
import { MockDataService } from '../mock-data.service';
import { PlayerStats } from './player-stats';

describe('PlayerStats', () => {

  let component: PlayerStats;
  let fixture: ComponentFixture<PlayerStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlayerStats
      ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
