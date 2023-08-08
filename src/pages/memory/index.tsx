import { observer } from "mobx-react-lite"
import wordStore from '@/store/word'
import { useState, useMemo } from 'react'
import styled from '@emotion/styled'
import { Empty, Button } from 'antd'
import Phonetic from '@/component/phonetic'
import { DeleteOutlined } from "@ant-design/icons"
import { delCollect } from '@/api/word'

function Memory() {
  const [wordIndex, setWordIndex] = useState(0)
  const wordList = useMemo(() => {
    return [...wordStore.collectList].sort(() => 0.5 - Math.random()) 
  }, [wordStore.collectList.length])
  const [ delWord, setDelWord ] = useState<string[]>([])
  const [ showTranslate, setShowTranslate ] = useState(false)
  const currentWord = useMemo(() => {
    return wordList[wordIndex]
  }, [wordIndex, wordList])
  async function _delCollect() {
    setDelWord(delWord => [...delWord, currentWord.word])
    delCollect(currentWord.word)
    nextWord()
  }
  function nextWord(_index?: number) {
    const nextIndex = _index ?? (wordIndex + 1)
    // 这是删除了所有单词
    if (delWord.length === wordList.length) return
    let targetIndex = 0
    if (nextIndex < wordList.length) {
      targetIndex = nextIndex
    }
    // 如果下一个单词是之前删除过得那么就递归吧
    if (delWord.find(item => wordList[targetIndex].word === item)) {
      nextWord(nextIndex)
    } else {
      setShowTranslate(false)
      setWordIndex(targetIndex)
    }
  }
  return <WordBookWrap>
    {
      wordStore.collectList.length === 0 || wordStore.collectList.length === delWord.length
      ?
      <Empty description="没有收藏的单词了" />
      :
      <WordCark>
        <h3 className="word">{currentWord.word}</h3>
        <Phonetic translate={currentWord.youdao} />
        <div className="translate-content">
          {
            showTranslate && <ul className='translate-list'>
              {
                currentWord.youdao.explains.map((translate: any, index: number) => <li key={index}>
                  { translate }
                </li>)
              }
            </ul>
          }
        </div>
        <div className="button-box">
          <DelButton onClick={() => _delCollect()}>
            <DeleteOutlined />
            <span>已掌握,取消收藏</span>
          </DelButton>
          <Button 
            style={{marginBlock: '10px'}} 
            type='primary' 
            block 
            onClick={() => nextWord()}
          >认识</Button>
          <Button type='primary' danger block onClick={() => setShowTranslate(true)}>提示一下</Button>
        </div>
        {/* {wordList[wordIndex.current]} */}
      </WordCark>
    }
  </WordBookWrap>
}

const WordBookWrap = styled.div`
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: calc(100vh - 61px);
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
    font-size: 28px;
  }
  .translate-content {
    padding: 10px 10px;
    flex: 1;
    li {
      margin: 10px 0;
      font-size: 13px;
      color: #666;
    }
  }
  .button-box {
    width: 100%;
    padding-top: 30px;
    position: relative;
  }
`
const DelButton = styled.div`
  position: absolute;
  height: 30px;
  right: 0;
  top: 0;
  padding: 0 15px;
  border-radius: 10px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: #333;
  }
  > * {
    margin: 0 2px;
  }
`
export default observer(Memory)