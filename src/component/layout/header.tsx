import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'
function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  function to(path: string) {
    if (path === pathname) return
    navigate(path)
  }
  return <header css={{borderBottom: '1px #ddd solid'}}>
    <PcContainer>
      <nav>
        <span onClick={() => to('/film-list')}>电影仓库</span>
        <span onClick={() => to('/word-book')}>单词本</span>
      </nav>
      <div className='login'>
        登录
      </div>
    </PcContainer>
  </header>
}

export default Header

const PcContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav span {
    margin-right: 20px;
    cursor: pointer;
  }
  .login {
    cursor: pointer;
  }
`

