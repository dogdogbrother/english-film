import { observer } from "mobx-react-lite"
import wordStore from '@/store/word'
import { useState, useRef, useMemo } from 'react'
import styled from '@emotion/styled'
import { Empty } from 'antd'
import Phonetic from '@/component/phonetic'

function Memory() {
  const wordIndex = useRef(0)
  const wordList = useMemo(() => {
    return [...wordStore.collectList].sort(() => 0.5 - Math.random()) 
  }, [wordStore.collectList.length])
  const currentWord = useMemo(() => {
    console.log(wordList[wordIndex.current]);
    
    return wordList[wordIndex.current]
  }, [wordIndex, wordList])
  return <WordBookWrap>
    {
      wordStore.collectList.length === 0
      ?
      <Empty description="还没有收藏单词" />
      :
      <WordCark>
        <h3 className="word">{currentWord.word}</h3>
        <Phonetic translate={currentWord.youdao} />
        {/* {wordList[wordIndex.current]} */}
      </WordCark>
    }
  </WordBookWrap>
}

const WordBookWrap = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`
const WordCark = styled.div`
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #eee;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .word {
    font-size: 24px;
  }
`
export default observer(Memory)