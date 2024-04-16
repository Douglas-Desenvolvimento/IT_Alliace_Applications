import React from 'react'
import NiceCards from '../../components/NiceCards'
import NiceDash from '../../components/NiceDash'
import DashboardNice from '../../components/dashboardNice'
import { CContainer } from '@coreui/react'
import NewWidget from '../../components/newWidget'
import Acqu from '../../acquisitions'
import useApiData from '../../components/useApiData.jsx'
import GraficoNovo from '../../components/graficoNovo.jsx'
import NewTable from '../../components/newTable.jsx'

const Manutencao = () => {
  return (
    <div className=" m-0 bg-white text-black">
      <h1>Tela para manutenção de codigos</h1>

{/* <Acqu /> */}
      <div>
        {/* <NovoAp /> */}
        {/* <GraficoNovo /> */}
        <NewWidget />
        <NewTable />
{/* <h2>New Widget</h2>
    <CContainer fluid>
        <NewWidget />
    </CContainer>
  </div>

<div>
<h2>NiceCard</h2>
    <CContainer fluid>
        <NiceCards />
    </CContainer>
  </div>
    <div> 
        <h2>Nicedash</h2>
    <CContainer fluid>
        <NiceDash />
    </CContainer>
    </div>
    <div>
        <h2>DashboardNice</h2>
    <CContainer fluid>
        <DashboardNice />
    </CContainer> */}

    </div>
    

    </div>
  )
}

export default Manutencao
