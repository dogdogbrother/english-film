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
    url: `/api/word/translate/${word}`
  })
}

interface AddCollectProp {
  word: string
  filmId: string
  // keyWord: string
}
export function addCollect(data: AddCollectProp) {
  return usePostFetch({
    url: `/api/word/collect`,
    data
  })
}

export interface CollectProp {
  filmId: string
  id: string
  word: string
}
export function getCollectList() {
  return useGetFetch<CollectProp[]>({
    url: `/api/word/collect`
  })
}