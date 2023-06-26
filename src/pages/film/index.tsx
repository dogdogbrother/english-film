import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFragmentInfo, getCaption } from '@/api/film'
import type { CaptionProp } from '@/api/film'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import zhLang from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'

videojs.addLanguage('zh-CN', zhLang)

function Film() {
  const params = useParams()
  const { fragmentId } = params
  const [ captions, setCaptions ] = useState<CaptionProp[]>([])
  const [ playState, setPlayState ] = useState(false)
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  useEffect(() => {
    getFragmentInfo(fragmentId!).then(res => {
      initPlay(res.fragmentUrl)
    })
    getCaption(fragmentId!).then(setCaptions)
  }, [])
  function initPlay(url: string) {
    const player = videojs('fragment-play', {
      techOrder: ['html5'],
      controls: true,
      sources: [
        {
          src: url
        }
      ],
    })
    player.on('play', () => {
      setPlayState(true)
    })
    player.on('pause', () => {
      setPlayState(false)
    })
    player.on('timeupdate', (e: Event) => {
      const target =  e.target as any
      const { currentTime, duration: _duration  } = target.children[0] || {}
      setCurrentTime(currentTime)
      if (duration === 0) {
        setDuration(_duration)
      }
    })
  }
  function touch() {
    // 测试冒泡
    console.log(111)
  }
  return <div>
    <div onClick={touch}>
      <video css={{width: '100vw', height: '100vh'}} id='fragment-play' className='video-js'></video>
    </div>
  </div>
}

export default Film