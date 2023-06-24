import { getFilmList } from '@/api/film'
import type { FilmProp } from '@/api/film'
import { useEffect, useState } from 'react'
import FilmItem from './filmItem'

function FilmList() {
  const [filmList, setFilmList] = useState<FilmProp[]>([])
  useEffect(() => {
    getFilmList().then(setFilmList)
  }, [])
  return <ul css={{}}>
    {
      filmList.map(film => <FilmItem key={film.id} info={film} />)
    }
  </ul>
}

export default FilmList 