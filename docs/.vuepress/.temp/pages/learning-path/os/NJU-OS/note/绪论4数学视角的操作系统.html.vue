<template><div><h1 id="绪论4-数学视角的操作系统" tabindex="-1"><a class="header-anchor" href="#绪论4-数学视角的操作系统"><span>绪论4 数学视角的操作系统</span></a></h1>
<h2 id="程序正确性证明" tabindex="-1"><a class="header-anchor" href="#程序正确性证明"><span>程序正确性证明</span></a></h2>
<h3 id="程序的数学严格性" tabindex="-1"><a class="header-anchor" href="#程序的数学严格性"><span>程序的数学严格性</span></a></h3>
<p>根据 <code v-pre>Everything is a state machine.</code> 这一思想，程序其实是一种<strong>数学严格</strong>的对象(因为状态机也是<strong>数学严格</strong>的)。</p>
<blockquote>
<p>程序 = 状态 = 初始状态 + 状态迁移 (详见<a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/zbhox7nphbbk7kzo#YgbtA" target="_blank" rel="noopener noreferrer">绪论 2</a>)</p>
</blockquote>
<p>在这个视角下，程序和数学对象已经十分接近了：</p>
<p>$ f(s) = s^{'} $</p>
<p>那我们可以用证明数学性质的方式，来证明程序的正确性吗？</p>
<p>例如某蓝色修改器，程序中存在一个 <code v-pre>Account</code> 类，表示用户的账户相关内容。</p>
<ul>
<li>成员变量
<ul>
<li><code v-pre>b</code> ：Balance，表示账户余额</li>
</ul>
</li>
<li>成员方法
<ul>
<li><code v-pre>deposit</code> 存款</li>
<li><code v-pre>withdraw</code> 取款</li>
<li><code v-pre>transfer</code> 转账</li>
</ul>
</li>
</ul>
<p>我们希望程序在执行过程中，每个账户的余额 <code v-pre>b</code> 始终保持$ b \geq 0 $。</p>
<p>有什么办法能够证明程序的正确性呢？</p>
<ul>
<li>暴力破解，遍历所有状态机组成的图</li>
<li>使用数学方法，证明$ For \hspace{5pt} all \hspace{5pt} f-reachable\hspace{5pt} states, \hspace{5pt} b \geq 0  \hspace{5pt} holds $。</li>
</ul>
<h3 id="一些启发" tabindex="-1"><a class="header-anchor" href="#一些启发"><span>一些启发</span></a></h3>
<h4 id="暴力枚举带来的启发" tabindex="-1"><a class="header-anchor" href="#暴力枚举带来的启发"><span><font style="color:rgb(20, 20, 20);">暴力枚举带来的启发</font></span></a></h4>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">我们应该把需要证明的性质写成 </font>`<font style="color:rgb(31, 35, 40);">assertions</font>`</li>
<li><code v-pre>&lt;font style=&quot;color:rgb(31, 35, 40);&quot;&gt;assert(u-&gt;prev-&gt;next == u)&lt;/font&gt;</code><font style="color:rgb(31, 35, 40);"> (双向链表)</font>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">至少可以避免 “悄悄出错” 的情况发生</font></li>
</ul>
</li>
</ul>
<h4 id="写出证明带来的启发" tabindex="-1"><a class="header-anchor" href="#写出证明带来的启发"><span><font style="color:rgb(20, 20, 20);">写出证明带来的启发</font></span></a></h4>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">容易</font>**阅读**<font style="color:rgb(31, 35, 40);"> (self-explain) 的代码是好代码</font><ul>
<li>
<font style="color:rgb(31, 35, 40);">能把代码和需求联系起来</font></li>
</ul>
</li>
<li>
<font style="color:rgb(31, 35, 40);">容易</font>**验证**<font style="color:rgb(31, 35, 40);"> (self-evident) 的代码是好代码</font><ul>
<li>
<font style="color:rgb(31, 35, 40);">能把代码和正确性证明联系起来</font></li>
<li>
<font style="color:rgb(31, 35, 40);">“Proof-carrying code”</font></li>
</ul>
</li>
</ul>
<h2 id="为操作系统建模" tabindex="-1"><a class="header-anchor" href="#为操作系统建模"><span><font style="color:rgb(31, 35, 40);">为操作系统建模</font></span></a></h2>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I2jib7YjWnf8uWlV/1727091516725-77f3e064-46aa-480c-9221-e4996a018f50-028102.jpeg" alt="画板"></p>
<p>我们都说程序是运行在操作系统上的，既然程序是状态机，那么自然 OS 就是这些<strong>状态机的管理者</strong>。OS 在每一段时间内选择一个程序执行，更新该状态机的状态。但是 OS 本身也是个程序，它本身也是个状态机。</p>
<p>我们能否为操作系统做一个简单的建模？</p>
<h3 id="玩具操作系统" tabindex="-1"><a class="header-anchor" href="#玩具操作系统"><span>玩具操作系统</span></a></h3>
<p>为了方便，我们在建模过程中将 OS 简单化，将它所做的事情仅局限于：</p>
<ul>
<li>管理状态机</li>
<li>执行系统调用</li>
</ul>
<p>玩具操作系统中所要包含的对象：</p>
<ul>
<li>状态机(程序)
<ul>
<li>可以执行计算与发出系统调用请求</li>
</ul>
</li>
<li>所有进程间共享的全局 buffer</li>
</ul>
<p>我们这个玩具操作系统中所包含的系统调用：</p>
<ul>
<li><code v-pre>read()</code>：读入随机的 1bit</li>
<li><code v-pre>write()</code>：将内容追加至 buffer 中</li>
<li><code v-pre>spawn(proc)</code>：生成进程 <code v-pre>proc</code> ，并交由 OS 管理</li>
</ul>
<p>实现的难点：</p>
<ul>
<li>多状态机切换
<ul>
<li>可以借助于 Python 中的 Generator 特性来单步执行内容并保存上下文</li>
</ul>
</li>
</ul>
<h3 id="实现玩具操作系统" tabindex="-1"><a class="header-anchor" href="#实现玩具操作系统"><span>实现玩具操作系统</span></a></h3>
<ul>
<li>操作系统需要什么？
<ul>
<li>进程列表(实现进程管理与切换)</li>
<li>提供系统调用(供进程使用)</li>
<li><strong>全局</strong> buffer(供进程输出信息)</li>
</ul>
</li>
</ul>
<div class="language-python line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-python"><code><span class="line"><span class="line"><span style="color:#616E88">#!/usr/bin/env python3</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">import</span><span style="color:#D8DEE9FF"> sys</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">import</span><span style="color:#D8DEE9FF"> random</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">from</span><span style="color:#D8DEE9FF"> pathlib </span><span style="color:#81A1C1">import</span><span style="color:#D8DEE9FF"> Path</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">class</span><span style="color:#8FBCBB"> OS</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">    '''</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">    A minimal executable operating system model. Processes</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">    are state machines (Python generators) that can be paused</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">    or continued with local states being saved.</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">    '''</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">    '''</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">    We implement three system calls:</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">    - read: read a random bit value.</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">    - write: write a string to the buffer.</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">    - spawn: create a new state machine (process).</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">    '''</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    SYSCALLS </span><span style="color:#81A1C1">=</span><span style="color:#ECEFF4"> [</span><span style="color:#ECEFF4">'</span><span style="color:#A3BE8C">read</span><span style="color:#ECEFF4">'</span><span style="color:#ECEFF4">,</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">write</span><span style="color:#ECEFF4">'</span><span style="color:#ECEFF4">,</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">spawn</span><span style="color:#ECEFF4">'</span><span style="color:#ECEFF4">]</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    class</span><span style="color:#8FBCBB"> Process</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">        '''</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">        A "freezed" state machine. The state (local variables,</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">        program counters, etc.) are stored in the generator</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">        object.</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">        '''</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        def</span><span style="color:#88C0D0"> __init__</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">self</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9"> func</span><span style="color:#ECEFF4">:</span><span style="color:#D8DEE9FF"> function</span><span style="color:#ECEFF4">,</span><span style="color:#81A1C1"> *</span><span style="color:#D8DEE9">args</span><span style="color:#ECEFF4">):</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">            # func should be a generator function. Calling</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">            # func(*args) returns a generator object.</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">            self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">_func </span><span style="color:#81A1C1">=</span><span style="color:#88C0D0"> func</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">*</span><span style="color:#D8DEE9FF">args</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88">            # This return value is set by the OS's main loop.</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">            self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">retval </span><span style="color:#81A1C1">=</span><span style="color:#81A1C1"> None</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        def</span><span style="color:#88C0D0"> step</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">self</span><span style="color:#ECEFF4">):</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">            '''</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">            Resume the process with OS-written return value,</span></span></span>
<span class="line"><span class="line"><span style="color:#A3BE8C">            until the next system call is issued.</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">            '''</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">            syscall</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> args</span><span style="color:#ECEFF4">,</span><span style="color:#81A1C1"> *</span><span style="color:#D8DEE9FF">_ </span><span style="color:#81A1C1">=</span><span style="color:#81A1C1"> self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">_func</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">send</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">retval</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">            self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">retval </span><span style="color:#81A1C1">=</span><span style="color:#81A1C1"> None</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">            return</span><span style="color:#D8DEE9FF"> syscall</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> args</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    def</span><span style="color:#88C0D0"> __init__</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">self</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9"> src</span><span style="color:#ECEFF4">):</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # This is a hack: we directly execute the source</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # in the current Python runtime--and main is thus</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # available for calling.</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">        exec</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">src</span><span style="color:#ECEFF4">,</span><span style="color:#88C0D0"> globals</span><span style="color:#ECEFF4">())</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # The "main" fuction is in the files of the given args(e.g. hello.py)</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">procs </span><span style="color:#81A1C1">=</span><span style="color:#ECEFF4"> [</span><span style="color:#D8DEE9FF">OS</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">Process</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">main</span><span style="color:#ECEFF4">)]</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">buffer </span><span style="color:#81A1C1">=</span><span style="color:#ECEFF4"> ''</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    def</span><span style="color:#88C0D0"> run</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">self</span><span style="color:#ECEFF4">):</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # Real operating systems waste all CPU cycles</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # (efficiently, by putting the CPU into sleep) when</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # there is no running process at the moment. Our model</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">        # terminates if there is nothing to run.</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        while</span><span style="color:#81A1C1"> self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">procs</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88">            # There is also a pointer to the "current" process</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">            # in today's operating systems.</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">            # dispatch</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">            current </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> random</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">choice</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">procs</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88">            # syscall</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">            try</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">                # Operating systems handle interrupt and system</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">                # calls, and "assign" CPU to a process.</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">                # contexts changing?</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                match</span><span style="color:#D8DEE9FF"> current</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">step</span><span style="color:#ECEFF4">():</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                    case</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">read</span><span style="color:#ECEFF4">'</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> _</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">                        current</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">retval </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> random</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">choice</span><span style="color:#ECEFF4">([</span><span style="color:#B48EAD">0</span><span style="color:#ECEFF4">,</span><span style="color:#B48EAD"> 1</span><span style="color:#ECEFF4">])</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                    case</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">write</span><span style="color:#ECEFF4">'</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> s</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                        self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">buffer </span><span style="color:#81A1C1">+=</span><span style="color:#D8DEE9FF"> s</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                    case</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">spawn</span><span style="color:#ECEFF4">'</span><span style="color:#ECEFF4">,</span><span style="color:#ECEFF4"> (</span><span style="color:#D8DEE9FF">fn</span><span style="color:#ECEFF4">:</span><span style="color:#D8DEE9FF"> function</span><span style="color:#ECEFF4">,</span><span style="color:#81A1C1"> *</span><span style="color:#D8DEE9FF">args</span><span style="color:#ECEFF4">):</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                        self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">procs </span><span style="color:#81A1C1">+=</span><span style="color:#ECEFF4"> [</span><span style="color:#D8DEE9FF">OS</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">Process</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">fn</span><span style="color:#ECEFF4">,</span><span style="color:#81A1C1"> *</span><span style="color:#D8DEE9FF">args</span><span style="color:#ECEFF4">)]</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                    case</span><span style="color:#D8DEE9FF"> _</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                        assert</span><span style="color:#B48EAD"> 0</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">            except</span><span style="color:#8FBCBB"> StopIteration</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">                # The generator object terminates.</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">procs</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">remove</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">current</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        return</span><span style="color:#81A1C1"> self</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">buffer</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">if</span><span style="color:#D8DEE9FF"> __name__ </span><span style="color:#81A1C1">==</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">__main__</span><span style="color:#ECEFF4">'</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    if</span><span style="color:#88C0D0"> len</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">sys</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">argv</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1"> &#x3C;</span><span style="color:#B48EAD"> 2</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">        print</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">f</span><span style="color:#A3BE8C">'Usage: </span><span style="color:#EBCB8B">{</span><span style="color:#D8DEE9FF">sys</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">argv</span><span style="color:#ECEFF4">[</span><span style="color:#B48EAD">0</span><span style="color:#ECEFF4">]</span><span style="color:#EBCB8B">}</span><span style="color:#A3BE8C"> file'</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">        exit</span><span style="color:#ECEFF4">(</span><span style="color:#B48EAD">1</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    src </span><span style="color:#81A1C1">=</span><span style="color:#88C0D0"> Path</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">sys</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">argv</span><span style="color:#ECEFF4">[</span><span style="color:#B48EAD">1</span><span style="color:#ECEFF4">]).</span><span style="color:#88C0D0">read_text</span><span style="color:#ECEFF4">()</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#616E88">    # Hack: patch sys_read(...) -> yield "sys_read", (...)</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    for</span><span style="color:#D8DEE9FF"> syscall </span><span style="color:#81A1C1">in</span><span style="color:#D8DEE9FF"> OS</span><span style="color:#ECEFF4">.</span><span style="color:#D8DEE9FF">SYSCALLS</span><span style="color:#ECEFF4">:</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">        src </span><span style="color:#81A1C1">=</span><span style="color:#D8DEE9FF"> src</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">replace</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">f</span><span style="color:#A3BE8C">'sys_</span><span style="color:#EBCB8B">{</span><span style="color:#D8DEE9FF">syscall</span><span style="color:#EBCB8B">}</span><span style="color:#A3BE8C">'</span><span style="color:#ECEFF4">,</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">                          f</span><span style="color:#A3BE8C">'yield "</span><span style="color:#EBCB8B">{</span><span style="color:#D8DEE9FF">syscall</span><span style="color:#EBCB8B">}</span><span style="color:#A3BE8C">", '</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    stdout </span><span style="color:#81A1C1">=</span><span style="color:#88C0D0"> OS</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">src</span><span style="color:#ECEFF4">).</span><span style="color:#88C0D0">run</span><span style="color:#ECEFF4">()</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    print</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9FF">stdout</span><span style="color:#ECEFF4">)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以对这个玩具操作系统对应的状态机进行分析：</p>
<ul>
<li>初始状态：仅一个初始进程 <code v-pre>main</code></li>
<li>状态转移：随机选择一个进程执行一步 <code v-pre>step()</code></li>
</ul>
<p>那么它对应的状态图大致是这样的：</p>
<p><img src="@source/learning-path/os/NJU-OS/note/img/I2jib7YjWnf8uWlV/1727142923161-4c58c211-41f4-40dc-b570-ab9ab101dc83-700696.jpeg" alt="画板"></p>
<blockquote>
<p>更新: 2024-10-23 08:43:01<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/fn885gf3a1e9t4m4" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/fn885gf3a1e9t4m4</a></p>
</blockquote>
</div></template>


