import styled from '@emotion/styled'
import { WindowSizeProp } from './index'
import { getCaption } from '@/api/film'
import type { CaptionProp } from '@/api/film'
import { useState, useEffect } from 'react'

interface Props {
  windowSize: WindowSizeProp
}

export function useCaption(fragmentId: string, currentTime: number) {
  const [ captions, setCaptions ] = useState<CaptionProp[]>([])
  useEffect(() => {
    getCaption(fragmentId!).then(setCaptions)
  }, [])
}
function Caption(props: Props) {
  const { windowSize } = props
  return <CaptionBox css={{
    left: `${windowSize.x! + 20}px`, 
    right: `${windowSize.x! + 20}px`, 
    bottom: `${windowSize.y! + 40}px`,
  }}>
    <div className='en'>this is word</div>
    <div className='cn'>这是中文d</div>
  </CaptionBox>
}

const CaptionBox = styled.div`
  position: absolute;
  z-index: 100;
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 5px #000;
  .en {
    font-size: 3vw;
  }
  .cn {
    font-size: 2.4vw;
  }
`

export default Caption