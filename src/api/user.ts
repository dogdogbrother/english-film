import { usePostFetch, useGetFetch } from './fetch'

export interface LoginProp {
  username: string
  password: string
}
export function login(data: LoginProp) {
  return usePostFetch({
    url: '/user/login',
    data
  })
}

export function getInfo() {
  return useGetFetch({
    url: '/user/info',
  })
}