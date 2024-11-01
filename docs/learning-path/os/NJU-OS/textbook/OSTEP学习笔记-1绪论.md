# OSTEP 学习笔记-1 绪论

#  前言
正如书名中所说，操作系统包含三个“简单的”部分：虚拟化(Virtualization)、并发(Concurrency)、持久化(Persistence)。本书也会从这三个部分来介绍操作系统。

> OSTEP 中对 OS 的定义：A body of software, responsible for **making it easy to run programs** (even allowing you to seemingly run many at the same time), **allowing programs to share memory, enabling programs to interact with devices,** and other fun stuff like that.It is in charge of making sure the system operates **correctly and efficiently** in an **easy-to-use** manner.
>

# 虚拟化(Virtualize)
如果要让 OS 做到像定义中提及到的那般，最主要的方法就是借助于虚拟化(Virtualization)这种技术。本着 easy-to-use 这一基本原则，OS 尝试着<u>接管</u>**物理资源**(例如处理器、内存、磁盘等)，并将它们转化成一种更通用(general)、更强大易用的**虚拟形式**(例如你在 Linux 系统中所看到的**硬件文件**)。因此，我们有时候甚至会把 OS 称作 VM(虚拟机)。

## 一些术语
### 标准库(Standard Library)
为了让用户能够调用 OS 以进行运行程序、分配内存、访问文件等操作，OS 开放了一系列 API 供用户调用，这些 API 的集合被称为标准库。

### 资源(Resource)
 **资源**指进程执行所需的、可由操作系统分配或管理的**任何硬件或软件**。资源可以是物理 意义上的，例如CPU、Memory、Storage Devices 和 Netword Interfaces，也可以是逻辑上的，例如 Files、Processes 和 System Services 等。**操作系统负责管理和调度这些资源**，以确保所有正在运行的进程都能**公平、高效地**使用这些资源。因此 OS 也被称为“资源管理器”。

## 虚拟存储器(Virtualized Memory)
```c
// mem.c
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include "common.h"

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        fprintf(stderr, "usage: mem <value>\n");
        exit(1);
    }
    int *p;
    p = malloc(sizeof(int));
    assert(p != NULL);
    printf("(%d) addr pointed to by p: %p\n", (int)getpid(), p);
    *p = atoi(argv[1]); // assign value to addr stored in p
    while (1)
    {
        Spin(1);
        *p = *p + 1;
        printf("(%d) value of p: %d\n", getpid(), *p);
    }
    free(p);
    return 0;
}

```

如果一次只在控制台中运行一个该程序，那么这个结果并没有什么意义。

但是当你尝试着同时运行多个任务时：

```bash
./mem 1 & ./mem 2
```

你会发现这两个程序申请到的地址是一样的(前提：**Disable address-space randomization**)，但是它们指向的值却在独立变化...这是否意味着它们拥有**私有**的内存来存储相应的数据？

实际上，得益于内存的虚拟化，每个进程都会**拥有私有的的虚拟地址空间**(Virtual Address Space)，而操作系统则负责将这些虚拟地址空间映射到物理内存的地址上。这样处理以后，每个进程都会认为所有的物理内存都“归属于”它们自己，而实际上物理内存是整个系统所共享的。

