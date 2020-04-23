##          VScode  自定义代码片段 中变量使用 Variables

​	VScode 自定义代码片段中变量名及其含义

以下为可用变量:

- `TM_SELECTED_TEXT` 当前所选文本或字符串
- `TM_CURRENT_LINE` 当前内容所在的行数
- `TM_CURRENT_WORD` The contents of the word under cursor or the empty string
- `TM_LINE_INDEX` The zero-index based line number
- `TM_LINE_NUMBER` The one-index based line number
- `TM_FILENAME` The filename of the current document
- `TM_FILENAME_BASE` The filename of the current document without its extensions
- `TM_DIRECTORY` 当前文件所在路径
- `TM_FILEPATH` 当前文件的完整路径
- `CLIPBOARD` The contents of your clipboard
- `WORKSPACE_NAME` 打开的工作空间或者文件夹名

当前日期时间变量:

- `CURRENT_YEAR`  年份 如：2020
- `CURRENT_YEAR_SHORT` 年份简写 如： 20
- `CURRENT_MONTH` 月份 如：01
- `CURRENT_MONTH_NAME` 月份名称 如：July
- `CURRENT_MONTH_NAME_SHORT` 月份名称简写 如：Jul
- `CURRENT_DATE` 几号
- `CURRENT_DAY_NAME` 星期 如：Monday
- `CURRENT_DAY_NAME_SHORT` 星期简写 如： Mon
- `CURRENT_HOUR` 小时 (24小时值)
- `CURRENT_MINUTE` 分
- `CURRENT_SECOND` 秒
- `CURRENT_SECONDS_UNIX` 毫秒



自定义模板示例

```json
"Print to console": {
 	"prefix": "log",
	"body": [
      "/*",
      "* @Desc $2",
      "* @Author ${name: 折威}",
      "* @Date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
      "*/\n",
			"<template>",
      "  <div>\n$0",
      "  </div>",
      "</template>\n",
      "<script>",
      "export default {",
      "  name: '$TM_FILENAME_BASE',",
      "  data () {",
      "    return {\n",
      "    }",
      "  },",
      "  mounted () {},",
      "  methods: {",
      "  }",
      "}",
      "</script>\n",
      "<style scoped lang=\"scss\">\n",
      "</style>\n"
		],
 	"description": "Vue template"
 }
```



生成模板效果

```js
/**
* @Desc this file of description
* @author yourname
* @Date 2020-01-10 18:00:00
*/
```



参考地址 [https://code.visualstudio.com/docs/editor/userdefinedsnippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

