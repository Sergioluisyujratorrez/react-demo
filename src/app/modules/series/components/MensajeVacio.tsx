type Props = {
  busqueda: string
}

// Se muestra cuando la búsqueda no encuentra ninguna serie.
const MensajeVacio = ({busqueda}: Props) => (
  <div className='card card-body text-center py-15'>
    <div className='fs-3 fw-bold text-gray-800 mb-2'>No se encontraron series</div>
    <div className='text-muted fs-6'>
      No hay resultados para "{busqueda}". Prueba con otro nombre.
    </div>
  </div>
)

export {MensajeVacio}
