import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Film from "@/pages/film"
import Layout from '@/component/layout'
import FilmList from './pages/film-list'
import WordBook from './pages/word-book'
import Fragment from './pages/fragment'
import LoginModal from '@/component/loginModal'
import userStore from '@/store/user'

function App() {
  userStore.getInfo()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<Navigate to="/film-list" />} />
            <Route path="/film-list" element={<FilmList />} />
            <Route path="/word-book" element={<WordBook />} />
            <Route path="/fragment/:filmId" element={<Fragment />} />
          </Route>
          <Route path="/film/:fragmentId" element={<Film />}></Route>
        </Routes>
      </BrowserRouter>
      <LoginModal />
    </>
  )
}

export default App
