import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences'; // Importar Capacitor Preferences
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonButton,
  IonInput,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-formulario-publicaciones',
  templateUrl: './formulario-publicaciones.component.html',
  styleUrls: ['./formulario-publicaciones.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonButton,
    IonInput,
    IonLabel,
    IonList,
  ],
})
export class FormularioPublicacionesComponent implements OnInit {
  nuevaPublicacion = {
    titulo: '',
    descripcion: '',
    fecha: '',
    imagen: '',
  };

  publicaciones: any[] = []; // Lista de publicaciones

  @Output() agregar = new EventEmitter<any>();

  constructor(private alertController: AlertController) {}

  async ngOnInit() {
    // Cargar publicaciones desde Preferences al iniciar
    const { value } = await Preferences.get({ key: 'publicaciones' });
    this.publicaciones = value ? JSON.parse(value) : [];
  }

  async capturarImagen() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera, // Puede ser 'Camera', 'Photos', o 'Prompt'
      });

      // Guardar la imagen capturada en la nueva publicación
      this.nuevaPublicacion.imagen = image.dataUrl || '';
      console.log('Imagen capturada:', image);
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

  async agregarPublicacion() {
    if (this.nuevaPublicacion.titulo.length < 5) {
      alert('El título debe tener al menos 5 caracteres.');
      return;
    }
    if (this.nuevaPublicacion.descripcion.length < 20) {
      alert('La descripción debe tener al menos 20 caracteres.');
      return;
    }

    const nuevaPublicacion = {
      ...this.nuevaPublicacion,
      id: new Date().getTime().toString(),
      fecha: new Date().toISOString(),
    };

    this.publicaciones.push(nuevaPublicacion);

    // Guardar la lista actualizada en Preferences
    await Preferences.set({
      key: 'publicaciones',
      value: JSON.stringify(this.publicaciones),
    });

    // Limpiar el formulario
    this.nuevaPublicacion = { titulo: '', descripcion: '', fecha: '', imagen: '' };

    console.log('Publicación guardada:', nuevaPublicacion);
  }

  async eliminarPublicacion(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            // Si confirma, eliminar la publicación
            this.publicaciones = this.publicaciones.filter((pub) => pub.id !== id);

            // Guardar la lista actualizada en Preferences
            await Preferences.set({
              key: 'publicaciones',
              value: JSON.stringify(this.publicaciones),
            });

            console.log('Publicación eliminada:', id);
          },
        },
      ],
    });

    await alert.present();
  }
}
