<template><div><h1 id="linux学习笔记" tabindex="-1"><a class="header-anchor" href="#linux学习笔记"><span>Linux学习笔记</span></a></h1>
<h2 id="_1-常用快捷键" tabindex="-1"><a class="header-anchor" href="#_1-常用快捷键"><span>1. 常用快捷键</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:center">快捷键组合</th>
<th style="text-align:center">快捷键作用</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code v-pre>Ctrl + Alt + T</code></td>
<td style="text-align:center">打开终端</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>Ctrl + k</code></td>
<td style="text-align:center">删除当前光标至行末的所有文本</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>Ctrl + a</code></td>
<td style="text-align:center">将光标移至当前行开头</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>Ctrl + e</code></td>
<td style="text-align:center">将光标移至当前行结尾</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>Ctrl + d</code></td>
<td style="text-align:center">结束键盘输入或者退出终端</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>Ctrl + s</code></td>
<td style="text-align:center">暂停当前程序，暂停后按下任意键恢复运行</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>Ctrl + z</code></td>
<td style="text-align:center">将当前程序放到后台运行   恢复到前台为命令<code v-pre>fg</code></td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>Alt + Backspace</code></td>
<td style="text-align:center">向前删除一个单词</td>
</tr>
</tbody>
</table>
<h2 id="_2-shell常用通配符" tabindex="-1"><a class="header-anchor" href="#_2-shell常用通配符"><span>2. Shell常用通配符</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:center">字符</th>
<th style="text-align:center">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">*</td>
<td style="text-align:center">匹配0到多个字符</td>
</tr>
<tr>
<td style="text-align:center">?</td>
<td style="text-align:center">匹配任意一个字符</td>
</tr>
<tr>
<td style="text-align:center">[list]</td>
<td style="text-align:center">匹配list中的任意单一字符</td>
</tr>
<tr>
<td style="text-align:center">[**^**list]</td>
<td style="text-align:center">匹配<strong>除list中任意单一字符外</strong>的任意单一字符</td>
</tr>
<tr>
<td style="text-align:center">[ch_1-ch_2]</td>
<td style="text-align:center">匹配从ch_1到ch_2范围内的任意单一字符</td>
</tr>
<tr>
<td style="text-align:center">(str_1, str_2, ...)</td>
<td style="text-align:center">匹配元组内的任意一个字符串</td>
</tr>
<tr>
<td style="text-align:center">{ch_1..ch_2}</td>
<td style="text-align:center">匹配ch_1到ch_2范围内的<strong>全部</strong>字符</td>
</tr>
</tbody>
</table>
<h2 id="_3-linux用户权限管理" tabindex="-1"><a class="header-anchor" href="#_3-linux用户权限管理"><span>3. Linux用户权限管理</span></a></h2>
<h3 id="_3-1-查看用户相关信息" tabindex="-1"><a class="header-anchor" href="#_3-1-查看用户相关信息"><span>3.1 查看用户相关信息</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code v-pre>-a</code></td>
<td style="text-align:center">打印能打印的全部信息</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>-d</code></td>
<td style="text-align:center">打印死掉的进程信息列表</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>-m</code></td>
<td style="text-align:center">同<code v-pre>am i</code>，<code v-pre>mom likes</code>，打印当前伪终端用户的相关信息</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>-q</code></td>
<td style="text-align:center">打印当前登录用户数及用户名列表</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>-u</code></td>
<td style="text-align:center">打印当前登录用户登录信息</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>-r</code></td>
<td style="text-align:center">打印运行等级**(测试发现无结果，待查询)**</td>
</tr>
</tbody>
</table>
<h3 id="_3-2-创建用户" tabindex="-1"><a class="header-anchor" href="#_3-2-创建用户"><span>3.2 创建用户</span></a></h3>
<blockquote>
<p>[!NOTE]</p>
<p>创建用户<strong>需要root权限</strong>！可以使用sudo命令暂时提升权限，但是使用sudo命令有一定前提：</p>
<ol>
<li>知道当前用户的密码</li>
<li>当前用户<strong>位于sudo用户组中</strong></li>
</ol>
</blockquote>
<h4 id="相关命令-su-su-sudo" tabindex="-1"><a class="header-anchor" href="#相关命令-su-su-sudo"><span>相关命令：su, -su, sudo</span></a></h4>
<ul>
<li><code v-pre>su</code>命令用于切换用户身份，用法如下：</li>
</ul>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">su</span><span style="color:#D8DEE9FF"> [&#x3C;选项参数>] </span><span style="color:#81A1C1">&#x3C;</span><span style="color:#D8DEE9FF">username</span><span style="color:#81A1C1">></span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>其中选项参数为可选项，常用的选项参数有：</p>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">无</td>
<td style="text-align:center">仅切换用户</td>
</tr>
<tr>
<td style="text-align:center">-, -l, --login</td>
<td style="text-align:center">切换用户，同时用户的环境变量和工作目录也会跟着改变成目标用户所对应的内容。</td>
</tr>
</tbody>
</table>
<ul>
<li><code v-pre>sudo</code>命令用于以特权模式执行命令，使用前提已经在本节初给出</li>
</ul>
<h3 id="_3-3-用户组" tabindex="-1"><a class="header-anchor" href="#_3-3-用户组"><span>3.3 用户组</span></a></h3>
<h4 id="查看用户组相关信息" tabindex="-1"><a class="header-anchor" href="#查看用户组相关信息"><span>查看用户组相关信息</span></a></h4>
<h5 id="_1-使用groups命令" tabindex="-1"><a class="header-anchor" href="#_1-使用groups命令"><span>1. 使用groups命令</span></a></h5>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">groups</span><span style="color:#81A1C1"> &#x3C;</span><span style="color:#A3BE8C">usernam</span><span style="color:#D8DEE9FF">e</span><span style="color:#81A1C1">></span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>使用该命令即可查看用户名对应用户的用户组信息，示例如下：</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803161624776.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042163439-c3da094b-87c6-4091-9fb1-4ffc0c43654d-979101.png" alt="1726042163439-c3da094b-87c6-4091-9fb1-4ffc0c43654d.png"></p>
<p>其中冒号左侧表示用户名，冒号右侧表示该用户所属权限组，例如上图中<code v-pre>shiyanlou</code>用户属于<code v-pre>shiyanlou</code>、<code v-pre>sudo</code>、<code v-pre>public</code>、<code v-pre>ssl-cert</code>这四个用户组。</p>
<h5 id="_2-查看-etc-group文件" tabindex="-1"><a class="header-anchor" href="#_2-查看-etc-group文件"><span>2.  查看/etc/group文件</span></a></h5>
<p>有两种方式可以查看该文件：</p>
<ol>
<li>可以直接通过GUI界面来查找并在文本编辑器中查看文件内容，如下所示：<br>
<img src="@source/learning-path/os/Linux-related-content/assets/image-20240803162249155.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042153485-3ed28040-fe67-42c9-aacf-7b6833fc4000-741307.png" alt="1726042153485-3ed28040-fe67-42c9-aacf-7b6833fc4000.png"></li>
<li>如果希望在命令行中查看文件内容，则可以使用<code v-pre>cat</code>命令读取指定文件的内容并打印到终端输出，示例代码如下所示：</li>
</ol>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">cat</span><span style="color:#A3BE8C"> /etc/group</span><span style="color:#81A1C1"> |</span><span style="color:#88C0D0"> sort</span><span style="color:#81A1C1"> |</span><span style="color:#88C0D0"> grep</span><span style="color:#A3BE8C"> -E</span><span style="color:#ECEFF4"> "</span><span style="color:#A3BE8C">shiyanlou</span><span style="color:#ECEFF4">"</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>可以看到，示例代码之后跟了一些额外选项：</p>
<pre><code>1. `| sort`：该选项表示将读取的文本进行字典排序后再输出
2. `| grep`：用于过滤结果，保留符合条件的行
</code></pre>
<h5 id="_3-etc-group文件格式" tabindex="-1"><a class="header-anchor" href="#_3-etc-group文件格式"><span>3. /etc/group文件格式</span></a></h5>
<p><code v-pre>/etc/group</code>文件中的内容包括<u>用户组名称（Group_Name）、用户组口令(Password)、GID（组 ID） 及该用户组所包含的用户列表（User_List）</u>，每个用户组一条记录。格式如下：</p>
<blockquote>
<p>Group_Name:password:GID:User_List</p>
</blockquote>
<p>观察文件中的neritic，经常会出现password 字段为一个 <code v-pre>x</code>的情况，这并不是说密码就是<code v-pre>x</code>，只是表示密码<strong>不可见</strong>而已。</p>
<p>这里需要注意，如果用户的 GID 等于用户组的 GID，那么最后一个字段 <code v-pre>User_List</code> 就是空的，这里的说的<strong>用户GID是指用户默认所在组的 GID</strong>，可以使用 <code v-pre>id</code> 命令查看(见下图)。比如 shiyanlou 用户，在 <code v-pre>/etc/group</code> 中的 shiyanlou 用户组后面是不会显示的。</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803163732466.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042139581-b56fce07-a711-4e57-bfaf-c33691fb40d5-606548.png" alt="1726042139581-b56fce07-a711-4e57-bfaf-c33691fb40d5.png"></p>
<h4 id="将其余用户加入到指定用户组" tabindex="-1"><a class="header-anchor" href="#将其余用户加入到指定用户组"><span>将其余用户加入到指定用户组</span></a></h4>
<p>可以使用<code v-pre>usermod</code>命令为用户添加用户组。</p>
<p>同样地，需要有root权限才能进行此操作，所以你可以选择：</p>
<ol>
<li>直接使用 root 用户为其它用户添加用户组</li>
<li>用其它已经在 sudo 用户组的用户使用 sudo 命令获取权限来执行该命令</li>
</ol>
<p>可以使用<code v-pre>-G</code>参数来指定待添加到的指定用户组名，示例命令如下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">sudo</span><span style="color:#A3BE8C"> usermod</span><span style="color:#A3BE8C"> -G</span><span style="color:#A3BE8C"> sudo</span><span style="color:#A3BE8C"> lilei</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>该命令可以将用户<code v-pre>lilei</code>加入到<code v-pre>sudo</code>用户组，执行结果如下所示：</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803165338251.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042112711-84b6e4b0-15fb-4ded-bde4-be3dbb4c9f85-391885.png" alt="1726042112711-84b6e4b0-15fb-4ded-bde4-be3dbb4c9f85.png"></p>
<h3 id="_3-4-删除用户与用户组" tabindex="-1"><a class="header-anchor" href="#_3-4-删除用户与用户组"><span>3.4 删除用户与用户组</span></a></h3>
<h4 id="删除用户" tabindex="-1"><a class="header-anchor" href="#删除用户"><span>删除用户</span></a></h4>
<p>使用<code v-pre>deluser</code>命令即可，示例命令如下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">sudo</span><span style="color:#A3BE8C"> deluser</span><span style="color:#A3BE8C"> lilei</span><span style="color:#A3BE8C"> --remove-home</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>其中<code v-pre>--remove-home</code>参数在删除用户时候会一并<strong>将该用户的工作目录一并删除</strong>。如果不使用该参数，那么系统会自动在 <code v-pre>/home</code> 目录为该用户保留工作目录。</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803165801740.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042106479-91e49834-286f-455d-a84e-5c369a322d16-487399.png" alt="1726042106479-91e49834-286f-455d-a84e-5c369a322d16.png"></p>
<h4 id="删除用户组" tabindex="-1"><a class="header-anchor" href="#删除用户组"><span>删除用户组</span></a></h4>
<p>使用<code v-pre>groupdel</code>即可将<strong>不包含任何用户</strong>的用户组删除。这也就意味着——如果待删除的用户组中包含用户，那么先需要将用户组中的所有用户删除，或者将这些用户移出该用户组。</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803170212564.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042093033-7c364198-70f7-4cb6-94c9-276944f13d22-252366.png" alt="1726042093033-7c364198-70f7-4cb6-94c9-276944f13d22.png"></p>
<h2 id="_4-linux文件权限管理" tabindex="-1"><a class="header-anchor" href="#_4-linux文件权限管理"><span>4. Linux文件权限管理</span></a></h2>
<h3 id="_4-1-查看文件权限" tabindex="-1"><a class="header-anchor" href="#_4-1-查看文件权限"><span>4.1 查看文件权限</span></a></h3>
<p>不加任何参数的<code v-pre>ls</code>命令只能查看当前目录下的文件列表，当它加上参数之后，能做的远不止于此，下面我们就用它来查看各文件的查看权限。</p>
<p>执行下面的命令可以使用较长格式列出文件：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">ls</span><span style="color:#A3BE8C"> -l</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>明显可以看出来与不带参数的<code v-pre>ls</code>命令输出的结果有很大不同：</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803183840210.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042081257-62f1810f-03c6-4673-a92e-5dd2de3390eb-222966.png" alt="1726042081257-62f1810f-03c6-4673-a92e-5dd2de3390eb.png"></p>
<p>让我们稍微拆解一下每一行文件信息的内容格式：</p>
<p><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1642149699740-8b69f5c0-6013-48da-9867-8851b71234c2-073034.png" alt="3-9.png"></p>
<p>我们一项项地来看：</p>
<ul>
<li>文件类型和权限<br>
下图详细拆解了文件类型和权限这一部分的内容：<img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1642149699732-e4f59efe-7c67-4b1d-af5e-b6226df57fb2-173835.png" alt="3-10.png">
<ul>
<li>文件类型：<br>
关于文件类型，这里有一点你必需时刻牢记—— <strong><u>Linux 里面一切皆文件</u></strong>，正因为这一点才有了设备文件（ <code v-pre>/dev</code> 目录下有各种设备文件，大都跟具体的硬件设备相关）这一说。
<ul>
<li>socket：网络套接字。</li>
<li>pipe 管道：这个东西<strong>很重要</strong>，之后会详细讨论。</li>
<li>软链接文件：链接文件是分为两种的，另一种当然是“硬链接”（硬链接不常用，而<strong>软链接等同于 Windows 上的快捷方式</strong>，你记住这一点就够了）。</li>
</ul>
</li>
<li>文件权限：
<ul>
<li>读权限：表示你可以使用 <code v-pre>cat &lt;file name&gt;</code> 之类的命令来<strong>读取</strong>某个文件的内容；</li>
<li>写权限：表示你可以<strong>编辑和修改</strong>某个文件的内容；</li>
<li>执行权限：通常指可以运行的二进制程序文件或者脚本文件，如同 Windows 上的 <code v-pre>.exe</code> 后缀的文件，不过 Linux 上<strong>不通过文件后缀名来区分</strong>文件的类型。</li>
</ul>
</li>
</ul>
</li>
</ul>
<blockquote>
<p>[!NOTE]</p>
<p>你需要注意的一点是，<strong>一个目录同时具有读权限和执行权限才可以打开并查看内部文件，而一个目录要有写权限才允许在其中创建其它文件</strong>，这是因为目录文件实际保存着该目录里面的文件的列表等信息。</p>
</blockquote>
<pre><code>    * 所有者权限：不用多说你也明白
    * 所属用户组权限：是指**你所在的用户组中**的**所有其它用户**对于该文件的权限