<details class="lake-collapse"><summary id="u24423d89"><span class="ne-text">The Crux of the Problem - Virtualize</span></summary><p id="u84a7c520" class="ne-p" style="text-align: center"><span class="ne-text">THE CRUX OF THE PROBLEM:</span></p><p id="ue50b643a" class="ne-p" style="text-align: center"><span class="ne-text">HOW TO VIRTUALIZE RESOURCES</span></p><p id="u195b5cdc" class="ne-p"><span class="ne-text">One central question we will answer in this book is quite simple: how</span></p><p id="u0149adda" class="ne-p"><span class="ne-text">does the operating system virtualize resources? This is the crux of our</span></p><p id="uda46ac2a" class="ne-p"><span class="ne-text">problem. Why the OS does this is not the main question, as the answer</span></p><p id="ua9b47901" class="ne-p"><span class="ne-text">should be obvious: it makes the system easier to use. Thus, we focus on</span></p><p id="u861df8a4" class="ne-p"><span class="ne-text">the how: what mechanisms and policies are implemented by the OS to</span></p><p id="u568b181a" class="ne-p"><span class="ne-text">attain virtualization? How does the OS do so efficiently? What hardware</span></p><p id="uf0691682" class="ne-p"><span class="ne-text">support is needed?</span></p><p id="uc2531205" class="ne-p"><span class="ne-text">We will use the “crux of the problem”, in shaded boxes such as this one,</span></p><p id="ub9cc06ac" class="ne-p"><span class="ne-text">as a way to call out specific problems we are trying to solve in building</span></p><p id="u8da17f9d" class="ne-p"><span class="ne-text">an operating system. Thus, within a note on a particular topic, you may</span></p><p id="u4c57131f" class="ne-p"><span class="ne-text">find one or more cruces (yes, this is the proper plural) which highlight the</span></p><p id="u66c76e9e" class="ne-p"><span class="ne-text">problem. The details within the chapter, of course, present the solution,</span></p><p id="u145a4974" class="ne-p"><span class="ne-text">or at least the basic parameters of a solution.</span></p></details>
# 并发(Concurrency)
```c
#include <stdio.h>
#include <stdlib.h>
#include "common.h"
#include "common_threads.h"

volatile int counter = 0;
int loops;

void *worker(void *arg)
{
    int i;
    for (i = 0; i < loops; i++)
    {
        counter++;
    }
    return NULL;
}

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        fprintf(stderr, "usage: threads <loops>\n");
        exit(1);
    }
    loops = atoi(argv[1]);
    pthread_t p1, p2;
    printf("Initial value : %d\n", counter);
    Pthread_create(&p1, NULL, worker, NULL);
    Pthread_create(&p2, NULL, worker, NULL);
    Pthread_join(p1, NULL);
    Pthread_join(p2, NULL);
    printf("Final value   : %d\n", counter);
    return 0;
}
```

上面的代码创建了两个进程，都执行 worker 这个函数，使得计数器自增。

显然，当你输入的参数(即单次循环次数)为$ N $时，输出到最终结果应该为$ 2N $。

然而，随着$ N $的增大，你发现了一些奇怪的结果：

```bash
./ostep-code/intro/threads 1000
# It is correct.
# Initial value : 0
# Final value   : 2000

./ostep-code/intro/threads 30000
# Obviously it outputs a wrong answer
# Initial value : 0
# Final value   : 51459

./ostep-code/intro/threads 30000
# And you can see the result is not fixed
# Initial value : 0
# Final value   : 48848
```

什么原因造成了这种奇怪的现象呢？这些奇怪和不寻常的结果的原因与指令的执行方式有关——指令是一条条被执行的。

在上面这个程序中，全局变量 `counter` 增加的语句，实际上会被转化为三条指令：

> 这里的 rax 只是用作示例，不代表真实情况
>

+ `load(counter, rax)`：将 `rax` 寄存器中的值取出并赋值给 `counter` 变量 
+ `counter += 1 `
+ `store(rax, counter)`：将 `counter` 变量的值存入 `rax` 寄存器中

这几条指令并不（也不可能）同时执行，因此可能造成**修改丢失**等现象(联想到数据库中的封锁相关内容)，结果就可能与上面展示的情况类似 ~~如果运气足够好的话还是可能跑出正确答案的~~。

<details class="lake-collapse"><summary id="ucc0c6e90"><span class="ne-text">The Crux of the Problem - Concurrency</span></summary><p id="u242cc254" class="ne-p" style="text-align: center"><span class="ne-text">THE CRUX OF THE PROBLEM:</span></p><p id="u848aa4eb" class="ne-p" style="text-align: center"><span class="ne-text">HOW TO BUILD CORRECT CONCURRENT PROGRAMS</span></p><p id="u784197ab" class="ne-p"><span class="ne-text">When there are many concurrently executing threads within the same</span></p><p id="ufeaa9959" class="ne-p"><span class="ne-text">memory space, how can we build a correctly working program? What</span></p><p id="u9128dbb2" class="ne-p"><span class="ne-text">primitives are needed from the OS? What mechanisms should be provided</span></p><p id="u5e2a5276" class="ne-p"><span class="ne-text">by the hardware? How can we use them to solve the problems of</span></p><p id="ue09eeb82" class="ne-p"><span class="ne-text">concurrency?</span></p></details>
# 持久化(Persistence)
操作系统中要讨论的第三个主题是**持久化**。在系统内存当中，数据是很容易丢失的，我们都知道 RAM 系列部件的掉电易失性——它们是靠电来“维持”数据的。因此，为了让数据不那么轻易丢失，我们需要软硬件来让数据的持久化成为可能。

