## Windows .bat 脚本应用采坑之旅

基本命令

`copy  `    文件复制

`xcopy`  文件夹复制

`del`  删除文件

`rd`    删除文件夹



所有 .bat 的指令都可以 /？的方式查询使用方法

### call 执行 .bat脚本报错 "不是内部或外部命令，也不是可执行的程序或批处理文件"

​	call 是 windows 中一个执行批处理命令，对于文件必须是 `.bat` 或者 `.cmd` 格式，并且确保 `call [path]filename` 命令中path 在当前的执行环境下是正确的路径。

```powershell
call scripts/auto.bat
```

如果此时的 .bat 文件路径错误, 脚本执行时就会报错 " <span style='color:#f00'>’scripts‘ 不是内部或外部命令，也不是可执行的程序或批处理文件</span> "

