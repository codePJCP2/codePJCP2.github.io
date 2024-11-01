# OSTEP 学习笔记-2 Concurrency

> 章节号: P25-27 Homework 
>

## Atomic Operations
Atomic operations are one of the most powerful underlying techniques in building computer systems, from the computer architecture, to concurrent code, to file systems, database management systems, and even distributed systems.

The idea behind making a series of actions atomic is simply expressed with the phrase “**all or nothing**”; it should either appear as if **all of the actions** you wish to group together occurred, or that **none of them** occurred, with **no in-between state visible**. Sometimes, the grouping of many actions into a single atomic action is called a **transaction(事务)**, an idea developed in great detail in the world of databases and transaction processing.

## Two Major Problem on Concurrency Programming
+ Access to Shared Data (Crux: **Uncontrolled** Scheduling)
+ Waiting For Another Thread (e.g. A thread would sleep until the Disk I/O ends)

## Crux of Concurrency
THE CRUX: HOW TO SUPPORT SYNCHRONIZATION

What support do we need from the hardware in order to build useful synchronization primitives? What support do we need from the OS? How can we build these primitives correctly and efficiently? How can programs use them to get the desired results?

## Key Concurrency Terms
> The key concurrency terms include these following items:
>
> + CRITICAL SECTION (临界区域)
> + RACE CONDITION (静态条件)
> + INDETERMINATE (不确定的)
> + MUTUAL EXCLUSION (互斥)
>

These four terms are so central to concurrent code that we thought it worth while to call them out explicitly. 

• A **critical section** is a piece of code that **accesses a shared resource**, usually a variable or data structure.

• A **race condition** (or data race [NM92]) arises if **<u>multiple threads</u>**** of execution enter the critical section ****<u>at roughly the same time</u>**; both attempt to update the shared data structure, leading to a surprising (and perhaps undesirable) outcome.

• An **indeterminate** program consists of **one or more race conditions**; the output of the program varies from run to run, depending on which threads ran when. The outcome is thus **not deterministic**, something we usually expect from computer systems.

• To avoid these problems, threads should use some kind of **mutual exclusion** primitives; doing so guarantees that **only a single thread ever enters a critical section**, thus **avoiding races**, and resulting in deterministic program outputs.

## Crux of Threads
CRUX: HOW TO CREATE AND CONTROL THREADS

What interfaces should the OS present for thread creation and control? How should these interfaces be designed to enable ease of use as well as utility?

### Thread Creation
```c
#include <pthread.h>
int pthread_create(pthread_t *thread, // Thread Identifier
                   const pthread_attr_t *attr, // The thread's own attributes
                   void *(*start_routine)(void*), // Where to start the thread
                   void *arg); // The start-thread function's args
```

### Waiting For a Thread to Complete
```c
int pthread_join(pthread_t __th, // Thread Identifier
                 void **__thread_return); // The exit value of the thread, if it's not NULL
```

> 注意：永远不要返回指向**在线程调用栈中分配资源**的指针。
>

```c
void *mythread(void *arg) {
    myarg_t *args = (myarg_t *) arg;
    printf("%d %d\n", args->a, args->b);
    myret_t oops; // ALLOCATED ON STACK: BAD!
    oops.x = 1;
    oops.y = 2;
    return (void *) &oops;
}
```

> 在这种情况下，变量 `oops` 被分配到 `mythread` 的堆栈中。不过，当它返回时，该值**会被自动解除分配**。在已解除分配的内容上进行操作是件非常危险的事情！
>

#### Whether to use `join()`
> Thread creation + Immediate call to `join()` -> Procedure Call(程序调用)
>

显然，我们通常会创建**不止一个线程**并等待其完成，否则使用线程就没有什么意义了。

我们需要注意的是，并非所有多线程代码都会使用到 `join()`。例如，多线程网络服务器可能会创建许多工作线程，然后使用主线程接受请求并将请求传递给工作线程执行**(线程池)**。因此，这种长寿命程序可能不需要使用 `join()`。

然而，创建线程来并行执行执行特定任务的程序可能会使用 `join()` 来确保在退出或进入下一阶段计算之前，当前阶段的所有工作都已完成。

## Thread Locks
> `mutex`：互斥锁
>

```c
int pthread_mutex_lock(pthread_mutex_t *mutex);
int pthread_mutex_unlock(pthread_mutex_t *mutex);
```

一个最基本的使用例子：

```c
pthread_mutex_t lock;
pthread_mutex_lock(&lock); // 保持阻塞，直至该线程获取锁
x = x + 1; // or whatever your critical section is
pthread_mutex_unlock(&lock); // 释放锁
```

这段代码看起来很简洁易懂符合常理，然而它存在着两个重要问题：

1. 缺少对锁对象的正确初始化——未初始化的锁很有可能使程序无法正确按照预期执行

