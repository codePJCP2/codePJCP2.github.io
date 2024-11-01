<template><div><h1 id="homework-threads-intro" tabindex="-1"><a class="header-anchor" href="#homework-threads-intro"><span>Homework - Threads Intro</span></a></h1>
<h1 id="focus-on-loop-s" tabindex="-1"><a class="header-anchor" href="#focus-on-loop-s"><span>Focus on <code v-pre>loop.s</code></span></a></h1>
<blockquote>
<p>Let's examine a simple program,“loop.s”. First, just read and understand it. Then, run it with these arguments (<code v-pre>./x86.py -t 1 -p loop.s -i 100 -R dx</code>) This specifies a single thread, an interrupt every <code v-pre>100</code> instructions, and tracing of register <code v-pre>%dx</code>. What will <code v-pre>%dx</code> be during the run?</p>
<p>Use the <code v-pre>-c</code> flag to check your answers; the answers, on the left, show the value of the register (or memory value) after the instruction on the right has run.</p>
</blockquote>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>.main</span></span></span>
<span class="line"><span class="line"><span>.top</span></span></span>
<span class="line"><span class="line"><span>sub  $1,%dx # %dx = %dx - 1</span></span></span>
<span class="line"><span class="line"><span>test $0,%dx </span></span></span>
<span class="line"><span class="line"><span>jgte .top   # jump to .top label if %dx >= 0</span></span></span>
<span class="line"><span class="line"><span>halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们在执行汇编代码时，并没有使用<code v-pre>-a</code> 选项对<code v-pre>%dx</code> 寄存器中的值进行指定，因此<code v-pre>(%dx)</code> 初始为 0。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>   dx          Thread 0         </span></span></span>
<span class="line"><span class="line"><span>    0   </span></span></span>
<span class="line"><span class="line"><span>   -1   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>   -1   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>   -1   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>   -1   1003 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="loop-s-multi-threads" tabindex="-1"><a class="header-anchor" href="#loop-s-multi-threads"><span><code v-pre>loop.s</code> - Multi-threads</span></a></h1>
<blockquote>
<p>Same code, different flags: (<code v-pre>./x86.py -p loop.s -t 2 -i 100 -a dx=3,dx=3 -R dx</code>) This specifies two threads, and initializes each <code v-pre>%dx</code> to 3. What values will <code v-pre>%dx</code> see? Run with <code v-pre>-c</code> to check.</p>
<p>Does the presence of multiple threads affect your calculations? Is there a <strong>race</strong> in this code?</p>
</blockquote>
<p>我们知道，产生 race 的根本原因是未经控制的执行。我们先看看当<code v-pre>%dx = 3</code>的时候单个线程是如何正常执行的：</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span># ...</span></span></span>
<span class="line"><span class="line"><span>ARG interrupt frequency 50</span></span></span>
<span class="line"><span class="line"><span># ...</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>  dx          Thread 0         </span></span></span>
<span class="line"><span class="line"><span>    ?   </span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   1003 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，当 <code v-pre>%dx = 3</code>时，整个循环执行了四次，最后调用 <code v-pre>halt</code> 退出，因此总指令执行条数为 13 条，小于预设置的 interrupt frequency 值，因此整个线程执行过程中不会被中断。</p>
<p>那我们自然也可以遇见存在两个线程甚至更多个线程的情况下整个程序的执行流程——进程间的执行互不干扰，完全没有 race 的可能性(前提是 <code v-pre>%dx = 3</code>，更精确一点，只需要满足 $ (IF - 1) / 3 &gt;= %dx $ 即可)。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>dx          Thread 0                Thread 1         </span></span></span>
<span class="line"><span class="line"><span>    3   </span></span></span>
<span class="line"><span class="line"><span>    2   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    2   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    2   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    1   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    1   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    1   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    0   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    0   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    0   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>   -1   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>   -1   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>   -1   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>   -1   1003 halt</span></span></span>
<span class="line"><span class="line"><span>    3   ----- Halt;Switch -----  ----- Halt;Switch -----  </span></span></span>
<span class="line"><span class="line"><span>    2                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    2                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    2                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    1                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    1                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    1                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    0                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    0                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    0                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>   -1                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>   -1                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>   -1                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>   -1                            1003 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="loop-s-smaller-interrupt-frequency" tabindex="-1"><a class="header-anchor" href="#loop-s-smaller-interrupt-frequency"><span><code v-pre>loop.s</code> - Smaller Interrupt Frequency</span></a></h1>
<blockquote>
<p>Run this: <code v-pre>./x86.py -p loop.s -t 2 **-i 3** -r -R dx -a dx=3,dx=3</code></p>
<p>This makes the interrupt interval small/random; use different seeds <code v-pre>(-s)</code> to see different interleavings.</p>
<p>Does the interrupt frequency change anything?</p>
</blockquote>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>   dx          Thread 0                Thread 1         </span></span></span>
<span class="line"><span class="line"><span>    ?   </span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1003 halt</span></span></span>
<span class="line"><span class="line"><span>    ?   ----- Halt;Switch -----  ----- Halt;Switch -----  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?                            1003 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>   dx          Thread 0                Thread 1         </span></span></span>
<span class="line"><span class="line"><span>    ?   </span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1000 sub  $1,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?                            1003 halt</span></span></span>
<span class="line"><span class="line"><span>    ?   ----- Halt;Switch -----  ----- Halt;Switch -----  </span></span></span>
<span class="line"><span class="line"><span>    ?   1001 test $0,%dx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1002 jgte .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1003 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实，interrupt frequency 对这类没有 critical section 的代码并没有任何带来差错的可能性，因为在中断切换线程的同时也会切换线程的上下文，<code v-pre>%dx</code> 并非是 shared data。</p>
<h1 id="looping-race-nolock-s-first-sight-of-race" tabindex="-1"><a class="header-anchor" href="#looping-race-nolock-s-first-sight-of-race"><span><code v-pre>looping-race-nolock.s</code> - First sight of <u>race</u></span></a></h1>
<blockquote>
<p>Now, a different program, <code v-pre>looping-race-nolock.s</code>, which accesses a <u>shared variable</u> located at address 2000; we'll call this variable value. Run it with a <strong>single</strong> thread to confirm your understanding:</p>
<p><code v-pre>./x86.py -p looping-race-nolock.s -t 1 -M 2000</code></p>
<p>What is value (i.e., at memory address <code v-pre>2000</code>) throughout the run? Use <code v-pre>-c</code> to check.</p>
</blockquote>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span># assumes %bx has loop count in it</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>.main</span></span></span>
<span class="line"><span class="line"><span>.top	</span></span></span>
<span class="line"><span class="line"><span># critical section</span></span></span>
<span class="line"><span class="line"><span>mov 2000, %ax  # get 'value' at address 2000</span></span></span>
<span class="line"><span class="line"><span>add $1, %ax    # increment it</span></span></span>
<span class="line"><span class="line"><span>mov %ax, 2000  # store it back</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span># see if we're still looping</span></span></span>
<span class="line"><span class="line"><span>sub  $1, %bx</span></span></span>
<span class="line"><span class="line"><span>test $0, %bx</span></span></span>
<span class="line"><span class="line"><span>jgt .top	</span></span></span>
<span class="line"><span class="line"><span></span></span></span>
<span class="line"><span class="line"><span>halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始状态下，除必要空间外，我们默认其余位置上的内容初始都为 0。</p>
<p>因此 <code v-pre>(2000) = %ax = %bx = 0</code></p>
<p>critical section 部分的代码将位于 2000 地址处的内容取到 <code v-pre>%ax</code> 寄存器中，再将 <code v-pre>%ax</code> 中的内容+1，最后再把 <code v-pre>%ax</code> 寄存器中的内容移动到 2000 地址处。</p>
<p>由于 <code v-pre>%bx = 0</code>，因此循环仅执行一次。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span> 2000      bx          Thread 0         </span></span></span>
<span class="line"><span class="line"><span>    0       0   </span></span></span>
<span class="line"><span class="line"><span>    0       0   1000 mov 2000, %ax</span></span></span>
<span class="line"><span class="line"><span>    0       0   1001 add $1, %ax</span></span></span>
<span class="line"><span class="line"><span>    1       0   1002 mov %ax, 2000</span></span></span>
<span class="line"><span class="line"><span>    1      -1   1003 sub  $1, %bx</span></span></span>
<span class="line"><span class="line"><span>    1      -1   1004 test $0, %bx</span></span></span>
<span class="line"><span class="line"><span>    1      -1   1005 jgt .top</span></span></span>
<span class="line"><span class="line"><span>    1      -1   1006 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="looping-race-nolock-s-multi-threads" tabindex="-1"><a class="header-anchor" href="#looping-race-nolock-s-multi-threads"><span><code v-pre>looping-race-nolock.s</code> - Multi-threads</span></a></h1>
<blockquote>
<p>Run with multiple iterations/threads:</p>
<p><code v-pre>./x86.py -p looping-race-nolock.s -t 2 -a bx=3 -M 2000</code></p>
<p>Why does each thread loop three times? What is final value of _value in _2000?</p>
</blockquote>
<p>每一个线程都维护着自己的寄存器状态，因此它们初始的 <code v-pre>%bx</code> 均为 3。</p>
<p>由于每一个线程都循环了三次，2000 地址上的最终值为 6。(IF 比较高的缘故)</p>
<h1 id="looping-race-nolock-s-random-interrupt-intervals" tabindex="-1"><a class="header-anchor" href="#looping-race-nolock-s-random-interrupt-intervals"><span><code v-pre>looping-race-nolock.s</code> - Random Interrupt Intervals</span></a></h1>
<blockquote>
<p>Run with random interrupt intervals:</p>
<p><code v-pre>./x86.py -p looping-race-nolock.s -t 2 -M 2000 -i 4 -r -s 0</code></p>
<p>with different seeds (<code v-pre>-s 1, -s 2</code>, etc.) 。</p>
<p>Can you tell by looking at the thread interleaving what the final value of _value _will be? Does the timing of the interrupt matter? Where can it safely occur? Where not? In other words, where is the critical section exactly?</p>
</blockquote>
<p>当 seed 为 0 时，执行次序如下：</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>2000          Thread 0                Thread 1         </span></span></span>
<span class="line"><span class="line"><span>    ?   </span></span></span>
<span class="line"><span class="line"><span>    ?   1000 mov 2000, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?   1001 add $1, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?   1002 mov %ax, 2000</span></span></span>
<span class="line"><span class="line"><span>    ?   1003 sub  $1, %bx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1000 mov 2000, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?                            1001 add $1, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?                            1002 mov %ax, 2000</span></span></span>
<span class="line"><span class="line"><span>    ?                            1003 sub  $1, %bx</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1004 test $0, %bx</span></span></span>
<span class="line"><span class="line"><span>    ?   1005 jgt .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1004 test $0, %bx</span></span></span>
<span class="line"><span class="line"><span>    ?                            1005 jgt .top</span></span></span>
<span class="line"><span class="line"><span>    ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?   1006 halt</span></span></span>
<span class="line"><span class="line"><span>    ?   ----- Halt;Switch -----  ----- Halt;Switch -----  </span></span></span>
<span class="line"><span class="line"><span>    ?                            1006 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，在每次中断之前，各个线程都将修改后的值存回了共享的内存地址。因此 2000 地址处的值为 2。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>mov 2000, %ax  # get 'value' at address 2000</span></span></span>
<span class="line"><span class="line"><span>add $1, %ax    # increment it</span></span></span>
<span class="line"><span class="line"><span>mov %ax, 2000  # store it back</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="looping-race-nolock-s-fixed-interrupt-intervals" tabindex="-1"><a class="header-anchor" href="#looping-race-nolock-s-fixed-interrupt-intervals"><span><code v-pre>looping-race-nolock.s</code> - Fixed Interrupt Intervals</span></a></h1>
<blockquote>
<p>Now examine <strong>fixed</strong> interrupt intervals:</p>
<p><code v-pre>./x86.py -p looping-race-nolock.s -a bx=1 -t 2 -M 2000 -i 1</code></p>
<p>What will the final value of the shared variable value be? What about when you change <code v-pre>-i 2, -i 3,</code> etc.? For which interrupt intervals does the program give the “correct” answer?</p>
</blockquote>
<p>当 Interrupt Interval 为 1 的时候，2000 地址处的最终值为 1，因为出现了 race。</p>
<p>当 II 为 2 时，同样会出现 race。因为 Critical Section 部分没有被原子化执行。</p>
<p>同理，当 $ Interrupt Interval \geq 3 $ 时，Critical Section 部分能够被视为原子化执行，因此不会出现 race。</p>
<h1 id="looping-race-nolock-s-loop-condtions" tabindex="-1"><a class="header-anchor" href="#looping-race-nolock-s-loop-condtions"><span><code v-pre>looping-race-nolock.s</code> - Loop Condtions</span></a></h1>
<blockquote>
<p>Run the same for <strong>more</strong> loops (e.g., set <code v-pre>-a bx=100</code>).</p>
<ul>
<li>What interrupt intervals (<code v-pre>-i</code>) lead to a correct outcome?</li>
<li>Which intervals are surprising?</li>
</ul>
</blockquote>
<p>当 <code v-pre>-i % 3 == 0</code> 的时候，程序能够输出正确的结果，因为 Critical Section 的指令个数以及循环部分的指令个数都为 3。</p>
<p>我们试着在循环部分的代码中添加一个指令：<code v-pre>sub $0, %bx</code></p>
<p>这时就需要 <code v-pre>-i % 7 == 0</code> 才能输出正确的结果，即每次中断前需要恰好原子化地完成<strong>一次 Critical Section 或者一次循环部分</strong> 才能输出正确结果。</p>
<h1 id="wait-for-me-s-wait-for-another" tabindex="-1"><a class="header-anchor" href="#wait-for-me-s-wait-for-another"><span><code v-pre>wait-for-me.s</code> - Wait For Another</span></a></h1>
<blockquote>
<p>Run:</p>
<p><code v-pre>./x86.py -p wait-for-me.s -a ax=1,ax=0 -R ax -M 2000 </code></p>
<p>This sets the <code v-pre>%ax</code> register to 1 for thread 0, and 0 for thread 1, and watches <code v-pre>%ax</code> and memory location 2000.</p>
<ul>
<li>How should the code behave?</li>
<li>How is the value at location 2000 being used by the threads?</li>
<li>What will its final value be?</li>
</ul>
</blockquote>
<p>线程 0 是 Signaller，线程 1 是 Waiter。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span> 2000      ax          Thread 0(Signaller)     Thread 1(Waiter)         </span></span></span>
<span class="line"><span class="line"><span>    ?       ?   </span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1000 test $1, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1001 je .signaller</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1006 mov  $1, 2000</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1007 halt</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   ----- Halt;Switch -----  ----- Halt;Switch -----  </span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1000 test $1, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1001 je .signaller</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1005 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线程 0 将常量 1 移动到 2000 位置处，线程 1 判断 2000 地址处的值是否为 1，若不为 1 则一直循环等待。</p>
<p>最终值：<code v-pre>**2000：1**</code></p>
<h1 id="wait-for-me-s-wait-for-another-switched" tabindex="-1"><a class="header-anchor" href="#wait-for-me-s-wait-for-another-switched"><span><code v-pre>wait-for-me.s</code> - Wait For Another --Switched</span></a></h1>
<blockquote>
<p>Now switch the inputs:</p>
<p><code v-pre>./x86.py -p wait-for-me.s -a ax=0,ax=1 -R ax -M 2000 </code></p>
<ul>
<li>How do the threads behave?</li>
<li>What is thread <code v-pre>0</code> doing?</li>
<li>How would changing the interrupt interval (e.g., <code v-pre>-i 1000</code>, or perhaps to use <strong>random</strong> intervals) change the trace outcome?</li>
<li>Is the program <strong>efficiently</strong> using the CPU?</li>
</ul>
</blockquote>
<p>交换过后，线程 0 为等待者，线程 1 为信号员。</p>
<p>系统首先执行线程 0，于是一直在等待，直到执行指令数达到 II 后被强制中断。</p>
<p>然后线程 1 为 2000 地址处的内容赋值 1。</p>
<p>最后切换到线程 0，等待条件不满足，于是执行完毕。</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span> 2000      ax          Thread 0                Thread 1         </span></span></span>
<span class="line"><span class="line"><span>    ?       ?   </span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1000 test $1, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1001 je .signaller</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   ------ Interrupt ------  ------ Interrupt ------  </span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1000 test $1, %ax</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1001 je .signaller</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1006 mov  $1, 2000</span></span></span>
<span class="line"><span class="line"><span>    ?       ?                            1007 halt</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   ----- Halt;Switch -----  ----- Halt;Switch -----  </span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1002 mov  2000, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1003 test $1, %cx</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1004 jne .waiter</span></span></span>
<span class="line"><span class="line"><span>    ?       ?   1005 halt</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增大 II 的值只会增加线程 0 第一次执行的指令个数。</p>
<p>交换角色后，CPU 的利用率被大幅降低——线程 0 绝大多数时间都处于等待状态，没有真正去执行有效命令。</p>
<blockquote>
<p>更新: 2024-10-04 15:19:12<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/tln5rwh7u5uo8zvd" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/tln5rwh7u5uo8zvd</a></p>
</blockquote>
</div></template>


