import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.examen',
  appName: 'examen',
  webDir: 'www',
  plugins: {
    Camera: {
      // Configuración específica para Android e iOS
      permissions: {
        android: {
          camera: true,
          writeExternalStorage: true, // Permite guardar imágenes
        },
        ios: {
          camera: true,
          photoLibrary: true, // Permite acceder a la galería en iOS
        },
      },
    },
  },
};

export default config;
