# Homework - Threads Intro

# Focus on `loop.s`
> Let's examine a simple program,“loop.s”. First, just read and understand it. Then, run it with these arguments (`./x86.py -t 1 -p loop.s -i 100 -R dx`) This specifies a single thread, an interrupt every `100` instructions, and tracing of register `%dx`. What will `%dx` be during the run? 
>
> Use the `-c` flag to check your answers; the answers, on the left, show the value of the register (or memory value) after the instruction on the right has run.
>

```plain
.main
.top
sub  $1,%dx # %dx = %dx - 1
test $0,%dx 
jgte .top   # jump to .top label if %dx >= 0
halt
```

注意，我们在执行汇编代码时，并没有使用`-a` 选项对`%dx` 寄存器中的值进行指定，因此`(%dx)` 初始为 0。

```plain
   dx          Thread 0         
    0   
   -1   1000 sub  $1,%dx
   -1   1001 test $0,%dx
   -1   1002 jgte .top
   -1   1003 halt
```

# `loop.s` - Multi-threads
> Same code, different flags: (`./x86.py -p loop.s -t 2 -i 100 -a dx=3,dx=3 -R dx`) This specifies two threads, and initializes each `%dx` to 3. What values will `%dx` see? Run with `-c` to check.
>
> Does the presence of multiple threads affect your calculations? Is there a **race** in this code?
>

我们知道，产生 race 的根本原因是未经控制的执行。我们先看看当`%dx = 3`的时候单个线程是如何正常执行的：

```plain
# ...
ARG interrupt frequency 50
# ...

  dx          Thread 0         
    ?   
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   1003 halt
```

可以看到，当 `%dx = 3`时，整个循环执行了四次，最后调用 `halt` 退出，因此总指令执行条数为 13 条，小于预设置的 interrupt frequency 值，因此整个线程执行过程中不会被中断。

那我们自然也可以遇见存在两个线程甚至更多个线程的情况下整个程序的执行流程——进程间的执行互不干扰，完全没有 race 的可能性(前提是 `%dx = 3`，更精确一点，只需要满足 $ (IF - 1) / 3 >= \%dx $ 即可)。

```plain
dx          Thread 0                Thread 1         
    3   
    2   1000 sub  $1,%dx
    2   1001 test $0,%dx
    2   1002 jgte .top
    1   1000 sub  $1,%dx
    1   1001 test $0,%dx
    1   1002 jgte .top
    0   1000 sub  $1,%dx
    0   1001 test $0,%dx
    0   1002 jgte .top
   -1   1000 sub  $1,%dx
   -1   1001 test $0,%dx
   -1   1002 jgte .top
   -1   1003 halt
    3   ----- Halt;Switch -----  ----- Halt;Switch -----  
    2                            1000 sub  $1,%dx
    2                            1001 test $0,%dx
    2                            1002 jgte .top
    1                            1000 sub  $1,%dx
    1                            1001 test $0,%dx
    1                            1002 jgte .top
    0                            1000 sub  $1,%dx
    0                            1001 test $0,%dx
    0                            1002 jgte .top
   -1                            1000 sub  $1,%dx
   -1                            1001 test $0,%dx
   -1                            1002 jgte .top
   -1                            1003 halt
```

# `loop.s` - Smaller Interrupt Frequency
> Run this: `./x86.py -p loop.s -t 2 **-i 3** -r -R dx -a dx=3,dx=3` 
>
> This makes the interrupt interval small/random; use different seeds `(-s)` to see different interleavings. 
>
> Does the interrupt frequency change anything?
>

```plain
   dx          Thread 0                Thread 1         
    ?   
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1000 sub  $1,%dx
    ?                            1001 test $0,%dx
    ?                            1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1000 sub  $1,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1002 jgte .top
    ?   1000 sub  $1,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1001 test $0,%dx
    ?                            1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   1000 sub  $1,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1000 sub  $1,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1001 test $0,%dx
    ?                            1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1003 halt
    ?   ----- Halt;Switch -----  ----- Halt;Switch -----  
    ?                            1000 sub  $1,%dx
    ?                            1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1002 jgte .top
    ?                            1003 halt
```

