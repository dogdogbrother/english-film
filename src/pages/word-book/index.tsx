import { observer } from "mobx-react-lite"
import wordStore from '@/store/word'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Button, message } from "antd"
import { delCollect } from '@/api/word'

function WordBook() {
  const [ unfoldIndex, setUnfoldIndex ] = useState(-1)
  function unfoldWord(index: number) {
    setUnfoldIndex(index)
  }
  function delWord(word: string) {
    delCollect(word).then(() => {
      message.success('已取消收藏')
    })
  }
  return <div>
    <p style={{marginBottom: '10px'}}>共收藏了{wordStore.collectList.length}个单词</p>
    <WordList>
      {
        wordStore.collectList.map((word, index) => <li 
          key={word.id} 
          className={unfoldIndex === index ? 'active' : ''}
          onClick={() => unfoldWord(index)}
        >
          <p className="word-translation">
            <span className="word">{word.word}</span>
            {
              unfoldIndex === index && <span className="translation">{word.youdao.translation}</span>
            }
          </p>
          {
            unfoldIndex === index && <div className="youdao">
              <Phonetic>
                {
                  word.youdao.ukPhonetic && <div onClick={() => playPhonetic(word.youdao.ukSpeech)}>
                    <span>英 | </span>
                    <span>{word.youdao.usPhonetic}</span>
                  </div>
                }
                {
                  word.youdao.usPhonetic && <div onClick={() => playPhonetic(word.youdao.usSpeech)}>
                    <span>美 | </span>
                    <span>{word.youdao.usPhonetic}</span>
                  </div>
                }
              </Phonetic>
              <ul className='translate-list'>
                {word.youdao.explains.map((translate: any, index: number) => <li key={index}>
                  { translate }
                </li>)}
              </ul>
              <Button 
                type="link" 
                danger 
                style={{paddingLeft: '0px'}}
                onClick={() => delWord(word.word)}
              >取消收藏</Button>
            </div>
          }
        </li>)
      }
    </WordList>
  </div>
}

const WordList = styled.ul`
  > li:not(.active) {
    cursor: pointer;
    &:hover {
      background-color: rgba(70,70,70, 0.2);
    }
  }
  > li.active {
    border: #ccc solid 1px;
  }
  li {
    margin: 2px 0;
    padding: 4px 15px;
    border-radius: 5px;
  }
  .word-translation {
    font-size: 18px;
    display: flex;
    align-items: center;
    .word {
      width: 120px;
      font-weight: 500;
    }
  }
  .youdao {
    padding: 10px 0;
  }
  .translation {
    font-weight: 600;
  }
  .translate-list {
    li {
      padding: 10px 0;
    }
    li:last-child {
      border-bottom: none;
    }
  }
`

const Phonetic = styled.div`
  display: flex;
  padding: 5px 0;
  color: #666;
  div:first-of-type{
    margin-right: 20px;
  }
`
// 发音
function playPhonetic(speech: string) {
  const audio = new Audio(speech)
  audio.play()
}

export default observer(WordBook)