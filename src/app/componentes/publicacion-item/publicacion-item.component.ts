import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonItem, IonLabel, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-publicacion-item',
  templateUrl: './publicacion-item.component.html',
  styleUrls: ['./publicacion-item.component.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem],
})
export class PublicacionItemComponent {
  @Input() publicacion: any; // Recibe una publicación específica
  @Output() eliminar = new EventEmitter<string>(); // Evento para emitir la eliminación

  eliminarPublicacion() {
    this.eliminar.emit(this.publicacion.id); // Emite el ID de la publicación a eliminar
  }
}
