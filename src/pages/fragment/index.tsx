import { useParams } from 'react-router-dom'
import { getFragmentList } from '@/api/film'
import type { FragmentProp } from '@/api/film'
import { useEffect, useState } from 'react'
import videojs from 'video.js'
import zhLang from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'
import { getFormattTime } from '@/utils/format'
import styled from '@emotion/styled'

videojs.addLanguage('zh-CN', zhLang)

function Fragment() {
  const params = useParams()
  const [durations, setDurations] = useState<number[]>([])  // 列表的视频时长
  const [fragmentList, setFragmentList] = useState<FragmentProp[]>([])
  const { filmId = '' } = params
  useEffect(() => {
    if (fragmentList.length === 0) return
    fragmentList.forEach((fragment, index) => {
      const player = videojs(`player-${fragment.id}`, {
        techOrder: ['html5'],
        width: 300,
        sources: [
          {
            src: fragment.fragmentUrl
          }
        ],
      })
      player.on('loadedmetadata', (e: Event) => {
        const target =  e.target as any
        const { duration  } = target.children[0] || {}
        durations[index] = duration
        setDurations([...durations])
      })
    })
  }, [fragmentList])
  useEffect(() => {
    getFragmentList(filmId).then(setFragmentList)
  }, [])
  return <FragmentBox>
    {
      fragmentList.map((fragment, index) => <li key={fragment.id}>
        <div className='video-box'>
          <video id={`player-${fragment.id}`} className='video-js'></video>
        </div>
        <div className='info-box'>
          <p>第{index + 1}段</p>
          <p>时长: {getFormattTime(durations[index] || 0) }</p>
        </div>
      </li>)
    }
  </FragmentBox>
}

const FragmentBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  li {
    cursor: pointer;
    margin-right: 10px;

  }
  .video-box {
    margin-bottom: 5px;
  }
  .info-box {
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: space-between;
  }
`
export default Fragment