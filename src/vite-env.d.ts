/// <reference types="vite/client" />

// Variables de entorno propias, tipadas (autocompletado + aviso si falta alguna).
interface ImportMetaEnv {
  readonly VITE_APP_TVMAZE_API_URL: string
}