```plain
   dx          Thread 0                Thread 1         
    ?   
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1000 sub  $1,%dx
    ?                            1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1002 jgte .top
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1002 jgte .top
    ?                            1000 sub  $1,%dx
    ?                            1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1002 jgte .top
    ?                            1000 sub  $1,%dx
    ?                            1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1000 sub  $1,%dx
    ?   1001 test $0,%dx
    ?   1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1002 jgte .top
    ?                            1000 sub  $1,%dx
    ?                            1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1000 sub  $1,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1002 jgte .top
    ?                            1003 halt
    ?   ----- Halt;Switch -----  ----- Halt;Switch -----  
    ?   1001 test $0,%dx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1002 jgte .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1003 halt
```

其实，interrupt frequency 对这类没有 critical section 的代码并没有任何带来差错的可能性，因为在中断切换线程的同时也会切换线程的上下文，`%dx` 并非是 shared data。

# `looping-race-nolock.s` - First sight of <u>race</u>
> Now, a different program, `looping-race-nolock.s`, which accesses a <u>shared variable</u> located at address 2000; we'll call this variable value. Run it with a **single** thread to confirm your understanding:
>
> `./x86.py -p looping-race-nolock.s -t 1 -M 2000`
>
> What is value (i.e., at memory address `2000`) throughout the run? Use `-c` to check.
>

```plain
# assumes %bx has loop count in it

.main
.top	
# critical section
mov 2000, %ax  # get 'value' at address 2000
add $1, %ax    # increment it
mov %ax, 2000  # store it back

# see if we're still looping
sub  $1, %bx
test $0, %bx
jgt .top	

halt
```

初始状态下，除必要空间外，我们默认其余位置上的内容初始都为 0。

因此 `(2000) = %ax = %bx = 0`

critical section 部分的代码将位于 2000 地址处的内容取到 `%ax` 寄存器中，再将 `%ax` 中的内容+1，最后再把 `%ax` 寄存器中的内容移动到 2000 地址处。

由于 `%bx = 0`，因此循环仅执行一次。

```plain
 2000      bx          Thread 0         
    0       0   
    0       0   1000 mov 2000, %ax
    0       0   1001 add $1, %ax
    1       0   1002 mov %ax, 2000
    1      -1   1003 sub  $1, %bx
    1      -1   1004 test $0, %bx
    1      -1   1005 jgt .top
    1      -1   1006 halt
```

# `looping-race-nolock.s` - Multi-threads
> Run with multiple iterations/threads: 
>
> `./x86.py -p looping-race-nolock.s -t 2 -a bx=3 -M 2000`
>
> Why does each thread loop three times? What is final value of _value in _2000?
>

每一个线程都维护着自己的寄存器状态，因此它们初始的 `%bx` 均为 3。

由于每一个线程都循环了三次，2000 地址上的最终值为 6。(IF 比较高的缘故)

# `looping-race-nolock.s` - Random Interrupt Intervals
> Run with random interrupt intervals: 
>
> `./x86.py -p looping-race-nolock.s -t 2 -M 2000 -i 4 -r -s 0`
>
> with different seeds (`-s 1, -s 2`, etc.) 。
>
> Can you tell by looking at the thread interleaving what the final value of _value _will be? Does the timing of the interrupt matter? Where can it safely occur? Where not? In other words, where is the critical section exactly?
>

当 seed 为 0 时，执行次序如下：

```plain
2000          Thread 0                Thread 1         
    ?   
    ?   1000 mov 2000, %ax
    ?   1001 add $1, %ax
    ?   1002 mov %ax, 2000
    ?   1003 sub  $1, %bx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1000 mov 2000, %ax
    ?                            1001 add $1, %ax
    ?                            1002 mov %ax, 2000
    ?                            1003 sub  $1, %bx
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1004 test $0, %bx
    ?   1005 jgt .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?                            1004 test $0, %bx
    ?                            1005 jgt .top
    ?   ------ Interrupt ------  ------ Interrupt ------  
    ?   1006 halt
    ?   ----- Halt;Switch -----  ----- Halt;Switch -----  
    ?                            1006 halt
```

可以看到，在每次中断之前，各个线程都将修改后的值存回了共享的内存地址。因此 2000 地址处的值为 2。

```plain
mov 2000, %ax  # get 'value' at address 2000
add $1, %ax    # increment it
mov %ax, 2000  # store it back
```

