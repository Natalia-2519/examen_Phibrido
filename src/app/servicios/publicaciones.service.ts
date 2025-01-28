import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from '../modelos/publicacion';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private readonly STORAGE_KEY = 'publicaciones'; // Clave para guardar las publicaciones en Preferences

  constructor() {}

  // Obtener todas las publicaciones
  async obtenerPublicaciones(): Promise<Publicacion[]> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    return value ? JSON.parse(value) : []; // Devuelve un array vacío si no hay datos
  }

  // Guardar todas las publicaciones
  async guardarPublicaciones(publicaciones: Publicacion[]): Promise<void> {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(publicaciones),
    });
  }

  // Agregar una nueva publicación
  async agregarPublicacion(publicacion: Publicacion): Promise<void> {
    const publicaciones = await this.obtenerPublicaciones();
    publicaciones.push(publicacion); // Agrega la nueva publicación al array existente
    await this.guardarPublicaciones(publicaciones); // Guarda el array actualizado
  }

  // Eliminar una publicación por su ID
  async eliminarPublicacion(id: string): Promise<void> {
    const publicaciones = await this.obtenerPublicaciones();
    const publicacionesFiltradas = publicaciones.filter((p) => p.id !== id); // Filtra la publicación
    await this.guardarPublicaciones(publicacionesFiltradas); // Guarda las publicaciones filtradas
  }
}
