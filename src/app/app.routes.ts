import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'formulario',
    loadComponent: () =>
      import('./componentes/formulario-publicaciones/formulario-publicaciones.component').then(
        (m) => m.FormularioPublicacionesComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
