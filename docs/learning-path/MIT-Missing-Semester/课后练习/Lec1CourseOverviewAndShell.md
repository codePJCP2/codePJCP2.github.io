# Lec1 Course Overview And Shell

本节课的课后练习个人完成的代码如下：

```bash
# 1. 获取当前使用的Shell信息
$ echo $SHELL
# /usr/bin/zsh

# 2. 在 /tmp 下新建一个名为 missing 的文件夹。
$ mkdir -p /tmp/missing

# 3. 用 man 查看程序 touch 的使用手册。
$ man touch

# 4. 用 touch 在 missing 文件夹中新建一个叫 semester 的文件
$ cd ./tmp/missing
$ touch semester

# 5. 将以下内容一行一行地写入 semester 文件：
# #!/bin/sh
# curl --head --silent https://missing.csail.mit.edu
# 题目注意点见代码块下方
$ echo '#!/bin/sh' > semester
$ echo 'curl --head --silent https://missing.csail.mit.edu' >> semester

# 6. 尝试执行这个文件。例如，将该脚本的路径（./semester）输入到您的 shell 中并回车。
#	如果程序无法执行，请使用 ls 命令来获取信息并理解其不能执行的原因。
$ ./semester
# zsh: permission denied: ./semester
$ ls -l ./semester
# -rw-rw-r-- 1 johnson johnson 61  9月 12 18:38 semester
# 可以看到，第一组权限中缺少写权限x

# 7. 查看 chmod 的手册(例如，使用 man chmod 命令)
$ man chmod

# 8. 使用 chmod 命令改变权限，使 ./semester 能够成功执行，
# 不要使用 sh semester 来执行该程序。
$ chmod 764 semester
# semester当前的文件权限：rwxrw-r-- = (764)
$ ./semester
# Output:
# HTTP/2 200 
# server: GitHub.com
# content-type: text/html; charset=utf-8
# last-modified: Thu, 08 Aug 2024 20:16:01 GMT
# access-control-allow-origin: *
# etag: "66b52781-205d"
# expires: Tue, 03 Sep 2024 04:29:41 GMT
# cache-control: max-age=600
# x-proxy-cache: MISS
# x-github-request-id: 3DA6:3257C3:11AA297:1209311:66D68E5D
# accept-ranges: bytes
# age: 0
# date: Thu, 12 Sep 2024 10:43:42 GMT
# via: 1.1 varnish
# x-served-by: cache-nrt-rjtf7700059-NRT
# x-cache: HIT
# x-cache-hits: 0
# x-timer: S1726137823.603126,VS0,VE236
# vary: Accept-Encoding
# x-fastly-request-id: 60b60225b32dc87850750cef7e466c5146e07dcc
# content-length: 8285

# 9. 使用 | 和 > ，将 semester 文件输出的最后更改日期信息，
# 写入主目录下的 last-modified.txt 文件中
# 可以使用grep命令获取特定字段的信息，最后重定向流至主目录下的 last-modified.txt 文件
$ ./semester | grep -i last-modified > ~/last-modified.txt

# 10. 写一段命令来从 /sys 中获取笔记本的电量信息，或者台式机 CPU 的温度。
# 做不来，因为不知道相关的目录以及数据文件存放于何处
```

题目注意点：

1. 第五小题：第一行有点棘手， `#` 在 Bash 中表示注释，而 `!` 即使被双引号`"`包裹也具有特殊的含义，使用单引号 `'`可以规避相应的含义，将引号里面的内容以文本形式解释。  
同时，使用 `echo`与重定向符追加写入文件内容时，需要使用 `>>`表示追加。

> 更多信息请参考<font style="color:rgb(0, 0, 0);"> </font>[Bash quoting 手册](https://www.gnu.org/software/bash/manual/html_node/Quoting.html)
>

2. 第八小题思考题：您的 shell 是如何知晓这个文件需要使用 `sh` 来解析的呢？  
答案就是——`#!`这个符号的作用！类 UNIX 系统中，shebang(也就是 `#!`)行用来指定脚本的解释器路径，这个符号通常出现在第一行。

> 更多信息请参考：[shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))
>



> 更新: 2024-09-14 13:11:03  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/midgnpshpeb691ug>