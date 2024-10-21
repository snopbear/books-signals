import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'crud',
    pathMatch: 'full',
  },
  {
    path: 'crud',
    loadComponent: () =>
      import('./crud/crud.component').then((m) => m.CrudComponent),
  },
  {
    path: 'crud-todo',
    loadComponent: () =>
      import('./crud-diff/crud-diff.component').then((m) => m.CrudDiffComponent),
  },
];
