# Lec2 Shell Tools

# Shell 脚本
## `Bash` 中的变量
要定义一个变量非常简单，类似于 `python`中定义变量的方式：

```bash
foo=bar
```

如果你需要访问 `foo`变量中的值，你可以通过 `$foo`的方式来访问它。

例如，打印出 `foo` 变量对应的值：

```bash
echo $foo
# bar
```

值得注意的是，下列代码并不会正常工作，终端会告诉你错误原因：

```bash
foo = bar
# zsh: command not found: foo
```

上面这段代码的实际操作是运行 `foo`程序，并将 `=`与 `bar`作为参数传递给 `foo`程序。

## Bash 中的字符串
类似于 `JavaScript`与 `Python`，Bash 中支持两种方式来定义字符串：单引号`'`与双引号 `"`，不过它们两个的含义并不相同：

+ 单引号`'`：由单引号定义的字符串会被解释为**纯文本内容**
+ 双引号`"`：由双引号定义的字符串更像一个**格式化字符串**。

我们通过一段代码来直观体现两种字符串之间的区别之间的区别：

```bash
foo=bar
echo 'Value is $foo'
# Value is $foo
echo "Value is $foo"
# Value is bar
```

## Bash 中的函数
如同大多数编程语言，`Bash`支持 `if-else``for``while``case`等流程控制语句。`Bash`还支持函数，函数可以接收参数并执行自定义操作，例如下面的例子：

```bash
# mcd.sh
mcd () {
  mkdir -p "$1"
  cd "$1"
}
```

该函数是 `mkdir`与 `cd`命令的顺序结合，作用是以接收到的第 1 个参数为文件夹名创建目录，随后切换到该目录中。

代码中的 `$1`是一个特殊占位符，表示传递过来的第一个参数。

