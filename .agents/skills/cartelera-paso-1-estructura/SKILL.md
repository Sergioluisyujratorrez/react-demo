---
name: cartelera-paso-1-estructura
description: >-
  Paso 1 del proyecto "Cartelera" sobre la plantilla Metronic 8 React (demo1,
  Vite). Limpia la plantilla (quita módulos, contenido, imágenes y código de
  demostración) y deja organizada la estructura base: módulo `series` vacío,
  ruta pública /cartelera, menú, .env y login local de desarrollo. Úsala cuando
  pidan "paso 1", "limpiar la plantilla", "organizar la estructura" o "preparar
  el proyecto de la cartelera". Hace SOLO este paso: no arma header, footer ni
  tarjetas (eso es el paso 2) ni consume la API.
---

# Paso 1 — Limpiar la plantilla y organizar la estructura

Deja la plantilla Metronic **limpia** y con la **estructura base** del proyecto
Cartelera. Al terminar, el proyecto compila y queda así:

```
src/
├── _metronic/                ← el tema (estilos, íconos, layout). NO se borra.
└── app/
    ├── modules/
    │   ├── auth/             ← login (con un usuario local para desarrollo)
    │   ├── errors/           ← páginas 404 y 500
    │   └── series/           ← NUESTRO módulo: por ahora solo la estructura
    │       ├── core/         ← (vacía) lógica: tipos, peticiones, estado
    │       ├── components/   ← (vacía) piezas visuales
    │       ├── CarteleraPage.tsx
    │       ├── SeriesPage.tsx   ← rutas del módulo
    │       └── index.ts
    ├── pages/dashboard/      ← panel en blanco
    └── routing/              ← /cartelera es pública
```

## Reglas de este paso

1. **Haz solo el paso 1.** No crees header, footer, tarjetas, buscador,
   `_modelos.ts` ni `_peticiones.ts`, ni llames a la API, aunque parezca fácil
   adelantarlo: eso viene en los pasos siguientes.
2. **Copia el contenido exacto** de los archivos de esta skill. No lo
   reescribas de memoria ni lo "mejores": así a todos los estudiantes les queda
   igual. Por ejemplo, los componentes de `series/` van **sin `FC`** aunque el
   código de Metronic sí lo use: no los cambies.
3. **No toques** los estilos ni los scripts del tema (`src/_metronic/assets/`)
   ni las dependencias de `package.json`.
4. **No uses git**: no hagas commits, ni ramas, ni lo menciones. De eso se
   encarga el profesor.
5. **Explica en español**, breve, qué hace cada bloque antes de ejecutarlo: el
   estudiante está aprendiendo.
6. Si algo no coincide con lo esperado (un archivo no existe, un texto a
   editar no aparece, el build falla), **detente y explícalo** en vez de
   improvisar.

## 0. Comprobar antes de empezar

- Es la plantilla correcta: existen `src/_metronic/`, `src/app/modules/auth/`,
  `src/app/modules/widgets/`, `vite.config.ts` y un `package.json` que usa
  `vite`. Si no, detente.
- Debe existir `node_modules/`; si no, corre `npm install`.
- Pide cerrar `npm run dev` si está abierto (en Windows bloquea archivos).

## 1. Borrar las demostraciones y el código que ya no se usa

Metronic trae módulos y componentes de ejemplo (chat, usuarios, widgets,
modales de venta…). Se borran de una vez:

```bash
# Módulos y páginas de demostración
rm -rf src/app/modules/apps src/app/modules/wizards src/app/modules/widgets \
       src/app/modules/accounts src/app/modules/profile src/app/pages/layout-builder
rm -f  src/app/pages/MenuTestPage.tsx

# Páginas de muestra de los íconos
rm -rf src/_metronic/assets/keenicons/*/demo-files

# Componentes de demostración del tema que ya nadie usa
rm -rf src/_metronic/partials/widgets \
       src/_metronic/partials/modals \
       src/_metronic/partials/chat \
       src/_metronic/partials/content/activity \
       src/_metronic/partials/content/cards \
       src/_metronic/partials/content/code-highlight \
       src/_metronic/partials/content/dropdown \
       src/_metronic/partials/content/editor \
       src/_metronic/partials/layout/activity-drawer \
       src/_metronic/partials/layout/create-app \
       src/_metronic/partials/layout/drawer-messenger \
       src/_metronic/partials/layout/help-drawer \
       src/_metronic/partials/layout/purchase \
       src/_metronic/partials/layout/quick-links \
       src/_metronic/partials/layout/search
rm -f  src/_metronic/assets/ts/index.ts \
       src/_metronic/assets/ts/components/SearchComponent.ts \
       src/_metronic/assets/ts/components/_FeedbackComponent.ts \
       src/_metronic/assets/ts/components/_ImageInputComponent.ts \
       src/_metronic/assets/ts/components/_StepperComponent.ts \
       src/_metronic/helpers/components/KTSVG.tsx \
       src/_metronic/helpers/crud-helper/consts.ts \
       src/_metronic/helpers/dataExamples.ts \
       src/_metronic/layout/components/header/header-menus/MegaMenu.tsx \
       src/_metronic/layout/components/sidebar/SidebarFooter.tsx \
       src/_metronic/partials/layout/InboxCompose.tsx \
       src/_metronic/partials/layout/RightToolbar.tsx \
       src/_metronic/partials/layout/SearchModal.tsx \
       src/_metronic/partials/layout/header-menus/HeaderNotificationsMenu.tsx
```

**No borres** estos, aunque parezca que nadie los usa: `KTCard.tsx`,
`KTCardBody.tsx`, `crud-helper/helpers.tsx` y `crud-helper/models.ts` (ahí vive
`useDebounce`, que se usa en un paso posterior), `MenuInnerWithSub.tsx`,
`SidebarMenuItemWithSub.tsx` y `content/portal/Portal.tsx`.

## 2. Escribir los archivos del proyecto

Crea o reemplaza cada archivo con **exactamente** este contenido.

### Rutas y panel

#### `src/app/routing/AppRoutes.tsx`

```tsx
/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {SeriesPage} from '../modules/series'
import {App} from '../App'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {/* Sitio público: la cartelera se ve sin iniciar sesión */}
          <Route path='cartelera/*' element={<SeriesPage />} />
          {currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/cartelera' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
```

#### `src/app/routing/PrivateRoutes.tsx`

```tsx
import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

// Envuelve un módulo cargado con lazy() y muestra la barra de progreso
// mientras se descarga. Úsalo al agregar módulos nuevos a las rutas.
const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes, SuspensedView}
```

#### `src/app/pages/dashboard/DashboardWrapper.tsx`

```tsx
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {ToolbarWrapper} from '../../../_metronic/layout/components/toolbar'
import {Content} from '../../../_metronic/layout/components/content'

// Dashboard en blanco: aquí irán los indicadores y accesos de tu proyecto.
const DashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className='card'>
        <div className='card-body py-15 text-center'>
          <h2 className='fw-bold text-gray-900 mb-3'>Panel listo</h2>
          <p className='text-muted fs-5 mb-0'>Aquí irán los módulos de tu proyecto.</p>
        </div>
      </div>
    </Content>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
```

Login local para desarrollo (`admin@demo.com` / `demo`), sin backend:

#### `src/app/modules/auth/core/_requests.ts`

