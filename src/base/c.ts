// 挂载components

export default {
  header: null,
  list: null,
  drawer: null
};

// 储存需要用到的Element实体
const Ins: {[index: string]: HTMLElement} = {};
export function getIns (id: string) {
  return Ins[id];
}
export function setIns (ins: HTMLElement, id?: string) {
  id && (Ins[id] = ins);
}