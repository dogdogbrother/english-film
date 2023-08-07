import type { TranslateProp } from '@/api/word'
import styled from '@emotion/styled'

interface Props {
  translate: TranslateProp
}
function Phonetic(props: Props) {
  const { translate } = props
  return <PhoneticBox>
    <div onClick={() => playPhonetic(translate.ukSpeech)}>
      <span>英 | </span>
      <span>{translate.ukPhonetic}</span>
      <div className='phonetic-icon'>1</div>
    </div>
    <div onClick={() => playPhonetic(translate.usSpeech)}>
      <span>美 | </span>
      <span>{translate.usPhonetic}</span>
      <div className='phonetic-icon'>1</div>
    </div>
  </PhoneticBox>
}
const PhoneticBox = styled.div`
  display: flex;
  font-size: 14px;
  color: #666;
  > div {
    margin: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:active {
      color: #333;
    }
  }
  .phonetic-icon {
    margin-left: 5px;
  }
`
// 发音
function playPhonetic(speech: string) {
  const audio = new Audio(speech)
  audio.play()
}
export default Phonetic