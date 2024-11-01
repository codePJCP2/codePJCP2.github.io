<template><div><h1 id="mini-lab-1-pstree" tabindex="-1"><a class="header-anchor" href="#mini-lab-1-pstree"><span>Mini Lab 1: pstree</span></a></h1>
<blockquote>
<p>前言：由于 Online Judge 目前不开放，因此所有的程序均在本地完成并进行测试。</p>
<p>说明：由于写的比较烂，这里就不贴源码了:(</p>
</blockquote>
<h1 id="man-pstree-custom-version" tabindex="-1"><a class="header-anchor" href="#man-pstree-custom-version"><span><code v-pre>Man pstree</code> (Custom Version)</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p><code v-pre>&lt;font style=&quot;color:rgb(15, 23, 42);&quot;&gt;pstree [&lt;/font&gt;&lt;u&gt;&lt;font style=&quot;color:rgb(15, 23, 42);&quot;&gt;OPTION&lt;/font&gt;&lt;/u&gt;&lt;font style=&quot;color:rgb(15, 23, 42);&quot;&gt;]…&lt;/font&gt;</code></p>
<h2 id="description-in-chinese" tabindex="-1"><a class="header-anchor" href="#description-in-chinese"><span><font style="color:rgb(15, 23, 42);">Description in Chinese</font></span></a></h2>
<font style="color:rgb(15, 23, 42);">把系统中的进程按照父亲-孩子的树状结构打印到终端。</font><ul>
<li><code v-pre>-p</code><font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">或</font><font style="color:rgb(15, 23, 42);"> </font><code v-pre>--show-pids</code><font style="color:rgb(15, 23, 42);">: 打印每个进程的进程号。</font></li>
<li><code v-pre>-n</code><font style="color:rgb(15, 23, 42);"> 或 </font><code v-pre>--numeric-sort</code><font style="color:rgb(15, 23, 42);">: 按照</font><code v-pre>&lt;font style=&quot;color:rgb(15, 23, 42);&quot;&gt;pid&lt;/font&gt;</code><font style="color:rgb(15, 23, 42);">的数值</font><strong><font style="color:rgb(15, 23, 42);">从小到大</font></strong><font style="color:rgb(15, 23, 42);">顺序输出一个进程的直接孩子。</font></li>
<li><code v-pre>-V</code><font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">或</font><font style="color:rgb(15, 23, 42);"> </font><code v-pre>--version</code><font style="color:rgb(15, 23, 42);">: 打印版本信息。</font></li>
</ul>
<font style="color:rgb(15, 23, 42);">你可以在命令行中观察系统的 </font>`pstree`<font style="color:rgb(15, 23, 42);"> 的执行行为 (如执行 </font>`pstree -V`<font style="color:rgb(15, 23, 42);">、</font>`pstree --show-pids`<font style="color:rgb(15, 23, 42);"> 等)。这些参数可能任意组合，但你不需要处理单字母参数合并的情况，例如 </font>`-np`<font style="color:rgb(15, 23, 42);">。</font><h2 id="explaination" tabindex="-1"><a class="header-anchor" href="#explaination"><span>Explaination</span></a></h2>
<font style="color:rgb(15, 23, 42);">以下对 </font>`<font style="color:rgb(15, 23, 42);">pstree</font>`<font style="color:rgb(15, 23, 42);"> 总览和描述的一些解释：</font><ol>
<li>
<font style="color:rgb(15, 23, 42);">中括号扩起的参数是可选参数，</font>`[]`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">后的</font><font style="color:rgb(15, 23, 42);"> </font>`…`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">代表参数的 0 次或多次重复。因此</font><font style="color:rgb(15, 23, 42);"> </font>`-p`<font style="color:rgb(15, 23, 42);">,</font><font style="color:rgb(15, 23, 42);"> </font>`-n`<font style="color:rgb(15, 23, 42);">,</font><font style="color:rgb(15, 23, 42);"> </font>`-V`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">都是可选的参数。</font></li>
<li>
<font style="color:rgb(15, 23, 42);">同一个选项可以有别名。在</font><font style="color:rgb(15, 23, 42);"> </font>`pstree`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">中，</font>`-p`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">和</font><font style="color:rgb(15, 23, 42);"> </font>`--show-pids`<font style="color:rgb(15, 23, 42);"> </font><font style="color:rgb(15, 23, 42);">的含义是一样的。</font></li>
<li>
<font style="color:rgb(15, 23, 42);">若不另行说明，整数范围在 32 位有符号整数范围内；但如果数值和文件大小有关，则其合法的范围是是 0 到系统最大支持的文件大小。</font></li>
</ol>
<h1 id="guide-of-the-experiment" tabindex="-1"><a class="header-anchor" href="#guide-of-the-experiment"><span><font style="color:rgb(15, 23, 42);">Guide of the Experiment</font></span></a></h1>
<h2 id="steps-to-problem-solving" tabindex="-1"><a class="header-anchor" href="#steps-to-problem-solving"><span>Steps to Problem Solving</span></a></h2>
<p>我们可以把 <code v-pre>pstree</code> 的实现分解成以下几个小问题的实现：</p>
<ol>
<li>根据命令行选项选择功能(使用变量存储功能模式)</li>
<li>得到系统中每个进程的编号，保存到列表中</li>
<li>根据每个进程的编号，寻找其对应的父进程编号</li>
<li>建树，根据输入的选项进行排序或其余操作</li>
<li>打印树</li>
</ol>
<h2 id="获取命令行参数" tabindex="-1"><a class="header-anchor" href="#获取命令行参数"><span>获取命令行参数</span></a></h2>
<p>这部分倒是很简单，使用 main 函数中的 <code v-pre>argv</code> 数组即可获取命令行参数。</p>
<h2 id="获取进程信息" tabindex="-1"><a class="header-anchor" href="#获取进程信息"><span>获取进程信息</span></a></h2>
<p>在其他操作系统中，获取进程的信息可能涉及到程序进程跟踪或者直接访问内核内存等多方面的复杂操作。然而在 <code v-pre>Every thing is a file.</code> 的 Linux 系统中， 可以直接使用它提供的 <a href="https://en.wikipedia.org/wiki/Procfs" target="_blank" rel="noopener noreferrer">procfs</a>(Proc File System) 来解决这一问题。</p>
<p>procfs 是包含在类 Unix 系统中的一个特殊的文件系统，内部包含了关于进程信息以及其余相关的系统信息的文件/目录。procfs 提供了一个标准化且便捷的方式去动态获取原先位于内核中的进程信息。在 Linux 中，procfs 对应的目录为 <code v-pre>/proc</code> 。我们可以使用 <code v-pre>ls</code> 命令稍微查看一下里面的内容：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> ls</span><span style="color:#A3BE8C"> -lh</span><span style="color:#A3BE8C"> /proc</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># Most of the contents are ignored.</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">total</span><span style="color:#B48EAD"> 0</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 1</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 100</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 101</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 102</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 103</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># ...</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> systemd-oom</span><span style="color:#A3BE8C">      systemd-oom</span><span style="color:#B48EAD">         0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 640</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> systemd-resolve</span><span style="color:#A3BE8C">  systemd-resolve</span><span style="color:#B48EAD">     0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 643</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> systemd-timesync</span><span style="color:#A3BE8C"> systemd-timesync</span><span style="color:#B48EAD">    0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 645</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 649</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> messagebus</span><span style="color:#A3BE8C">       messagebus</span><span style="color:#B48EAD">          0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 742</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 77</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> syslog</span><span style="color:#A3BE8C">           syslog</span><span style="color:#B48EAD">              0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 770</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># ...</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  9</span><span style="color:#A3BE8C"> kernoops</span><span style="color:#A3BE8C">         adm</span><span style="color:#B48EAD">                 0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#B48EAD"> 994</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># ...</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  3</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> acpi</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD"> 12</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> asound</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:44</span><span style="color:#A3BE8C"> bootconfig</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:44</span><span style="color:#A3BE8C"> buddyinfo</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">dr-xr-xr-x</span><span style="color:#B48EAD">  4</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:44</span><span style="color:#A3BE8C"> bus</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> cgroups</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">              176</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> cmdline</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:44</span><span style="color:#A3BE8C"> consoles</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> cpuinfo</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:44</span><span style="color:#A3BE8C"> crypto</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> devices</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> diskstats</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> meminfo</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:44</span><span style="color:#A3BE8C"> misc</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">-r--r--r--</span><span style="color:#B48EAD">  1</span><span style="color:#A3BE8C"> root</span><span style="color:#A3BE8C">             root</span><span style="color:#B48EAD">                0</span><span style="color:#A3BE8C">  9月</span><span style="color:#B48EAD"> 20</span><span style="color:#A3BE8C"> 13:41</span><span style="color:#A3BE8C"> modules</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># ...</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于 Linux 中 <code v-pre>/proc</code> 目录下的详细内容，可以查阅<a href="https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/proc.html" target="_blank" rel="noopener noreferrer">该网站</a>或者 <code v-pre>man proc</code>。这里只列举和进程有关且相对有用的一些内容：</p>
<ul>
<li><code v-pre>&lt;font style=&quot;color:rgb(0, 0, 0);&quot;&gt;/proc/PID/status&lt;/font&gt;</code></li>
</ul>
<font style="color:rgb(0, 0, 0);">Process status in human readable form.</font><ul>
<li><code v-pre>&lt;font style=&quot;color:rgb(0, 0, 0);&quot;&gt;/proc/PID/root&lt;/font&gt;</code></li>
</ul>
<font style="color:rgb(0, 0, 0);">Link to the root directory of this process.</font><ul>
<li><code v-pre>&lt;font style=&quot;color:rgb(0, 0, 0);&quot;&gt;/proc/PID/environ&lt;/font&gt;</code></li>
</ul>
<font style="color:rgb(0, 0, 0);">Values of environment variables.</font><ul>
<li><code v-pre>&lt;font style=&quot;color:rgb(0, 0, 0);&quot;&gt;/proc/PID/cmdline&lt;/font&gt;</code></li>
</ul>
<font style="color:rgb(0, 0, 0);">Command line arguments.</font><ul>
<li>etc.</li>
</ul>
<p>这里我们令 <code v-pre>PID = 745</code>，来查看一下这个进程的 <code v-pre>status</code> 文件里面的内容。</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> cat</span><span style="color:#A3BE8C"> /proc/749/status</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">Name:</span><span style="color:#A3BE8C">	NetworkManager</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">Umask:</span><span style="color:#B48EAD">	0022</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">State:</span><span style="color:#A3BE8C">	S</span><span style="color:#D8DEE9FF"> (sleeping)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">Tgid:</span><span style="color:#B48EAD">	745</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">Ngid:</span><span style="color:#B48EAD">	0</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># What does they stand for?</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">Pid:</span><span style="color:#B48EAD">	745</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">PPid:</span><span style="color:#B48EAD">	1</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># ...</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">Groups:</span><span style="color:#D8DEE9FF">	 </span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">NStgid:</span><span style="color:#B48EAD">	745</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">NSpid:</span><span style="color:#B48EAD">	745</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">NSpgid:</span><span style="color:#B48EAD">	745</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">NSsid:</span><span style="color:#B48EAD">	745</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># ... more contents are ignored</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再次执行 <code v-pre>pstree -p</code> 命令来查看一下进程树的内容：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> pstree</span><span style="color:#A3BE8C"> -p</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">systemd(1</span><span style="color:#D8DEE9FF">)─┬─ModemManager(</span><span style="color:#88C0D0">833</span><span style="color:#D8DEE9FF">)─┬─{</span><span style="color:#88C0D0">ModemManager}(877</span><span style="color:#D8DEE9FF">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           │</span><span style="color:#A3BE8C">                   └─{ModemManager}</span><span style="color:#ECEFF4">(</span><span style="color:#88C0D0">886</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           ├─NetworkManager(745</span><span style="color:#D8DEE9FF">)─┬─{</span><span style="color:#88C0D0">NetworkManager}(791</span><span style="color:#D8DEE9FF">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           │</span><span style="color:#A3BE8C">                     └─{NetworkManager}</span><span style="color:#ECEFF4">(</span><span style="color:#88C0D0">792</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           ├─VGAuthService(656</span><span style="color:#D8DEE9FF">)</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">           |</span><span style="color:#88C0D0">-</span><span style="color:#A3BE8C"> ...</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span># its own PID</span></span></span>
<span class="line"><span class="line"><span>Pid:	745</span></span></span>
<span class="line"><span class="line"><span># its parent process's PID</span></span></span>
<span class="line"><span class="line"><span>PPid:	1</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对比这两段代码，也许你可以发现：每一个进程当中记录了自己的 <code v-pre>PID</code>，以及父进程的 <code v-pre>PID</code> 。</p>
<p>这样一来，只需要遍历 <code v-pre>/proc</code> 目录下名称为<strong>数字</strong>的目录(可以去翻翻 <code v-pre>man /proc</code>)，获取每个进程自己的 <code v-pre>PID</code> 以及父进程的 <code v-pre>PID</code> 信息，即可获得整个系统进程的分布信息。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>// Most of them aren't shown here.</span></span></span>
<span class="line"><span class="line"><span>name: systemd</span></span></span>
<span class="line"><span class="line"><span>pid: 1	 ppid:0</span></span></span>
<span class="line"><span class="line"><span>name: kthreadd</span></span></span>
<span class="line"><span class="line"><span>pid: 2	 ppid:0</span></span></span>
<span class="line"><span class="line"><span>name: systemd-journal</span></span></span>
<span class="line"><span class="line"><span>pid: 360	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: vmware-vmblock-</span></span></span>
<span class="line"><span class="line"><span>pid: 389	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: systemd-udevd</span></span></span>
<span class="line"><span class="line"><span>pid: 411	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: systemd-oomd</span></span></span>
<span class="line"><span class="line"><span>pid: 644	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: systemd-resolve</span></span></span>
<span class="line"><span class="line"><span>pid: 645	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: systemd-timesyn</span></span></span>
<span class="line"><span class="line"><span>pid: 648	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: ModemManager</span></span></span>
<span class="line"><span class="line"><span>pid: 900	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: cupsd</span></span></span>
<span class="line"><span class="line"><span>pid: 922	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: unattended-upgr</span></span></span>
<span class="line"><span class="line"><span>pid: 933	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: sshd</span></span></span>
<span class="line"><span class="line"><span>pid: 952	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: gdm3</span></span></span>
<span class="line"><span class="line"><span>pid: 970	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: cups-browsed</span></span></span>
<span class="line"><span class="line"><span>pid: 1002	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: kerneloops</span></span></span>
<span class="line"><span class="line"><span>pid: 1026	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: kerneloops</span></span></span>
<span class="line"><span class="line"><span>pid: 1035	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: rtkit-daemon</span></span></span>
<span class="line"><span class="line"><span>pid: 1097	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: upowerd</span></span></span>
<span class="line"><span class="line"><span>pid: 1220	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: packagekitd</span></span></span>
<span class="line"><span class="line"><span>pid: 1226	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: colord</span></span></span>
<span class="line"><span class="line"><span>pid: 1385	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: systemd</span></span></span>
<span class="line"><span class="line"><span>pid: 1476	 ppid:1</span></span></span>
<span class="line"><span class="line"><span>name: node</span></span></span>
<span class="line"><span class="line"><span>pid: 3518	 ppid:3514</span></span></span>
<span class="line"><span class="line"><span>name: node</span></span></span>
<span class="line"><span class="line"><span>pid: 3573	 ppid:3518</span></span></span>
<span class="line"><span class="line"><span>name: node</span></span></span>
<span class="line"><span class="line"><span>pid: 6500	 ppid:3518</span></span></span>
<span class="line"><span class="line"><span>name: node</span></span></span>
<span class="line"><span class="line"><span>pid: 6511	 ppid:3518</span></span></span>
<span class="line"><span class="line"><span>name: zsh</span></span></span>
<span class="line"><span class="line"><span>pid: 19614	 ppid:3573</span></span></span>
<span class="line"><span class="line"><span>name: sshd</span></span></span>
<span class="line"><span class="line"><span>pid: 6450	 ppid:6413</span></span></span>
<span class="line"><span class="line"><span>name: sh</span></span></span>
<span class="line"><span class="line"><span>pid: 6451	 ppid:6450</span></span></span>
<span class="line"><span class="line"><span>name: code-38c31bc77e</span></span></span>
<span class="line"><span class="line"><span>pid: 6469	 ppid:6451</span></span></span>
<span class="line"><span class="line"><span>name: sleep</span></span></span>
<span class="line"><span class="line"><span>pid: 23092	 ppid:6451</span></span></span>
<span class="line"><span class="line"><span>name: cpptools</span></span></span>
<span class="line"><span class="line"><span>pid: 6553	 ppid:6500</span></span></span>
<span class="line"><span class="line"><span>name: pstree-64</span></span></span>
<span class="line"><span class="line"><span>pid: 23494	 ppid:19614</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在内存中创建树" tabindex="-1"><a class="header-anchor" href="#在内存中创建树"><span>在内存中创建树</span></a></h2>
<p>在打印树之前，还有一件重要事情要做：<strong>得先有树</strong>吧？或者说，你<strong>得先有能表示树结构的东西</strong>吧？</p>
<p>本实验中本人打算采用邻接表(Adjacency table)来存储图的数据，大致结构如下：(其实有点像哈希表的<strong>分离链接法</strong>)</p>
<p><img src="@source/learning-path/os/NJU-OS/Lab/img/VKmF6_brZqi_jfuy/1726916127367-4808a197-38fd-4e91-b718-0e708e511292-644712.jpeg" alt="画板"></p>
<p>主要的思路是：</p>
<ul>
<li>将 2.3 节中获取的信息排序(当然，只在 <code v-pre>-n, --numric-sort</code> 选项启用时进行该步操作，使用自定义排序函数)</li>
<li>遍历之前获取的进程信息列表(包含 <code v-pre>name</code>、<code v-pre>pid</code>、<code v-pre>p(arent)pid</code> 三个属性)，先获取所有<strong>父进程号的集合(Set)</strong>，并将其转化为结点存储至 <code v-pre>adjacency table</code> 中。</li>
<li>再次遍历进程信息列表，对于每一个进程，在 <code v-pre>adjacency table</code> 中寻找它们的父进程对应的结点(可以使用进程的 <code v-pre>ppid</code> 进行查找比对)，并将该进程插入到父进程结点对应的子进程列表中。</li>
<li>此时已经完成了邻接表数据的载入，也就相当于完成了一张图(树)的构建工作。</li>
</ul>
<h2 id="打印树" tabindex="-1"><a class="header-anchor" href="#打印树"><span>打印树</span></a></h2>
<p>别急，在打印树之前，先来参照一下 <code v-pre>pstree</code> 命令的输出：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> pstree</span><span style="color:#A3BE8C"> -p</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">systemd(1</span><span style="color:#D8DEE9FF">)─┬─ModemManager(</span><span style="color:#88C0D0">833</span><span style="color:#D8DEE9FF">)─┬─{</span><span style="color:#88C0D0">ModemManager}(877</span><span style="color:#D8DEE9FF">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           │</span><span style="color:#A3BE8C">                   └─{ModemManager}</span><span style="color:#ECEFF4">(</span><span style="color:#88C0D0">886</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           ├─NetworkManager(745</span><span style="color:#D8DEE9FF">)─┬─{</span><span style="color:#88C0D0">NetworkManager}(791</span><span style="color:#D8DEE9FF">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           │</span><span style="color:#A3BE8C">                     └─{NetworkManager}</span><span style="color:#ECEFF4">(</span><span style="color:#88C0D0">792</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">           ├─VGAuthService(656</span><span style="color:#D8DEE9FF">)</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">           |</span><span style="color:#88C0D0">-</span><span style="color:#A3BE8C"> ...</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，这棵树的根为 <code v-pre>systemd</code>，它的 PID = 1。</p>
<p>那我们也可以从 PID = 1 的地方下手，逐步遍历它的子进程列表，每遇到一个子进程，就尝试去邻接表当中获取到该进程对应的子进程列表信息，逐步遍历并打印...直到 PID = 1 的进程的子进程列表被遍历完成时，结束打印。</p>
<p>对于树的递归遍历，你很难不想到 DFS 与 BFS，对于这里的打印需求，DFS 可能更简单一些。然后我们就得到了我们自己实现的 <code v-pre>pstree</code>。</p>
<blockquote>
<p>But 我失败了，似乎是载入邻接表的时候出了问题，查了好久也没查出问题，于是暂时放弃了 XD。</p>
</blockquote>
<p>对于 <code v-pre>-p, --show-pid</code> 标志，在打印进程的时候在进程后跟上它的进程号即可。</p>
<h1 id="is-that-all" tabindex="-1"><a class="header-anchor" href="#is-that-all"><span>Is that all?</span></a></h1>
<font style="color:rgb(15, 23, 42);">和系统打交道的编程可有更多的麻烦之处：</font><ol>
<li>
<font style="color:rgb(15, 23, 42);">你的程序遵守 POSIX 的返回值规定吗？如果你的 main 函数返回了非 0 的数值，我们将认为程序报告了错误——在非法的输入上返回 0，以及在合法的输入上返回非 0 都将导致 Wrong Answer。</font></li>
<li>
<font style="color:rgb(15, 23, 42);">程序够 </font>_<font style="color:rgb(15, 23, 42);">robust</font>_<font style="color:rgb(15, 23, 42);"> 吗？它会不会在一些非法的输入上 </font>_<font style="color:rgb(15, 23, 42);">crash</font>_<font style="color:rgb(15, 23, 42);">？如果系统里的进程很多呢？如果内存不够了呢？如果 </font>`open`<font style="color:rgb(15, 23, 42);"> 或者 </font>`malloc`<font style="color:rgb(15, 23, 42);"> 失败了呢？要知道，</font>_<font style="color:rgb(15, 23, 42);">crash</font>_<font style="color:rgb(15, 23, 42);"> 一般是因为 </font>[<font style="color:rgb(15, 23, 42);">undefined behavior (UB)</font>](https://en.wikipedia.org/wiki/Undefined_behavior)<font style="color:rgb(15, 23, 42);"> 导致的——UB 没把所有的文件都删掉真是谢天谢地了。</font></li>
<li>
<font style="color:rgb(15, 23, 42);">万一我得到进程号以后，进去发现文件没了 (进程终止了)，怎么办？会不会有这种情况？万一有我的程序会不会 </font>_<font style="color:rgb(15, 23, 42);">crash</font>_<font style="color:rgb(15, 23, 42);">……？</font></li>
<li>
<font style="color:rgb(15, 23, 42);">进程的信息一直在变，文件的内容也一直在变 (两次 </font>`cat`<font style="color:rgb(15, 23, 42);"> 的结果不同)。那我会不会读到不一致的信息 (前一半是旧信息、新一半是新信息)？这两个问题都是 </font>_<font style="color:rgb(15, 23, 42);">race condition</font>_<font style="color:rgb(15, 23, 42);"> 导致的；我们将会在</font>**<font style="color:rgb(15, 23, 42);">并发</font>**<font style="color:rgb(15, 23, 42);">部分回到这个话题。</font></li>
<li>
<font style="color:rgb(15, 23, 42);">如果我不确信这些事会不会发生，我有没有写一个程序，至少在压力环境下</font>**<font style="color:rgb(15, 23, 42);">测试</font>**<font style="color:rgb(15, 23, 42);">一下它们有没有可能发生？嗯，如果我同时运行很多程序，每个程序都不断扫描目录、读取文件，也观察不到这个问题，至少应该可以放点心。</font></li>
</ol>
<font style="color:rgb(15, 23, 42);">随着课程的深入，这些问题都会得到解答。</font><blockquote>
<p>更新: 2024-09-23 14:08:11<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/ems6bpdx8hakrbtn" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/ems6bpdx8hakrbtn</a></p>
</blockquote>
</div></template>


