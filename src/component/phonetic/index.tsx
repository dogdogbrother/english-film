import type { TranslateProp } from '@/api/word'
import styled from '@emotion/styled'
import { VolumeNotice, VolumeSmall} from '@/component/icons/volume'
import { useRef, useState } from 'react'

interface Props {
  translate: TranslateProp
}
function Phonetic(props: Props) {
  const { translate } = props
  const videoNotice = useRef(new Audio())
  const [ blinkType, setBlinkType ] = useState(true)
  const [ playType, setPlayType ] = useState<'uk' | 'us'>()
  const timer = useRef<any>()
  videoNotice.current.addEventListener('ended', () => {
    clearInterval(timer.current)
    setPlayType(undefined)
  })
  function playPhonetic(speech: string, type: 'uk' | 'us') {
    // 正在播放中
    if (!videoNotice.current.paused) return
    setPlayType(type)
    videoNotice.current.src = speech
    videoNotice.current.play()
    timer.current = setInterval(() => {
      setBlinkType(blinkType => !blinkType)
    }, 400)
  }
  return <PhoneticBox>
    <div onClick={() => playPhonetic(translate.ukSpeech, 'uk')}>
      <span>英 | </span>
      <span style={{marginRight: '5px'}}>{translate.ukPhonetic}</span>
      {
        blinkType && playType === 'uk' ? <VolumeNotice width='1.2em' height='1.2em' /> : <VolumeSmall width='1.2em' height='1.2em' />
      }
    </div>
    <div onClick={() => playPhonetic(translate.usSpeech, 'us')}>
      <span>美 | </span>
      <span style={{marginRight: '5px'}}>{translate.usPhonetic}</span>
      {
        blinkType && playType === 'us' ? <VolumeNotice width='1.2em' height='1.2em' /> : <VolumeSmall width='1.2em' height='1.2em' />
      }
    </div>
  </PhoneticBox>
}
const PhoneticBox = styled.div`
  display: flex;
  font-size: 14px;
  > div {
    margin: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #666;
    &:active {
      color: #333;
    }
  }
  .phonetic-icon {
    margin-left: 5px;
    width: 20px;
    height: 20px;
    background-size: cover;
  }
`

export default Phonetic