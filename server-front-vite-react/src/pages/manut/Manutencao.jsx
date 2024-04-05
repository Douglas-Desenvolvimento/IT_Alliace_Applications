import React from 'react'
import NiceCards from '../../components/NiceCards'
import NiceDash from '../../components/NiceDash'
import DashboardNice from '../../components/dashboardNice'
import { CContainer } from '@coreui/react'
import ApexCharts from 'apexcharts';

const Manutencao = () => {
  return (
    <div>
      <h1>Tela para manutenção de codigos</h1>
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
    </CContainer>

    </div>
    

    </div>
  )
}

export default Manutencao
