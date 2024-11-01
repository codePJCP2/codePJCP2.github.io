# Mini Lab 1: pstree

> 前言：由于 Online Judge 目前不开放，因此所有的程序均在本地完成并进行测试。
>
> 说明：由于写的比较烂，这里就不贴源码了:(
>

# `Man pstree` (Custom Version)
## Overview
`<font style="color:rgb(15, 23, 42);">pstree [</font><u><font style="color:rgb(15, 23, 42);">OPTION</font></u><font style="color:rgb(15, 23, 42);">]…</font>`

## <font style="color:rgb(15, 23, 42);">Description in Chinese</font>
<font style="color:rgb(15, 23, 42);">把系统中的进程按照父亲-孩子的树状结构打印到终端。</font>

+ `-p`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">或</font><font style="color:rgb(15, 23, 42);"> </font>`--show-pids`<font style="color:rgb(15, 23, 42);">: 打印每个进程的进程号。</font>
+ `-n`<font style="color:rgb(15, 23, 42);"> 或 </font>`--numeric-sort`<font style="color:rgb(15, 23, 42);">: 按照</font>`<font style="color:rgb(15, 23, 42);">pid</font>`<font style="color:rgb(15, 23, 42);">的数值</font>**<font style="color:rgb(15, 23, 42);">从小到大</font>**<font style="color:rgb(15, 23, 42);">顺序输出一个进程的直接孩子。</font>
+ `-V`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">或</font><font style="color:rgb(15, 23, 42);"> </font>`--version`<font style="color:rgb(15, 23, 42);">: 打印版本信息。</font>

<font style="color:rgb(15, 23, 42);">你可以在命令行中观察系统的 </font>`pstree`<font style="color:rgb(15, 23, 42);"> 的执行行为 (如执行 </font>`pstree -V`<font style="color:rgb(15, 23, 42);">、</font>`pstree --show-pids`<font style="color:rgb(15, 23, 42);"> 等)。这些参数可能任意组合，但你不需要处理单字母参数合并的情况，例如 </font>`-np`<font style="color:rgb(15, 23, 42);">。</font>

## Explaination
<font style="color:rgb(15, 23, 42);">以下对 </font>`<font style="color:rgb(15, 23, 42);">pstree</font>`<font style="color:rgb(15, 23, 42);"> 总览和描述的一些解释：</font>

1. <font style="color:rgb(15, 23, 42);">中括号扩起的参数是可选参数，</font>`[]`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">后的</font><font style="color:rgb(15, 23, 42);"> </font>`…`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">代表参数的 0 次或多次重复。因此</font><font style="color:rgb(15, 23, 42);"> </font>`-p`<font style="color:rgb(15, 23, 42);">,</font><font style="color:rgb(15, 23, 42);"> </font>`-n`<font style="color:rgb(15, 23, 42);">,</font><font style="color:rgb(15, 23, 42);"> </font>`-V`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">都是可选的参数。</font>
2. <font style="color:rgb(15, 23, 42);">同一个选项可以有别名。在</font><font style="color:rgb(15, 23, 42);"> </font>`pstree`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">中，</font>`-p`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">和</font><font style="color:rgb(15, 23, 42);"> </font>`--show-pids`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">的含义是一样的。</font>
3. <font style="color:rgb(15, 23, 42);">若不另行说明，整数范围在 32 位有符号整数范围内；但如果数值和文件大小有关，则其合法的范围是是 0 到系统最大支持的文件大小。</font>

# <font style="color:rgb(15, 23, 42);">Guide of the Experiment</font>
## Steps to Problem Solving
我们可以把 `pstree` 的实现分解成以下几个小问题的实现：

1. 根据命令行选项选择功能(使用变量存储功能模式)
2. 得到系统中每个进程的编号，保存到列表中
3. 根据每个进程的编号，寻找其对应的父进程编号
4. 建树，根据输入的选项进行排序或其余操作
5. 打印树

## 获取命令行参数
这部分倒是很简单，使用 main 函数中的 `argv` 数组即可获取命令行参数。

## 获取进程信息
在其他操作系统中，获取进程的信息可能涉及到程序进程跟踪或者直接访问内核内存等多方面的复杂操作。然而在 `Every thing is a file.` 的 Linux 系统中， 可以直接使用它提供的 [procfs](https://en.wikipedia.org/wiki/Procfs)(Proc File System) 来解决这一问题。

procfs 是包含在类 Unix 系统中的一个特殊的文件系统，内部包含了关于进程信息以及其余相关的系统信息的文件/目录。procfs 提供了一个标准化且便捷的方式去动态获取原先位于内核中的进程信息。在 Linux 中，procfs 对应的目录为 `/proc` 。我们可以使用 `ls` 命令稍微查看一下里面的内容：

```bash
$ ls -lh /proc

# Most of the contents are ignored.
total 0
dr-xr-xr-x  9 root             root                0  9月 20 13:41 1
dr-xr-xr-x  9 root             root                0  9月 20 13:41 100
dr-xr-xr-x  9 root             root                0  9月 20 13:41 101
dr-xr-xr-x  9 root             root                0  9月 20 13:41 102
dr-xr-xr-x  9 root             root                0  9月 20 13:41 103
# ...
dr-xr-xr-x  9 systemd-oom      systemd-oom         0  9月 20 13:41 640
dr-xr-xr-x  9 systemd-resolve  systemd-resolve     0  9月 20 13:41 643
dr-xr-xr-x  9 systemd-timesync systemd-timesync    0  9月 20 13:41 645
dr-xr-xr-x  9 root             root                0  9月 20 13:41 649
dr-xr-xr-x  9 messagebus       messagebus          0  9月 20 13:41 742
dr-xr-xr-x  9 root             root                0  9月 20 13:41 77
dr-xr-xr-x  9 syslog           syslog              0  9月 20 13:41 770
# ...
dr-xr-xr-x  9 kernoops         adm                 0  9月 20 13:41 994
# ...
dr-xr-xr-x  3 root             root                0  9月 20 13:41 acpi
dr-xr-xr-x 12 root             root                0  9月 20 13:41 asound
-r--r--r--  1 root             root                0  9月 20 13:44 bootconfig
-r--r--r--  1 root             root                0  9月 20 13:44 buddyinfo
dr-xr-xr-x  4 root             root                0  9月 20 13:44 bus
-r--r--r--  1 root             root                0  9月 20 13:41 cgroups
-r--r--r--  1 root             root              176  9月 20 13:41 cmdline
-r--r--r--  1 root             root                0  9月 20 13:44 consoles
-r--r--r--  1 root             root                0  9月 20 13:41 cpuinfo
-r--r--r--  1 root             root                0  9月 20 13:44 crypto
-r--r--r--  1 root             root                0  9月 20 13:41 devices
-r--r--r--  1 root             root                0  9月 20 13:41 diskstats
-r--r--r--  1 root             root                0  9月 20 13:41 meminfo
-r--r--r--  1 root             root                0  9月 20 13:44 misc
-r--r--r--  1 root             root                0  9月 20 13:41 modules
# ...
```

关于 Linux 中 `/proc` 目录下的详细内容，可以查阅[该网站](https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/proc.html)或者 `man proc`。这里只列举和进程有关且相对有用的一些内容：

+ `<font style="color:rgb(0, 0, 0);">/proc/PID/status</font>`

<font style="color:rgb(0, 0, 0);">Process status in human readable form.</font>

+ `<font style="color:rgb(0, 0, 0);">/proc/PID/root</font>`

<font style="color:rgb(0, 0, 0);">Link to the root directory of this process.</font>

+ `<font style="color:rgb(0, 0, 0);">/proc/PID/environ</font>`

<font style="color:rgb(0, 0, 0);">Values of environment variables.</font>

+ `<font style="color:rgb(0, 0, 0);">/proc/PID/cmdline</font>`

<font style="color:rgb(0, 0, 0);">Command line arguments.</font>

+ etc.

这里我们令 `PID = 745`，来查看一下这个进程的 `status` 文件里面的内容。

```bash
$ cat /proc/749/status

Name:	NetworkManager
Umask:	0022
State:	S (sleeping)
Tgid:	745
Ngid:	0
# What does they stand for?
Pid:	745
PPid:	1
# ...
Groups:	 
NStgid:	745
NSpid:	745
NSpgid:	745
NSsid:	745
# ... more contents are ignored
```

我们再次执行 `pstree -p` 命令来查看一下进程树的内容：

```bash
$ pstree -p

systemd(1)─┬─ModemManager(833)─┬─{ModemManager}(877)
           │                   └─{ModemManager}(886)
           ├─NetworkManager(745)─┬─{NetworkManager}(791)
           │                     └─{NetworkManager}(792)
           ├─VGAuthService(656)
           |- ...
```

```plain
# its own PID
Pid:	745
# its parent process's PID
PPid:	1
```

对比这两段代码，也许你可以发现：每一个进程当中记录了自己的 `PID`，以及父进程的 `PID` 。

这样一来，只需要遍历 `/proc` 目录下名称为**数字**的目录(可以去翻翻 `man /proc`)，获取每个进程自己的 `PID` 以及父进程的 `PID` 信息，即可获得整个系统进程的分布信息。

```plain
// Most of them aren't shown here.
name: systemd
pid: 1	 ppid:0
name: kthreadd
pid: 2	 ppid:0
name: systemd-journal
pid: 360	 ppid:1
name: vmware-vmblock-
pid: 389	 ppid:1
name: systemd-udevd
pid: 411	 ppid:1
name: systemd-oomd
pid: 644	 ppid:1
name: systemd-resolve
pid: 645	 ppid:1
name: systemd-timesyn
pid: 648	 ppid:1
name: ModemManager
pid: 900	 ppid:1
name: cupsd
pid: 922	 ppid:1
name: unattended-upgr
pid: 933	 ppid:1
name: sshd
pid: 952	 ppid:1
name: gdm3
pid: 970	 ppid:1
name: cups-browsed
pid: 1002	 ppid:1
name: kerneloops
pid: 1026	 ppid:1
name: kerneloops
pid: 1035	 ppid:1
name: rtkit-daemon
pid: 1097	 ppid:1
name: upowerd
pid: 1220	 ppid:1
name: packagekitd
pid: 1226	 ppid:1
name: colord
pid: 1385	 ppid:1
name: systemd
pid: 1476	 ppid:1
name: node
pid: 3518	 ppid:3514
name: node
pid: 3573	 ppid:3518
name: node
pid: 6500	 ppid:3518
name: node
pid: 6511	 ppid:3518
name: zsh
pid: 19614	 ppid:3573
name: sshd
pid: 6450	 ppid:6413
name: sh
pid: 6451	 ppid:6450
name: code-38c31bc77e
pid: 6469	 ppid:6451
name: sleep
pid: 23092	 ppid:6451
name: cpptools
pid: 6553	 ppid:6500
name: pstree-64
pid: 23494	 ppid:19614
```

## 在内存中创建树
在打印树之前，还有一件重要事情要做：**得先有树**吧？或者说，你**得先有能表示树结构的东西**吧？

本实验中本人打算采用邻接表(Adjacency table)来存储图的数据，大致结构如下：(其实有点像哈希表的**分离链接法**)

![画板](./img/VKmF6_brZqi_jfuy/1726916127367-4808a197-38fd-4e91-b718-0e708e511292-644712.jpeg)

主要的思路是：

+ 将 2.3 节中获取的信息排序(当然，只在 `-n, --numric-sort` 选项启用时进行该步操作，使用自定义排序函数)
+ 遍历之前获取的进程信息列表(包含 `name`、`pid`、`p(arent)pid` 三个属性)，先获取所有**父进程号的集合(Set)**，并将其转化为结点存储至 `adjacency table` 中。
+ 再次遍历进程信息列表，对于每一个进程，在 `adjacency table` 中寻找它们的父进程对应的结点(可以使用进程的 `ppid` 进行查找比对)，并将该进程插入到父进程结点对应的子进程列表中。
+ 此时已经完成了邻接表数据的载入，也就相当于完成了一张图(树)的构建工作。

## 打印树
别急，在打印树之前，先来参照一下 `pstree` 命令的输出：

```bash
$ pstree -p

systemd(1)─┬─ModemManager(833)─┬─{ModemManager}(877)
           │                   └─{ModemManager}(886)
           ├─NetworkManager(745)─┬─{NetworkManager}(791)
           │                     └─{NetworkManager}(792)
           ├─VGAuthService(656)
           |- ...
```

可以看到，这棵树的根为 `systemd`，它的 PID = 1。

那我们也可以从 PID = 1 的地方下手，逐步遍历它的子进程列表，每遇到一个子进程，就尝试去邻接表当中获取到该进程对应的子进程列表信息，逐步遍历并打印...直到 PID = 1 的进程的子进程列表被遍历完成时，结束打印。

对于树的递归遍历，你很难不想到 DFS 与 BFS，对于这里的打印需求，DFS 可能更简单一些。然后我们就得到了我们自己实现的 `pstree`。

> But 我失败了，似乎是载入邻接表的时候出了问题，查了好久也没查出问题，于是暂时放弃了 XD。
>

对于 `-p, --show-pid` 标志，在打印进程的时候在进程后跟上它的进程号即可。

# Is that all?
<font style="color:rgb(15, 23, 42);">和系统打交道的编程可有更多的麻烦之处：</font>

1. <font style="color:rgb(15, 23, 42);">你的程序遵守 POSIX 的返回值规定吗？如果你的 main 函数返回了非 0 的数值，我们将认为程序报告了错误——在非法的输入上返回 0，以及在合法的输入上返回非 0 都将导致 Wrong Answer。</font>
2. <font style="color:rgb(15, 23, 42);">程序够 </font>_<font style="color:rgb(15, 23, 42);">robust</font>_<font style="color:rgb(15, 23, 42);"> 吗？它会不会在一些非法的输入上 </font>_<font style="color:rgb(15, 23, 42);">crash</font>_<font style="color:rgb(15, 23, 42);">？如果系统里的进程很多呢？如果内存不够了呢？如果 </font>`open`<font style="color:rgb(15, 23, 42);"> 或者 </font>`malloc`<font style="color:rgb(15, 23, 42);"> 失败了呢？要知道，</font>_<font style="color:rgb(15, 23, 42);">crash</font>_<font style="color:rgb(15, 23, 42);"> 一般是因为 </font>[<font style="color:rgb(15, 23, 42);">undefined behavior (UB)</font>](https://en.wikipedia.org/wiki/Undefined_behavior)<font style="color:rgb(15, 23, 42);"> 导致的——UB 没把所有的文件都删掉真是谢天谢地了。</font>
3. <font style="color:rgb(15, 23, 42);">万一我得到进程号以后，进去发现文件没了 (进程终止了)，怎么办？会不会有这种情况？万一有我的程序会不会 </font>_<font style="color:rgb(15, 23, 42);">crash</font>_<font style="color:rgb(15, 23, 42);">……？</font>
4. <font style="color:rgb(15, 23, 42);">进程的信息一直在变，文件的内容也一直在变 (两次 </font>`cat`<font style="color:rgb(15, 23, 42);"> 的结果不同)。那我会不会读到不一致的信息 (前一半是旧信息、新一半是新信息)？这两个问题都是 </font>_<font style="color:rgb(15, 23, 42);">race condition</font>_<font style="color:rgb(15, 23, 42);"> 导致的；我们将会在</font>**<font style="color:rgb(15, 23, 42);">并发</font>**<font style="color:rgb(15, 23, 42);">部分回到这个话题。</font>
5. <font style="color:rgb(15, 23, 42);">如果我不确信这些事会不会发生，我有没有写一个程序，至少在压力环境下</font>**<font style="color:rgb(15, 23, 42);">测试</font>**<font style="color:rgb(15, 23, 42);">一下它们有没有可能发生？嗯，如果我同时运行很多程序，每个程序都不断扫描目录、读取文件，也观察不到这个问题，至少应该可以放点心。</font>

<font style="color:rgb(15, 23, 42);">随着课程的深入，这些问题都会得到解答。</font>



> 更新: 2024-09-23 14:08:11  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/ems6bpdx8hakrbtn>