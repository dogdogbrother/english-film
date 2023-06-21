import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Film from "@/pages/film"
import Layout from '@/component/layout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/film" element={<Film />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
