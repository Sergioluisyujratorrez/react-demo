import {CSSProperties} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Serie} from '../core/_modelos'
import {BotonFavorito} from './BotonFavorito'

type Props = {
  serie: Serie
}

// Corta el resumen a 3 líneas (Bootstrap no trae una utilidad de line-clamp).
const tresLineas: CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

// Tarjeta de una serie: póster, nombre, géneros y resumen.
// Solo muestra lo que recibe por props: no pide datos ni guarda estado.
const TarjetaSerie = ({serie}: Props) => {
  // Si la serie no trae póster, se usa la imagen por defecto de la plantilla.
  const poster = serie.image?.medium ?? toAbsoluteUrl('media/svg/files/blank-image.svg')

  return (
    <div className='card h-100 shadow-sm'>
      <div className='position-relative'>
        <img
          src={poster}
          alt={serie.name}
          className='card-img-top object-fit-cover'
          style={{height: 300}}
        />
        {/* Botón de favoritos en la esquina del póster (funcionará en la clase 4) */}
        <div className='position-absolute top-0 end-0 m-3'>
          <BotonFavorito />
        </div>
        
      </div>
      <div className='card-body p-5'>
        <div className='text-gray-900 fs-5 fw-bold text-truncate mb-2'>{serie.name}</div>
        <div className='d-flex flex-wrap gap-1 mb-3'>
          {serie.genres.length > 0 ? (
            serie.genres.map((genero) => (
              <span key={genero} className='badge badge-light-primary'>
                {genero}
              </span>
            ))
          ) : (
            <span className='badge badge-light'>Sin género</span>
          )}
        </div>
        <p className='text-gray-600 fs-7 mb-0' style={tresLineas}>
          {serie.summary ?? 'Sin descripción.'}
        </p>
        
      </div>
    </div>
  )
}

export {TarjetaSerie}