```ts
import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// ───────────────────────────────────────────────────────────────────────────
// LOGIN LOCAL (MOCK) — solo para desarrollar la plantilla.
// Entra con  admin@demo.com / demo  SIN backend ni internet.
// Para conectar tu API real: borra el bloque mock de abajo y descomenta la
// versión con `axios` que quedó anotada dentro de cada función.
// ───────────────────────────────────────────────────────────────────────────
const DEMO_EMAIL = "admin@demo.com";
const DEMO_PASSWORD = "demo";

const DEMO_USER: UserModel = {
  id: 1,
  username: "admin",
  password: undefined,
  email: DEMO_EMAIL,
  first_name: "Admin",
  last_name: "Demo",
  fullname: "Admin Demo",
  roles: [1],
  pic: "media/avatars/blank.png",
  language: "es",
};

// Server should return AuthModel
export async function login(email: string, password: string): Promise<{ data: AuthModel }> {
  // --- MOCK local ---
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return { data: { api_token: "demo-local-token" } };
  }
  throw new Error("The login details are incorrect");

  // --- API real (descomentar y borrar el mock de arriba) ---
  // return axios.post<AuthModel>(LOGIN_URL, { email, password });
}

export async function getUserByToken(_token: string): Promise<{ data: UserModel }> {
  // --- MOCK local ---
  return { data: DEMO_USER };

  // --- API real (descomentar y borrar el mock de arriba) ---
  // return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, { api_token: _token });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}
```

### Tema: layout, menús, header y footer

Sin chat, actividad ni modales de demostración:

#### `src/_metronic/layout/MasterLayout.tsx`

```tsx
import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
import {ScrollTop} from './components/scroll-top'
import {FooterWrapper} from './components/footer'
import {Sidebar} from './components/sidebar'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    reInitMenu()
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <Sidebar />
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div className='d-flex flex-column flex-column-fluid'>
                <Outlet />
              </div>
              <FooterWrapper />
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
```

Solo modo claro/oscuro y menú de usuario:

#### `src/_metronic/layout/components/header/Navbar.tsx`

```tsx
import clsx from 'clsx'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'

const itemClass = 'ms-1 ms-md-4'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
  const {config} = useLayout()
  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={toAbsoluteUrl('media/avatars/blank.png')} alt='' />
        </div>
        <HeaderUserMenu />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTIcon iconName='text-align-left' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export {Navbar}
```

#### `src/_metronic/partials/layout/header-menus/HeaderUserMenu.tsx`

```tsx
import {FC} from 'react'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Avatar' src={toAbsoluteUrl('media/avatars/blank.png')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder fs-5'>
              {currentUser?.first_name} {currentUser?.last_name}
            </div>
            <span className='fw-bold text-muted fs-7'>{currentUser?.email}</span>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
```

Menú con Dashboard y Cartelera (header y sidebar):

#### `src/_metronic/layout/components/header/header-menus/MenuInner.tsx`

```tsx
import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Cartelera' to='/cartelera' />
    </>
  )
}
```

#### `src/_metronic/layout/components/sidebar/sidebar-menu/SidebarMenuMain.tsx`

```tsx
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Sitio público</span>
        </div>
      </div>
      <SidebarMenuItem to='/cartelera' icon='screen' title='Cartelera' fontIcon='bi-film' />
    </>
  )
}

export {SidebarMenuMain}
```

Sin los botones de demostración "Filter" y "Create":

#### `src/_metronic/layout/components/toolbar/toolbars/ToolbarClassic.tsx`

```tsx
// Acciones de la barra de herramientas (a la derecha del título de la página).
// Vacío a propósito: aquí van los botones de cada pantalla cuando los necesites.
const ToolbarClassic = () => <div className='d-flex align-items-center gap-2 gap-lg-3' />

export {ToolbarClassic}
```

Sin los enlaces de KeenThemes:

#### `src/_metronic/layout/components/footer/Footer.tsx`

```tsx
import {useEffect} from 'react'
import {ILayout, useLayout} from '../../core'

const Footer = () => {
  const {config} = useLayout()
  useEffect(() => {
    updateDOM(config)
  }, [config])
  return (
    <>
      <div className='text-gray-900 order-2 order-md-1'>
        <span className='text-muted fw-semibold me-1'>
          {new Date().getFullYear().toString()}&copy;
        </span>
        {/* Reemplaza por el nombre de tu proyecto u organización */}
        <span className='text-gray-800'>Mi proyecto</span>
      </div>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export {Footer}
```

### Índices del tema

