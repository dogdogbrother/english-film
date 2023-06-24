import { useGetFetch } from './fetch'

export interface FilmProp {
  id: string
  filmName: string
  filmCover: string
}
export function getFilmList() {
  return useGetFetch<FilmProp[]>({
    url: '/api/film/list',
  })
}

export interface FragmentProp {
  fragmentUrl: string
  filmId: string
  id: string
}
export function getFragmentList(filmId: string) {
  return useGetFetch<FragmentProp[]>({
    url: `/api/film/${filmId}/fragment`,
  })
} 