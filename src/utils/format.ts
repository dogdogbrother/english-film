// 传入毫秒 设置 00:00 格式
export function getFormattTime(time: number) {
  const m = Math.floor(time / 60).toString()
  const s = Math.floor(time % 60).toString()
  return m.padStart(2, '0') + ":" + s.padStart(2, '0')
}