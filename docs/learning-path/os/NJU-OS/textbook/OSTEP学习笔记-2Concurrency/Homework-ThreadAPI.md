# Homework - Thread API

> 页面：P345
>

## `helgrind` - First Sight
> Run helgrind (by typing `valgrind --tool=helgrind ./main-race`) to see how it reports the race. 
>
> 1. Does it point to the right lines of code? 
> 2. What other information does it give to you?
>

```plain
==4638== Helgrind, a thread error detector
==4638== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.
==4638== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4638== Command: ./main-race
==4638== 
==4638== ---Thread-Announcement------------------------------------------
==4638== 
==4638== Thread #1 is the program's root thread
==4638== 
==4638== ---Thread-Announcement------------------------------------------
==4638== 
==4638== Thread #2 was created
==4638==    at 0x49989F3: clone (clone.S:76)
==4638==    by 0x49998EE: __clone_internal (clone-internal.c:83)
==4638==    by 0x49076D8: create_thread (pthread_create.c:295)
==4638==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)
==4638==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4638==    by 0x109209: main (main-race.c:14)
==4638== 
==4638== ----------------------------------------------------------------
==4638== 
==4638== Possible data race during read of size 4 at 0x10C014 by thread #1
==4638== Locks held: none
==4638==    at 0x109236: main (main-race.c:15)
==4638== 
==4638== This conflicts with a previous write of size 4 by thread #2
==4638== Locks held: none
==4638==    at 0x1091BE: worker (main-race.c:8)
==4638==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4638==    by 0x4907AC2: start_thread (pthread_create.c:442)
==4638==    by 0x4998A03: clone (clone.S:100)
==4638==  Address 0x10c014 is 0 bytes inside data symbol "balance"
==4638== 
==4638== ----------------------------------------------------------------
==4638== 
==4638== Possible data race during write of size 4 at 0x10C014 by thread #1
==4638== Locks held: none
==4638==    at 0x10923F: main (main-race.c:15)
==4638== 
==4638== This conflicts with a previous write of size 4 by thread #2
==4638== Locks held: none
==4638==    at 0x1091BE: worker (main-race.c:8)
==4638==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4638==    by 0x4907AC2: start_thread (pthread_create.c:442)
==4638==    by 0x4998A03: clone (clone.S:100)
==4638==  Address 0x10c014 is 0 bytes inside data symbol "balance"
==4638== 
==4638== 
==4638== Use --history-level=approx or =none to gain increased speed, at
==4638== the cost of reduced accuracy of conflicting-access information
==4638== For lists of detected and suppressed errors, rerun with: -s
==4638== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```

## `main-race.c` - Add Locks
> What happens when you remove one of the offending lines of code? Now add a lock around one of the updates to the shared variable, and then around both. What does `helgrind` report in each of these cases?
>

