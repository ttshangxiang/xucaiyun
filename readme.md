
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