```c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER; // 直接使用全局默认的初始化锁对象

int rc = pthread_mutex_init(&lock, attr:NULL); // 进行动态初始化(携带参数)
assert(rc == 0); // always check successful init!
pthread_mutex_destory(&lock); // 销毁锁
```

2. 在加锁和解锁的时候并没有检查返回值，从而导致潜在的错误发生

```c
#include <pthread.h>

// ------ Declarations ------
int pthread_mutex_lock(pthread_mutex_t *mutex);
int pthread_mutex_trylock(pthread_mutex_t *mutex);
int pthread_mutex_unlock(pthread_mutex_t *mutex);

// ------ Return Values ------
// If successful, the pthread_mutex_lock() and pthread_mutex_unlock() functions return 0. 
// Otherwise, an error number is returned to indicate the error.
// The function pthread_mutex_trylock() returns 0 if a lock on the mutex object referenced by mutex is acquired. 
// Otherwise, an error number is returned to indicate the error.

int rc = pthread_mutex_lock(&lock);
assert(rc == 0); // always check lock successfully!
```

然而每次执行类似操作时都需要进行校验有些不太美观，并且有些麻烦。因此在这类场景中，推荐使用包装方法来简化代码，同时提高程序健壮性：

```c
void Pthread_mutex_lock(pthread_mutex_t *mutex) {
    int rc = pthread_mutex_lock(mutex);
    assert(rc == 0);
}
```

## Condition Variables
在使用一些机器的时候，经常会看见外壳上加装了一些指示灯，它们可以用来指示当前机器的状态，我们可以根据机器状态来判断当前机器是否空闲、机器是否加工完成等等。

假如我们要使用这些机器来加工一些物品，一般流程是这样的：

+ 当机器空闲时，我们可以把待加工的原料放入机器中开始加工
+ 然后开始等待机器加工完毕
+ 直到机器加工完毕之后，再把成品取出
+ (Optional) 也许你会把上一步的成品送入到另外一个机器...

在这些加工流程中，我们是根据什么来判断机器状态的呢？

没错，就是机器外壳的指示灯。它其实就是指示机器状态的**条件变量(Condition Variables)。**

在线程之间的协作中，经常也会出现一个线程需要使用另几个线程结果的情况。这个线程可不能在其余线程完成工作之前就取走结果自顾自地执行了——它需要在合适的时机取出结果。这种时候通过条件变量就可以很方便地获取到其余线程的执行状态，并在合适的时机获取结果，之后顺利执行。

```c
int pthread_cond_wait(pthread_cond_t *cond,
                      pthread_mutex_t *mutex);
int pthread_cond_signal(pthread_cond_t *cond);
```

> 注意：这些例程只有在**<u>持有锁</u>**的情况下才能使用！
>
> 并且，如果需要使用条件变量的话，需要将其和当前持有的锁进行绑定。
>

```c
// -- Thread 0 --
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
Pthread_mutex_lock(&lock);
// Critical Section
// Q: Why using a loop instead a if statement here?
while (ready == 0)
    Pthread_cond_wait(&cond, &lock); // The thread sleeps until the condition variable signs
Pthread_mutex_unlock(&lock);

// -- Thread 1 --
Pthread_mutex_lock(&lock);
// Critical Section
ready = 1;
Pthread_cond_signal(&cond);
Pthread_mutex_unlock(&lock);
```

在 Thread 0 中，初始化了一个锁对象以及一个条件变量对象。然后获取锁，之后等待条件变量改变，最后解锁。

Thread 1 中，同样获取了锁，然后改变 ready 这一全局变量的值，之后对条件变量发出信号，最后解锁。

<details class="lake-collapse"><summary id="u4af3e63b"><span class="ne-text">Q：在上面的代码中，为什么锁能够被两个线程&quot;同时持有&quot;？</span></summary><p id="u0076b0f3" class="ne-p"><span class="ne-text">其实只是代码中没有显式说明锁的释放与重获得而已——锁始终只能被一个线程持有。</span></p><p id="udcad84ff" class="ne-p"><span class="ne-text">在等待条件变量改变信号的时候，调用等待方法的线程进入睡眠状态，同时该线程持有的锁也被暂时释放。</span></p><p id="u43e7797f" class="ne-p"><span class="ne-text">在监测到条件变量改变的时候，从 wait 方法返回之前，被唤醒的线程会重新获取锁。</span></p></details>
> Tips: 在线程之间进行同步时，尽可能使用条件变量而不是用简单的标志变量代替。
>
> 原因可以查看 [3.2 实现一个简单的join()?](https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/vwdnhvt4vq2gdsf3#FIbd8) 一节。
>



> 更新: 2024-10-23 11:18:09  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/qlc9penlxxrgbss9>