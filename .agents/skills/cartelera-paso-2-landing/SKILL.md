---
name: cartelera-paso-2-landing
description: >-
  Paso 2 del proyecto "Cartelera" sobre la plantilla Metronic 8 React (demo1,
  Vite), después del paso 1. Arma la página pública /cartelera con header,
  footer y una tarjeta de serie de ejemplo con datos escritos a mano. Úsala
  cuando pidan "paso 2", "la landing", "armar el header y el footer" o "la
  tarjeta de ejemplo". Hace SOLO este paso: no consume la API ni agrega
  buscador ni detalle, y el botón de favoritos queda solo visual.
---

# Paso 2 — Landing: header, footer y tarjeta de ejemplo

Sobre la estructura que dejó el paso 1, arma lo visual de la cartelera
pública. Al terminar, `/cartelera` se ve así:

```
┌───────────────────────────────────────────────────┐
│ [logo] Cartelera                 [Series] [Ingresar] │ ← header
├───────────────────────────────────────────────────┤
│ Cartelera                                          │
│ Series disponibles en TVmaze                       │
│ ┌──────────┐                                       │
│ │ póster ❤ │ ← el ❤ es solo visual (clase 4)       │
│ │ título   │ ← tarjeta de ejemplo                  │
│ │ géneros  │                                       │
│ │ resumen  │                                       │
│ └──────────┘                                       │
├───────────────────────────────────────────────────┤
│      Datos proporcionados por TVmaze — CC BY-SA    │ ← footer
└───────────────────────────────────────────────────┘
```

Archivos del módulo `series` que toca este paso:

```
src/app/modules/series/
├── core/
│   └── _modelos.ts        ← NUEVO: el tipo Serie (solo el tipo, sin API)
├── components/
│   ├── BotonFavorito.tsx  ← NUEVO: el ❤ de favoritos (solo visual)
│   └── TarjetaSerie.tsx   ← NUEVO: la tarjeta
├── SeriesLayout.tsx       ← NUEVO: header + footer
├── SeriesPage.tsx         ← CAMBIA: las rutas se muestran dentro del layout
└── CarteleraPage.tsx      ← CAMBIA: muestra la tarjeta de ejemplo
```

## Reglas de este paso

1. **Haz solo el paso 2.** No llames a la API ni crees `_peticiones.ts`,
   buscador ni página de detalle: vienen en pasos siguientes, aunque parezca
   fácil adelantarlos. El corazón de favoritos queda **solo visual**: no le
   agregues `onClick`, estado ni props (eso se hace a mano en la clase 4).
2. **Copia el contenido exacto** de los archivos de esta skill. No lo
   reescribas de memoria ni lo "mejores": así a todos los estudiantes les queda
   igual. Por ejemplo, los componentes de `series/` van **sin `FC`** aunque el
   código de Metronic sí lo use: no los cambies.
3. **No toques otros archivos**: ni `src/_metronic/`, ni las rutas generales
   (`src/app/routing/`), ni el `.env`.
4. **No uses git**: no hagas commits, ni ramas, ni lo menciones. De eso se
   encarga el profesor.
5. **Explica en español**, breve, qué hace cada archivo antes de crearlo: el
   estudiante está aprendiendo.
6. Si algo no coincide con lo esperado, **detente y explícalo** en vez de
   improvisar.

## 0. Comprobar antes de empezar

- **El paso 1 está hecho:** existen `src/app/modules/series/SeriesPage.tsx`,
  `src/app/modules/series/CarteleraPage.tsx` y
  `src/app/modules/series/core/README.md`, y **no** existe
  `src/app/modules/widgets/`. Si no, detente y pide hacer primero el paso 1.
- **El paso 2 no está hecho:** no existe `src/app/modules/series/SeriesLayout.tsx`.
  Si ya existe, avisa y pregunta antes de sobrescribir nada.

## 1. Escribir los archivos

Crea o reemplaza cada archivo con **exactamente** este contenido.

### El tipo de datos

Describe cómo es una serie. Solo el tipo: todavía no se pide nada a la API.

#### `src/app/modules/series/core/_modelos.ts`

```ts
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
}
```

### El botón de favoritos

Solo la parte visual: un corazón vacío que todavía no hace nada al hacer clic.

#### `src/app/modules/series/components/BotonFavorito.tsx`

```tsx
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
```

### La tarjeta

Recibe una `serie` por props y la pinta, con el botón de favoritos en la
esquina del póster. No pide datos ni guarda estado.

#### `src/app/modules/series/components/TarjetaSerie.tsx`

```tsx
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
```

### Header y footer

El layout de la parte pública: header arriba, `<Outlet />` en el medio (ahí va
la pantalla de cada ruta) y footer abajo.

#### `src/app/modules/series/SeriesLayout.tsx`

```tsx
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
```

### Rutas y página

Las rutas del módulo ahora se muestran dentro de `SeriesLayout`:

#### `src/app/modules/series/SeriesPage.tsx`

```tsx
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
```

La página muestra una tarjeta con una serie de ejemplo escrita a mano:

#### `src/app/modules/series/CarteleraPage.tsx`

```tsx
import {Serie} from './core/_modelos'
import {TarjetaSerie} from './components/TarjetaSerie'

// Serie de ejemplo escrita a mano (datos reales de TVmaze) para ver la tarjeta.
// En un paso siguiente estos datos llegarán de la API.
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
```

## 2. Verificar

```bash
npm run build
```

El build debe terminar **sin errores**. Luego `npm run dev` y abre
`http://localhost:5173/cartelera`. Debe verse:

- **Header:** logo, "Cartelera" y los botones **Series** e **Ingresar**.
  "Ingresar" lleva al login.
- **Una tarjeta** de "Under the Dome" con su póster, el corazón en la esquina
  (al hacer clic todavía no pasa nada), 3 géneros y el resumen.
- **Footer:** "Datos proporcionados por TVmaze — licencia CC BY-SA".

## 3. Qué explicarle al estudiante

Con el código delante y en palabras simples, explica estas 6 ideas:

- **Layout y `<Outlet />`:** `SeriesLayout` dibuja el header y el footer una
  sola vez. `<Outlet />` es el hueco donde React Router pinta la pantalla de
  cada ruta, así todas las pantallas de la cartelera comparten header y footer.
- **Componente con props:** `TarjetaSerie` no sabe de dónde vienen los datos;
  recibe una `serie` y la pinta. Por eso servirá para cualquier serie.
- **Props tipadas, sin `FC`:** nuestros componentes son funciones normales y
  las props se tipan en el parámetro: `const TarjetaSerie = ({serie}: Props) =>`.
  En el código de Metronic verán `const X: FC<Props> = ...`: `FC` (*Function
  Component*) es un tipo de React y es otra forma de escribir lo mismo.
- **El corazón es solo visual:** `BotonFavorito` todavía no recibe nada ni
  reacciona al clic. En la clase 4 se le da vida con `useState`, `onClick` y
  props.
- **El tipo `Serie`** (`core/_modelos.ts`): describe la forma de los datos. Los
  campos están en inglés porque así llegan de TVmaze. Si a la tarjeta le falta
  un dato, TypeScript avisa antes de ejecutar.
- **Datos de ejemplo:** `SERIE_DE_EJEMPLO` está escrita a mano. En un paso
  siguiente llegará de la API y la tarjeta no tendrá que cambiar.

## 4. Cierre

Resume al estudiante qué se hizo. Dile que en los siguientes pasos se conecta
la API de TVmaze para mostrar las series reales. **No avances al siguiente
paso por tu cuenta.**
