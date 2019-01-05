"use strict";
// 挂载components
exports.__esModule = true;
exports["default"] = {
    header: null,
    list: null,
    drawer: null
};
// 储存需要用到的Element实体
var Ins = {};
function getIns(id) {
    return Ins[id];
}
exports.getIns = getIns;
function setIns(ins, id) {
    id && (Ins[id] = ins);
}
exports.setIns = setIns;
