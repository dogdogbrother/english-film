import { observer } from "mobx-react-lite"
import wordStore from '@/store/word'
import styled from '@emotion/styled'
import {} from 'react'
function WordBook() {
  // unfold
  return <div>
    <p style={{marginBottom: '10px'}}>共收藏了{wordStore.collectList.length}个单词</p>
    <WordList>
      {
        wordStore.collectList.map(word => <li key={word.id}>
          <span className="word">{word.word}</span>
          <span className="translation">{word.youdao.translation}</span>
        </li>)
      }
    </WordList>
  </div>
}

const WordList = styled.ul`
  li {
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 2px 0;
    padding: 2px 0;
    cursor: pointer;
    .word {
      width: 120px;
      font-weight: 500;
    }
    .translation {
      
    }
  }
`
export default observer(WordBook)