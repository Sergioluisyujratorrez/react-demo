import {KTIcon} from '../../../../_metronic/helpers'

// Botón de favoritos (por ahora solo visual).
// Todavía no hace nada al hacer clic: en la clase 4 se le agrega el estado.
const BotonFavorito = () => (
  <button
    type='button'
    className='btn btn-icon btn-sm btn-light'
    aria-label='Agregar a favoritos'
    title='Agregar a favoritos'
  >
    <KTIcon iconName='heart' iconType='outline' className='fs-2 text-gray-500' />
  </button>
)

export {BotonFavorito}
