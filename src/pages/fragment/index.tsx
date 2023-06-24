import { useParams } from 'react-router-dom'
import { getFragmentList } from '@/api/film'
import type { FragmentProp } from '@/api/film'
import { useEffect, useState } from 'react'

function Fragment() {
  const params = useParams()
  const [fragmentList, setFragmentList] = useState<FragmentProp[]>([])
  const { filmId = '' } = params
  useEffect(() => {
    getFragmentList(filmId).then(setFragmentList)
  }, [])
  return <div>
    fragment
  </div>
}

export default Fragment