import {FormEvent, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'

type Props = {
  onBuscar: (texto: string) => void
}

// Formulario de búsqueda: guarda lo que se escribe y avisa al enviar.
const BuscadorSeries = ({onBuscar}: Props) => {
  const [texto, setTexto] = useState('')

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita que la página se recargue
    console.log('Formulario enviado con:', texto)
    onBuscar(texto.trim())
  }

  const limpiar = () => {
    console.log('Limpiar búsqueda')
    setTexto('')
    onBuscar('')
  }

  return (
    <form onSubmit={manejarEnvio} className='d-flex gap-3 mb-6'>
      <input
        type='text'
        className='form-control form-control-solid'
        placeholder='Buscar serie por nombre...'
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      {texto && (
        <button type='button' className='btn btn-light' onClick={limpiar}>
          Limpiar
        </button>
      )}
      <button type='submit' className='btn btn-primary' disabled={texto.trim() === ''}>
        <KTIcon iconName='magnifier' className='fs-2' /> Buscar
      </button>
    </form>
  )
}

export {BuscadorSeries}
