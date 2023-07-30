import { useGetFetch } from './fetch'

export interface FilmProp {
  id: string
  filmName: string
  filmCover: string
}
export function getFilmList() {
  return useGetFetch<FilmProp[]>({
    url: '/film/list',
  })
}

export interface FragmentProp {
  fragmentUrl: string
  filmId: string
  id: string
}
export function getFragmentList(filmId: string) {
  return useGetFetch<FragmentProp[]>({
    url: `/film/${filmId}/fragment`,
  })
} 

export function getFragmentInfo(fragmentId: string) {
  return useGetFetch<FragmentProp>({
    url: `/film/fragment/${fragmentId}`
  })
}

export interface CaptionProp {
  start: number
  end: number
  cn: string
  en: string
}
export function getCaption(fragmentId: string) {
  return useGetFetch<CaptionProp[]>({
    url: `/film/${fragmentId}/caption`
  })
}