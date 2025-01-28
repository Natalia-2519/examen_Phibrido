import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { FormularioPublicacionesComponent } from '../componentes/formulario-publicaciones/formulario-publicaciones.component';
import { ListaPublicacionesComponent } from '../componentes/lista-publicaciones/lista-publicaciones.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormularioPublicacionesComponent,
    ListaPublicacionesComponent
    , IonFab, IonFabButton
  ],
})
export class HomePage {
  publicaciones: any[] = []; // Lista de publicaciones

  constructor() {}

  agregarPublicacion(publicacion: any) {
    this.publicaciones.push(publicacion); // Agregar nueva publicación a la lista
  }

  eliminarPublicacion(id: string) {
    this.publicaciones = this.publicaciones.filter((p) => p.id !== id); // Filtrar la lista
  }
}