# `looping-race-nolock.s` - Fixed Interrupt Intervals
> Now examine **fixed** interrupt intervals: 
>
> `./x86.py -p looping-race-nolock.s -a bx=1 -t 2 -M 2000 -i 1`
>
> What will the final value of the shared variable value be? What about when you change `-i 2, -i 3,` etc.? For which interrupt intervals does the program give the “correct” answer?
>

当 Interrupt Interval 为 1 的时候，2000 地址处的最终值为 1，因为出现了 race。

当 II 为 2 时，同样会出现 race。因为 Critical Section 部分没有被原子化执行。

同理，当 $ Interrupt Interval \geq 3 $ 时，Critical Section 部分能够被视为原子化执行，因此不会出现 race。

# `looping-race-nolock.s` - Loop Condtions
> Run the same for **more** loops (e.g., set `-a bx=100`). 
>
> + What interrupt intervals (`-i`) lead to a correct outcome? 
> + Which intervals are surprising?
>

当 `-i % 3 == 0` 的时候，程序能够输出正确的结果，因为 Critical Section 的指令个数以及循环部分的指令个数都为 3。

我们试着在循环部分的代码中添加一个指令：`sub $0, %bx`

这时就需要 `-i % 7 == 0` 才能输出正确的结果，即每次中断前需要恰好原子化地完成**一次 Critical Section 或者一次循环部分** 才能输出正确结果。

# `wait-for-me.s` - Wait For Another
> Run: 
>
> `./x86.py -p wait-for-me.s -a ax=1,ax=0 -R ax -M 2000 `
>
> This sets the `%ax` register to 1 for thread 0, and 0 for thread 1, and watches `%ax` and memory location 2000. 
>
> + How should the code behave? 
> + How is the value at location 2000 being used by the threads? 
> + What will its final value be?
>

线程 0 是 Signaller，线程 1 是 Waiter。

```plain
 2000      ax          Thread 0(Signaller)     Thread 1(Waiter)         
    ?       ?   
    ?       ?   1000 test $1, %ax
    ?       ?   1001 je .signaller
    ?       ?   1006 mov  $1, 2000
    ?       ?   1007 halt
    ?       ?   ----- Halt;Switch -----  ----- Halt;Switch -----  
    ?       ?                            1000 test $1, %ax
    ?       ?                            1001 je .signaller
    ?       ?                            1002 mov  2000, %cx
    ?       ?                            1003 test $1, %cx
    ?       ?                            1004 jne .waiter
    ?       ?                            1005 halt
```

线程 0 将常量 1 移动到 2000 位置处，线程 1 判断 2000 地址处的值是否为 1，若不为 1 则一直循环等待。

最终值：`**2000：1**`

# `wait-for-me.s` - Wait For Another --Switched
> Now switch the inputs: 
>
> `./x86.py -p wait-for-me.s -a ax=0,ax=1 -R ax -M 2000 `
>
> + How do the threads behave? 
> + What is thread `0` doing? 
> + How would changing the interrupt interval (e.g., `-i 1000`, or perhaps to use **random** intervals) change the trace outcome?
> + Is the program **efficiently** using the CPU?
>

交换过后，线程 0 为等待者，线程 1 为信号员。

系统首先执行线程 0，于是一直在等待，直到执行指令数达到 II 后被强制中断。

然后线程 1 为 2000 地址处的内容赋值 1。

最后切换到线程 0，等待条件不满足，于是执行完毕。

```plain
 2000      ax          Thread 0                Thread 1         
    ?       ?   
    ?       ?   1000 test $1, %ax
    ?       ?   1001 je .signaller
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   ------ Interrupt ------  ------ Interrupt ------  
    ?       ?                            1000 test $1, %ax
    ?       ?                            1001 je .signaller
    ?       ?                            1006 mov  $1, 2000
    ?       ?                            1007 halt
    ?       ?   ----- Halt;Switch -----  ----- Halt;Switch -----  
    ?       ?   1002 mov  2000, %cx
    ?       ?   1003 test $1, %cx
    ?       ?   1004 jne .waiter
    ?       ?   1005 halt
```

增大 II 的值只会增加线程 0 第一次执行的指令个数。

交换角色后，CPU 的利用率被大幅降低——线程 0 绝大多数时间都处于等待状态，没有真正去执行有效命令。



> 更新: 2024-10-04 15:19:12  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/tln5rwh7u5uo8zvd>