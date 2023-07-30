import { useEffect, useState, useReducer, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getFragmentInfo } from '@/api/film'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import zhLang from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'
import { useCaption } from './caption'
import { observer } from "mobx-react-lite"
import wordStore from '@/store/word'
import { Button, FloatButton, Popover, Select } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"

videojs.addLanguage('zh-CN', zhLang)

function Film() {
  const navigate = useNavigate()
  const params = useParams()
  const { fragmentId } = params
  const [ filmId, setFilmId ] = useState('')
  const [ _playState, setPlayState ] = useState(false)
  const player = useRef<Player>()
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  const { windowSize, setWindowSize } = useResize()
  interface ControlPanelProp {
    captionType: '1' | '2' | '3'
    playbackRate: string
    captionSize: '0.5' | '1' | '1.5'
  }
  const [ controlPanel, setControlPanel ] = useState<ControlPanelProp>({
    captionType: '1', // 1 中英 2英 3无字幕
    playbackRate: '1', // 倍速播放 0.25 0.5 0.75 1 1.25 1.5
    captionSize: '1', // 字幕大小 0.5 1 1.5 
  })
  const { Caption, WordModal } = useCaption(fragmentId!, currentTime, setPlayer, filmId)
  function setPlayer() {
    if (!player.current?.paused()) {
      player.current?.pause()
    } 
  }
  useEffect(() => {
    getFragmentInfo(fragmentId!).then(res => {
      initPlay(res.fragmentUrl)
      setFilmId(res.filmId)
    })
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
  function handleCaptionType(captionType: string | string[]) {
    setControlPanel({
      ...controlPanel,
      captionType: captionType as '1' | '2' | '3'
    })
  }
  function handlePlaybackRates(playbackRate: string | string[]) {
    setControlPanel({
      ...controlPanel,
      playbackRate: playbackRate as string
    })
    player.current!.playbackRate(Number(playbackRate))
  }
  function handleCaptionSize(captionSize: string | string[]) {
    console.log(captionSize);
    setControlPanel({
      ...controlPanel,
      captionSize: captionSize as '0.5' | '1' | '1.5'
    })
  }
  function toHome() {
    navigate('/film-list')
  }
  const MenuList = () => <ul css={{
    'li': {
      margin: '10px 0',
      '> *': {
        width: '140px'
      }
    }
  }}>
    <li>
      <Select
        value={controlPanel.captionType} 
        onChange={handleCaptionType}
        options={[
          { value: '1', label: '中英' },
          { value: '2', label: '英' },
          { value: '3', label: '无字幕' },
        ]}
      >
      </Select>
      {/* 字幕类型选择 */}
    </li>
    <li>
    <Select
        value={controlPanel.playbackRate} 
        onChange={handlePlaybackRates}
        options={[
          { value: '0.25', label: '0.25倍速' },
          { value: '0.5', label: '0.5倍速' },
          { value: '0.75', label: '0.75倍速' },
          { value: '1', label: '1倍速' },
          { value: '1.25', label: '1.25倍速' },
          { value: '1.5', label: '1.5倍速' },
        ]}
      >
      </Select>
      {/* 倍速类型选择 */}
    </li>
    <li>
      <Select
        value={controlPanel.captionSize} 
        onChange={handleCaptionSize}
        options={[
          { value: '0.5', label: '小字幕' },
          { value: '1', label: '适中字幕' },
          { value: '1.5', label: '大字幕' },
        ]}
      >
      </Select>
    </li>
    <li>
      <Button type='link' onClick={toHome}>首页</Button>
    </li>
  </ul>
  return <div css={{position: 'relative'}}>
    <video css={{width: '100vw', height: '100vh'}} id='fragment-play' className='video-js'></video>
    <Caption 
      windowSize={windowSize} 
      captionSize={controlPanel.captionSize} 
      captionType={controlPanel.captionType}
    />
    <WordModal collectList={wordStore.collectList} />
    <Popover placement="rightBottom" content={MenuList} trigger="click">
      <FloatButton icon={<BarsOutlined />} />
    </Popover>
  </div>
}

export default observer(Film)

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