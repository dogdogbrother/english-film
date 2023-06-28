import { makeObservable, observable, action } from "mobx"
import { getCollectList, type CollectProp } from '@/api/word'

class WordStore {
  collectList: CollectProp[] = []
  constructor() {
    makeObservable(this, {
      collectList: observable,
      getCollectList: action
    })
  }
  getCollectList = () => {
    getCollectList().then(res => this.collectList = res)
  }
}

export default new WordStore()