`Bash` 使用了很多特殊的变量来表示参数、错误代码和相关变量。下面列举了其中一些变量，更完整的列表可以参考[Special Characters](https://www.tldp.org/LDP/abs/html/special-chars.html)。

+ `<font style="color:rgb(0, 0, 0);">$0</font>`<font style="color:rgb(0, 0, 0);"> - 脚本名</font>
+ `<font style="color:rgb(0, 0, 0);">$1</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">到</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">$9</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">- 脚本的参数。</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">$1</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">是第一个参数，依此类推。</font>

> 可以认为 `$<number>`占位符等同于 `argv[number]`
>

+ `<font style="color:rgb(0, 0, 0);">$@</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">- 所有参数</font>
+ `<font style="color:rgb(0, 0, 0);">$#</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">- 参数个数</font>
+ `<font style="color:rgb(0, 0, 0);">$?</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">- 前一个命令的返回值</font>
+ `<font style="color:rgb(0, 0, 0);">$$</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">- 当前脚本的进程识别码</font>
+ `<font style="color:rgb(0, 0, 0);">!!</font>`<font style="color:rgb(0, 0, 0);"> - 完整的上一条命令，包括参数。  
</font><font style="color:rgb(0, 0, 0);">常见应用：当你因为权限不足执行命令失败时，可以使用 </font>`<font style="color:rgb(0, 0, 0);">sudo !!</font>`<font style="color:rgb(0, 0, 0);"> 再尝试一次。</font>
+ `<font style="color:rgb(0, 0, 0);">$_</font>`<font style="color:rgb(0, 0, 0);"> - 上一条命令的最后一个参数。如果你正在使用的是交互式 Shell，你可以通过按下 </font>`<font style="color:rgb(0, 0, 0);">Esc</font>`<font style="color:rgb(0, 0, 0);"> 之后键入 . 来获取这个值。</font>

## <font style="color:rgb(0, 0, 0);">Bash 中的返回值与逻辑运算符</font>
命令执行完成或者执行出错时，都会向 `STDOUT`返回**输出值**，向 `STDERR`返回**错误码以及错误信息**，<font style="color:rgb(0, 0, 0);">便于脚本以更加友好的方式报告错误。</font>

<font style="color:rgb(0, 0, 0);">返回码或退出状态是脚本/命令之间交流执行状态的方式。类似于 C 语言中的 </font>`<font style="color:rgb(0, 0, 0);">return 0</font>`<font style="color:rgb(0, 0, 0);">，返回值 0 表示正常执行，其他所有非 0 的返回值都表示有错误发生。</font>

<font style="color:rgb(0, 0, 0);">这些 exitValue 可以被用于逻辑运算中。</font>`<font style="color:rgb(0, 0, 0);">Bash</font>`<font style="color:rgb(0, 0, 0);">中的逻辑运算符包含逻辑或运算符 </font>`<font style="color:rgb(0, 0, 0);">||</font>`<font style="color:rgb(0, 0, 0);">与逻辑与运算符 </font>`<font style="color:rgb(0, 0, 0);">&&</font>`<font style="color:rgb(0, 0, 0);">两种。退出码可以搭配上面提到的两个操作符使用，用来进行条件判断，决定是否执行其他程序：</font>

```bash
# 逻辑运算符的短路效应
true || echo "This will not be printed"
# 无输出，表明echo命令并没有被执行
false && echo "This will not be printed forever"
# 无输出

true && echo "Things went well"
# 输出 Things went well
false || echo "Oops, fail"
# 输出 Oops, fail

# 当要在同一行执行多个命令时，可以使用分号分隔
false ; echo "This will always run"
# 输出 This will always run
```

## 将命令的输出存储到变量中
对于这个问题，也许你受到上一节内容的启发，会尝试着使用流重定向运算符 `>` 来命令的输出流进行重定向，通过这种方式将输出存储到变量中。

```bash
foo=bar
# 尝试将流重定向至 foo 变量
echo "Hello, $foo" > foo
```

但是当你尝试重新输出 `foo` 变量的值时，发现输出如下：

```bash
echo $foo
# bar
```

上面的解决方法对于这个问题是个经典的反例： 重定向运算符 `>` 实际上将命令的输出重定向到一个**文件**，而无法将输出存储到变量中。

如果你使用 `ls`命令，你可以很明显地发现当前目录下出现了一个 `foo` 文件。

解决这种问题的方法是**使用命令替换(**_<font style="color:rgb(0, 0, 0);">command substitution)</font>_，它有两种写法：

1. 采用反引号 ``...`` 
2. (推荐) 使用 `$(...)` 语法

```bash
foo=$(echo "Hello, world")
echo $foo
# Hello, world
```

当使用命令替换的方式来执行命令时，命令的输出结果会替换掉命令替换语法(即 `$(CMD)`)。

比如说执行 `for file in $(ls)` 这条语句时，会先执行 `ls` 命令，然后将执行以后的结果替换掉 `$(ls)`，并<font style="color:rgb(0, 0, 0);">遍历得到的这些返回值。</font>

> Extra：
>
> 还有一个与命令替换类似的冷门特性——进程替换(_<font style="color:rgb(0, 0, 0);">process substitution)。</font>_
>
> `<font style="color:rgb(0, 0, 0);"><( CMD )</font>`<font style="color:rgb(0, 0, 0);"> 会执行 </font>`<font style="color:rgb(0, 0, 0);">CMD</font>`<font style="color:rgb(0, 0, 0);"> 并将结果输出到一个</font>**<font style="color:rgb(0, 0, 0);">临时文件</font>**<font style="color:rgb(0, 0, 0);">中，并将 </font>`<font style="color:rgb(0, 0, 0);"><( CMD )</font>`<font style="color:rgb(0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);">替换成临时文件名</font>**<font style="color:rgb(0, 0, 0);">。</font>
>
> <font style="color:rgb(0, 0, 0);">这在我们希望返回值通过文件而不是 </font>`<font style="color:rgb(0, 0, 0);">STDIN</font>`<font style="color:rgb(0, 0, 0);"> 传递时很有用。例如， </font>`<font style="color:rgb(0, 0, 0);">diff <(ls foo) <(ls bar)</font>`<font style="color:rgb(0, 0, 0);"> 会显示文件夹 </font>`<font style="color:rgb(0, 0, 0);">foo</font>`<font style="color:rgb(0, 0, 0);"> 和 </font>`<font style="color:rgb(0, 0, 0);">bar</font>`<font style="color:rgb(0, 0, 0);"> 中文件的区别。</font>
>

## 例子-1
上面说了这么多，看个例子吧：

```bash
#!/bin/bash

echo "Starting program at $(date)"

echo "Running program $0 with $# arguments with pid $$"

for file in "$@"; do
    # 我们将标准输出流和标准错误流重定向到Null，因为我们并不关心这些信息
    grep foobar "$file" > /dev/null 2> /dev/null
    # 如果没有找到模板字符串，grep的退出状态码会改变
    if [[ $? -ne 0 ]]; then
        echo "File $file does not have any foobar, adding one"
        echo "# foobar" >> "$file"
    fi
done
```

<details class="lake-collapse"><summary id="uc7ec0351"><span class="ne-text" style="font-size: 19px">代码分析(不要一上来就看啊 kuso!)</span></summary><pre data-language="bash" id="Rd4MF" class="ne-codeblock language-bash"><code>#!/bin/bash

echo &quot;Starting program at $(date)&quot; # date会被替换成日期和时间

echo &quot;Running program $0 with $# arguments with pid $$&quot;

for file in &quot;$@&quot;; do
    # 我们将标准输出流和标准错误流重定向到Null，因为我们并不关心这些信息
    # 写入 /dev/null 中的内容会被删除
    # 此处我们不关心文件内容，只关心查找结果(使用退出状态码来表征)
    grep foobar &quot;$file&quot; &gt; /dev/null 2&gt; /dev/null
    # 如果模式没有找到，则grep退出状态为 1
    if [[ $? -ne 0 ]]; then
        # 如果状态码不等于 0 则执行该分支操作
        # -ne 是 test 中的比较操作符之一，详情可以查看 test 的手册
        echo &quot;File $file does not have any foobar, adding one&quot;
        echo &quot;# foobar&quot; &gt;&gt; &quot;$file&quot;
    fi
done</code></pre></details>
## 常用通配符
下表列出了常用的通配符：

| 字符 | 含义 |
| :---: | :---: |
| * | 匹配0到多个字符 |
| ? | 匹配任意一个字符 |
| [list] | 匹配list中的任意单一字符 |
| [**^**list] | 匹配**除list中任意单一字符外**的任意单一字符 |
| [ch_1-ch_2] | 匹配从ch_1到ch_2范围内的任意单一字符 |
| (str_1, str_2, ...) | 匹配元组内的任意一个字符串 |
| {ch_1..ch_2} | 匹配ch_1到ch_2范围内的**全部**字符 |


简单介绍一下部分符号的用法：

+ <font style="color:rgb(0, 0, 0);">通配符 - 当你想要利用通配符进行匹配时，你可以分别使用 </font>`<font style="color:rgb(0, 0, 0);">?</font>`<font style="color:rgb(0, 0, 0);"> 和 </font>`<font style="color:rgb(0, 0, 0);">*</font>`<font style="color:rgb(0, 0, 0);"> 来匹配一个或任意个字符。  
</font><font style="color:rgb(0, 0, 0);">例如，对于文件 </font>`<font style="color:rgb(0, 0, 0);">foo</font>`<font style="color:rgb(0, 0, 0);">, </font>`<font style="color:rgb(0, 0, 0);">foo1</font>`<font style="color:rgb(0, 0, 0);">, </font>`<font style="color:rgb(0, 0, 0);">foo2</font>`<font style="color:rgb(0, 0, 0);">, </font>`<font style="color:rgb(0, 0, 0);">foo10</font>`<font style="color:rgb(0, 0, 0);"> 和 </font>`<font style="color:rgb(0, 0, 0);">bar</font>`<font style="color:rgb(0, 0, 0);">, </font>`<font style="color:rgb(0, 0, 0);">rm foo?</font>`<font style="color:rgb(0, 0, 0);"> 这条命令会删除 </font>`<font style="color:rgb(0, 0, 0);">foo1</font>`<font style="color:rgb(0, 0, 0);"> 和 </font>`<font style="color:rgb(0, 0, 0);">foo2</font>`<font style="color:rgb(0, 0, 0);"> ，而 </font>`<font style="color:rgb(0, 0, 0);">rm foo*</font>`<font style="color:rgb(0, 0, 0);"> 则会删除除了 </font>`<font style="color:rgb(0, 0, 0);">bar</font>`<font style="color:rgb(0, 0, 0);"> 之外的所有文件。</font>
+ <font style="color:rgb(0, 0, 0);">花括号 </font>`<font style="color:rgb(0, 0, 0);">{}</font>`<font style="color:rgb(0, 0, 0);"> - 当你有一系列的指令，其中包含一段公共子串时，可以用花括号来自动展开这些命令。这在</font>**<font style="color:rgb(0, 0, 0);">批量移动或转换文件</font>**<font style="color:rgb(0, 0, 0);">时非常方便。</font>

```bash
mkdir project{1..9}
# 会被展开为
mkdir project1 project2 project3 project4 project5 project6 project7 project8 project9

mv *{.py,.sh} folder
# 这会移动所有 *.py 和 *.sh 文件至 folder 文件夹

# 下面命令会创建 foo/a, foo/b, ... foo/h, bar/a, bar/b, ... bar/h 这些文件
# 实际上是做了一次笛卡尔积之后的结果
touch {foo,bar}/{a..h}
```

# Shell 工具
## tldr - <font style="color:rgb(0, 0, 0);">查看命令如何使用</font>
> 部分术语说明
>
> + 标记 (flag)：一般形式为 `-$lowerCaseLetter`(此处`$lowerCaseLetter`为占位符)。例如 `mkdir -p`
> + 选项(option)：与标记形式类似，不过后面一般会跟上参数。例如 `openapi -client axios`
>

可能你看到这里会有点疑惑：通过 `man`命令或者 `-h,-help`标记已经可以查看命令的详细文档了，为什么还要引入 `tldr` ?

<font style="color:rgb(0, 0, 0);">有时候手册内容太过详实，让我们难以在其中查找哪些最常用的标记和语法。 </font>[TLDR pages](https://tldr.sh/)<font style="color:rgb(0, 0, 0);"> 是一个很不错的替代品，它提供了一些案例，可以帮助您快速找到正确的选项。下面是一些例子：</font>

![使用 tldr 获取 ls 的常见使用案例](./img/L3SAN1XY1dzJLrzf/1726222627916-8d00521a-4651-4e86-a639-38deeb1e80ee-464827.png)

相比之下，`man`命令或者 `-h,-help`标记**(对于仅需要寻找用法的情况来说)**就显得有些丰富了：

![使用 --help 标记获取 ls 的详细帮助文档](./img/L3SAN1XY1dzJLrzf/1726222791719-cd94a242-6fa3-49c7-90f8-9a6b411f11ac-333433.png)

## 查找文件
脱离了 GUI 界面，在命令行交互的系统中，寻找文件这一最常见的任务有些时候真不是那么简单。

不过没关系，`find`命令来救你了！

<font style="color:rgb(0, 0, 0);">所有的类 UNIX 系统都包含一个名为 </font>[find](https://man7.org/linux/man-pages/man1/find.1.html)<font style="color:rgb(0, 0, 0);"> 的工具，它是 shell 上用于查找文件的绝佳工具。</font>

`<font style="color:rgb(0, 0, 0);">find</font>`<font style="color:rgb(0, 0, 0);">命令能够</font>**<font style="color:rgb(0, 0, 0);">递归地</font>**<font style="color:rgb(0, 0, 0);">搜索符合条件的文件，例如：</font>

```bash
# 查找(当前目录中，下同)所有名称为src的文件夹
find . -name src -type d
# 查找所有文件夹路径中包含test的python文件
find . -path '*/test/*.py' -type f
# 查找前一天修改的所有文件
find . -mtime -1
# 查找所有大小在500k至10M的tar.gz文件
find . -size +500k -size -10M -name '*.tar.gz'
```

`find` 的作用远不止于此，除了寻找文件，它还能对找到的文件执行操作(`-exec`选项之后的命令)：

```bash
# 删除全部扩展名为.tmp 的文件
find . -name '*.tmp' -exec rm {} \;
# 查找全部的 PNG 文件并将其转换为 JPG
find . -name '*.png' -exec convert {} {}.jpg \;
```

如果只想做一些简单的操作的话，可以使用 `fd` 指令。例如想要找后缀名为 `.py` 的文件：

+ `find`： `find -name '*.py'`
+ `fd` ： `fd '*.py'`

前面两种命令均是直接搜索文件，如果需要**更高效**，联想到数据库中**插入索引**能让查询速度变快的事实，或许我们需要编制索引或者创建相关的数据库这些手段来解决问题。

<font style="color:rgb(0, 0, 0);">这就要靠 </font>[locate](https://man7.org/linux/man-pages/man1/locate.1.html)<font style="color:rgb(0, 0, 0);"> 了。 </font>`<font style="color:rgb(0, 0, 0);">locate</font>`<font style="color:rgb(0, 0, 0);"> 使用一个由 </font>[updatedb](https://man7.org/linux/man-pages/man1/updatedb.1.html)<font style="color:rgb(0, 0, 0);"> 负责更新的数据库，在大多数系统中 </font>`<font style="color:rgb(0, 0, 0);">updatedb</font>`<font style="color:rgb(0, 0, 0);"> 都会通过 </font>[cron](https://man7.org/linux/man-pages/man8/cron.8.html)<font style="color:rgb(0, 0, 0);"> 每日更新。这便需要我们在速度和时效性之间作出权衡。而且，</font>`<font style="color:rgb(0, 0, 0);">find</font>`<font style="color:rgb(0, 0, 0);"> 和类似的工具可以通过别的属性比如文件大小、修改时间或是权限来查找文件，</font>`<font style="color:rgb(0, 0, 0);">locate</font>`<font style="color:rgb(0, 0, 0);"> 则只能通过文件名。 </font>[这里](https://unix.stackexchange.com/questions/60205/locate-vs-find-usage-pros-and-cons-of-each-other)<font style="color:rgb(0, 0, 0);"> 有一个更详细的对比。</font>

## <font style="color:rgb(0, 0, 0);">查找代码/查找文件内容</font>
查找文件基本上是最频繁的重复劳动，不过更多时候查找文件是为了获取文件里面的信息。

如果想要解决上面所说的问题，使用 `find ... -exec (command)`也许也能满足要求，然而<font style="color:rgb(0, 0, 0);">很多类 UNIX 的系统都提供了</font>`grep`命令以解决该问题。`grep`<font style="color:rgb(0, 0, 0);">是用于对输入文本进行匹配的通用工具，是一个非常重要的 Shell 工具。</font>

`<font style="color:rgb(0, 0, 0);">grep</font>`<font style="color:rgb(0, 0, 0);"> 有很多选项，这也使它成为一个非常全能的工具。其中授课者经常使用的有 ：</font>

+ `<font style="color:rgb(0, 0, 0);">-C</font>`<font style="color:rgb(0, 0, 0);"> ：获取查找结果的上下文（Context）</font>
+ `<font style="color:rgb(0, 0, 0);">-v</font>`<font style="color:rgb(0, 0, 0);"> 将对结果进行反选（Invert），也就是输出不匹配的结果。</font>

<font style="color:rgb(0, 0, 0);">举例来说， </font>`<font style="color:rgb(0, 0, 0);">grep -C 5</font>`<font style="color:rgb(0, 0, 0);"> 会输出匹配结果</font>**<font style="color:rgb(0, 0, 0);">前后五行</font>**<font style="color:rgb(0, 0, 0);">。当需要搜索大量文件的时候，使用 </font>`<font style="color:rgb(0, 0, 0);">-R</font>`<font style="color:rgb(0, 0, 0);"> 会</font>**<font style="color:rgb(0, 0, 0);">递归地</font>**<font style="color:rgb(0, 0, 0);">进入子目录并搜索所有的文本文件。</font>

<font style="color:rgb(0, 0, 0);">不幸的是，因为 </font>`<font style="color:rgb(0, 0, 0);">grep</font>`<font style="color:rgb(0, 0, 0);"> 功能比较全面，牺牲了一些快捷性，所以跟 </font>`<font style="color:rgb(0, 0, 0);">find</font>`<font style="color:rgb(0, 0, 0);"> 类似，它的替代品也开始出现。例如 </font>`<font style="color:rgb(0, 0, 0);">ripgrep(rg)</font>`<font style="color:rgb(0, 0, 0);">，它速度快，而且用法非常符合直觉：</font>

```bash
# 查找所有使用了 requests 库的文件
rg -t py 'import requests'
# 查找所有没有写 shebang 的文件（包含隐藏文件）
rg -u --files-without-match "^#!"
# 查找所有的foo字符串，并打印其之后的5行
rg foo -A 5
# 打印匹配的统计信息（匹配的行和文件的数量）
rg --stats PATTERN
```

## 查找 Shell 命令历史记录
`<font style="color:rgb(0, 0, 0);">history</font>`<font style="color:rgb(0, 0, 0);"> 命令允许您以程序员的方式来访问 shell 中输入的历史命令。这个命令会在标准输出中打印 shell 中的历史命令。</font>

<font style="color:rgb(0, 0, 0);">对于大多数的 shell 来说，也可以使用 </font>`<font style="color:rgb(0, 0, 0);">Ctrl+R</font>`<font style="color:rgb(0, 0, 0);"> 对命令历史记录进行回溯搜索。敲 </font>`<font style="color:rgb(0, 0, 0);">Ctrl+R</font>`<font style="color:rgb(0, 0, 0);"> 后您可以输入子串来进行匹配，查找历史命令行。</font>

<font style="color:rgb(0, 0, 0);">有些插件也能够极大改善命令历史记录搜索体验，例如 </font>[fzf](https://github.com/junegunn/fzf/wiki/Configuring-shell-key-bindings#ctrl-r)、[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)等。

## 文件夹导航
> 笔记整理到这里暂时不想写了，先复制吧(倒)
>

<font style="color:rgb(0, 0, 0);">之前对所有操作我们都默认一个前提，即您已经位于想要执行命令的目录下，但是如何才能高效地在目录间随意切换呢？有很多简便的方法可以做到，比如设置 alias，使用 </font>[<font style="color:rgb(0, 0, 0);">ln -s</font>](https://man7.org/linux/man-pages/man1/ln.1.html)<font style="color:rgb(0, 0, 0);"> 创建符号连接等。而开发者们已经想到了很多更为精妙的解决方案。</font>

<font style="color:rgb(0, 0, 0);">由于本课程的目的是尽可能对你的日常习惯进行优化。因此，我们可以使用</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">fasd</font>](https://github.com/clvv/fasd)<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">和</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">autojump</font>](https://github.com/wting/autojump)<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">这两个工具来查找最常用或最近使用的文件和目录。</font>

<font style="color:rgb(0, 0, 0);">Fasd 基于</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">frecency</font>](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Frecency_algorithm)<font style="color:rgb(0, 0, 0);">对文件和文件排序，也就是说它会同时针对频率（</font>_<font style="color:rgb(0, 0, 0);">frequency</font>_<font style="color:rgb(0, 0, 0);">）和时效（</font>_<font style="color:rgb(0, 0, 0);">recency</font>_<font style="color:rgb(0, 0, 0);">）进行排序。默认情况下，</font>`<font style="color:rgb(0, 0, 0);">fasd</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">使用命令</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">z</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">帮助我们快速切换到最常访问的目录。例如， 如果您经常访问</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">/home/user/files/cool_project</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">目录，那么可以直接使用</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">z cool</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">跳转到该目录。对于 autojump，则使用</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">j cool</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">代替即可。</font>

<font style="color:rgb(0, 0, 0);">还有一些更复杂的工具可以用来概览目录结构，例如 </font>[<font style="color:rgb(0, 0, 0);">tree</font>](https://linux.die.net/man/1/tree)<font style="color:rgb(0, 0, 0);">, </font>[<font style="color:rgb(0, 0, 0);">broot</font>](https://github.com/Canop/broot)<font style="color:rgb(0, 0, 0);"> 或更加完整的文件管理器，例如 </font>[<font style="color:rgb(0, 0, 0);">nnn</font>](https://github.com/jarun/nnn)<font style="color:rgb(0, 0, 0);"> 或 </font>[<font style="color:rgb(0, 0, 0);">ranger</font>](https://github.com/ranger/ranger)<font style="color:rgb(0, 0, 0);">。</font>



> 更新: 2024-09-15 15:38:39  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/bpdxr02nytzd3dgi>