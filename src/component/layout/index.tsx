import Header from './header'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

function Layout() {
  return <div>
    <Header />
    <LayoutMain>
      <Outlet />
    </LayoutMain>
  </div>
}

const LayoutMain = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px;
`

export default Layout