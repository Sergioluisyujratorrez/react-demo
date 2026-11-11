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