Quitan las referencias a lo que se borró en el paso 1:

#### `src/_metronic/partials/index.ts`

```ts
export * from './layout/header-menus/HeaderUserMenu'
export * from './layout/theme-mode/ThemeModeProvider'
export * from './layout/theme-mode/ThemeModeSwitcher'
export * from './content/portal/Portal'
```

#### `src/_metronic/helpers/index.ts`

```ts
export * from './AssetHelpers'
export * from './RouterHelpers'
export * from './components/KTIcon'
export * from './components/KTCard'
export * from './components/KTCardBody'
export * from './crud-helper/helpers'
export * from './crud-helper/models'
export * from './react18MigrationHelpers'
```

#### `src/_metronic/assets/ts/components/index.ts`

```ts
export * from './_CookieComponent'
export * from './_DrawerComponent'
export * from './_ScrollComponent'
export * from './_ScrollTopComponent'
export * from './_StickyComponent'
export * from './_ToggleComponent'
// export * from './_DialerComponent';
export * from './_PasswordMeterComponent'
export * from './_SwapperComponent'
export * from './MenuComponent'
```

### Módulo `series` (solo la estructura)

Nuestros componentes se escriben como funciones normales, **sin `FC`**. En el
código de Metronic sí lo van a ver: es otra forma de escribir lo mismo.

#### `src/app/modules/series/SeriesPage.tsx`

```tsx
import {Navigate, Route, Routes} from 'react-router-dom'
import {CarteleraPage} from './CarteleraPage'

// Rutas públicas de la cartelera (no requieren login).
// En los siguientes pasos se agregan el layout (header y footer),
// el detalle de cada serie y los favoritos.
const SeriesPage = () => (
  <Routes>
    <Route index element={<CarteleraPage />} />
    <Route path='*' element={<Navigate to='/cartelera' />} />
  </Routes>
)

export {SeriesPage}
```

#### `src/app/modules/series/CarteleraPage.tsx`

```tsx
// Pantalla principal de la cartelera.
// Por ahora solo muestra un título: en el paso 2 se arman el header,
// el footer y la primera tarjeta de serie.
const CarteleraPage = () => (
  <div className='container py-10'>
    <h1 className='fw-bold text-gray-900 mb-1'>Cartelera</h1>
    <div className='text-muted fs-6'>Aquí se mostrarán las series.</div>
  </div>
)

export {CarteleraPage}
```

#### `src/app/modules/series/index.ts`

```ts
export * from './SeriesPage'
```

#### `src/app/modules/series/core/README.md`

```md
# core/
La lógica del módulo, sin nada visual (igual que `auth/core/` en Metronic):
- `_modelos.ts` → los tipos de los datos (Serie, Episodio…)
- `_peticiones.ts` → las llamadas a la API de TVmaze
- el estado compartido (context) y los helpers del módulo

Se completa en los siguientes pasos.
```

#### `src/app/modules/series/components/README.md`

```md
# components/
Piezas visuales reutilizables del módulo: reciben props y pintan.
Ejemplo: `TarjetaSerie.tsx`, `BuscadorSeries.tsx`.

Se completa en los siguientes pasos.
```

### Configuración

#### `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />

// Variables de entorno propias, tipadas (autocompletado + aviso si falta alguna).
interface ImportMetaEnv {
  readonly VITE_APP_TVMAZE_API_URL: string
}
```

#### `.env`

```ini
# Clave con la que Metronic guarda la configuración del layout en localStorage.
VITE_APP_BASE_LAYOUT_CONFIG_KEY='metronic-react-demo1-8150'

# API de tu backend (login, registro y recuperar contraseña).
# Ahora apunta a la API demo de KeenThemes: reemplázala por la tuya.
VITE_APP_API_URL=https://preview.keenthemes.com/metronic8/laravel/api

