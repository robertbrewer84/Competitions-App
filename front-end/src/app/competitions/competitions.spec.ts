import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competitions } from './competitions';
import { DataService } from '../data.service';
import { MockDataService } from '../mock-data.service';

describe('Competitions', () => {

  let component: Competitions;
  let fixture: ComponentFixture<Competitions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Competitions
      ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competitions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
