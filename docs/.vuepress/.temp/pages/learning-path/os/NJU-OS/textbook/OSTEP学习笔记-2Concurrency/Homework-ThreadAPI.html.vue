<template><div><h1 id="homework-thread-api" tabindex="-1"><a class="header-anchor" href="#homework-thread-api"><span>Homework - Thread API</span></a></h1>
<blockquote>
<p>页面：P345</p>
</blockquote>
<h2 id="helgrind-first-sight" tabindex="-1"><a class="header-anchor" href="#helgrind-first-sight"><span><code v-pre>helgrind</code> - First Sight</span></a></h2>
<blockquote>
<p>Run helgrind (by typing <code v-pre>valgrind --tool=helgrind ./main-race</code>) to see how it reports the race.</p>
<ol>
<li>Does it point to the right lines of code?</li>
<li>What other information does it give to you?</li>
</ol>
</blockquote>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>==4638== Helgrind, a thread error detector</span></span></span>
<span class="line"><span class="line"><span>==4638== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.</span></span></span>
<span class="line"><span class="line"><span>==4638== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info</span></span></span>
<span class="line"><span class="line"><span>==4638== Command: ./main-race</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== ---Thread-Announcement------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== Thread #1 is the program's root thread</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== ---Thread-Announcement------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== Thread #2 was created</span></span></span>
<span class="line"><span class="line"><span>==4638==    at 0x49989F3: clone (clone.S:76)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x49998EE: __clone_internal (clone-internal.c:83)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x49076D8: create_thread (pthread_create.c:295)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x109209: main (main-race.c:14)</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== Possible data race during read of size 4 at 0x10C014 by thread #1</span></span></span>
<span class="line"><span class="line"><span>==4638== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4638==    at 0x109236: main (main-race.c:15)</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== This conflicts with a previous write of size 4 by thread #2</span></span></span>
<span class="line"><span class="line"><span>==4638== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4638==    at 0x1091BE: worker (main-race.c:8)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==4638==  Address 0x10c014 is 0 bytes inside data symbol "balance"</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== Possible data race during write of size 4 at 0x10C014 by thread #1</span></span></span>
<span class="line"><span class="line"><span>==4638== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4638==    at 0x10923F: main (main-race.c:15)</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== This conflicts with a previous write of size 4 by thread #2</span></span></span>
<span class="line"><span class="line"><span>==4638== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4638==    at 0x1091BE: worker (main-race.c:8)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==4638==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==4638==  Address 0x10c014 is 0 bytes inside data symbol "balance"</span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== </span></span></span>
<span class="line"><span class="line"><span>==4638== Use --history-level=approx or =none to gain increased speed, at</span></span></span>
<span class="line"><span class="line"><span>==4638== the cost of reduced accuracy of conflicting-access information</span></span></span>
<span class="line"><span class="line"><span>==4638== For lists of detected and suppressed errors, rerun with: -s</span></span></span>
<span class="line"><span class="line"><span>==4638== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="main-race-c-add-locks" tabindex="-1"><a class="header-anchor" href="#main-race-c-add-locks"><span><code v-pre>main-race.c</code> - Add Locks</span></a></h2>
<blockquote>
<p>What happens when you remove one of the offending lines of code? Now add a lock around one of the updates to the shared variable, and then around both. What does <code v-pre>helgrind</code> report in each of these cases?</p>
</blockquote>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>==4748== Helgrind, a thread error detector</span></span></span>
<span class="line"><span class="line"><span>==4748== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.</span></span></span>
<span class="line"><span class="line"><span>==4748== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info</span></span></span>
<span class="line"><span class="line"><span>==4748== Command: ./main-race</span></span></span>
<span class="line"><span class="line"><span>==4748== </span></span></span>
<span class="line"><span class="line"><span>==4748== </span></span></span>
<span class="line"><span class="line"><span>==4748== Use --history-level=approx or =none to gain increased speed, at</span></span></span>
<span class="line"><span class="line"><span>==4748== the cost of reduced accuracy of conflicting-access information</span></span></span>
<span class="line"><span class="line"><span>==4748== For lists of detected and suppressed errors, rerun with: -s</span></span></span>
<span class="line"><span class="line"><span>==4748== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>==5744== Helgrind, a thread error detector</span></span></span>
<span class="line"><span class="line"><span>==5744== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.</span></span></span>
<span class="line"><span class="line"><span>==5744== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info</span></span></span>
<span class="line"><span class="line"><span>==5744== Command: ./main-race</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== ---Thread-Announcement------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== Thread #1 is the program's root thread</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== ---Thread-Announcement------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== Thread #2 was created</span></span></span>
<span class="line"><span class="line"><span>==5744==    at 0x49989F3: clone (clone.S:76)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x49998EE: __clone_internal (clone-internal.c:83)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x49076D8: create_thread (pthread_create.c:295)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x1092C3: main (main-race.c:18)</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744==  Lock at 0x10C060 was first observed</span></span></span>
<span class="line"><span class="line"><span>==5744==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x109207: worker (main-race.c:10)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==5744==  Address 0x10c060 is 0 bytes inside data symbol "lock"</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== Possible data race during read of size 4 at 0x10C040 by thread #1</span></span></span>
<span class="line"><span class="line"><span>==5744== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==5744==    at 0x1092F0: main (main-race.c:19)</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== This conflicts with a previous write of size 4 by thread #2</span></span></span>
<span class="line"><span class="line"><span>==5744== Locks held: 1, at address 0x10C060</span></span></span>
<span class="line"><span class="line"><span>==5744==    at 0x10923D: worker (main-race.c:11)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==5744==  Address 0x10c040 is 0 bytes inside data symbol "balance"</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744==  Lock at 0x10C060 was first observed</span></span></span>
<span class="line"><span class="line"><span>==5744==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x109207: worker (main-race.c:10)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==5744==  Address 0x10c060 is 0 bytes inside data symbol "lock"</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== Possible data race during write of size 4 at 0x10C040 by thread #1</span></span></span>
<span class="line"><span class="line"><span>==5744== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==5744==    at 0x1092F9: main (main-race.c:19)</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== This conflicts with a previous write of size 4 by thread #2</span></span></span>
<span class="line"><span class="line"><span>==5744== Locks held: 1, at address 0x10C060</span></span></span>
<span class="line"><span class="line"><span>==5744==    at 0x10923D: worker (main-race.c:11)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==5744==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==5744==  Address 0x10c040 is 0 bytes inside data symbol "balance"</span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== </span></span></span>
<span class="line"><span class="line"><span>==5744== Use --history-level=approx or =none to gain increased speed, at</span></span></span>
<span class="line"><span class="line"><span>==5744== the cost of reduced accuracy of conflicting-access information</span></span></span>
<span class="line"><span class="line"><span>==5744== For lists of detected and suppressed errors, rerun with: -s</span></span></span>
<span class="line"><span class="line"><span>==5744== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>==5876== Helgrind, a thread error detector</span></span></span>
<span class="line"><span class="line"><span>==5876== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.</span></span></span>
<span class="line"><span class="line"><span>==5876== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info</span></span></span>
<span class="line"><span class="line"><span>==5876== Command: ./main-race</span></span></span>
<span class="line"><span class="line"><span>==5876== </span></span></span>
<span class="line"><span class="line"><span>==5876== </span></span></span>
<span class="line"><span class="line"><span>==5876== Use --history-level=approx or =none to gain increased speed, at</span></span></span>
<span class="line"><span class="line"><span>==5876== the cost of reduced accuracy of conflicting-access information</span></span></span>
<span class="line"><span class="line"><span>==5876== For lists of detected and suppressed errors, rerun with: -s</span></span></span>
<span class="line"><span class="line"><span>==5876== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 7 from 7)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="main-deadlock-c-deadlocks" tabindex="-1"><a class="header-anchor" href="#main-deadlock-c-deadlocks"><span><code v-pre>main-deadlock.c</code> - Deadlocks</span></a></h2>
<blockquote>
<p>Now let’s look at <code v-pre>main-deadlock.c</code>. Examine the code. This code has a problem known as <strong>deadlock</strong>. Can you see what problem it might have?</p>
</blockquote>
<p>每个线程最开始都会持有一个锁(<code v-pre>m1,m2</code>)，之后都在等待另一个锁释放来持有锁。这就造成了死锁现象。</p>
<h2 id="main-deadlock-c-helgrind" tabindex="-1"><a class="header-anchor" href="#main-deadlock-c-helgrind"><span><code v-pre>main-deadlock.c</code> - helgrind</span></a></h2>
<blockquote>
<p>Now run helgrind on this code. What does helgrind report?</p>
</blockquote>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>==3542== Helgrind, a thread error detector</span></span></span>
<span class="line"><span class="line"><span>==3542== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.</span></span></span>
<span class="line"><span class="line"><span>==3542== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info</span></span></span>
<span class="line"><span class="line"><span>==3542== Command: ./main-deadlock</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== ---Thread-Announcement------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== Thread #3 was created</span></span></span>
<span class="line"><span class="line"><span>==3542==    at 0x49989F3: clone (clone.S:76)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x49998EE: __clone_internal (clone-internal.c:83)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x49076D8: create_thread (pthread_create.c:295)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x1093F4: main (main-deadlock.c:29)</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== Thread #3: lock order "0x10C040 before 0x10C080" violated</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== Observed (incorrect) order is: acquisition of lock at 0x10C080</span></span></span>
<span class="line"><span class="line"><span>==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x109288: worker (main-deadlock.c:17)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542==  followed by a later acquisition of lock at 0x10C040</span></span></span>
<span class="line"><span class="line"><span>==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x1092C3: worker (main-deadlock.c:18)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== Required order was established by acquisition of lock at 0x10C040</span></span></span>
<span class="line"><span class="line"><span>==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x10920E: worker (main-deadlock.c:12)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542==  followed by a later acquisition of lock at 0x10C080</span></span></span>
<span class="line"><span class="line"><span>==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x109249: worker (main-deadlock.c:13)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542==  Lock at 0x10C040 was first observed</span></span></span>
<span class="line"><span class="line"><span>==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x10920E: worker (main-deadlock.c:12)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==3542==  Address 0x10c040 is 0 bytes inside data symbol "m1"</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542==  Lock at 0x10C080 was first observed</span></span></span>
<span class="line"><span class="line"><span>==3542==    at 0x4850CCF: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x109249: worker (main-deadlock.c:13)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==3542==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==3542==  Address 0x10c080 is 0 bytes inside data symbol "m2"</span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== </span></span></span>
<span class="line"><span class="line"><span>==3542== Use --history-level=approx or =none to gain increased speed, at</span></span></span>
<span class="line"><span class="line"><span>==3542== the cost of reduced accuracy of conflicting-access information</span></span></span>
<span class="line"><span class="line"><span>==3542== For lists of detected and suppressed errors, rerun with: -s</span></span></span>
<span class="line"><span class="line"><span>==3542== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 7 from 7)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="main-deadlock-global-c-helgrind" tabindex="-1"><a class="header-anchor" href="#main-deadlock-global-c-helgrind"><span><code v-pre>main-deadlock-global.c</code> - helgrind</span></a></h2>
<blockquote>
<p>Now run helgrind on <code v-pre>main-deadlock-global.c.</code> Examine the code; does it have the same problem that <code v-pre>main-deadlock.c</code> has? Should helgrind be reporting the same error? What does this tell you about tools like helgrind?</p>
</blockquote>
<p>global 代码其实是在原 deadlock 区域外添加了一层锁，这样就可以保证拿到全局锁的线程先获取、释放 m1,m2 锁之后再让其余线程执行，因此不会出现原代码的死锁问题。</p>
<p>不幸的是，helgrind 等检测工具仍旧会报告相同的问题。</p>
<h2 id="main-signal-c-simple-flag-variables" tabindex="-1"><a class="header-anchor" href="#main-signal-c-simple-flag-variables"><span><code v-pre>main-signal.c</code> - Simple Flag Variables</span></a></h2>
<blockquote>
<p>Let's next look at <code v-pre>main-signal.c</code>. This code uses a variable (<code v-pre>done</code>) to signal that the child is done and that the parent can now continue.</p>
<p>Why is this code <strong>inefficient</strong>? (what does the parent end up spending its time doing, particularly if the child thread takes a long time to complete?)</p>
</blockquote>
<p>原先的代码可能效果并不明显，让我们修改一下代码：</p>
<div class="language-c line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-c"><code><span class="line"><span class="line"><span style="color:#5E81AC;font-weight:bold">#</span><span style="color:#81A1C1">include</span><span style="color:#ECEFF4"> &#x3C;</span><span style="color:#8FBCBB">stdio.h</span><span style="color:#ECEFF4">></span></span></span>
<span class="line"><span class="line"><span style="color:#5E81AC;font-weight:bold">#</span><span style="color:#81A1C1">include</span><span style="color:#ECEFF4"> &#x3C;</span><span style="color:#8FBCBB">unistd.h</span><span style="color:#ECEFF4">></span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#5E81AC;font-weight:bold">#</span><span style="color:#81A1C1">include</span><span style="color:#ECEFF4"> "</span><span style="color:#A3BE8C">common_threads.h</span><span style="color:#ECEFF4">"</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">int</span><span style="color:#D8DEE9FF"> done </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 0</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">void</span><span style="color:#81A1C1"> *</span><span style="color:#88C0D0">worker</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">void</span><span style="color:#81A1C1"> *</span><span style="color:#D8DEE9">arg</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">{</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">this should print first</span><span style="color:#EBCB8B">\n</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#616E88">    // Addition</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Worker: Let me sleep for 10 seconds first!</span><span style="color:#EBCB8B">\n</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    sleep</span><span style="color:#ECEFF4">(</span><span style="color:#B48EAD">10</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#D8DEE9FF">    done </span><span style="color:#81A1C1">=</span><span style="color:#B48EAD"> 1</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    return</span><span style="color:#81A1C1"> NULL;</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">}</span></span></span>
<span class="line"><span class="line"></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">int</span><span style="color:#88C0D0"> main</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">int</span><span style="color:#D8DEE9"> argc</span><span style="color:#ECEFF4">,</span><span style="color:#81A1C1"> char</span><span style="color:#81A1C1"> *</span><span style="color:#D8DEE9">argv</span><span style="color:#81A1C1">[]</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">{</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    pthread_t</span><span style="color:#D8DEE9FF"> p</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    Pthread_create</span><span style="color:#ECEFF4">(</span><span style="color:#81A1C1">&#x26;</span><span style="color:#D8DEE9FF">p</span><span style="color:#ECEFF4">,</span><span style="color:#81A1C1"> NULL</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9FF"> worker</span><span style="color:#ECEFF4">,</span><span style="color:#81A1C1"> NULL</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    while</span><span style="color:#ECEFF4"> (</span><span style="color:#D8DEE9FF">done </span><span style="color:#81A1C1">==</span><span style="color:#B48EAD"> 0</span><span style="color:#ECEFF4">)</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">        ;</span></span></span>
<span class="line"><span class="line"><span style="color:#88C0D0">    printf</span><span style="color:#ECEFF4">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">this should print last</span><span style="color:#EBCB8B">\n</span><span style="color:#ECEFF4">"</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#81A1C1">    return</span><span style="color:#B48EAD"> 0</span><span style="color:#81A1C1">;</span></span></span>
<span class="line"><span class="line"><span style="color:#ECEFF4">}</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们让每一个工作线程都睡眠 10 秒钟，因此你可以观察到如下结果：</p>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>this should print first</span></span></span>
<span class="line"><span class="line"><span>Worker: Let me sleep for 10 seconds first!</span></span></span>
<span class="line"><span class="line"><span>// 10 Seconds Later...</span></span></span>
<span class="line"><span class="line"><span>this should print last</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，当工作线程需要很长时间才能完成的时候，主线程也要等待它的响应，相当于把并行的优势给浪费掉了。</p>
<h2 id="main-signal-c-helgrind" tabindex="-1"><a class="header-anchor" href="#main-signal-c-helgrind"><span><code v-pre>main-signal.c</code> - helgrind</span></a></h2>
<blockquote>
<p>Now run helgrind on this program. What does it report? Is the code correct?</p>
</blockquote>
<div class="language-plain line-numbers-mode line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre v-pre  class="shiki nord vp-code" style="background-color:#2e3440ff;color:#d8dee9ff language-plain"><code><span class="line"><span class="line"><span>==4005== Helgrind, a thread error detector</span></span></span>
<span class="line"><span class="line"><span>==4005== Copyright (C) 2007-2017, and GNU GPL'd, by OpenWorks LLP et al.</span></span></span>
<span class="line"><span class="line"><span>==4005== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info</span></span></span>
<span class="line"><span class="line"><span>==4005== Command: ./main-signal</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>this should print first</span></span></span>
<span class="line"><span class="line"><span>Worker: Let me sleep for 10 seconds first!</span></span></span>
<span class="line"><span class="line"><span>==4005== ---Thread-Announcement------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== Thread #2 was created</span></span></span>
<span class="line"><span class="line"><span>==4005==    at 0x49989F3: clone (clone.S:76)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x49998EE: __clone_internal (clone-internal.c:83)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x49076D8: create_thread (pthread_create.c:295)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x49081FF: pthread_create@@GLIBC_2.34 (pthread_create.c:828)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4853767: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x109250: main (main-signal.c:20)</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== ---Thread-Announcement------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== Thread #1 is the program's root thread</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== Possible data race during write of size 4 at 0x10C014 by thread #2</span></span></span>
<span class="line"><span class="line"><span>==4005== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4005==    at 0x109201: worker (main-signal.c:13)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== This conflicts with a previous read of size 4 by thread #1</span></span></span>
<span class="line"><span class="line"><span>==4005== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4005==    at 0x10927E: main (main-signal.c:21)</span></span></span>
<span class="line"><span class="line"><span>==4005==  Address 0x10c014 is 0 bytes inside data symbol "done"</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== Possible data race during read of size 4 at 0x10C014 by thread #1</span></span></span>
<span class="line"><span class="line"><span>==4005== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4005==    at 0x10927E: main (main-signal.c:21)</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== This conflicts with a previous write of size 4 by thread #2</span></span></span>
<span class="line"><span class="line"><span>==4005== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4005==    at 0x109201: worker (main-signal.c:13)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==4005==  Address 0x10c014 is 0 bytes inside data symbol "done"</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== ----------------------------------------------------------------</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== Possible data race during write of size 1 at 0x52A01A5 by thread #1</span></span></span>
<span class="line"><span class="line"><span>==4005== Locks held: none</span></span></span>
<span class="line"><span class="line"><span>==4005==    at 0x4859796: mempcpy (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48FE664: _IO_new_file_xsputn (fileops.c:1235)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48FE664: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48F3F1B: puts (ioputs.c:40)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x109296: main (main-signal.c:23)</span></span></span>
<span class="line"><span class="line"><span>==4005==  Address 0x52a01a5 is 21 bytes inside a block of size 1,024 alloc'd</span></span></span>
<span class="line"><span class="line"><span>==4005==    at 0x484A919: malloc (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48F1BA3: _IO_file_doallocate (filedoalloc.c:101)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4900CDF: _IO_doallocbuf (genops.c:347)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48FFF5F: _IO_file_overflow@@GLIBC_2.2.5 (fileops.c:744)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48FE6D4: _IO_new_file_xsputn (fileops.c:1243)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48FE6D4: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x48F3F1B: puts (ioputs.c:40)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x1091E7: worker (main-signal.c:10)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x485396A: ??? (in /usr/libexec/valgrind/vgpreload_helgrind-amd64-linux.so)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4907AC2: start_thread (pthread_create.c:442)</span></span></span>
<span class="line"><span class="line"><span>==4005==    by 0x4998A03: clone (clone.S:100)</span></span></span>
<span class="line"><span class="line"><span>==4005==  Block was alloc'd by thread #2</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>this should print last</span></span></span>
<span class="line"><span class="line"><span>==4005== </span></span></span>
<span class="line"><span class="line"><span>==4005== Use --history-level=approx or =none to gain increased speed, at</span></span></span>
<span class="line"><span class="line"><span>==4005== the cost of reduced accuracy of conflicting-access information</span></span></span>
<span class="line"><span class="line"><span>==4005== For lists of detected and suppressed errors, rerun with: -s</span></span></span>
<span class="line"><span class="line"><span>==4005== ERROR SUMMARY: 24 errors from 3 contexts (suppressed: 40 from 34)</span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Helgrind 还是会报 race 相关的错误。</p>
<h2 id="main-signal-cv-c-use-condition-variables-of-course-a-lock-in-addition" tabindex="-1"><a class="header-anchor" href="#main-signal-cv-c-use-condition-variables-of-course-a-lock-in-addition"><span><code v-pre>main-signal-cv.c</code> - Use Condition Variables(Of course, <u>a lock</u> in addition)</span></a></h2>
<blockquote>
<p>Now look at a slightly modified version of the code, which is found in main-signal-cv.c. This version uses a condition variable to do the signaling (and associated lock).</p>
<p>Why is this code preferred to the previous version? Is it correctness, or performance, or both?</p>
</blockquote>
<p>正确性方面：避免了 race 现象的发生，防止标志变量意外被并发操作导致异常</p>
<p>程序性能表现方面：在线程等待条件变量的过程中，进入睡眠状态的线程并没有在占用 CPU，这样能够让 CPU 在这段时间中转去干其他工作，当子线程工作时间比较久的时候，程序性能明显会比空转等待简单标志变量的情况要高得多。</p>
<h2 id="main-signal-cv-c-helgrind" tabindex="-1"><a class="header-anchor" href="#main-signal-cv-c-helgrind"><span><code v-pre>main-signal-cv.c</code> - helgrind</span></a></h2>
<blockquote>
<p>Once again run helgrind on <code v-pre>main-signal-cv</code>. Does it report any errors?</p>
</blockquote>
<p>Helgrind 并没有报告任何错误。</p>
<blockquote>
<p>更新: 2024-10-08 11:29:09<br>
原文: <a href="https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/kv7p3ywxmif2wc5h" target="_blank" rel="noopener noreferrer">https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/kv7p3ywxmif2wc5h</a></p>
</blockquote>
</div></template>


