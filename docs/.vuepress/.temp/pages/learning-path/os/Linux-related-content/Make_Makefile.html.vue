<template><div><h1 id="make-makefile" tabindex="-1"><a class="header-anchor" href="#make-makefile"><span>Make &amp; Makefile</span></a></h1>
<blockquote>
<p>前言：</p>
<p>当前学习 MAKE 的主要需求：修改 jyy 老师提供实验代码框架中的 makefile 文件，使其不自动提交到 jyy 老师的 OJ 中，而是提交到自己的私人仓库 <strong>os-lab</strong> 中。</p>
</blockquote>
<h1 id="编译与链接" tabindex="-1"><a class="header-anchor" href="#编译与链接"><span>编译与链接</span></a></h1>
<p>简单来说，C/C++程序从源代码文件转化到可执行文件需要两个步骤：编译与链接</p>
<p><img src="@source/learning-path/os/Linux-related-content/img/95qIdYejy_TKNrTo/1726644417218-8e46c598-e6e7-4f97-b004-c87c4616687a-633330.jpeg" alt="画板"></p>
<p>编译(Compile)：检测**<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">语法</font><strong><font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">的正确，</font></strong><font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">函数与变量的声明</font>**<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">的正确。</font></p>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">链接(Link)：链接</font>**<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">函数和全局变量</font>**<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">，会在所有的Object File中找寻函数的实现.</font><h1 id="makefile" tabindex="-1"><a class="header-anchor" href="#makefile"><span>Makefile</span></a></h1>
<h2 id="font-style-color-rgb-64-64-64-background-color-rgb-252-252-252-makefile-font-的规则" tabindex="-1"><a class="header-anchor" href="#font-style-color-rgb-64-64-64-background-color-rgb-252-252-252-makefile-font-的规则"><span><code v-pre>&lt;font style=&quot;color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);&quot;&gt;Makefile&lt;/font&gt;</code> 的规则</span></a></h2>
<p>Makefile 的一般规则如下：</p>
<div class="language-makefile line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="makefile" data-title="makefile"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-makefile"><code><span class="line"><span class="line"><span style="color:#616E88"># 一般规则</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">target</span><span style="color:#88C0D0"> ...</span><span style="color:#ECEFF4"> :</span><span style="color:#D8DEE9FF"> prerequisites ...</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    recipe</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    ...</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    ...</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 示例 Makefile</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">hello</span><span style="color:#ECEFF4">:</span><span style="color:#D8DEE9FF">hello.c</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    gcc hello.c -o hello    </span><span style="color:#616E88"># 注意开头的tab, 而不是空格</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">.PHONY</span><span style="color:#ECEFF4">:</span><span style="color:#D8DEE9FF"> clean </span><span style="color:#616E88"># 表示clean是个伪目标</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># 特殊的 clean 规则</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">clean</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    rm hello    </span><span style="color:#616E88"># 注意开头的tab, 而不是空格</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别讲解一下规则中的三个部分：</p>
<ol>
<li><code v-pre>target</code> ：一般情况下是目标文件名。这部分<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">可以是一个object file（目标文件），也可以是一个可执行文件，还可以是一个标签（label）。</font></li>
<li><code v-pre>&lt;font style=&quot;color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);&quot;&gt;prerequisites&lt;/font&gt;</code><font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);"> ： 生成该target所依赖的文件。</font></li>
<li><code v-pre>&lt;font style=&quot;color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);&quot;&gt;recipe&lt;/font&gt;</code><font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);"> ： 该target要执行的命令（任意的shell命令）。</font></li>
</ol>
<p><code v-pre>&lt;font style=&quot;color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);&quot;&gt;Make&lt;/font&gt;</code><font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);"> 的编译链接规则大致是这样的：</font></p>
<ol>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">如果这个工程没有编译过，那么我们的所有文件都要编译并被链接。</font></li>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">如果这个工程的某几个文件被修改，那么我们只编译被修改的文件，并链接目标程序。</font></li>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">如果这个工程的头文件被改变了，那么我们需要编译引用了这几个头文件的文件，并链接目标程序。</font></li>
</ol>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">因此，</font>`<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">Makefile</font>`<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);"> 规则的执行规则大致可以描述如下：</font><font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">如果 prerequisites 文件列表中存在比 target 更新的文件的话，规则中的 recipe 部分的命令就会被执行，否则不执行。</font><h2 id="在-makefile-中使用变量" tabindex="-1"><a class="header-anchor" href="#在-makefile-中使用变量"><span><font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">在 Makefile 中使用变量</font></span></a></h2>
<p>跟常规编程意义上的变量类似，变量可以被类似如下方式定义：</p>
<div class="language-makefile line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="makefile" data-title="makefile"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-makefile"><code><span class="line"><span class="line"><span style="color:#D8DEE9">objs</span><span style="color:#ECEFF4"> =</span><span style="color:#D8DEE9FF"> main.o list.o</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>想要使用变量值，与 Shell 中访问变量值的方式有一点类似：</p>
<div class="language-makefile line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="makefile" data-title="makefile"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-makefile"><code><span class="line"><span class="line"><span style="color:#616E88"># Makefile</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">$(</span><span style="color:#D8DEE9">objs</span><span style="color:#81A1C1">)</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88"># Shell</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">$o</span><span style="color:#D8DEE9FF">bjs</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="让-make-进行自动推导" tabindex="-1"><a class="header-anchor" href="#让-make-进行自动推导"><span>让 Make 进行自动推导</span></a></h2>
<p>GNU Make 的功能很强大，它可以在<strong>一定程度上</strong>自动推导文件依赖关系以及待执行的命令。</p>
<p>只要make看到一个 <code v-pre>.o</code> 文件，它就会自动的把 <code v-pre>.c</code> 文件加在依赖关系中，并且相应的 <code v-pre>gcc -c xx.c</code> 命令也会被自动推导出来。</p>
<h2 id="gnu-make-的执行流程" tabindex="-1"><a class="header-anchor" href="#gnu-make-的执行流程"><span>GNU Make 的执行流程</span></a></h2>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">GNU Make 工作时的执行步骤如下：</font><ol>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">读入所有的Makefile。</font></li>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">读入被 include 的其它Makefile。</font></li>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">初始化文件中的变量。</font></li>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">推导隐式规则，并分析所有规则。</font></li>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">为所有的目标文件创建依赖关系链。</font></li>
</ol>
<hr>
<ol start="6">
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">根据依赖关系，决定哪些目标要重新生成。</font></li>
<li>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">执行生成命令。</font></li>
</ol>
<font style="color:rgb(64, 64, 64);background-color:rgb(252, 252, 252);">这些执行步骤可以被分为两个阶段： 1-5步为第一个阶段，6-7为第二个阶段。第一个阶段中，如果定义的变量被使用了，那么，make会把其展开在使用的位置。但make并不会完全马上展开，make使用的是拖延战术，如果变量出现在依赖关系的规则中，那么仅当这条依赖被决定要使用了，变量才会在其内部展开。</font><blockquote>
<p>更新: 2024-09-18 17:00:24<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/fhf3cpssnnkvadh6" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/fhf3cpssnnkvadh6</a></p>
</blockquote>
</div></template>


