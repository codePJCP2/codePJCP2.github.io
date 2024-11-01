<template><div><h1 id="lec1-course-overview-and-shell" tabindex="-1"><a class="header-anchor" href="#lec1-course-overview-and-shell"><span>Lec1 Course Overview And Shell</span></a></h1>
<p>本节课的课后练习个人完成的代码如下：</p>
<div class="language-bash line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-bash"><code><span class="line"><span class="line"><span style="color:#616E88"># 1. 获取当前使用的Shell信息</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> echo</span><span style="color:#D8DEE9"> $SHELL</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># /usr/bin/zsh</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 2. 在 /tmp 下新建一个名为 missing 的文件夹。</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> mkdir</span><span style="color:#A3BE8C"> -p</span><span style="color:#A3BE8C"> /tmp/missing</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 3. 用 man 查看程序 touch 的使用手册。</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> man</span><span style="color:#A3BE8C"> touch</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 4. 用 touch 在 missing 文件夹中新建一个叫 semester 的文件</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> cd</span><span style="color:#A3BE8C"> ./tmp/missing</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> touch</span><span style="color:#A3BE8C"> semester</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 5. 将以下内容一行一行地写入 semester 文件：</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># #!/bin/sh</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># curl --head --silent https://missing.csail.mit.edu</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 题目注意点见代码块下方</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> echo</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">#!/bin/sh</span><span style="color:#ECEFF4">'</span><span style="color:#81A1C1"> ></span><span style="color:#A3BE8C"> semester</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> echo</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">curl --head --silent https://missing.csail.mit.edu</span><span style="color:#ECEFF4">'</span><span style="color:#81A1C1"> >></span><span style="color:#A3BE8C"> semester</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 6. 尝试执行这个文件。例如，将该脚本的路径（./semester）输入到您的 shell 中并回车。</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">#	如果程序无法执行，请使用 ls 命令来获取信息并理解其不能执行的原因。</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> ./semester</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># zsh: permission denied: ./semester</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> ls</span><span style="color:#A3BE8C"> -l</span><span style="color:#A3BE8C"> ./semester</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># -rw-rw-r-- 1 johnson johnson 61  9月 12 18:38 semester</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 可以看到，第一组权限中缺少写权限x</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 7. 查看 chmod 的手册(例如，使用 man chmod 命令)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> man</span><span style="color:#A3BE8C"> chmod</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 8. 使用 chmod 命令改变权限，使 ./semester 能够成功执行，</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 不要使用 sh semester 来执行该程序。</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> chmod</span><span style="color:#B48EAD"> 764</span><span style="color:#A3BE8C"> semester</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># semester当前的文件权限：rwxrw-r-- = (764)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> ./semester</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># Output:</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># HTTP/2 200 </span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># server: GitHub.com</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># content-type: text/html; charset=utf-8</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># last-modified: Thu, 08 Aug 2024 20:16:01 GMT</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># access-control-allow-origin: *</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># etag: "66b52781-205d"</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># expires: Tue, 03 Sep 2024 04:29:41 GMT</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># cache-control: max-age=600</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># x-proxy-cache: MISS</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># x-github-request-id: 3DA6:3257C3:11AA297:1209311:66D68E5D</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># accept-ranges: bytes</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># age: 0</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># date: Thu, 12 Sep 2024 10:43:42 GMT</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># via: 1.1 varnish</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># x-served-by: cache-nrt-rjtf7700059-NRT</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># x-cache: HIT</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># x-cache-hits: 0</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># x-timer: S1726137823.603126,VS0,VE236</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># vary: Accept-Encoding</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># x-fastly-request-id: 60b60225b32dc87850750cef7e466c5146e07dcc</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># content-length: 8285</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 9. 使用 | 和 > ，将 semester 文件输出的最后更改日期信息，</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 写入主目录下的 last-modified.txt 文件中</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 可以使用grep命令获取特定字段的信息，最后重定向流至主目录下的 last-modified.txt 文件</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">$</span><span style="color:#A3BE8C"> ./semester</span><span style="color:#81A1C1"> |</span><span style="color:#88C0D0"> grep</span><span style="color:#A3BE8C"> -i</span><span style="color:#A3BE8C"> last-modified</span><span style="color:#81A1C1"> ></span><span style="color:#A3BE8C"> ~/last-modified.txt</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 10. 写一段命令来从 /sys 中获取笔记本的电量信息，或者台式机 CPU 的温度。</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 做不来，因为不知道相关的目录以及数据文件存放于何处</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>题目注意点：</p>
<ol>
<li>第五小题：第一行有点棘手， <code v-pre>#</code> 在 Bash 中表示注释，而 <code v-pre>!</code> 即使被双引号<code v-pre>&quot;</code>包裹也具有特殊的含义，使用单引号 <code v-pre>'</code>可以规避相应的含义，将引号里面的内容以文本形式解释。<br>
同时，使用 <code v-pre>echo</code>与重定向符追加写入文件内容时，需要使用 <code v-pre>&gt;&gt;</code>表示追加。</li>
</ol>
<blockquote>
<p>更多信息请参考<font style="color:rgb(0, 0, 0);"> </font><a href="https://www.gnu.org/software/bash/manual/html_node/Quoting.html" target="_blank" rel="noopener noreferrer">Bash quoting 手册</a></p>
</blockquote>
<ol start="2">
<li>第八小题思考题：您的 shell 是如何知晓这个文件需要使用 <code v-pre>sh</code> 来解析的呢？<br>
答案就是——<code v-pre>#!</code>这个符号的作用！类 UNIX 系统中，shebang(也就是 <code v-pre>#!</code>)行用来指定脚本的解释器路径，这个符号通常出现在第一行。</li>
</ol>
<blockquote>
<p>更多信息请参考：<a href="https://en.wikipedia.org/wiki/Shebang_(Unix)" target="_blank" rel="noopener noreferrer">shebang</a></p>
</blockquote>
<blockquote>
<p>更新: 2024-09-14 13:11:03<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/midgnpshpeb691ug" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/midgnpshpeb691ug</a></p>
</blockquote>
</div></template>


