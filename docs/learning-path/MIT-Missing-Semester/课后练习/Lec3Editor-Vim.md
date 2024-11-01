# Lec3 Editor - Vim

1. <font style="color:rgb(0, 0, 0);">完成 </font>`<font style="color:rgb(0, 0, 0);">vimtutor</font>`<font style="color:rgb(0, 0, 0);">。备注：它在一个 </font>[<font style="color:rgb(0, 0, 0);">80x24</font>](https://en.wikipedia.org/wiki/VT100)<font style="color:rgb(0, 0, 0);">（80 列，24 行） 终端窗口看起来效果最好。</font>
2. <font style="color:rgb(0, 0, 0);">下载我们提供的</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">vimrc</font>](https://missing-semester-cn.github.io/2020/files/vimrc)<font style="color:rgb(0, 0, 0);">，然后把它保存到</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">~/.vimrc</font>`<font style="color:rgb(0, 0, 0);">。 通读这个注释详细的文件 （用 Vim!）， 然后观察 Vim 在这个新的设置下看起来和使用起来有哪些细微的区别。</font>

<font style="color:rgb(0, 0, 0);"></font>

3. <font style="color:rgb(0, 0, 0);">安装和配置一个插件：</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">ctrlp.vim</font>](https://github.com/ctrlpvim/ctrlp.vim)<font style="color:rgb(0, 0, 0);">.</font>
    1. <font style="color:rgb(0, 0, 0);">用</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">mkdir -p ~/.vim/pack/vendor/start</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">创建插件文件夹</font>
    2. <font style="color:rgb(0, 0, 0);">下载这个插件：</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">cd ~/.vim/pack/vendor/start; git clone https://github.com/ctrlpvim/ctrlp.vim</font>`
    3. <font style="color:rgb(0, 0, 0);">阅读这个插件的</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">文档</font>](https://github.com/ctrlpvim/ctrlp.vim/blob/master/readme.md)<font style="color:rgb(0, 0, 0);">。 尝试用 CtrlP 来在一个工程文件夹里定位一个文件，打开 Vim, 然后用 Vim 命令控制行开始</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">:CtrlP</font>`<font style="color:rgb(0, 0, 0);">.</font>
    4. <font style="color:rgb(0, 0, 0);">自定义 CtrlP：添加</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">configuration</font>](https://github.com/ctrlpvim/ctrlp.vim/blob/master/readme.md#basic-options)<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">到你的</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">~/.vimrc</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">来用按 Ctrl-P 打开 CtrlP</font>

<font style="color:rgb(0, 0, 0);"></font>

4. <font style="color:rgb(0, 0, 0);">练习使用 Vim, 在你自己的机器上重做课上完成的演示。</font>

```python
def fizz_buzz(limit):
    for i in range(limit):
        if i % 3 == 0:
            print('fizz')
        if i % 5 == 0:
            print('fizz')
        if i % 3 and i % 5:
            print(i)

def main():
    fizz_buzz(10)
```

演示代码中主要的问题点在于：

    1. 主函数 `main` 未被调用
    2. `for` 循环从 0 开始 -> 期望：从 1 开始
    3. 当 `i` 为 15 的整数倍时，会在不同行输出信息 -> 期望：这种情况下信息显示在同行
    4. 当 `i` 为 5 的整数倍时，输出 fizz -> 期望：输出 buzz
    5. <font style="color:rgb(0, 0, 0);">采用硬编码的参数 10 -> 期望：采用从命令行接收到的参数</font>

<font style="color:rgb(0, 0, 0);"></font>

5. <font style="color:rgb(0, 0, 0);">下个月用 Vim 完成 </font>_<font style="color:rgb(0, 0, 0);">所有的</font>_<font style="color:rgb(0, 0, 0);"> 文件编辑。每当不够高效的时候，或者你感觉 “一定有一个更好的方式”时， 尝试 STFW 与 RTFM，或者 ATFAI，很有可能有一个更好的方式。</font>
6. <font style="color:rgb(0, 0, 0);">在其他工具中设置 Vim 快捷键 （见</font>[类 Vim 按键绑定的软件](https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/qu4d617dfq030837#YTAXa)<font style="color:rgb(0, 0, 0);">与</font>[扩展资料](https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/qu4d617dfq030837#UZyQW)<font style="color:rgb(0, 0, 0);">）。</font>

<font style="color:rgb(0, 0, 0);"></font>

7. <font style="color:rgb(0, 0, 0);">进一步自定义你的</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">~/.vimrc</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">和安装更多插件。</font>

<font style="color:rgb(0, 0, 0);"></font>

8. <font style="color:rgb(0, 0, 0);">（高阶）用 Vim 宏将 XML 转换到 JSON (</font>[<font style="color:rgb(0, 0, 0);">例子文件</font>](https://missing-semester-cn.github.io/2020/files/example-data.xml)<font style="color:rgb(0, 0, 0);">)。 尝试着先完全自己做，但是在你卡住的时候可以查看笔记中提到的</font>[宏](https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/qu4d617dfq030837#F5q9f)<font style="color:rgb(0, 0, 0);">章节。</font>

<font style="color:rgb(0, 0, 0);"></font>



> 更新: 2024-09-15 17:06:07  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/ib7pyoamikh1k867>