硬件方面的话，在现代机器中，硬盘驱动器是长期存储数据的通用存储库。

而在软件方面，我们通常把管理磁盘的软件称为**“文件系统”(File System）**，它为用户存储任何文件到磁盘时的高效性与可靠性负责。

实际上持久化的过程非常复杂，涉及到系统调用等多方面问题。下面的示例程序中展示了一个简单的写文件操作：

```c
#include <stdio.h>
#include <unistd.h>
#include <assert.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <string.h>

int main(int argc, char *argv[]) {
    // First Call: open file
    int fd = open("/tmp/file", O_WRONLY | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR);
    assert(fd >= 0);
    char buffer[20];
    sprintf(buffer, "hello world\n");
    // Second Call: write a string into file
    int rc = write(fd, buffer, strlen(buffer));
    assert(rc == (strlen(buffer)));
    fsync(fd);
    // Third Call: close file
    close(fd);
    return 0;
}
```

看起来这份代码只进行了三次系统调用就完成了这个操作。实际上，为了保证文件写的效率以及修改的一致性，大多数文件系统会先将待写内容存放到缓冲区中，然后再根据特定的写协议来决定何时将缓冲区里的内容真正写入到文件中。为了尽可能保证数据不丢失，File System 实际上还执行了许多操作。

<details class="lake-collapse"><summary id="u3005519b"><span class="ne-text">The Crux of the Problem - Persistence</span></summary><p id="u30f19615" class="ne-p" style="text-align: center"><span class="ne-text">THE CRUX OF THE PROBLEM:</span></p><p id="u1f14ddab" class="ne-p" style="text-align: center"><span class="ne-text">HOW TO STORE DATA PERSISTENTLY</span></p><p id="u2dd3572d" class="ne-p"><span class="ne-text">The file systemis the part of the OS in charge ofmanaging persistent data.</span></p><p id="ufdd6a5fc" class="ne-p"><span class="ne-text">What techniques are needed to do so correctly? What mechanisms and</span></p><p id="u4320b646" class="ne-p"><span class="ne-text">policies are required to do so with high performance? How is reliability</span></p><p id="u68caffbb" class="ne-p"><span class="ne-text">achieved, in the face of failures in hardware and software?</span></p></details>
# 设计目标
根据上面几部分的介绍，你可能对“OS 的实际用途”这一方面有了一定的了解：

+ OS 接管了物理资源，并且将它们进行**虚拟化**
+ OS 能够处理与**并发**相关的棘手问题
    - 进程隔离(isolation)是对应用间进行保护的重要措施
    - 操作系统必须一直保持运行，因为诸多进程都需要调用标准库
+ OS 能够**可靠高效地**将文件**持久化**存储到硬件中

我们的设计目标也大概聚焦在这几个大方面上，除此之外还有其他的一些目标，例如安全性、可移植性等等。

# 发展历程
## 早期 - 纯纯的 API 库
## 发展：File System & Protection
> Crux：Difference between **system-call** and **procedure-call**(privilege: root <-> user)
>

## 多道程序时代：Where Operating Systems Really Took Off
在这个时代，Multiprogramming 已经变得平常了，这一切都源自于人们对更好地利用物理资源的渴望。不同于原先的单线程执行，现在 OS 会一次性载入多个任务，然后在这些任务间来回切换以提高效率和资源利用率（类似于中断和流水线），这样做是非常重要的——因为 I/O 操作(相比于其他操作来说)真的很慢。

而内存保护(Memory Protection)这一概念也在这种背景下被提出——我们并不希望一个程序能访问到另一个程序正在使用的内存。这些由多道程序设计带来的关于并行方面的问题是非常重要的。同时，如何让 OS 能够正确地在这些存在中断的并行环境下运行这一问题是一个巨大的挑战。



> 更新: 2024-09-17 10:53:53  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/xynvlkrnnimv72io>