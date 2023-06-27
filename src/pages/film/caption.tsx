import styled from '@emotion/styled'
import { WindowSizeProp } from './index'
import { getCaption } from '@/api/film'
import type { CaptionProp } from '@/api/film'
import { useState, useEffect, useMemo } from 'react'
import { Modal, Spin } from 'antd'
import { getWordTranslate, type TranslateProp } from '@/api/word'
import { delSymbol } from "@/utils/format";
import { StarOutlined } from '@ant-design/icons'
interface Props {
  windowSize: WindowSizeProp
}

export function useCaption(fragmentId: string, currentTime: number, setPlayer: Function) {
  const [ captions, setCaptions ] = useState<CaptionProp[]>([])
  const [ state, setStatee ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ translate, setTranslate ] = useState<TranslateProp>({
    translation: '',
    speakUrl: '',
    ukPhonetic: '',
    ukSpeech: '',
    usPhonetic: '',
    usSpeech: '',
    word: '',
    isWord: false,
    explains: []
  })
  function getEnglish() {
    const findCaption = captions.find(caption => {
      const { start, end } = caption
      return (currentTime * 1000) >= start && (currentTime * 1000) <= end
    })
    if (findCaption) {
      return findCaption.en.split(' ').map((word, index) => <span key={index} onClick={() => clickWord(word)}>{word}</span>)
    }
    return undefined
  }
  function clickWord(word: string) {
    setPlayer()
    setStatee(true)
    setLoading(true)
    getWordTranslate(delSymbol(word))
      .then(setTranslate)
      .finally(() => setLoading(false))
  }
  function getTranslate() {
    const findCaption = captions.find(caption => {
      const { start, end } = caption
      return (currentTime * 1000) >= start && (currentTime * 1000) <= end
    })
    return findCaption?.cn
  }
  function close() {
    setStatee(false)
  }
  function Caption(props: Props) {
    const { windowSize } = props
    return <CaptionBox css={{
      left: `${windowSize.x! + 20}px`, 
      right: `${windowSize.x! + 20}px`, 
      bottom: `${windowSize.y! + 40}px`,
    }}>
      <div className='en'>{getEnglish()}</div>
      <div className='cn'>{getTranslate()}</div>
    </CaptionBox>
  }
  function WordModal() {
    return <Modal  footer={null} style={{ top: 200 }} open={state} onCancel={close} width='600px'>
      <ModalContent>
        {
          loading
          ?
          <Spin css={{display: 'flex', justifyContent: 'center'}} />
          :
          <div>
            <div className='word-header'>
              <h4>{ translate.word }</h4>
              {/* <span>我是收藏start</span> */}
              <StarOutlined style={{fontSize: '23px', color: '#666', cursor: 'pointer'}} />
              {/* StarFilled */}
            </div>
            <div className='phonetic'>
              {
                translate.ukPhonetic && <div>
                  <span>英 | </span>
                  <span>{translate.usPhonetic}</span>
                </div>
              }
              {
                translate.usPhonetic && <div>
                  <span>美 | </span>
                  <span>{translate.usPhonetic}</span>
                </div>
              }
            </div>
            <ul className='translate-list'>
              {translate.explains.map((translate, index) => <li key={index}>
                { translate }
              </li>)}
            </ul>
          </div>
        }
      </ModalContent>
    </Modal>
  }
  useEffect(() => {
    getCaption(fragmentId!).then(setCaptions)
  }, [])
  return { 
    Caption, 
    WordModal: useMemo(() => WordModal, [state, loading])
  }
}

const CaptionBox = styled.div`
  position: absolute;
  z-index: 100;
  color: #fff;
  text-shadow: 2px 2px 5px #000;
  .en {
    font-size: 3vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 1.2;
    margin-bottom: 1vw;
    span {
      margin: 0 0.55vw;
      cursor: pointer;
    }
  }
  .cn {
    text-align: center;
    white-space: pre-wrap;
    font-size: 2.4vw;
  }
`
const ModalContent = styled.div`
  padding: 25px 0 15px 0;
  .word-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    h4 {
      font-size: 22px;
    }
  }
  .phonetic {
    display: flex;
    padding: 5px 0;
    color: #666;
    div:first-of-type{
      margin-right: 20px;
    }
  }
  .translate-list {
    li {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    li:last-child {
      border-bottom: none;
    }
  }
`