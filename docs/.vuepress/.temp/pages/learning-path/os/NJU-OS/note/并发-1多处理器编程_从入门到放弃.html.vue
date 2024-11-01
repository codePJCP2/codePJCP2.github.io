<template><div><h1 id="并发-1-多处理器编程-从入门到放弃" tabindex="-1"><a class="header-anchor" href="#并发-1-多处理器编程-从入门到放弃"><span>并发-1 多处理器编程: 从入门到放弃</span></a></h1>
<h2 id="多处理器编程-入门" tabindex="-1"><a class="header-anchor" href="#多处理器编程-入门"><span>多处理器编程 - 入门</span></a></h2>
<h3 id="什么是多线程" tabindex="-1"><a class="header-anchor" href="#什么是多线程"><span>什么是多线程</span></a></h3>
<p>操作系统 -&gt; (管理) 多个进程</p>
<p>一个进程 -&gt; (拥有) 多个线程 (开始套娃了)</p>
<p>这就是多线程。</p>
<h3 id="多线程编程模型-状态机模型" tabindex="-1"><a class="header-anchor" href="#多线程编程模型-状态机模型"><span>多线程编程模型 (状态机模型)</span></a></h3>
<p>多个共享内存的状态机</p>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">C 语言状态机的多个线程</font><ul>
<li>
<font style="color:rgb(31, 35, 40);">共享所有全局变量</font></li>
<li>
<font style="color:rgb(31, 35, 40);">独立的栈帧列表</font></li>
</ul>
</li>
<li>
<font style="color:rgb(31, 35, 40);">汇编语言状态机的多个线程</font><ul>
<li>
<font style="color:rgb(31, 35, 40);">共享一个地址空间</font></li>
<li>
<font style="color:rgb(31, 35, 40);">独立的寄存器 (SP 指向不同内存位置)</font></li>
</ul>
</li>
</ul>
<font style="color:rgb(20, 20, 20);">状态迁移</font><ul>
<li>
<font style="color:rgb(31, 35, 40);">选择</font>**任意一个线程**<font style="color:rgb(31, 35, 40);">执行一步</font></li>
</ul>
<h3 id="多线程编程入门" tabindex="-1"><a class="header-anchor" href="#多线程编程入门"><span><font style="color:rgb(31, 35, 40);">多线程编程入门</font></span></a></h3>
<p>只需要 2 个 API 即可实现入门!</p>
<ul>
<li><code v-pre>&lt;font style=&quot;color:rgb(31, 35, 40);&quot;&gt;spawn(fn)&lt;/font&gt;</code>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">创建一个入口函数是</font><font style="color:rgb(31, 35, 40);"> </font>`<font style="color:rgb(31, 35, 40);">fn</font>`<font style="color:rgb(31, 35, 40);"> </font><font style="color:rgb(31, 35, 40);">的线程，并立即开始执行</font><ul>
<li><code v-pre>&lt;font style=&quot;color:rgb(31, 35, 40);&quot;&gt;void fn(int tid) { ... }&lt;/font&gt;</code></li>
<li>
<font style="color:rgb(31, 35, 40);">参数</font><font style="color:rgb(31, 35, 40);"> </font>`<font style="color:rgb(31, 35, 40);">tid</font>`<font style="color:rgb(31, 35, 40);"> </font><font style="color:rgb(31, 35, 40);">从 1 开始编号</font></li>
</ul>
</li>
<li>
<font style="color:rgb(31, 35, 40);">行为：</font>`<font style="color:rgb(31, 35, 40);">sys_spawn(fn, tid)</font>`</li>
<li>
<font style="color:rgb(31, 35, 40);">特殊说明: 该函数会把 </font>`<font style="color:rgb(31, 35, 40);">tid</font>`<font style="color:rgb(31, 35, 40);"> 当作入参</font></li>
</ul>
</li>
<li><code v-pre>&lt;font style=&quot;color:rgb(31, 35, 40);&quot;&gt;join()&lt;/font&gt;</code>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">等待所有运行线程的返回 (也可以不调用)</font></li>
<li>
<font style="color:rgb(31, 35, 40);">行为：</font>`<font style="color:rgb(31, 35, 40);">while (done != T) sys_sched()</font>`</li>
</ul>
</li>
</ul>
<div class="language-c line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-c"><code><span class="line"><span class="line"><span style="color:#5E81AC;font-weight:bold">#</span><span style="color:#81A1C1">include</span><span style="color:#ECEFF4"> "</span><span style="color:#A3BE8C">thread.h</span><span style="color:#ECEFF4">"</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">void</span><span style="color:#88C0D0"> T_a</span><span style="color:#ECEFF4">()</span><span style="color:#ECEFF4"> {</span><span style="color:#81A1C1"> while</span><span style="color:#ECEFF4"> (</span><span style="color:#B48EAD">1</span><span style="color:#ECEFF4">)</span><span style="color:#ECEFF4"> {</span><span style="color:#88C0D0"> printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">a</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span><span style="color:#ECEFF4"> }</span><span style="color:#ECEFF4"> }</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">void</span><span style="color:#88C0D0"> T_b</span><span style="color:#ECEFF4">()</span><span style="color:#ECEFF4"> {</span><span style="color:#81A1C1"> while</span><span style="color:#ECEFF4"> (</span><span style="color:#B48EAD">1</span><span style="color:#ECEFF4">)</span><span style="color:#ECEFF4"> {</span><span style="color:#88C0D0"> printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">b</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span><span style="color:#ECEFF4"> }</span><span style="color:#ECEFF4"> }</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">int</span><span style="color:#88C0D0"> main</span><span style="color:#ECEFF4">()</span><span style="color:#ECEFF4"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    create</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">T_a</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    create</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">T_b</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">}</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><font style="color:rgb(31, 35, 40);">操作系统会自动把线程放置在不同的处理器上，因此在运行这个入门程序之后，你可以看到 CPU 使用率超过 100% 的情况。</font><h3 id="留给自己的思考题-日后回来看看" tabindex="-1"><a class="header-anchor" href="#留给自己的思考题-日后回来看看"><span><font style="color:rgb(31, 35, 40);">留给自己的思考题(日后回来看看)</font></span></a></h3>
<ol>
<li><code v-pre>&lt;font style=&quot;color:rgb(20, 20, 20);&quot;&gt;T_a&lt;/font&gt;</code><font style="color:rgb(20, 20, 20);"> 和 </font><code v-pre>&lt;font style=&quot;color:rgb(20, 20, 20);&quot;&gt;T_b&lt;/font&gt;</code><font style="color:rgb(20, 20, 20);"> 真的共享内存吗？如何证明?</font></li>
<li>
<font style="color:rgb(20, 20, 20);">如何证明线程具有独立堆栈 (以及确定堆栈的范围)？</font></li>
</ol>
<details class="lake-collapse"><summary id="u28a21f1a"><span class="ne-text">问题 2 提示</span></summary><p id="u16d4f3eb" class="ne-p"><span class="ne-text" style="color: rgb(31, 35, 40)">输出混乱，应该如何处理？</span></p></details>
## 多处理器编程 - 放弃: 操作的原子性
### 原有误区
在原先不涉及到并发编程的时候，我们总是隐式认为：
<p><strong>“世界上仅有一个状态机”，没有任何东西能干涉程序的状态。</strong></p>
<p>因此，对于任何一个包含多步骤的函数调用，我们总是假想成原子性的迁移。</p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I03RNMP6upNW75vz/1729648543514-da55c721-8cad-431f-af24-3e3901d82537-237205.jpeg" alt="画板"></p>
<p>但是在并发程序中，可能会出现下面的情况：</p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I03RNMP6upNW75vz/1729648864858-3323c4a5-04f0-4ab7-b07c-bdc02975bf1e-847299.jpeg" alt="画板"></p>
<font style="color:rgb(15, 23, 42);">“世界上只有一个状态机” 的假设在共享内存并发模型下被打破了。进而，每一次内存 </font>`<font style="color:rgb(15, 23, 42);">load</font>`<font style="color:rgb(15, 23, 42);"> 都可能会读到其他线程覆盖写入的值——这给并发编程带来了很大的麻烦。</font><h3 id="并行-1-1" tabindex="-1"><a class="header-anchor" href="#并行-1-1"><span><font style="color:rgb(31, 35, 40);">并行 1 + 1</font></span></a></h3>
<div class="language-c line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-c"><code><span class="line"><span class="line"><span style="color:#5E81AC;font-weight:bold">#</span><span style="color:#81A1C1">include</span><span style="color:#ECEFF4"> "</span><span style="color:#A3BE8C">thread.h</span><span style="color:#ECEFF4">"</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#5E81AC;font-weight:bold">#</span><span style="color:#81A1C1">define</span><span style="color:#88C0D0"> N</span><span style="color:#B48EAD"> 100000000</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">long</span><span style="color:#D8DEE9FF"> sum </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 0</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">void</span><span style="color:#88C0D0"> T_sum</span><span style="color:#ECEFF4">()</span><span style="color:#ECEFF4"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    for</span><span style="color:#ECEFF4"> (</span><span style="color:#81A1C1">int</span><span style="color:#D8DEE9FF"> i </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 0</span><span style="color:#81A1C1">;</span><span style="color:#D8DEE9FF"> i </span><span style="color:#81A1C1">&#x3C;</span><span style="color:#D8DEE9FF"> N</span><span style="color:#81A1C1">;</span><span style="color:#D8DEE9FF"> i</span><span style="color:#81A1C1">++</span><span style="color:#ECEFF4">)</span><span style="color:#ECEFF4"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        // sum++;</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        // Won't work even if we force a single-instruction</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        // increment.</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        asm</span><span style="color:#81A1C1"> volatile</span><span style="color:#ECEFF4">(</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">            "</span><span style="color:#A3BE8C">incq %0</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4"> :</span><span style="color:#ECEFF4"> "</span><span style="color:#A3BE8C">+m</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">sum</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">        )</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">    }</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">}</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">int</span><span style="color:#88C0D0"> main</span><span style="color:#ECEFF4">()</span><span style="color:#ECEFF4"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    create</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">T_sum</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    create</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">T_sum</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    join</span><span style="color:#ECEFF4">()</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">sum = %ld</span><span style="color:#EBCB8B">\n</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> sum</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">2*n = %ld</span><span style="color:#EBCB8B">\n</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">,</span><span style="color:#B48EAD"> 2</span><span style="color:#81A1C1">L</span><span style="color:#81A1C1"> *</span><span style="color:#D8DEE9FF"> N</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">}</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>sum = 103766919</span></span></span>
<span class="line"><span class="line"><span>2*n = 200000000</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="思考题-构造最小调度" tabindex="-1"><a class="header-anchor" href="#思考题-构造最小调度"><span>(思考题) 构造最小调度</span></a></h3>
<div class="language-python line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-python"><code><span class="line"><span class="line"><span style="color:#81A1C1">def</span><span style="color:#88C0D0"> T_sum</span><span style="color:#ECEFF4">():</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    for</span><span style="color:#D8DEE9FF"> _ </span><span style="color:#81A1C1">in</span><span style="color:#88C0D0"> range</span><span style="color:#ECEFF4">(</span><span style="color:#B48EAD">3</span><span style="color:#ECEFF4">):</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">        t </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> heap</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">sum</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">        sys_sched</span><span style="color:#ECEFF4">()</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">        t </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> t </span><span style="color:#81A1C1">+</span><span style="color:#B48EAD"> 1</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">        heap</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">sum </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> t</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">        sys_sched</span><span style="color:#ECEFF4">()</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    sys_write</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">f</span><span style="color:#A3BE8C">'sum = </span><span style="color:#EBCB8B">{</span><span style="color:#D8DEE9FF">heap</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">sum</span><span style="color:#EBCB8B">}\n</span><span style="color:#A3BE8C">'</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">def</span><span style="color:#88C0D0"> main</span><span style="color:#ECEFF4">():</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    heap</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">sum </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 0</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    sys_spawn</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">T_sum</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    sys_spawn</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">T_sum</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    sys_spawn</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">T_sum</span><span style="color:#ECEFF4">)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多处理器编程-放弃-程序顺序执行的假设" tabindex="-1"><a class="header-anchor" href="#多处理器编程-放弃-程序顺序执行的假设"><span>多处理器编程 - 放弃: <font style="color:rgb(15, 23, 42);">程序顺序执行的假设</font></span></a></h2>
<p>很不幸，编译器也做了我们先前提到的隐含假设——如果编译器要考虑并行情况，那它还怎么做编译优化呢？</p>
<p><strong><font style="color:rgb(31, 35, 40);">在这个假设下，编译器会试图优化状态迁移，改变执行流。</font></strong></p>
<p><strong>但是，共享内存</strong>**<font style="color:rgb(20, 20, 20);">推翻了编译器的假设</font>**</p>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">但编译器依然会按照顺序执行优化代码</font></li>
<li>
<font style="color:rgb(31, 35, 40);">否则几乎任何涉及共享内存的代码都变得 </font>**<font style="color:rgb(31, 35, 40);">“不可优化”</font>**</li>
</ul>
<p><strong><font style="color:rgb(20, 20, 20);">程序的行为在并发编程下变得更难理解了</font></strong></p>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">“顺序程序” 变得一点也不 “顺序” 了</font></li>
</ul>
<h3 id="并行-1-1-1" tabindex="-1"><a class="header-anchor" href="#并行-1-1-1"><span><font style="color:rgb(31, 35, 40);">并行 1 + 1</font></span></a></h3>
<font style="color:rgb(31, 35, 40);">我们可以再次看向先前的 并行 1 + 1 例子，这次我们添加 </font>`<font style="color:rgb(31, 35, 40);">-O1</font>`<font style="color:rgb(31, 35, 40);"> 标记进行优化：</font><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span># 结果几乎是恒定的</span></span></span>
<span class="line"><span class="line"><span>sum = 100000000</span></span></span>
<span class="line"><span class="line"><span>2*n = 200000000</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>    11e7:       48 8b 15 52 2e 00 00    mov    0x2e52(%rip),%rdx        # 4040 &#x3C;sum></span></span></span>
<span class="line"><span class="line"><span>    11ee:       48 8d 42 01             lea    0x1(%rdx),%rax</span></span></span>
<span class="line"><span class="line"><span>    11f2:       48 81 c2 01 e1 f5 05    add    $0x5f5e101,%rdx</span></span></span>
<span class="line"><span class="line"><span>    11f9:       48 89 c1                mov    %rax,%rcx</span></span></span>
<span class="line"><span class="line"><span>    11fc:       48 83 c0 01             add    $0x1,%rax</span></span></span>
<span class="line"><span class="line"><span>    1200:       48 39 d0                cmp    %rdx,%rax</span></span></span>
<span class="line"><span class="line"><span>    1203:       75 f4                   jne    11f9 &#x3C;T_sum+0x16></span></span></span>
<span class="line"><span class="line"><span>    1205:       48 89 0d 34 2e 00 00    mov    %rcx,0x2e34(%rip)        # 4040 &#x3C;sum></span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>-O1</code> 优化等级下，该程序的大致执行流程为：</p>
<p><code v-pre>load(sum)</code> -&gt; <code v-pre>while(i &lt;= n) sum++;</code> -&gt; <code v-pre>store(sum)</code></p>
<p>每个线程都在并行执行相同的步骤，因此(在如果线程没有受到外部干扰的情况下)，产生的 <code v-pre>sum</code> 结果恒定为 <code v-pre>n</code>。</p>
<p>然后我们再以 <code v-pre>-O2</code> 标记进行优化：</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span># 结果基本上是完全恒定的</span></span></span>
<span class="line"><span class="line"><span>sum = 200000000</span></span></span>
<span class="line"><span class="line"><span>2*n = 200000000</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>0000000000001260 &#x3C;T_sum>:</span></span></span>
<span class="line"><span class="line"><span>    1260:       f3 0f 1e fa             endbr64 </span></span></span>
<span class="line"><span class="line"><span>    1264:       48 81 05 d1 2d 00 00    addq   $0x5f5e100,0x2dd1(%rip)        # 4040 &#x3C;sum></span></span></span>
<span class="line"><span class="line"><span>    126b:       00 e1 f5 05 </span></span></span>
<span class="line"><span class="line"><span>    126f:       c3                      ret</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>-O2</code> 优化等级下，循环被直接优化成了立即数加法(<code v-pre>addq</code>)，这大大减小了 <code v-pre>race condition</code> 发生的可能性(但是可能性还是存在的，可以通过构造合法调度复现)。</p>
<h3 id="实现一个简单的join" tabindex="-1"><a class="header-anchor" href="#实现一个简单的join"><span>实现一个简单的<code v-pre>join()</code>?</span></a></h3>
<p>如果你想要尝试着实现一个简单的 <code v-pre>join()</code> 来等待线程完成，假设你可以使用一个全局变量 <code v-pre>flag</code> 来实现进程之间的标志通信，那么一个简单的 <code v-pre>join()</code> 里面的核心代码也许会长这样：</p>
<div class="language-c line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-c"><code><span class="line"><span class="line"><span style="color:#81A1C1">int</span><span style="color:#D8DEE9FF"> flag </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 0</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">while</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">!</span><span style="color:#D8DEE9FF">flag</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1"> ;</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><font style="color:rgb(31, 35, 40);">我们的想法很简单：</font><font style="color:rgb(31, 35, 40);">等到 </font>`<font style="color:rgb(31, 35, 40);">flag</font>`<font style="color:rgb(31, 35, 40);"> 被举起之后再进行之后的操作，否则就一直执行死循环。</font><font style="color:rgb(31, 35, 40);">然而这是并发角度下的设想，如果将这段代码移到</font>**<font style="color:rgb(31, 35, 40);">顺序执行</font>**<font style="color:rgb(31, 35, 40);">的角度下呢？</font><font style="color:rgb(31, 35, 40);">如果 </font>`<font style="color:rgb(31, 35, 40);">flag == true</font>`<font style="color:rgb(31, 35, 40);"> ，那么直接跳走，否则执行死循环。</font><font style="color:rgb(31, 35, 40);">在编译器基于顺序程序执行的假设的优化下，很有可能上面这段代码就被优化成循序执行角度所描述的代码行为了，在并发程序中运行很可能会带来不可预知的问题。</font><font style="color:rgb(31, 35, 40);">通常意义上来说，可以使用 </font>`<font style="color:rgb(31, 35, 40);">volatile</font>`<font style="color:rgb(31, 35, 40);"> 关键字来</font>**<font style="color:rgb(31, 35, 40);">防止</font>**<font style="color:rgb(31, 35, 40);">编译器对被该关键字声明的变量的读写进行优化。</font><h2 id="多处理器编程-放弃-存在全局指令执行顺序的假设" tabindex="-1"><a class="header-anchor" href="#多处理器编程-放弃-存在全局指令执行顺序的假设"><span>多处理器编程 - 放弃: <font style="color:rgb(15, 23, 42);">存在全局指令执行顺序的假设</font></span></a></h2>
<h3 id="原有误区" tabindex="-1"><a class="header-anchor" href="#原有误区"><span>原有误区</span></a></h3>
<p>回顾已经经过两次优化反思后的状态机模型，它的内部还是隐藏着一些误区，比如我们总是隐式认为：</p>
<p>状态机模型的状态迁移为：</p>
<ul>
<li>选择一个线程，执行一条指令</li>
<li>这表明状态机模型中指令执行的**“顺序一致性”**</li>
</ul>
<p>幸运的是，单处理器上的多线程处理是符合我们预先的假设的：</p>
<ul>
<li>处理器会保证指令集合<strong>表层上</strong>的顺序完成性</li>
</ul>
<p>但是，处理器<strong>也是编译器</strong>：</p>
<ul>
<li>处理器会预取即将顺序执行的若干步迁移，并且尝试着做处理优化(类似于编译器的处理优化)</li>
</ul>
<p>例如有如下指令序列：</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>load(x);</span></span></span>
<span class="line"><span class="line"><span>store(y);</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果说 <code v-pre>x != y</code>(可以看成 Java 意义上的 <code v-pre>!=</code>) ，就意味着这两条指令使用的资源是无关的，因此可以不用去关心任何一条指令的执行情况——即使某一条指令暂时中断了(例如 Load Cache Miss)，另外一条指令可以直接执行，不需要等待先前执行的指令完成。</p>
<h3 id="共享内存" tabindex="-1"><a class="header-anchor" href="#共享内存"><span>共享内存？</span></a></h3>
<p>我们在介绍线程的概念中提到，“同一进程的线程之间是共享内存的”。并且我们在 1.4 节也给出了证明方法。</p>
<p>不幸的是，“共享内存”或许只是一个假象。造成这一切的根本原因是各个处理器内部维护的状态与共享内存可能并不相同——各个处理器都维护着自己的内存(缓存)副本，而各处理器之间的这些副本的数据状态可能在全局意义上<strong>并不一致</strong>。</p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I03RNMP6upNW75vz/1729819879118-aa4b4188-7eb7-4f39-b84e-f1851000b215-821816.png" alt="你以为的共享内存"></p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I03RNMP6upNW75vz/1729819916575-05986d6b-1cd7-4979-9d5e-2d244d92a041-666540.png" alt="ARM(或其他非x86架构) 的内存修罗场"></p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I03RNMP6upNW75vz/1729819949677-eb460406-8e7d-4601-a58f-3f9643b43f13-325457.png" alt="x86内存模型(添加了写缓冲区)"></p>
<p>如果采用 ARM 架构的处理器，运行下面的一段代码：</p>
<div class="language-c line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-c"><code><span class="line"><span class="line"><span style="color:#81A1C1">int</span><span style="color:#D8DEE9FF"> x </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 0</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> y </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 0</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">void</span><span style="color:#88C0D0"> T1</span><span style="color:#ECEFF4">()</span><span style="color:#ECEFF4"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">  x </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 1</span><span style="color:#81A1C1">;</span><span style="color:#81A1C1"> int</span><span style="color:#D8DEE9FF"> t </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> y</span><span style="color:#81A1C1">;</span><span style="color:#616E88"> // Store(x); Load(y)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">  __sync_synchronize</span><span style="color:#ECEFF4">()</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">  printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">%d</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> t</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">}</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">void</span><span style="color:#88C0D0"> T2</span><span style="color:#ECEFF4">()</span><span style="color:#ECEFF4"> {</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">  y </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 1</span><span style="color:#81A1C1">;</span><span style="color:#81A1C1"> int</span><span style="color:#D8DEE9FF"> t </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> x</span><span style="color:#81A1C1">;</span><span style="color:#616E88"> // Store(y); Load(x)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">  __sync_synchronize</span><span style="color:#ECEFF4">()</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">  printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">%d</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> t</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">}</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据上面的代码，我们大致可以画出下面的执行顺序：</p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I03RNMP6upNW75vz/1729820391682-5da130ac-af54-4d21-8180-28bdf59276a4-780373.jpeg" alt="画板"></p>
<p>但是，由于处理器也是编译器——它会预取待执行队列中最前面的若干条指令，判断是否相关，如果不相关则可以任意顺序执行该部分指令。</p>
<blockquote>
<p>这就是在<strong>处理器方面</strong>我们一般看不见的优化。在顺序程序中，这一优化并不改变程序的行为，因此它是有效的。但在并发程序中就不一定了——我们无法预知并发行为的时序。</p>
</blockquote>
<p>假如我们以<strong>处理器只会顺序执行指令</strong>的视角来审视这段代码，我们应该完全不可能构造出结果为 <code v-pre>00</code> 的合法调度！</p>
<p>然而，实际运行结果是这样的...</p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I03RNMP6upNW75vz/1729820675470-738cd57f-e187-4e4e-855c-3dfab779dd39-131147.png" alt="执行上述代码时的单次测试结果"></p>
<p>我们再看看另一段代码：</p>
<div class="language-c line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-c"><code><span class="line"><span class="line"><span style="color:#616E88">// Thread 1 </span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">x </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 1</span><span style="color:#81A1C1">;</span><span style="color:#D8DEE9FF"> </span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">done </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 1</span><span style="color:#81A1C1">;</span><span style="color:#D8DEE9FF"> </span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88">// Thread 2</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">while</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">done </span><span style="color:#81A1C1">==</span><span style="color:#B48EAD"> 0</span><span style="color:#ECEFF4">)</span><span style="color:#ECEFF4"> {</span><span style="color:#616E88"> /* loop */</span><span style="color:#ECEFF4"> }</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">print</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">x</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的执行结果不仅取决于硬件，还取决于编译器。</p>
<ul>
<li>在 x86 多处理器上运行的<strong>逐行转换为汇编代码的程序</strong>将始终打印 1。但是，在 ARM 或 POWER 多处理器上运行的直接行对行转换为汇编的代码存在打印 0 的情况。</li>
<li>此外，无论底层硬件是什么，标准编译器优化都可以使该程序打印为 0 或进入无限循环。(编译器将 <code v-pre>while(done == 0) {}</code> 这个循环体优化成了一个 <code v-pre>if</code> —— 略过该循环块 or 执行死循环)</li>
</ul>
<font style="color:rgb(15, 23, 42);">根据上面几段并发程序的执行结果，我们可以发现：即便我们能控制编译器生成的指令，并发程序的行为还是很容易变得更难理解(并发程序执行的结果，甚至可以不是所有执行过指令的某个排列顺序运行的结果！)，这一切都是(现代)处理器内部隐藏的一个动态编译器与缓存共同作用的结果。</font><blockquote>
<p>更新: 2024-11-01 13:30:10<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/vwdnhvt4vq2gdsf3" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/vwdnhvt4vq2gdsf3</a></p>
</blockquote>
</div></template>