# API pública de TVmaze (módulo shows / cartelera).
VITE_APP_TVMAZE_API_URL=https://api.tvmaze.com
```

## 3. Ediciones puntuales

Estos archivos son largos y solo cambia una parte; edítalos, no los
reemplaces:

1. `src/_metronic/layout/components/sidebar/Sidebar.tsx`: borra la línea
   `import {SidebarFooter} from './SidebarFooter'` y la línea `<SidebarFooter />`.
2. `src/app/modules/auth/AuthLayout.tsx`: si aparece el texto
   `Fast, Efficient and ProductiveSS`, cámbialo por
   `Fast, Efficient and Productive`. Si no aparece, no hagas nada.
3. `vite.config.ts`: cambia `base: "/metronic8/react/demo1/"` por `base: "/"`.
4. `package.json`: quita la línea `"start": "react-scripts start"` y la coma
   que queda sobrante en la línea anterior. No toques las dependencias.
5. Lockfiles: deja solo el del gestor que usa el estudiante. Con npm (existe
   `package-lock.json`) borra `yarn.lock`.

## 4. Borrar las imágenes sin uso

`public/media` trae ~100 MB de imágenes de demostración. Se conservan solo
estas 31 (login, errores, logos, banderas de idiomas, avatares e imágenes por
defecto que se usan en los pasos siguientes):

```bash
node - <<'FIN'
const fs = require('fs')
const path = require('path')

const CONSERVAR = new Set([
  'media/auth/404-error-dark.png',
  'media/auth/404-error.png',
  'media/auth/500-error-dark.png',
  'media/auth/500-error.png',
  'media/auth/bg7-dark.jpg',
  'media/auth/bg7.jpg',
  'media/avatars/300-1.jpg',
  'media/avatars/300-2.jpg',
  'media/avatars/300-20.jpg',
  'media/avatars/300-5.jpg',
  'media/avatars/blank.png',
  'media/flags/china.svg',
  'media/flags/france.svg',
  'media/flags/germany.svg',
  'media/flags/japan.svg',
  'media/flags/spain.svg',
  'media/flags/united-states.svg',
  'media/logos/custom-1.png',
  'media/logos/default-dark.svg',
  'media/logos/default-small-dark.svg',
  'media/logos/default-small.svg',
  'media/logos/default.svg',
  'media/logos/favicon.ico',
  'media/logos/keenthemes-dark.svg',
  'media/logos/keenthemes.svg',
  'media/misc/auth-bg.png',
  'media/misc/auth-screens.png',
  'media/svg/brand-logos/apple-black-dark.svg',
  'media/svg/brand-logos/apple-black.svg',
  'media/svg/brand-logos/google-icon.svg',
  'media/svg/files/blank-image.svg',
])

let borradas = 0
const recorrer = (dir) => {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      recorrer(p)
      if (fs.readdirSync(p).length === 0) fs.rmdirSync(p)
    } else if (!CONSERVAR.has(path.relative('public', p).split(path.sep).join('/'))) {
      fs.rmSync(p)
      borradas++
    }
  }
}
recorrer(path.join('public', 'media'))
console.log('Imágenes borradas:', borradas)
FIN
```

## 5. Verificar

```bash
npm run build
find src \( -name '*.ts' -o -name '*.tsx' \) ! -name '*.d.ts' | wc -l
find public/media -type f | wc -l
```

- El build debe terminar **sin errores**.
- Deben quedar **106** archivos `.ts/.tsx` en `src` y **31** imágenes en
  `public/media`. Si los números no coinciden, revisa qué faltó.

Luego `npm run dev` y comprueba en el navegador:
- `http://localhost:5173/cartelera` → página "Cartelera" (todavía sin header ni
  footer: eso es el paso 2).
- `http://localhost:5173/auth/login` → login con `admin@demo.com` / `demo`.
- `http://localhost:5173/dashboard` → panel en blanco con el menú
  **Dashboard** y **Cartelera**.

## 6. Cierre

Resume al estudiante qué se hizo y cómo quedó la estructura. Dile que el
siguiente es el **paso 2** (header, footer y una tarjeta de ejemplo). **No
avances al paso 2 por tu cuenta.**
