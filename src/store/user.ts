import { makeObservable, observable, action, runInAction } from "mobx"
import { login, getInfo } from '@/api/user'
import wordStore from './word'

class UserStore {
  state = false // 弹窗的状态
  username: string | undefined = undefined
  constructor() {
    makeObservable(this, {
      state: observable,
      username: observable,
      setState: action,
      getInfo: action
    })
  }
  setState = (state: boolean) => {
    this.state = state
  }
  login = (form: Parameters<typeof login>[0]) => {
    return login(form).then(res => {
      const { token, username } = res
      localStorage.setItem("token", token),
      runInAction(() => this.username = username)
      this.setState(false)
      wordStore.getCollectList()
    })
  }
  getInfo = () => {
    getInfo().then(res => {
      const { username } = res
      runInAction(() => this.username = username)
      wordStore.getCollectList()
    })
  }
}

export default new UserStore()