```plain
==4748== Helgrind, a thread error detector
==4748== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.
==4748== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4748== Command: ./main-race
==4748== 
==4748== 
==4748== Use --history-level=approx or =none to gain increased speed, at
==4748== the cost of reduced accuracy of conflicting-access information
==4748== For lists of detected and suppressed errors, rerun with: -s
==4748== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

```plain
==5744== Helgrind, a thread error detector
==5744== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.
==5744== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==5744== Command: ./main-race
==5744== 
==5744== ---Thread-Announcement------------------------------------------
==5744== 
==5744== Thread #1 is the program's root thread
==5744== 
==5744== ---Thread-Announcement------------------------------------------
==5744== 
==5744== Thread #2 was created
==5744==    at 0x49989F3: clone (clone.S:76)
==5744==    by 0x49998EE: __clone_internal (clone-internal.c:83)
==5744==    by 0x49076D8: create_thread (pthread_create.c:295)
==5744==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)
==5744==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==5744==    by 0x1092C3: main (main-race.c:18)
==5744== 
==5744== ----------------------------------------------------------------
==5744== 
==5744==  Lock at 0x10C060 was first observed
==5744==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==5744==    by 0x109207: worker (main-race.c:10)
==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)
==5744==    by 0x4998A03: clone (clone.S:100)
==5744==  Address 0x10c060 is 0 bytes inside data symbol "lock"
==5744== 
==5744== Possible data race during read of size 4 at 0x10C040 by thread #1
==5744== Locks held: none
==5744==    at 0x1092F0: main (main-race.c:19)
==5744== 
==5744== This conflicts with a previous write of size 4 by thread #2
==5744== Locks held: 1, at address 0x10C060
==5744==    at 0x10923D: worker (main-race.c:11)
==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)
==5744==    by 0x4998A03: clone (clone.S:100)
==5744==  Address 0x10c040 is 0 bytes inside data symbol "balance"
==5744== 
==5744== ----------------------------------------------------------------
==5744== 
==5744==  Lock at 0x10C060 was first observed
==5744==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==5744==    by 0x109207: worker (main-race.c:10)
==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)
==5744==    by 0x4998A03: clone (clone.S:100)
==5744==  Address 0x10c060 is 0 bytes inside data symbol "lock"
==5744== 
==5744== Possible data race during write of size 4 at 0x10C040 by thread #1
==5744== Locks held: none
==5744==    at 0x1092F9: main (main-race.c:19)
==5744== 
==5744== This conflicts with a previous write of size 4 by thread #2
==5744== Locks held: 1, at address 0x10C060
==5744==    at 0x10923D: worker (main-race.c:11)
==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)
==5744==    by 0x4998A03: clone (clone.S:100)
==5744==  Address 0x10c040 is 0 bytes inside data symbol "balance"
==5744== 
==5744== 
==5744== Use --history-level=approx or =none to gain increased speed, at
==5744== the cost of reduced accuracy of conflicting-access information
==5744== For lists of detected and suppressed errors, rerun with: -s
==5744== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```

```plain
==5876== Helgrind, a thread error detector
==5876== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.
==5876== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==5876== Command: ./main-race
==5876== 
==5876== 
==5876== Use --history-level=approx or =none to gain increased speed, at
==5876== the cost of reduced accuracy of conflicting-access information
==5876== For lists of detected and suppressed errors, rerun with: -s
==5876== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 7 from 7)
```

## `main-deadlock.c` - Deadlocks
> Now let’s look at `main-deadlock.c`. Examine the code. This code has a problem known as **deadlock**. Can you see what problem it might have?
>

每个线程最开始都会持有一个锁(`m1,m2`)，之后都在等待另一个锁释放来持有锁。这就造成了死锁现象。

## `main-deadlock.c` - helgrind
> Now run helgrind on this code. What does helgrind report?
>

```plain
==3542== Helgrind, a thread error detector
==3542== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.
==3542== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3542== Command: ./main-deadlock
==3542== 
==3542== ---Thread-Announcement------------------------------------------
==3542== 
==3542== Thread #3 was created
==3542==    at 0x49989F3: clone (clone.S:76)
==3542==    by 0x49998EE: __clone_internal (clone-internal.c:83)
==3542==    by 0x49076D8: create_thread (pthread_create.c:295)
==3542==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)
==3542==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x1093F4: main (main-deadlock.c:29)
==3542== 
==3542== ----------------------------------------------------------------
==3542== 
==3542== Thread #3: lock order "0x10C040 before 0x10C080" violated
==3542== 
==3542== Observed (incorrect) order is: acquisition of lock at 0x10C080
==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x109288: worker (main-deadlock.c:17)
==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)
==3542==    by 0x4998A03: clone (clone.S:100)
==3542== 
==3542==  followed by a later acquisition of lock at 0x10C040
==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x1092C3: worker (main-deadlock.c:18)
==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)
==3542==    by 0x4998A03: clone (clone.S:100)
==3542== 
==3542== Required order was established by acquisition of lock at 0x10C040
==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x10920E: worker (main-deadlock.c:12)
==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)
==3542==    by 0x4998A03: clone (clone.S:100)
==3542== 
==3542==  followed by a later acquisition of lock at 0x10C080
==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x109249: worker (main-deadlock.c:13)
==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)
==3542==    by 0x4998A03: clone (clone.S:100)
==3542== 
==3542==  Lock at 0x10C040 was first observed
==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x10920E: worker (main-deadlock.c:12)
==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)
==3542==    by 0x4998A03: clone (clone.S:100)
==3542==  Address 0x10c040 is 0 bytes inside data symbol "m1"
==3542== 
==3542==  Lock at 0x10C080 was first observed
==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x109249: worker (main-deadlock.c:13)
==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)
==3542==    by 0x4998A03: clone (clone.S:100)
==3542==  Address 0x10c080 is 0 bytes inside data symbol "m2"
==3542== 
==3542== 
==3542== 
==3542== Use --history-level=approx or =none to gain increased speed, at
==3542== the cost of reduced accuracy of conflicting-access information
==3542== For lists of detected and suppressed errors, rerun with: -s
==3542== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 7 from 7)
```

## `main-deadlock-global.c` - helgrind
> Now run helgrind on `main-deadlock-global.c.` Examine the code; does it have the same problem that `main-deadlock.c` has? Should helgrind be reporting the same error? What does this tell you about tools like helgrind?
>

global 代码其实是在原 deadlock 区域外添加了一层锁，这样就可以保证拿到全局锁的线程先获取、释放 m1,m2 锁之后再让其余线程执行，因此不会出现原代码的死锁问题。

不幸的是，helgrind 等检测工具仍旧会报告相同的问题。

## `main-signal.c` - Simple Flag Variables
> Let's next look at `main-signal.c`. This code uses a variable (`done`) to signal that the child is done and that the parent can now continue. 
>
> Why is this code **inefficient**? (what does the parent end up spending its time doing, particularly if the child thread takes a long time to complete?)
>

原先的代码可能效果并不明显，让我们修改一下代码：

```c
#include <stdio.h>
#include <unistd.h>

