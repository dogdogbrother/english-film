import type { FilmProp } from '@/api/film'
import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom"

interface Prop {
  info: FilmProp
}
function FilmItem(prop: Prop) {
  const navigate = useNavigate()
  const { info } = prop
  function toFilmItem() {
    navigate(`/fragment/${info.id}`)
  }
  return <FilmItemLi onClick={toFilmItem}>
    <img src={info.filmCover} />
    <h3>{info.filmName} </h3>
  </FilmItemLi>
}

const FilmItemLi = styled.li`
  cursor: pointer;
  width: 200px;
  margin-right: 20px;
  img {
    width: 100%;
    height: 300px;
  }
`

export default FilmItem 