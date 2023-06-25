import { makeObservable, observable, action } from "mobx"
// import { login } from '@/api/user'

class UserStore {
  state = false // 弹窗的状态
  constructor() {
    makeObservable(this, {
      state: observable,
      setState: action
    })
  }
  setState = (state: boolean) => {
    this.state = state
  }
}

export default new UserStore()