import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList } from '@ionic/angular/standalone';
import { PublicacionItemComponent } from '../publicacion-item/publicacion-item.component';

@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, PublicacionItemComponent],
})
export class ListaPublicacionesComponent {
  @Input() publicaciones: any[] = []; // Recibe la lista de publicaciones del padre
  @Output() eliminar = new EventEmitter<string>(); // Evento para emitir cuando se elimina una publicación
}
