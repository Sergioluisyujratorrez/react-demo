import clsx from 'clsx'
import {Link, NavLink, Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

// Resalta el enlace del menú que corresponde a la página actual.
const claseEnlace = ({isActive}: {isActive: boolean}) =>
  clsx('btn btn-sm', isActive ? 'btn-light-primary' : 'btn-active-light-primary')

// Layout público de la cartelera (fuera del panel de Metronic):
// header arriba, la pantalla de cada ruta en el medio (<Outlet />) y footer abajo.
const SeriesLayout = () => (
  <div className='d-flex flex-column min-vh-100 bg-body'>
    {/* Header */}
    <header className='border-bottom bg-body'>
      <div className='container d-flex align-items-center justify-content-between gap-4 py-4'>
        <Link to='/cartelera' className='d-flex align-items-center gap-3'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('media/logos/default-small.svg')}
            className='h-30px theme-light-show'
          />
          <img
            alt='Logo'
            src={toAbsoluteUrl('media/logos/default-small-dark.svg')}
            className='h-30px theme-dark-show'
          />
          <span className='fs-3 fw-bold text-gray-900'>Cartelera</span>
        </Link>

        <nav className='d-flex align-items-center gap-2'>
          <NavLink to='/cartelera' end className={claseEnlace}>
            Series
          </NavLink>
          <Link to='/auth/login' className='btn btn-sm btn-primary'>
            Ingresar
          </Link>
        </nav>
      </div>
    </header>

    {/* Contenido: aquí se pinta la pantalla de cada ruta */}
    <main className='flex-grow-1 py-10'>
      <div className='container'>
        <Outlet />
      </div>
    </main>

    {/* Footer */}
    <footer className='border-top py-6'>
      <div className='container text-center text-muted fs-7'>
        Datos proporcionados por{' '}
        <a href='https://www.tvmaze.com/' target='_blank' rel='noreferrer' className='text-primary'>
          TVmaze
        </a>{' '}
        — licencia CC BY-SA.
      </div>
    </footer>
  </div>
)

export {SeriesLayout}
