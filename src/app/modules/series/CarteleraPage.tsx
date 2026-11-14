import {useState} from 'react'
import {Serie} from './core/_modelos'
import {TarjetaSerie} from './components/TarjetaSerie'
import {SERIES} from './core/_datos'
import {MensajeVacio} from './components/MensajeVacio'
import {BuscadorSeries} from './components/BuscadorSeries' 

const SERIE_DE_EJEMPLO: Serie = {
  id: 1,
  name: 'Under the Dome',
  genres: ['Drama', 'Science-Fiction', 'Thriller'],
  language: 'English',
  status: 'Ended',
  premiered: '2013-06-24',
  rating: {average: 6.6},
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/610/1525272.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/610/1525272.jpg',
  },
  summary:
    'Under the Dome is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome.',
}

const CarteleraPage = () => {
  const [busqueda, setBusqueda] = useState('') 

  console.log('Series cargadas:', SERIES)
  console.log('busqueda actual:', busqueda) 

  const seriesFiltradas = SERIES.filter((serie) =>
    serie.name.toLowerCase().includes(busqueda.toLowerCase()) 
  )
  console.log('Filtradas:', seriesFiltradas.length, seriesFiltradas)

  return (
    <>
      <div className='mb-8'>
        <h1 className='fw-bold text-gray-900 mb-1'>Cartelera</h1>
        <div className='text-muted fs-6'>Series disponibles en TVmaze</div>
      </div>

      <div className='row g-6'>
        <div className='col-6 col-md-4 col-lg-3'>
          <TarjetaSerie serie={SERIE_DE_EJEMPLO} />
        </div>
      </div>

      <h3 className='fw-bold text-gray-900 mt-12 mb-6'>Todas las series</h3>

      

      <BuscadorSeries onBuscar={setBusqueda} />

      {busqueda && (
        <div className='text-muted mb-4'>
          {seriesFiltradas.length} resultado(s) para "{busqueda}"
        </div>
      )}
  

      {seriesFiltradas.length > 0 ? (
        <div className='row g-6'>
          {seriesFiltradas.map((serie) => (
            <div key={serie.id} className='col-6 col-md-4 col-lg-3'>
              <TarjetaSerie serie={serie} />
            </div>
          ))}
        </div>
      ) : (
        <MensajeVacio busqueda={busqueda} /> 
      )}
    </>
  )
}

export {CarteleraPage}