</code></pre>
<ul>
<li>链接数：链接到该文件所在的 <code v-pre>inode</code> 结点的文件名数目</li>
<li>文件大小：以 <code v-pre>inode</code> 结点大小为单位来表示的文件大小，你可以给 <code v-pre>ls</code> 加上 <code v-pre>-lh</code> 参数来更直观的查看文件的大小。</li>
</ul>
<h4 id="ls命令常用参数" tabindex="-1"><a class="header-anchor" href="#ls命令常用参数"><span>ls命令常用参数</span></a></h4>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">-a</td>
<td style="text-align:center">显示除了 <code v-pre>.</code>（当前目录）和 <code v-pre>..</code>（上一级目录）之外的所有文件，包括隐藏文件</td>
</tr>
<tr>
<td style="text-align:center">-l</td>
<td style="text-align:center">使用较长格式列出本目录下的文件信息</td>
</tr>
<tr>
<td style="text-align:center">-al</td>
<td style="text-align:center"><code v-pre>-a</code>和<code v-pre>-l</code>的结合</td>
</tr>
<tr>
<td style="text-align:center">-dl</td>
<td style="text-align:center">查看某一个目录的完整属性，而不是显示目录里面的文件属性</td>
</tr>
<tr>
<td style="text-align:center">-lh</td>
<td style="text-align:center"><em>以人类可读的方式显示当前目录中的文件和目录大小</em></td>
</tr>
<tr>
<td style="text-align:center">-alh</td>
<td style="text-align:center"><code v-pre>-a</code>与<code v-pre>-lh</code>的结合</td>
</tr>
<tr>
<td style="text-align:center">-asSh</td>
<td style="text-align:center">显示所有文件大小，并以普通人类能看懂的方式呈现   其中小 s 为显示文件大小，大 S 为按文件大小排序</td>
</tr>
</tbody>
</table>
<h3 id="_4-2-变更文件所有者" tabindex="-1"><a class="header-anchor" href="#_4-2-变更文件所有者"><span>4.2 变更文件所有者</span></a></h3>
<p>使用<code v-pre>chown</code>命令即可变更文件所有者，需要root权限执行操作。示例代码如下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">sudo</span><span style="color:#A3BE8C"> chown</span><span style="color:#A3BE8C"> shiyanlou</span><span style="color:#ECEFF4">(</span><span style="color:#88C0D0">变更后的文件所有者</span><span style="color:#ECEFF4">)</span><span style="color:#A3BE8C"> iphone11</span><span style="color:#ECEFF4">(</span><span style="color:#88C0D0">待更新的文件名称</span><span style="color:#ECEFF4">)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_4-3-修改文件权限" tabindex="-1"><a class="header-anchor" href="#_4-3-修改文件权限"><span>4.3 修改文件权限</span></a></h3>
<h4 id="文件权限的表示方法" tabindex="-1"><a class="header-anchor" href="#文件权限的表示方法"><span>文件权限的表示方法</span></a></h4>
<ol>
<li>二进制数字表示<br>
该方法使用二进制数字表示对应的权限：有对应权限则该位为1，否则为0<br>
权限数字的表示顺序是固定的，都遵循**“读写执行”**这一规则，由高位向低位排列，如下图：<br>
<img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1597575837725-b4075b81-8ac0-4761-8c47-192abab865a0-352227.png" alt="3-14.png">例如$ rwx = (111)<em>2 = (7)</em>{10} <span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mtext>。每个文件有</mtext><mo>∗</mo><mo>∗</mo><mtext>三组</mtext><mo>∗</mo><mo>∗</mo><mtext>固定的权限，分别对应</mtext><mo>∗</mo><mo>∗</mo><mtext>拥有者</mtext><mo>∗</mo><mo>∗</mo><mtext>，</mtext><mo>∗</mo><mo>∗</mo><mtext>所属用户组</mtext><mo>∗</mo><mo>∗</mo><mtext>，</mtext><mo>∗</mo><mo>∗</mo><mtext>其他用户</mtext><mo>∗</mo><mo>∗</mo><mtext>，</mtext><mo>∗</mo><mo>∗</mo><mtext>这个顺序是固定的</mtext><mo>∗</mo><mo>∗</mo><mtext>。例如</mtext></mrow><annotation encoding="application/x-tex">。  
每个文件有**三组**固定的权限，分别对应**拥有者**，**所属用户组**，**其他用户**，**这个顺序是固定的**。  
例如</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">。每个文件有</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">三组</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">固定的权限，分别对应</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">拥有者</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">，</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">所属用户组</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">，</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">其他用户</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">，</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">这个顺序是固定的</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">∗</span><span class="mord cjk_fallback">。例如</span></span></span></span> rwx-wx-w- = (111)_2 (011)_2 (010)<em>2 = (7 3 2)</em>{10} $</li>
</ol>
<p>可以使用<code v-pre>chmod</code>命令来修改指定文件的文件权限，如下图：</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803195315823.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042035606-0d2b4f2e-ea63-4f0c-a998-164b3b789d91-647287.png" alt="1726042035606-0d2b4f2e-ea63-4f0c-a998-164b3b789d91.png"></p>
<ol start="2">
<li>加减赋值法<br>
示例代码：</li>
</ol>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">chmod</span><span style="color:#A3BE8C"> go-rw</span><span style="color:#A3BE8C"> iphone11</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>其中<code v-pre>g</code>、<code v-pre>o</code> 还有 <code v-pre>u</code> 分别表示 group（用户组）、others（其他用户） 和 user（用户），<code v-pre>+</code> 和 <code v-pre>-</code> 分别表示增加和去掉相应的权限。</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240803195709985.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726042022419-0b494741-6fb7-49a7-b9f6-e881de67da36-281879.png" alt="1726042022419-0b494741-6fb7-49a7-b9f6-e881de67da36.png"></p>
<h3 id="_4-4-extra" tabindex="-1"><a class="header-anchor" href="#_4-4-extra"><span>4.4 Extra</span></a></h3>
<blockquote>
<p>[!NOTE]</p>
<p><code v-pre>adduser</code> 和 <code v-pre>useradd</code> 的区别是什么？</p>
</blockquote>
<p>答：<code v-pre>useradd</code> 只创建用户，不会创建用户密码和工作目录，创建完了需要使用 <code v-pre>passwd &lt;username&gt;</code> 去设置新用户的密码。<code v-pre>adduser</code> 在创建用户的同时，会创建工作目录和密码（提示你设置），做这一系列的操作。其实 <code v-pre>useradd</code>、<code v-pre>userdel</code> 这类操作更像是一种命令，执行完了就返回。而 <code v-pre>adduser</code> 更像是一种程序，需要你输入、确定等一系列操作。</p>
<h2 id="_5-linux目录结构" tabindex="-1"><a class="header-anchor" href="#_5-linux目录结构"><span>5. Linux目录结构</span></a></h2>
<h3 id="_5-1-fhs标准" tabindex="-1"><a class="header-anchor" href="#_5-1-fhs标准"><span>5.1 FHS标准</span></a></h3>
<p>在Linux中，大部分目录结构是规定好了的，由<strong>FHS标准</strong>进行规定。Linux系统的正常运行以目录结构为基础，因此掌握各目录的结构十分重要。</p>
<blockquote>
<p>[!NOTE]</p>
<p>FHS（英文：Filesystem Hierarchy Standard 中文：文件系统层次结构标准），多数 Linux 版本采用这种文件组织形式，FHS 定义了系统中每个区域的用途、所需要的最小构成的文件和目录同时还给出了例外处理与矛盾处理。</p>
</blockquote>
<p>FHS标准中定义了两层规范：</p>
<ol>
<li><code v-pre>/</code> 下面的各个目录应该要放什么文件数据，例如 <code v-pre>/etc</code> 应该放置设置文件，<code v-pre>/bin</code> 与 <code v-pre>/sbin</code> 则应该放置可执行文件等等。</li>
<li>第二层则是针对 <code v-pre>/usr</code> 及 <code v-pre>/var</code> 这两个目录的子目录来定义。例如 <code v-pre>/var/log</code> 放置系统日志文件，<code v-pre>/usr/share</code> 放置共享数据等等。</li>
</ol>
<p><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1649865852773-8a7796bb-3421-4988-8de2-38c0a684f4ed-764928.png" alt="4-1.png"></p>
<p>FHS 依据<strong>文件系统使用的频繁与否</strong>以及<strong>是否允许用户随意改动</strong>（不是不能改动），将目录定义为四种交互作用的形态，如下表所示：</p>
<p><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1725958829792-78f1a709-8bbc-4815-b3c4-db8dcc5ec257-296025.png" alt="document-uid18510labid59timestamp1482919171956.png"></p>
<h3 id="_5-2-目录路径" tabindex="-1"><a class="header-anchor" href="#_5-2-目录路径"><span>5.2 目录路径</span></a></h3>
<h4 id="使用cd命令切换目录" tabindex="-1"><a class="header-anchor" href="#使用cd命令切换目录"><span>使用cd命令切换目录</span></a></h4>
<p>可以使用<code v-pre>cd</code>命令切换当前所在目录，示例如下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">cd</span><span style="color:#A3BE8C"> .</span><span style="color:#616E88">	# .表示当前目录</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">cd</span><span style="color:#A3BE8C"> ..</span><span style="color:#616E88">	# ..表示上一级目录</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">cd</span><span style="color:#A3BE8C"> ~</span><span style="color:#616E88">	# ~表示当前用户家目录</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">cd</span><span style="color:#A3BE8C"> -</span><span style="color:#616E88">  # 可用于返回上次所在的目录</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>pwd</code>命令获取当前所在的绝对路径：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">pwd</span><span style="color:#616E88">		# /home/shiyanlou</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="寻找指定程序路径" tabindex="-1"><a class="header-anchor" href="#寻找指定程序路径"><span>寻找指定程序路径</span></a></h4>
<p>可以使用 <code v-pre>which</code>来寻找指定命令的路径，示例如下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">which</span><span style="color:#A3BE8C"> sudo</span><span style="color:#616E88"> # /usr/bin/sudo</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="绝对路径与相对路径" tabindex="-1"><a class="header-anchor" href="#绝对路径与相对路径"><span>绝对路径与相对路径</span></a></h4>
<ol>
<li>绝对路径：简单来说就是从根路径<code v-pre>/</code>到当前所在目录的路径，例如<code v-pre>/home/shiyanlou/test</code></li>
<li>相对路径：以<strong>当前目录</strong><code v-pre>.</code>为起点，用户指定的目录为终点，这段路径被称为相对路径。可以使用<code v-pre>../</code>表示上一级目录，使用<code v-pre>./</code>表示当前目录。</li>
</ol>
<p>下面是使用绝对路径和相对路径的示例：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">cd</span><span style="color:#A3BE8C"> /usr/home/test</span><span style="color:#616E88"> # 绝对路径</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">cd</span><span style="color:#A3BE8C"> ../usr/home/test</span><span style="color:#616E88"> # 相对路径</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-linux文件操作" tabindex="-1"><a class="header-anchor" href="#_6-linux文件操作"><span>6. Linux文件操作</span></a></h2>
<h3 id="_6-1-新建文件" tabindex="-1"><a class="header-anchor" href="#_6-1-新建文件"><span>6.1 新建文件</span></a></h3>
<h4 id="新建空白文件" tabindex="-1"><a class="header-anchor" href="#新建空白文件"><span>新建空白文件</span></a></h4>
<p>使用<code v-pre>touch</code>命令创建新的空白文件，可以使用<code v-pre>{x..y}</code>等通配符。</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">touch</span><span style="color:#A3BE8C"> myfile{1..5}.txt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="新建目录" tabindex="-1"><a class="header-anchor" href="#新建目录"><span>新建目录</span></a></h4>
<p>使用<code v-pre>mkdir</code>命令可以创建目录。</p>
<ol>
<li>创建空目录</li>
</ol>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">mkdir</span><span style="color:#81A1C1"> &#x3C;</span><span style="color:#A3BE8C">目录</span><span style="color:#D8DEE9FF">名</span><span style="color:#81A1C1">></span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="2">
<li>创建带有父目录的目录——使用<code v-pre>-p</code>参数</li>
</ol>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">mkdir</span><span style="color:#A3BE8C"> -p</span><span style="color:#A3BE8C"> father/son/grandson</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_6-2-复制文件" tabindex="-1"><a class="header-anchor" href="#_6-2-复制文件"><span>6.2 复制文件</span></a></h3>
<h4 id="复制文件" tabindex="-1"><a class="header-anchor" href="#复制文件"><span>复制文件</span></a></h4>
<p>可以使用<code v-pre>cp</code>命令将文件复制到指定目录下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#616E88"># cp &#x3C;filename> &#x3C;path></span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">cp</span><span style="color:#A3BE8C"> test</span><span style="color:#A3BE8C"> father/son/grandson</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="复制目录" tabindex="-1"><a class="header-anchor" href="#复制目录"><span>复制目录</span></a></h4>
<p>如果直接使用 <code v-pre>cp</code> 命令复制一个目录的话，会出现如下错误：</p>
<p><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1725958831870-dfaa6955-4d6f-4e4f-9a26-9a965f1f89ac-561368.png" alt="document-uid735639labid59timestamp1531733966731.png"></p>
<p>要成功复制目录需要加上 <code v-pre>-r</code> 或者 <code v-pre>-R</code> 参数，表示递归复制，将原目录下的内容全部复制到对应路径下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">mkdir</span><span style="color:#A3BE8C"> family</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">cp</span><span style="color:#A3BE8C"> -r</span><span style="color:#A3BE8C"> father</span><span style="color:#A3BE8C"> family</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-删除文件" tabindex="-1"><a class="header-anchor" href="#_6-3-删除文件"><span>6.3 删除文件</span></a></h3>
<h4 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件"><span>删除文件</span></a></h4>
<p>使用<code v-pre>rm</code>命令删除一个文件：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">rm</span><span style="color:#A3BE8C"> test</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>有时候需要删除一些为只读权限的文件，直接使用 <code v-pre>rm</code> 删除会显示下面的提示：</p>
<p><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1725958831913-e4932bb0-bed0-4fcf-871e-fb9953c771e7-973039.png" alt="document-uid735639labid59timestamp1531733991692.png"></p>
<p>如果想要忽略提示强制删除该文件，则可以加上<code v-pre>-f</code>参数来强制删除文件：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">rm</span><span style="color:#A3BE8C"> -f</span><span style="color:#A3BE8C"> test</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="删除目录" tabindex="-1"><a class="header-anchor" href="#删除目录"><span>删除目录</span></a></h4>
<p>跟复制目录一样，删除目录时需要加上<code v-pre>-r</code>参数进行递归删除：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">rm</span><span style="color:#A3BE8C"> -r</span><span style="color:#A3BE8C"> family</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">rm</span><span style="color:#A3BE8C"> -rf</span><span style="color:#A3BE8C"> family</span><span style="color:#616E88">	# 强制删除目录</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一个命令支持删除目录的操作：<code v-pre>rmdir</code>，它仅能够用于删除空文件夹：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#616E88"># 假设temp文件夹中存放有temp1.txt这个文本文件</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">rmdir</span><span style="color:#A3BE8C"> temp</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># rmdir: failed to remove 'temp': Directory not empty</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-移动文件与重命名" tabindex="-1"><a class="header-anchor" href="#_6-4-移动文件与重命名"><span>6.4 移动文件与重命名</span></a></h3>
<h4 id="移动文件" tabindex="-1"><a class="header-anchor" href="#移动文件"><span>移动文件</span></a></h4>
<p>使用<code v-pre>mv</code>命令移动文件（剪切操作），命令格式如下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">mv</span><span style="color:#A3BE8C"> 源目录文件</span><span style="color:#A3BE8C"> 目的目录</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="文件重命名" tabindex="-1"><a class="header-anchor" href="#文件重命名"><span>文件重命名</span></a></h4>
<p><code v-pre>mv</code> 命令除了能移动文件外，还能给文件重命名，命令格式为：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">mv</span><span style="color:#A3BE8C"> 旧的文件名</span><span style="color:#A3BE8C"> 新的文件名</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="批量重命名" tabindex="-1"><a class="header-anchor" href="#批量重命名"><span>批量重命名</span></a></h4>
<p>单纯使用<code v-pre>mv</code>命令进行大量重命名操作显得力不从心，这时可以使用<code v-pre>rename</code>命令结合正则表达式来进行批量重命名操作。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>cd /home/shiyanlou/</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span># 使用通配符批量创建 5 个文件:</span></span></span>
<span class="line"><span class="line"><span>touch file{1..5}.txt</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span># 批量将这 5 个后缀为 .txt 的文本文件重命名为以 .c 为后缀的文件:</span></span></span>
<span class="line"><span class="line"><span>rename 's/\.txt/\.c/' *.txt</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span># 批量将这 5 个文件，文件名和后缀改为大写:</span></span></span>
<span class="line"><span class="line"><span>rename 'y/a-z/A-Z/' *.c</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单解释一下上面的命令：<code v-pre>rename</code> 是先使用第二个参数的通配符匹配所有后缀为 <code v-pre>.txt</code> 的文件，然后使用第一个参数提供的正则表达式将匹配的这些文件的 <code v-pre>.txt</code> 后缀替换为 <code v-pre>.c</code>。</p>
<h3 id="_6-5-查看文件内容" tabindex="-1"><a class="header-anchor" href="#_6-5-查看文件内容"><span>6.5 查看文件内容</span></a></h3>
<h4 id="使用-cat-tac-和-nl-命令查看文件" tabindex="-1"><a class="header-anchor" href="#使用-cat-tac-和-nl-命令查看文件"><span>使用 <code v-pre>cat</code>，<code v-pre>tac</code> 和 <code v-pre>nl</code> 命令查看文件</span></a></h4>
<p>前两个命令都是用来打印文件内容到标准输出（终端），其中 <code v-pre>cat</code> 为<strong>正序</strong>显示，<code v-pre>tac</code> 为<strong>倒序</strong>显示，可以加上<code v-pre>-n</code>参数显示行号。</p>
<blockquote>
<p>[!NOTE]</p>
<p>标准输入输出：当我们执行一个 shell 命令行时通常会自动打开三个标准文件，即标准输入文件（stdin），默认对应终端的键盘、标准输出文件（stdout）和标准错误输出文件（stderr），后两个文件都对应被重定向到终端的屏幕，以便我们能直接看到输出内容。进程将从标准输入文件中得到输入数据，将正常输出数据输出到标准输出文件，而将错误信息送到标准错误文件中。</p>
</blockquote>
<p><code v-pre>nl</code> 命令可以添加行号并打印文件内容，常用参数如下：</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>-b : 指定添加行号的方式，主要有两种：</span></span></span>
<span class="line"><span class="line"><span>    -b a:表示无论是否为空行，同样列出行号("cat -n"就是这种方式)</span></span></span>
<span class="line"><span class="line"><span>    -b t:只列出非空行的编号并列出（默认为这种方式）</span></span></span>
<span class="line"><span class="line"><span>-n : 设置行号的样式，主要有三种：</span></span></span>
<span class="line"><span class="line"><span>    -n ln:在行号字段最左端显示</span></span></span>
<span class="line"><span class="line"><span>    -n rn:在行号字段最右边显示，且不加 0</span></span></span>
<span class="line"><span class="line"><span>    -n rz:在行号字段最右边显示，且加 0</span></span></span>
<span class="line"><span class="line"><span>-w : 行号字段占用的位数(默认为 6 位)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用-more-和-less-命令分页查看文件" tabindex="-1"><a class="header-anchor" href="#使用-more-和-less-命令分页查看文件"><span>使用 <code v-pre>more</code> 和 <code v-pre>less</code> 命令分页查看文件</span></a></h4>
<p><code v-pre>less</code> 的使用基本和 <code v-pre>more</code> 一致，这里只以介绍 <code v-pre>more</code> 命令的使用为例。</p>
<p>使用 <code v-pre>more</code> 命令打开 <code v-pre>passwd</code> 文件：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#88C0D0">more</span><span style="color:#A3BE8C"> passwd</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出的结果如下：</p>
<p><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1725958833582-afed98f6-2327-478c-a646-f9c4a7a13ebd-488972.png" alt="document-uid735639labid59timestamp1531734202525.png"></p>
<p>可以看到，打开后默认<strong>只显示一屏内容</strong>，终端底部显示当前阅读的进度。可以使用 <code v-pre>Enter</code> 键向下滚动一行，使用 <code v-pre>Space</code> 键向下滚动一屏，按下 <code v-pre>h</code> 显示帮助，<code v-pre>q</code> 退出。</p>
<h4 id="使用-head-和-tail-命令查看文件" tabindex="-1"><a class="header-anchor" href="#使用-head-和-tail-命令查看文件"><span>使用 <code v-pre>head</code> 和 <code v-pre>tail</code> 命令查看文件</span></a></h4>
<p>这两个命令用于查看文件头/尾的几行(默认为<strong>10行</strong>，不足则全部显示)，示例结果如下：</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240804111527561.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726041952449-deaa360b-73f0-4770-8e89-b8c6d1f6e752-626979.png" alt="1726041952449-deaa360b-73f0-4770-8e89-b8c6d1f6e752.png"></p>
<h3 id="_6-6-查看文件类型" tabindex="-1"><a class="header-anchor" href="#_6-6-查看文件类型"><span>6.6 查看文件类型</span></a></h3>
<p>可以使用 <code v-pre>file</code> 命令查看文件的类型：</p>
<p><img src="@source/learning-path/os/Linux-related-content/assets/image-20240804110517437.png" alt=""><img src="@source/learning-path/os/Linux-related-content/img/bhGuZk6OkUM5WI5x/1726041941335-1a178f10-e231-405f-8052-a1dcbf867166-100250.png" alt="1726041941335-1a178f10-e231-405f-8052-a1dcbf867166.png"></p>
<blockquote>
<p>更新: 2024-09-14 13:10:50<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/homvi219ybb1lnqm" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/homvi219ybb1lnqm</a></p>
</blockquote>
</div></template>


