<template><div><h2 id="SMPgv">并发控制 - 阻止并发</h2>
并发给并发程序带来了一系列不容易被我们直接察觉的 bug (例如某山寨支付宝的错误扣款例子)。我们有没有什么办法可以对并发进行控制呢？
<p>也许 <strong>阻止并发</strong> 是唯一的方法。但是，如果 <strong>阻止并发</strong> 是对并发进行正确控制的唯一方法，那么并发为什么要存在？</p>
<p><img src="https://cdn.nlark.com/yuque/0/2024/jpeg/48275148/1730356467740-7a6675d7-95b8-49d6-b23e-b7ffa827944a.jpeg" alt="画板"></p>
<p>看起来，并行总归是有作用的：只要在不需要并发的时候阻止并发，其余情况下启用并发，并发总能给程序执行提速。</p>
<h2 id="UO2F0">实现互斥 - Stop the World</h2>
![画板](https://cdn.nlark.com/yuque/0/2024/jpeg/48275148/1730425742223-837a614e-c7cf-41e0-8e04-3f9e66f6f4bf.jpeg)
<p>为了尽可能避免并行带来的一系列 bug ，我们试图通过添加<strong>锁</strong>来保证指定状态迁移步骤的原子性。简单来说，就是当某个线程持有锁的时候，其他状态迁移不能够入侵该线程的状态迁移过程，以此实现持有锁过程中状态迁移的原子性。</p>
<p>那么如何实现互斥呢？</p>
<ul>
<li>单处理器系统：<strong>关闭中断 (剥夺切换状态机的能力)</strong></li>
<li>多处理器系统：???</li>
</ul>
<p><img src="https://cdn.nlark.com/yuque/0/2024/png/48275148/1730426249610-4b24830e-bde7-4baa-9c0f-dd5c16fa5231.png" alt="单处理器关闭中断的方法"></p>
<p>然而，道高一尺，魔高一丈。处理器中存在着 <strong>NMI</strong> <font style="color:rgb(31, 35, 40);">(</font><em><font style="color:rgb(31, 35, 40);">Non-Maskable Interrupts</font></em><font style="color:rgb(31, 35, 40);">，不可屏蔽中断)，例如掉电中断等情况。</font></p>
<font style="color:rgb(31, 35, 40);">关中断并不是万能的：</font><p><strong><font style="color:rgb(20, 20, 20);">操作系统可以，但普通程序不行</font></strong></p>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">中断保证了死循环不能把计算机 “卡死”</font></li>
<li>
<font style="color:rgb(31, 35, 40);">操作系统不允许普通程序关中断  
</li>
</ul>
</font>![应用程序试图关中断](https://cdn.nlark.com/yuque/0/2024/png/48275148/1730426907196-3be3cdd2-668a-43bc-866f-932bac4adb2d.png)
    - <font style="color:rgb(31, 35, 40);">但如果是操作系统代码，完全可以短暂关闭中断  
</font>![在(虚拟)操作系统内核中关闭中断](https://cdn.nlark.com/yuque/0/2024/png/48275148/1730427050137-69ebf097-1ecf-4d9b-8bd2-c29f04cd80e7.png)
<p><strong><font style="color:rgb(20, 20, 20);">单处理器系统可以，多处理器系统不行</font></strong></p>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">每个处理器有独立的寄存器组</font></li>
<li>
<font style="color:rgb(31, 35, 40);">中断是</font>**<font style="color:rgb(31, 35, 40);">每个处理器内部状态</font>**</li>
</ul>
<blockquote>
<font style="color:rgb(15, 23, 42);">对于操作系统上的应用程序，关闭中断是</font>**<font style="color:rgb(15, 23, 42);">不能容忍</font>**<font style="color:rgb(15, 23, 42);">的：这会使微小的 bug 或是恶意的程序破坏计算机的运行。操作系统正是因为统治了中断，才实现了对应用程序的管理。在操作系统内核的实现中，关闭中断是一个常见的操作。</font></blockquote>
<h2 id="USPAd">实现互斥 - Peterson 算法</h2>
<h3 id="ScXky">Dekker 算法</h3>
> <font style="color:rgb(101, 109, 118);">A process </font>$ P $<font style="color:rgb(101, 109, 118);"> can enter the critical section if </font>**<font style="color:rgb(101, 109, 118);">the other does not want to enter</font>**<font style="color:rgb(101, 109, 118);">, otherwise it may enter </font>**<font style="color:rgb(101, 109, 118);">only if it is its turn</font>**<font style="color:rgb(101, 109, 118);">.</font>
>
<h3 id="ZVsrD">Peterson 算法 - Dekker 算法的改进</h3>
> <font style="color:rgb(101, 109, 118);">A process </font>$ P $<font style="color:rgb(101, 109, 118);"> can enter the critical section if </font>**<font style="color:rgb(101, 109, 118);">the other does not want to enter</font>**<font style="color:rgb(101, 109, 118);">, or it has </font>**<font style="color:rgb(101, 109, 118);">indicated its desire to enter (意图)</font>**<font style="color:rgb(101, 109, 118);"> and has </font>**<font style="color:rgb(101, 109, 118);">given the other process the turn (让步)</font>**<font style="color:rgb(101, 109, 118);">.</font>
>
<font style="color:rgb(101, 109, 118);">一个简单的例子：</font><p><img src="https://cdn.nlark.com/yuque/0/2024/jpeg/48275148/1730430685935-13e52d3e-ecfd-471d-8371-eb741f6b9024.jpeg" alt="画板"></p>
<p>来简单归纳一下游戏规则吧：</p>
<ul>
<li>当一个线程想要进入 Critical Section 时，需要将自己对应的<strong>旗子举起</strong>，并且预先将执行权限分配给**<u>其余</u>**<strong>线程中的某一个</strong>(即改变 turn 的值为另一个线程)。</li>
<li>在这个线程执行完上述设置操作后，该线程将会进入持续的观察者模式：
<ul>
<li>观察其余线程中是否存在举旗的线程，如果<strong>没有</strong>则直接进入 Critical Section</li>
<li>如果存在举旗线程，则观察 turn 变量的值 (可以理解为下一个待执行的线程)，<strong>如果为自己</strong>则进入 Critical Section，否则继续等待</li>
</ul>
</li>
<li>线程执行完成 Critical Section 区域的代码后，需要<strong>放下</strong>自己的旗子</li>
</ul>
<p>当有多个线程同时尝试进入 Critical Section 时，线程的手快程度直接影响了其余线程被优先执行的概率 —— 你写入的 turn 很有可能会被后续写入的线程覆盖，但是你写入的 turn 值是<strong>其余线程</strong>。看起来 Peterson's Protocal 是一个谦让协议，但是实际上它是个<strong>利己</strong>协议。</p>
<h3 id="MWbHr">Peterson's Algorithm - 实现</h3>
```python
def T1():
    while True:
        heap.x = '🏴'
        sys_sched()
        heap.turn = '❷'
        sys_sched()
        while True:
            t = heap.turn
            sys_sched()
            y = heap.y != ''
            sys_sched()
            if not y or t == '❶':
                break
        sys_sched()
        heap.cs += '❶'
        sys_sched()
        heap.cs = heap.cs.replace('❶', '')
        sys_sched()
        heap.x = ''
        sys_sched()
<p>def T2():
while True:
heap.y = '🏁'
sys_sched()
heap.turn = '❶'
sys_sched()
while True:
t = heap.turn
sys_sched()
x = heap.x
sys_sched()
if not x or t == '❷':
break
sys_sched()
sys_sched()
heap.cs += '❷'
sys_sched()
heap.cs = heap.cs.replace('❷', '')
sys_sched()
heap.y = ''
sys_sched()</p>
<p>def main():
heap.x = ''
heap.y = ''
heap.turn = ''
heap.cs = ''
sys_spawn(T1)
sys_spawn(T2)</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"></span>
<span class="line">上面的代码在我们的 Model Checker 上执行的结果是正确的。</span>
<span class="line"></span>
<span class="line">但是，如果在现代“编译器化”的处理器上执行，会输出正确的结果吗？</span>
<span class="line"></span>
<span class="line">答案是否定的。</span>
<span class="line"></span>
<span class="line">我们重新用 C 语言编写了一个 Peterson's Algorithm 的实现：</span>
<span class="line"></span>
<span class="line">```c</span>
<span class="line">#include "thread.h"</span>
<span class="line">#include &lt;stdatomic.h></span>
<span class="line"></span>
<span class="line">#define A 1</span>
<span class="line">#define B 2</span>
<span class="line"></span>
<span class="line">// The caveat is: no matter how many times we run this test</span>
<span class="line">// without seeing it fail, we cannot be certain that we have</span>
<span class="line">// inserted sufficient barriers. Understanding the correctness</span>
<span class="line">// of this code is far beyond the scope of this course.</span>
<span class="line">// </span>
<span class="line">// #define BARRIER __sync_synchronize()</span>
<span class="line">//</span>
<span class="line">// Peterson's algorithm is wrong without proper barriers:</span>
<span class="line">//</span>
<span class="line">#define BARRIER</span>
<span class="line"></span>
<span class="line">atomic_int inside;</span>
<span class="line">long count;</span>
<span class="line"></span>
<span class="line">void critical_section() {</span>
<span class="line">    // We expect this thread executing code exclusively,</span>
<span class="line">    // if the critical section is correctly implemented.</span>
<span class="line"> </span>
<span class="line">    assert(</span>
<span class="line">        // assert(inside == 0);</span>
<span class="line">        // inside++</span>
<span class="line">        atomic_fetch_add(&amp;inside, +1) == 0</span>
<span class="line">    );</span>
<span class="line"></span>
<span class="line">    // On some machines, printing a character will hide</span>
<span class="line">    // the bug!</span>
<span class="line">    // putchar('.');</span>
<span class="line"></span>
<span class="line">    assert(</span>
<span class="line">        // assert(inside == 1);</span>
<span class="line">        // inside--</span>
<span class="line">        atomic_fetch_add(&amp;inside, -1) == 1</span>
<span class="line">    );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">int volatile a = 0, b = 0, turn;</span>
<span class="line"></span>
<span class="line">void T_A() {</span>
<span class="line">    while (1) {</span>
<span class="line">        a = 1;                    BARRIER;</span>
<span class="line">        turn = B;                 BARRIER; // &lt;- this is critcal for x86</span>
<span class="line">        while (1) {</span>
<span class="line">            if (!b) break;        BARRIER;</span>
<span class="line">            if (turn != B) break; BARRIER;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        // T_B can't execute critical_section now.</span>
<span class="line">        critical_section();</span>
<span class="line"></span>
<span class="line">        a = 0;                    BARRIER;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">void T_B() {</span>
<span class="line">    while (1) {</span>
<span class="line">        b = 1;                    BARRIER;</span>
<span class="line">        turn = A;                 BARRIER;</span>
<span class="line">        while (1) {</span>
<span class="line">            if (!a) break;        BARRIER;</span>
<span class="line">            if (turn != A) break; BARRIER;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        // T_A can't execute critical_section now.</span>
<span class="line">        critical_section();</span>
<span class="line"></span>
<span class="line">        b = 0;                    BARRIER;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">int main() {</span>
<span class="line">    create(T_A);</span>
<span class="line">    create(T_B);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p>
<p><img src="https://cdn.nlark.com/yuque/0/2024/png/48275148/1730437705076-29148737-d53f-41b1-bd81-92e939ac392a.png" alt="执行失败示例"></p>
<p>我们给它重新加回 Barrier 之后，会怎么样呢？</p>
<p><img src="https://cdn.nlark.com/yuque/0/2024/png/48275148/1730437839381-9b136d2f-827c-4678-806d-5f75cde287c5.png" alt="程序似乎正常运行了"></p>
<p>虽然加了 Barrier 能够使程序的行为变得“看起来”正确，但是你能确定**<font style="color:rgb(68, 136, 204);">哪些地方的 barrier 是不可少的吗</font>**<font style="color:rgb(31, 35, 40);">？</font></p>
<font style="color:rgb(31, 35, 40);">因为 Peterson 算法在现代处理器上需要添加许多屏障(或许有许多地方可以优化，但是你基本上无法确定哪些地方的屏障是必不可少的)，所以该算法在现在已经不怎么使用了。</font><h2 id="kRUYV"><font style="color:rgb(31, 35, 40);">多处理器系统上的互斥</font></h2>
实际上，互斥的根本目的是为了保证 Critical Section 操作的**原子性**。
<p>为了在软件方面实现原子迁移，人类提出了 Dekker 算法、Peterson 算法...甚至还需要加装许多你无法完全确定如何优化的屏障来保证正确性...</p>
<p>但是，在计算机上，软硬件是互补的，因此“<strong>软件不够，硬件来凑</strong>”。</p>
<p>如果要在硬件方面实现互斥以保证 Critical Section 操作的原子性，我们也许可以小小的借用一下 Stop the World 的能力 —— 使用原子指令。</p>
<p>原子指令提供了一小段时间的“Stop the World”执行能力，为状态迁移的原子性做了保证。</p>
<ul>
<li>
<font style="color:rgb(31, 35, 40);">不可打断的 load + 计算 + store</font><ul>
<li>
<font style="color:rgb(31, 35, 40);">x86: Bus Lock; RISC-V: LR/SC (来自 MIPS) + atomic</font></li>
</ul>
</li>
</ul>
<font style="color:rgb(31, 35, 40);">有了原子指令，总算可以在多处理器上实现 并行 1 + 1 了！</font><h3 id="reftG"><font style="color:rgb(31, 35, 40);">原子指令实现自旋锁</font></h3>
> 自旋锁： 
>
<div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre v-pre><code><span class="line"><span class="token keyword">int</span> status <span class="token operator">=</span> ✅<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 这个进程状态机中只存在一个✅</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">retry<span class="token operator">:</span></span>
<span class="line">    <span class="token keyword">int</span> got <span class="token operator">=</span> <span class="token function">atomic_xchg</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>status<span class="token punctuation">,</span> ❌<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 原子交换指令</span></span>
<span class="line">    <span class="token comment">// 手慢的进程会一直在这里“自旋”</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>got <span class="token operator">!=</span> ✅<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">goto</span> retry<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">atomic_xchg</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>status<span class="token punctuation">,</span> ✅<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="HzbuS">一核自旋中断，多核自旋？</h3>
解决方案：操作系统短暂关中断
</div></template>


