import { useState, useEffect } from 'react'
import { Serie } from './core/_modelos'
import { TarjetaSerie } from './components/TarjetaSerie'
// import {SERIES} from './core/_datos'
import { MensajeVacio } from './components/MensajeVacio'
import { BuscadorSeries } from './components/BuscadorSeries'
import { obtenerSeries } from './core/_peticiones'

const CarteleraPage = () => {

  const [series, setSeries] = useState<Array<Serie>>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    obtenerSeries()
      .then((respuesta) => {
        // console.log("Respuesta de axios", respuesta)
        // console.log("Series de la api", respuesta.data)
        setSeries(respuesta.data.slice(0, 20))
      })
      .catch((error)=> {
        setError('Error al cargar las series')
      })
      .finally(() => setCargando(false))
  }, [])

  // console.log("cargando:", cargando);
  // console.log('Series cargadas:', SERIES)
  // console.log('busqueda actual:', busqueda) 

  const seriesFiltradas = series.filter((serie) =>
    serie.name.toLowerCase().includes(busqueda.toLowerCase())
  )
  console.log('Filtradas:', seriesFiltradas.length, seriesFiltradas)

  if (cargando) {
    return (
      <div className='d-flex flex-column align-items-center py-20'>
        <span className='spinner-border text-primary mb-4' role='status' />
        <span className='text-muted fs-6'>Cargando series...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p className='text-danger'>{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className='mb-8'>
        <h1 className='fw-bold text-gray-900 mb-1'>Cartelera</h1>
        <div className='text-muted fs-6'>Series disponibles en TVmaze</div>
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

export { CarteleraPage }
