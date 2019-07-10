
### vscode设置
1. 在js中激活emmet插件。  
文件 -> 首选项 -> 设置，添加
``` json
  "emmet.includeLanguages": {
    "typescript": "html",
    "javascript": "html"
  }
```

2. 在js中激活css高亮。  
点击右侧扩展输入搜索"vscode-styled-components"，或者CTRL+P输入：
```
  ext install vscode-styled-components
```

### node-sass安装真麻烦，老是失败
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

### lit-html中多层${}嵌套时，使用style属性提示错误“} expectedts-styled-plugin(9999)”，看着难受
使用.style