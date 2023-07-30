import { useGetFetch, usePostFetch } from './fetch'

export interface TranslateProp {
  translation: string
  speakUrl: string
  ukPhonetic: string
  ukSpeech: string
  usPhonetic: string
  usSpeech: string
  word: string
  isWord: boolean
  explains: string[]
}
export function getWordTranslate(word: string) {
  return useGetFetch<TranslateProp>({
    url: `/word/translate/${word}`
  })
}

interface AddCollectProp {
  word: string
  filmId: string
}
export function addCollect(data: AddCollectProp) {
  return usePostFetch({
    url: `/word/collect`,
    data
  })
}
export function delCollect(word: string) {
  return usePostFetch({
    url: `/word/collect/${word}`,
    method: 'delete',
  })
}
export interface CollectProp {
  filmId: string
  id: string
  word: string
  youdao: any
}
export function getCollectList() {
  return useGetFetch<CollectProp[]>({
    url: `/word/collect`
  })
}