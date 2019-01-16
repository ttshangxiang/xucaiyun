
// 缓存Element实体
const Ins: {[index: string]: HTMLElement} = {};
export function getIns (id: string) {
  return Ins[id];
}
export function setIns (id: string, ins: HTMLElement) {
  Ins[id] = ins;
}

// 缓存数据
const state: {[index: string]: any} = {};
export function getState (id: string) {
  return state[id];
}
export function setState (id: string, value: any) {
  state[id] = value;
}