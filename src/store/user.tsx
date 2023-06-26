import { makeObservable, observable, action } from "mobx"
import { login } from '@/api/user'

class UserStore {
  state = false // 弹窗的状态
  username: string | undefined = undefined
  constructor() {
    makeObservable(this, {
      state: observable,
      username: observable,
      setState: action
    })
  }
  setState = (state: boolean) => {
    this.state = state
  }
  login = (form: Parameters<typeof login>[0]) => {
    return login(form).then(res => {
      const { token, username } = res
      localStorage.setItem("token", token),
      this.username = username
      this.setState(false)
    })
  }
}

export default new UserStore()