# Lec2 Shell Tools

1. 阅读 `man ls` ，然后使用 `ls` 命令进行如下操作：
+ 所有文件（包括隐藏文件）
+ 文件打印以人类可以理解的格式输出 (例如，使用 454M 而不是 454279954)
+ 文件以最近访问顺序排序
+ 以彩色文本显示输出结果

```bash
# 获取当前目录下所有文件
$ ls -a

# 以人类可以理解的(长)格式输出
$ ls -lh
# drwxrwxr-x 2 johnson johnson 4.0K  9月 13 16:16 bar

# 以最近访问顺序排序，使用sort选项
$ ls (--sort=)-t
# sort选项可选参数值：
# none: -U, size: -S, time: -t, version: -v, extension: -X

# 以彩色文本输出结果，使用color选项
$ ls -lh --color=auto
```

2. 编写两个 bash 函数 `marco` 和 `polo` 执行下面的操作。   
每当你执行 `marco` 时，当前的工作目录应当以某种形式保存。  
当执行 `polo` 时，无论现在处在什么目录下，都应当 `cd` 回到当时执行 `marco` 的目录。  
为了方便 debug，你可以把代码写在单独的文件 `marco.sh` 中，并通过 `source marco.sh` 命令，（重新）加载函数。

```bash
# marco.sh
# 设置shebang
#!/bin/sh
marco() {
  echo $(pwd) > ~/tmp/marco_history.txt
}

# polo.sh
#!/bin/sh
polo () {
  cd $(cat ~/tmp/marco_history.txt) || exit
  echo "Now cd to $(cat ~/tmp/marco_history.txt)..."
}
```

3. 假设您有一个命令，它很少出错。因此为了在出错时能够对其进行调试，需要花费大量的时间重现错误并捕获输出。 编写一段 bash 脚本，运行如下的脚本直到它出错，将它的标准输出和标准错误流记录到文件，并在最后输出所有内容。   
**加分项：报告脚本在失败前共运行了多少次。**

```bash
 #!/usr/bin/env bash

 n=$(( RANDOM % 100 ))

 if [[ n -eq 42 ]]; then
    # 重定向信息至错误流
    echo "Something went wrong"
    >&2 echo "The error was using magic numbers"
    exit 1
 fi

 echo "Everything went according to plan"
```

```bash
# 假设题给代码存储在 example.sh 文件中
# 脚本代码文件为 output.sh

# 养成好习惯，先写shebang
#!/usr/bin/env bash

count=0
echo > output.log

# 不出错就一直运行下去
while true;
do
  # &>>符号用于同时将输出重定向(>>)并让命令在后台运行(&)
  ./example.sh &>> output.log
  ((count++))
  if [ "$?" -ne 0 ]; then
    cat output.log
    echo "The script runs for $count time(s)"
    break
  fi
done
```

4. 本节课我们讲解的 `find` 命令中的 `-exec` 参数非常强大，它可以对我们查找的文件进行操作。但是，如果我们要对所有文件进行操作呢？例如创建一个 zip 压缩文件？我们已经知道，命令行可以从参数或标准输入接受输入。在用管道连接命令时，我们将标准输出和标准输入连接起来，但是有些命令，例如 `tar` 则需要从参数接受输入。这里我们可以使用 [xargs](https://man7.org/linux/man-pages/man1/xargs.1.html) 命令，它可以使用标准输入中的内容作为参数。 例如 `ls | xargs rm` 会删除当前目录中的所有文件。

您的任务是编写一个命令，它可以递归地查找文件夹中所有的 HTML 文件，并将它们压缩成 zip 文件。注意，即使文件名中包含空格，您的命令也应该能够正确执行（提示：查看 `xargs` 的参数 `-d`）

```bash
This manual page documents the GNU version of xargs.  xargs reads items
       from the standard input, delimited by blanks (which  can  be  protected
       with  double or single quotes or a backslash) or newlines, and executes
       the command (default is /bin/echo) one or more times with any  initial-
       arguments  followed  by items read from standard input.  Blank lines on
       the standard input are ignored.

...

Because Unix filenames can contain blanks and  newlines,  this  default
       behaviour is often problematic; filenames containing blanks and/or new‐
       lines are incorrectly processed by xargs.  In these  situations  it  is
       better to use the -0 option, which prevents such problems.   When using
       this option you will need to ensure that the program which produces the
       input  for  xargs  also  uses a null character as a separator.  If that
       program is GNU find for example, the -print0 option does this for you.

...

OPTIONS

-0, --null
              Input items are terminated by a null  character  instead  of  by
              whitespace,  and the quotes and backslash are not special (every
              character is taken literally).  Disables the end of file string,
              which  is  treated  like  any other argument.  Useful when input
              items might contain white space, quote  marks,  or  backslashes.
              The  GNU  find  -print0  option produces input suitable for this
              mode.

--delimiter=delim, -d delim
              Input items are terminated  by  the  specified  character.   The
              specified delimiter may be a single character, a C-style charac‐
              ter escape such as \n, or an octal or hexadecimal  escape  code.
              Octal  and  hexadecimal  escape  codes are understood as for the
              printf command.  Multibyte characters are not supported.   When
              processing  the input, quotes and backslash are not special; ev‐
              ry character in the input is taken literally.   The  -d  option
              disables any end-of-file string, which is treated like any other
              argument.  You can use this option when the  input  consists  of
              simply  newline-separated  items,  although  it is almost always
              better to design your program to use --null where this is possi‐
              ble.
```

先把要做的事情拆解一下：

+ 查找当前文件夹中所有的 HTML 文件 `find . -name '*.html'`
+ 使用 `tar` 将这些 HTML 文件压缩成 zip 文件(创建 `archive`)，将找到的 HTML 文件作为输入流

查找一下 `tar` 命令的 man 手册就可以完成本题了：

```bash
find . -type f -name '*.html' | xargs -d '\n' tar -cvf htmls.zip
# ./web-page4.html
# ./web-page8.html
# ./web-page7.html
# ./web-page3.html
# ./web-page9.html
# ./web-page1.html
# ./web-page5.html
# ./web-page6.html
# ./web-page2.html

# 验证命令是否生效
tar -tf htmls.zip
# ./web-page4.html
# ./web-page8.html
# ./web-page7.html
# ./web-page3.html
# ./web-page9.html
# ./web-page1.html
# ./web-page5.html
# ./web-page6.html
# ./web-page2.html
```

5. （进阶）编写一个命令或脚本递归的查找文件夹中**最近使用的**一个文件。  
更通用的做法，你可以按照**最近的使用时间排序**列出文件吗？(其实这句话是个提示)

要找出最近使用的一个文件，可以这么办：

+ 先找出所有文件信息(递归地查找，`find` 命令就是这么干的)
+ 按照修改时间排序并展示(这种展示的活应该需要 `ls` 命令来做，按照时间排序可以使用 `-t`标志)
+ 只展示第一条信息(`head -1`)

那么将上述命令组合起来就可以完成要求了

```bash
find . -type f | xargs ls -ltch | head -1
```

按照**最近的使用时间**列出文件则更简单了，去掉上述命令中的 `head` 命令即可。

> 更新: 2024-09-15 15:57:31  
> 原文: https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/hnxrgvsdbtahfh91