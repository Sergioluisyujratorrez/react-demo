import {Navigate, Route, Routes} from 'react-router-dom'
import {SeriesLayout} from './SeriesLayout'
import {CarteleraPage} from './CarteleraPage'

// Rutas públicas de la cartelera (no requieren login).
// Todas las pantallas se muestran dentro de SeriesLayout (header y footer).
const SeriesPage = () => (
  <Routes>
    <Route element={<SeriesLayout />}>
      <Route index element={<CarteleraPage />} />
      <Route path='*' element={<Navigate to='/cartelera' />} />
    </Route>
  </Routes>
)

export {SeriesPage}
