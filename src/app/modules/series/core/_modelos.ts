// Modelos (tipos) de los datos de la cartelera.
// Los nombres de los tipos están en español; los campos se quedan en inglés
// porque así vienen en el JSON de la API de TVmaze.

export interface ImagenTv {
  medium: string
  original: string
}

export interface Serie {
  id: number
  name: string
  genres: Array<string>
  language: string | null
  status: string
  premiered: string | null
  rating: {average: number | null}
  image: ImagenTv | null
  summary: string | null
  runtime: number
  type: string
  _embedded: {cast: Array<Actor>}
}

export interface Actor {
  person: {id: number, name: string, image: ImagenTv | null }
  character : {id: number, name: string}
}
