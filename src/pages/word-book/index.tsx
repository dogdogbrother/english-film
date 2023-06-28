import { observer } from "mobx-react-lite"
import wordStore from '@/store/word'

function WordBook() {
  return <div>
    <p>共收藏了{wordStore.collectList.length}个单词</p>
    <ul>
      {
        wordStore.collectList.map(word => <li key={word.id}>{word.word}</li>)
      }
    </ul>
  </div>
}

export default observer(WordBook)