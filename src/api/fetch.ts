import queryString, { StringifiableRecord } from 'query-string'

// 本地环境和线上环境都是用api 本地连接线上的用 prod-api
export const rootApi = import.meta.env.MODE == 'test' ? '/prod-api' : '/api'

function getToken() {
  return localStorage.getItem('token')
}
interface FetchProp {
  url: string,
  query?: StringifiableRecord
  data?: object
  method?: 'delete'
} 
export function useGetFetch<ResProp = any>(config: FetchProp) {
  const { url, query = {} } = config
  const api = rootApi + queryString.stringifyUrl({url, query})
  return fetch(api, {
    headers: new Headers({
      'Authorization': `Bearer ${getToken()}`
    })
  }).then(res => {
    const { status } = res
    if (status >= 200 && status < 300) {
      return res.json() as ResProp
    }
    return Promise.reject(res)
  })
}

export function usePostFetch<ResProp = any>(config: FetchProp) {
  const { url, data = {}, method } = config
  return fetch(rootApi + url, {
    method: method || 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    })
  }).then(res => {
    const { status, headers } = res
    if (status >= 200 && status < 300) {
      if (headers.get("content-type")?.includes('application/json')) {
        return res.json() as ResProp
      }
      return res.statusText
    }
    return Promise.reject(res)
  })
}