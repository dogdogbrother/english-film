import { useEffect, useState, useReducer, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getFragmentInfo, getCaption } from '@/api/film'
import type { CaptionProp } from '@/api/film'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import zhLang from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'
import { useCaption } from './caption'

videojs.addLanguage('zh-CN', zhLang)

function Film() {
  const params = useParams()
  const { fragmentId } = params
  const [ captions, setCaptions ] = useState<CaptionProp[]>([])
  const [ playState, setPlayState ] = useState(false)
  const player = useRef<Player>()
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  const { windowSize, setWindowSize } = useResize()
  const { Caption, WordModal } = useCaption(fragmentId!, currentTime, setPlayer)
  function setPlayer() {
    if (!player.current?.paused()) {
      player.current?.pause()
    } 
  }
  useEffect(() => {
    getFragmentInfo(fragmentId!).then(res => {
      initPlay(res.fragmentUrl)
    })
    getCaption(fragmentId!).then(setCaptions)
  }, [])
  function initPlay(url: string) {
    const _player = videojs('fragment-play', {
      techOrder: ['html5'],
      controls: true,
      sources: [
        {
          src: url
        }
      ],
    })
    _player.on('play', () => {
      setPlayState(true)
    })
    _player.on('pause', () => {
      setPlayState(false)
    })
    _player.on('loadedmetadata', () => {
      // _height 和 _width 是视频的尺寸比例 和windows的窗口宽高算个比例出来
      const viodeHeight = _player.videoHeight()
      const viodeWidth = _player.videoWidth()
      setWindowSize({ viodeHeight, viodeWidth })
    })
    _player.on('timeupdate', (e: Event) => {
      const target =  e.target as any
      const { currentTime, duration: _duration  } = target.children[0] || {}
      setCurrentTime(currentTime)
      if (duration === 0) {
        setDuration(_duration)
      }
    })
    player.current = _player
  }
  return <div css={{position: 'relative'}}>
    <video css={{width: '100vw', height: '100vh'}} id='fragment-play' className='video-js'></video>
    <Caption windowSize={windowSize} />
    <WordModal />
  </div>
}

export default Film

// 计算字幕所在的位置
function useResize() {
  const [windowSize, setWindowSize] = useReducer((state: WindowSizeProp, action: WindowSizeProp ): WindowSizeProp => {
    const sizeRes = {...state, ...(action || {}) }
    const { viodeHeight, viodeWidth } = sizeRes
    const { innerWidth, innerHeight } = window
    // 视频的宽高比
    const viodeAspectRatio = viodeWidth! / viodeHeight!
    // 屏幕的宽高比
    const windowAspectRatio = innerWidth / innerHeight
    // 代表上下有黑边
    if (viodeAspectRatio > windowAspectRatio) {
      sizeRes.vertical = true
      sizeRes.horizontal = false
      // 视频的真实高度
      const vHeight = innerWidth / viodeWidth! * viodeHeight!
      sizeRes.y = (innerHeight - vHeight) / 2
      sizeRes.x = 0
      sizeRes.vWidth = innerWidth
    }
    // 代表左右有黑边
    if (viodeAspectRatio < windowAspectRatio) {
      sizeRes.horizontal = true
      sizeRes.vertical = false
      const vWidth = innerHeight / viodeHeight! * viodeWidth!
      // 视频的真实宽度
      sizeRes.vWidth = vWidth
      sizeRes.x = (innerWidth - vWidth) / 2
      sizeRes.y = 0
    }
    return sizeRes
  }, {})
  useEffect(() => {
    window.addEventListener('resize', resizeUpdate);
    return () => window.removeEventListener('resize', resizeUpdate);
  }, [])
  function resizeUpdate() {
    setWindowSize({})
  }
  return { windowSize, setWindowSize }
}

export interface WindowSizeProp {
  viodeHeight?: number
  viodeWidth?: number
  vertical?: boolean // 上下有黑边
  horizontal?: boolean // 左右有黑边
  y?: number // 上黑边的高度
  x?: number // 左黑边的宽度
  vWidth?: number // 视频的真正宽度
}