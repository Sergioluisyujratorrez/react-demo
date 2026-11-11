import {Serie} from './core/_modelos'
import {TarjetaSerie} from './components/TarjetaSerie'

// Serie de ejemplo escrita a mano (datos reales de TVmaze) para ver la tarjeta.
// En un paso siguiente estos datos llegarán de la API.
const SERIE_DE_EJEMPLO: Serie = {
  id: 1,
  name: 'hola a todos',
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

// Pantalla principal de la cartelera: por ahora, una sola tarjeta de ejemplo.
const CarteleraPage = () => (
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
  </>
)

export {CarteleraPage}
