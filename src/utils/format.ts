// 传入毫秒 设置 00:00 格式
export function getFormattTime(time: number) {
  const m = Math.floor(time / 60).toString()
  const s = Math.floor(time % 60).toString()
  return m.padStart(2, '0') + ":" + s.padStart(2, '0')
}

// 过滤掉单词里面的符号 以免影响搜索和单词对比
export function delSymbol(word: string) {
  // 过滤掉 . 和 ,
  return word.replace(/\.|,/g, "");
}