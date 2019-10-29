# Git 使用总结

本文档以xiaoming代表当前操作用户，以方便讲解（小明很忙没办法!^_^）。本文是直接参考git官方中文文档后用于记录学习整理的，讲解描述不明可直接查看官网 [git 官方中文文档](https://git-scm.com/book/zh/v1)

## Git 使用起步

### 用户信息

当安装完Git应该做的第一件事就是设置你的用户名称与邮件地址。这样做很重要，因为每一个Git的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：  

```bash
$ git config --global user.name <xiaoming>
$ git config --global user.email <xiaoming@gmail.com>
```
如果使用了` --global`选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情，Git都会使用那些信息。当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有`--global`选项的命令来配置。 

### 文本编辑器 

默认会使用操作系统指定的默认编辑器，一般可能会是 Vi 或者 Vim。如果你有其他偏好，比如 Emacs 的话，可以重新设置：

```bash
$ git config --global core.editor emacs
```

### 检查配置信息

如果需要查看你的配置，可使用`git config --list`命令列出所有Git当时能找到的配置
```bash
$ git config --list
user.name=xiaoming
user.email=xiaoming@gmail.com
color.diff=auto
color.status=auto
color.branch=auto
...
```

### 生成 SSH 公钥
大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。系统中的每个用户都必须提供一个公钥用于授权，没有的话就要生成一个。生成公钥的过程在所有操作系统上都差不多。 首先先确认一下是否已经有一个公钥了。SSH 公钥默认储存在账户的主目录下的 ~/.ssh 目录。进去看看：

```bash
$ cd ~/.ssh
$ ls
id_rsa  id_rsa.pub  known_hosts
```

关键是看有没有用 `something` 和 `something.pub` 来命名的一对文件，这个 `something` 通常就是 `id_dsa` 或 `id_rsa`。有 `.pub` 后缀的文件就是公钥，另一个文件则是密钥。假如没有这些文件，或者干脆连 `.ssh` 目录都没有，可以用 `ssh-keygen` 来创建。该程序在 Linux/Mac 系统上由 SSH 包提供，而在 Windows 上则包含在 MSysGit 包里：

```bash
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Administrator/.ssh/id_rsa.
Your public key has been saved in /c/Users/Administrator/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:elg/tF7cBzlFADwdOhTteu2Z65qxDRLrOYgB7ypJdqs Administrator@SKY-20180416IYL
The key's randomart image is:
+---[RSA 2048]----+
|           .+=oo.|
|           .o.o. |
|            oo  .|
|     .       ..o |
|      o S .. .+. |
|   o . * o o+..o.|
|  o o = + =oo+..+|
|   o . + o.+o *+.|
|   Eo..   .o.+o+.|
+----[SHA256]-----+

```

它先要求你确认保存公钥的位置（`.ssh/id_rsa`），然后它会让你重复一个密码两次，如果不想在使用公钥的时候输入密码，可以留空。以上代码是window中生成ssh的结果, 如果以前已经生成过，再次执行`ssh-keygen`时会提示是否覆盖原来的文件，这时你可以选择继续或者取消。



公钥的样子如下：

```bash
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9JtnaO/TMWsfWfL4VndkQBlEPEJLcRR8cuN6Bi9jYddEo4c8Telcahm+wBBZISD4gfGjUoKMEwcBqo8NrYFvXCA76HNe5pRci6RC8tvTZOx6IGFsDFN9AS8hItaB0X1d5RAPhdxmvTC3PYGb7w2pmUqoIcYr6mQ189CxSyJuIMtCXRVgUn8RYloN1DTmciKfaHh7NT9iMbn0TuClUYRKB40oS73Wrq70uL6gVCwUdur5YK6t/v/Zmg38D6c4731yKfW38FiCRrgq4nWHrdAE2uS2v1Ij320Y/wSgDIepJUGmuh6LxxUuZ46ipI4X7G6pZyMdyHAUN97XnfiEO432p Administrator@SKY-20180416IYL
```

公钥设置更多信息查看官方文档 [生成ssh公钥]( https://git-scm.com/book/zh/v1/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)



## Git 基础命令使用

### 取得Git 仓库

有两种取得 Git 项目仓库的方法。第一种是在现存的目录下，通过导入所有文件来创建新的 Git 仓库。第二种是从已有的 Git 仓库克隆出一个新的镜像仓库来。

#### 本地目录初始化新仓库

对本地项目添加Git 管理，直接进入项目目录后执行：

```bash
$ git init
```

命令执行完成后, 项目目录下出现一个.git 文件夹，此时项目中文件并未被跟踪，我们可以使用`git add`命令添加需要跟踪的文件，然后提交：

```bash
$ git add README.md
$ git commit -m 'init project'
```

#### 远程仓库克隆

当你需要获得某个远程仓库的项目时，你就可以用`git clone`命令，克隆仓库命令格式为`git clone [url]`。以开源项目element 为例

```bash
$ git clone git@github.com:ElemeFE/element.git
```

它会在当前目录创建一个element目录，并且包含.git目录，用户保存下载下来的所有版本记录，然后从中取出最新版本的文件拷贝。如果克隆时想自定义新建项目的目录名，可在命令末尾指定新的名字：

```bash
$ git clone git@github.com:ElemeFE/element.git my-element
```

##### 更新远程分支列表

```bash
$ git remote update origin -p
```

此方式会直接更新对应的远程仓库下所有分支的记录到本地，`origin` 为远程仓库名

##### remote 相关命令使用

```bash
$ git remote add <name> <url>				// 添加远程仓库
$ git remote rename <old> <new>				// 重命名远程仓库
$ git remote remove <name>					// 删除远程仓库关联
$ git remote set-url <name> <newurl>		// 重新设置远程仓库地址
```



### 记录提交到仓库

工作目录下面的所有文件都不外乎这两种状态：已跟踪或未跟踪。已跟踪的文件是指本来就被纳入版本控制管理的文件，在上次快照中有它们的记录，工作一段时间后，它们的状态可能是未更新，已修改或者已放入暂存区。而所有其他文件都属于未跟踪文件。它们既没有上次更新时的快照，也不在当前的暂存区域。

![img](https://git-scm.com/figures/18333fig0201-tn.png)

上图为文件变化周期

* 查看工作目录文件状态

  ```bash
  $ git status
  On branch docs-zhewei
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
  
          modified:   xiaoming/git_use.md
  
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
  
          text.txt
  
  ```


* 添加跟踪文件

  ```bash
  $ git add text.txt
  ```



`Changes to be committed:` 表明文件更新已被添加到暂存区；

`Changes not staged for commit:`  表明文件更新未被添加到暂存区；

`Untracked files:` 表明文件未被跟踪

如果要暂存这次更新，需要运行 `git add` 命令（这是个多功能命令，根据目标文件的状态不同，此命令的效果也不同：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等）

* 提交记录至本地仓库

  1. 当提交信息较少，可以一行展示时可以直接使用以上方式

  ```bash
  $ git commit -m 'add a text.text'
  ```

  2.  如果描述内容较多，一行无法描述完，则采用以下方式:  输入命令`git commit` 后enter键进入vi编辑界面，按`i`键进入编辑模式，此状态下可以添加更详尽的提交描述信息；编辑完成后在英文输入法状态下按`Esc` 键，在按`Shfit`+`:` 进入命令行模式，最后输入`wq`回车，到此完成commit信息的编辑保存。 

  ```bash
  $ git commit
  
  
  # Please enter the commit message for your changes. Lines starting
  # with '#' will be ignored, and an empty message aborts the commit.
  # On branch docs-zhewei
  # Changes to be committed:
  #       modified:   doc/text.text
  #
  ~
  ~
  ~
  
  ```

  3.  