#include "common_threads.h"

int done = 0;

void *worker(void *arg)
{
    printf("this should print first\n");
    // Addition
    printf("Worker: Let me sleep for 10 seconds first!\n");
    sleep(10);
    done = 1;
    return NULL;
}

int main(int argc, char *argv[])
{
    pthread_t p;
    Pthread_create(&p, NULL, worker, NULL);
    while (done == 0)
        ;
    printf("this should print last\n");
    return 0;
}
```

我们让每一个工作线程都睡眠 10 秒钟，因此你可以观察到如下结果：

```plain
this should print first
Worker: Let me sleep for 10 seconds first!
// 10 Seconds Later...
this should print last
```

因此，当工作线程需要很长时间才能完成的时候，主线程也要等待它的响应，相当于把并行的优势给浪费掉了。

## `main-signal.c` - helgrind
> Now run helgrind on this program. What does it report? Is the code correct?
>

```plain
==4005== Helgrind, a thread error detector
==4005== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.
==4005== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4005== Command: ./main-signal
==4005== 
this should print first
Worker: Let me sleep for 10 seconds first!
==4005== ---Thread-Announcement------------------------------------------
==4005== 
==4005== Thread #2 was created
==4005==    at 0x49989F3: clone (clone.S:76)
==4005==    by 0x49998EE: __clone_internal (clone-internal.c:83)
==4005==    by 0x49076D8: create_thread (pthread_create.c:295)
==4005==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)
==4005==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4005==    by 0x109250: main (main-signal.c:20)
==4005== 
==4005== ---Thread-Announcement------------------------------------------
==4005== 
==4005== Thread #1 is the program's root thread
==4005== 
==4005== ----------------------------------------------------------------
==4005== 
==4005== Possible data race during write of size 4 at 0x10C014 by thread #2
==4005== Locks held: none
==4005==    at 0x109201: worker (main-signal.c:13)
==4005==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4005==    by 0x4907AC2: start_thread (pthread_create.c:442)
==4005==    by 0x4998A03: clone (clone.S:100)
==4005== 
==4005== This conflicts with a previous read of size 4 by thread #1
==4005== Locks held: none
==4005==    at 0x10927E: main (main-signal.c:21)
==4005==  Address 0x10c014 is 0 bytes inside data symbol "done"
==4005== 
==4005== ----------------------------------------------------------------
==4005== 
==4005== Possible data race during read of size 4 at 0x10C014 by thread #1
==4005== Locks held: none
==4005==    at 0x10927E: main (main-signal.c:21)
==4005== 
==4005== This conflicts with a previous write of size 4 by thread #2
==4005== Locks held: none
==4005==    at 0x109201: worker (main-signal.c:13)
==4005==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4005==    by 0x4907AC2: start_thread (pthread_create.c:442)
==4005==    by 0x4998A03: clone (clone.S:100)
==4005==  Address 0x10c014 is 0 bytes inside data symbol "done"
==4005== 
==4005== ----------------------------------------------------------------
==4005== 
==4005== Possible data race during write of size 1 at 0x52A01A5 by thread #1
==4005== Locks held: none
==4005==    at 0x4859796: mempcpy (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4005==    by 0x48FE664: _IO_new_file_xsputn (fileops.c:1235)
==4005==    by 0x48FE664: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==4005==    by 0x48F3F1B: puts (ioputs.c:40)
==4005==    by 0x109296: main (main-signal.c:23)
==4005==  Address 0x52a01a5 is 21 bytes inside a block of size 1,024 alloc'd
==4005==    at 0x484A919: malloc (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4005==    by 0x48F1BA3: _IO_file_doallocate (filedoalloc.c:101)
==4005==    by 0x4900CDF: _IO_doallocbuf (genops.c:347)
==4005==    by 0x48FFF5F: _IO_file_overflow@@GLIBC_2.2.5 (fileops.c:744)
==4005==    by 0x48FE6D4: _IO_new_file_xsputn (fileops.c:1243)
==4005==    by 0x48FE6D4: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==4005==    by 0x48F3F1B: puts (ioputs.c:40)
==4005==    by 0x1091E7: worker (main-signal.c:10)
==4005==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)
==4005==    by 0x4907AC2: start_thread (pthread_create.c:442)
==4005==    by 0x4998A03: clone (clone.S:100)
==4005==  Block was alloc'd by thread #2
==4005== 
this should print last
==4005== 
==4005== Use --history-level=approx or =none to gain increased speed, at
==4005== the cost of reduced accuracy of conflicting-access information
==4005== For lists of detected and suppressed errors, rerun with: -s
==4005== ERROR SUMMARY: 24 errors from 3 contexts (suppressed: 40 from 34)
```

Helgrind 还是会报 race 相关的错误。

## `main-signal-cv.c` - Use Condition Variables(Of course, <u>a lock</u> in addition)
> Now look at a slightly modified version of the code, which is found in main-signal-cv.c. This version uses a condition variable to do the signaling (and associated lock). 
>
> Why is this code preferred to the previous version? Is it correctness, or performance, or both?
>

正确性方面：避免了 race 现象的发生，防止标志变量意外被并发操作导致异常

程序性能表现方面：在线程等待条件变量的过程中，进入睡眠状态的线程并没有在占用 CPU，这样能够让 CPU 在这段时间中转去干其他工作，当子线程工作时间比较久的时候，程序性能明显会比空转等待简单标志变量的情况要高得多。

## `main-signal-cv.c` - helgrind
> Once again run helgrind on `main-signal-cv`. Does it report any errors?
>

Helgrind 并没有报告任何错误。



> 更新: 2024-10-08 11:29:09  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/kv7p3ywxmif2wc5h>