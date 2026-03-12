import { Routes } from '@angular/router';

import { Homepage } from './homepage/homepage';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
    title: 'Homepage'
  },
  {
    path: 'competitions',
    loadComponent: () => import('./competitions/competitions').then(m => m.Competitions),
    title: 'Competitions'
  },
  {
    path: 'player-stats',
    loadComponent: () => import('./player-stats/player-stats').then(m => m.PlayerStats),
    title: 'Player Stats'
  },
  {
    path: '**',
    redirectTo: '/',
  }
];
