# Reading 1: Static Checking

# Static checking, dynamic checking, no checking
一般来说，一门编程语言应该提供下列自动错误检查中的至少一种：

+ Static checking: 在编译阶段(或者说**程序运行之前**)就进行错误检查
    - 一般来说可以用来检查语法错误或者类型错误
+ Dynamic checking: 在运行阶段进行自动错误检查
    - 可以检查出 Static Checking 检查不出的由特定值引发的错误
+ No checking: 这门语言**完全不支持**自动错误检查！！
    - ~~真的会有这种语言吗？？~~

# Reading Exercise 1
看几份 Buggy 的代码，并判断错误类型

## Exercise 1
```java
int n = -5;
if (n) {
  System.out.println("n is a positive integer");
}
```

<details class="lake-collapse"><summary id="uc4788aa1"><span class="ne-text">Answer</span></summary><p id="u99a1324e" class="ne-p"><span class="ne-text">这是 Static Error，因为 </span><code class="ne-code"><span class="ne-text">if (n)</span></code><span class="ne-text"> 中的表达式 n 无法被转成 </span><code class="ne-code"><span class="ne-text">boolean</span></code><span class="ne-text"> 类型。</span></p><pre data-language="java" id="yg8v1" class="ne-codeblock language-java"><code>int n = -5;
if (n &gt; 0) {
  System.out.println(&quot;n is a positive integer&quot;);
}</code></pre></details>
## Exercise 2
```java
int big = 200000; // 200,000
big = big * big;  // big should be 40 billion now
```

<details class="lake-collapse"><summary id="u10e35b74"><span class="ne-text">Answer</span></summary><p id="u8c867e66" class="ne-p"><span class="ne-text">这很明显是数据溢出，根据上面的介绍，你可能很容易就选到了 Dynamic Error。然而不幸的是，Java 并不会对数据溢出进行处理。因此这里数据溢出，导致产生了错误结果。</span></p></details>
## Exercise 3
```java
double probability = 1/5;
```

<details class="lake-collapse"><summary id="ue8bbde89"><span class="ne-text">Answer</span></summary><p id="ud84f9a30" class="ne-p"><code class="ne-code"><span class="ne-text">1 / 5 = 0 (int)</span></code><span class="ne-text">，int 类型结果转成 double 类型是没有问题的。因此这里是答案错误。</span></p></details>
## Exercise 4
```java
int sum = 0;
int n = 0;
int average = sum/n;
```

<details class="lake-collapse"><summary id="ua0dfb4a0"><span class="ne-text">Answer</span></summary><p id="udb7310fe" class="ne-p"><span class="ne-text">int 类型的值除以 0 的话无法产生 int 类型的值</span><span class="ne-text" style="text-decoration: line-through">(NaN &gt;&gt; INT_MAX)</span><span class="ne-text">，因此会报 Dynamic Error.</span></p></details>
## Exercise 5
```java
double sum = 7;
double n = 0;
double average = sum/n;
```

<details class="lake-collapse"><summary id="u1a483577"><span class="ne-text">Answer</span></summary><p id="u9b6c4742" class="ne-p"><span class="ne-text">double 类型的值除以 0 的话同样无法产生一个实数，然而 double 类型存在一个特殊值 </span><code class="ne-code"><span class="ne-text">POSITIVE_INFINITY</span></code><span class="ne-text">，当你试图将正数除以 0 时就会返回这个结果，而不是产生一个 Dynamic Error。因此，这里是答案错误。</span></p></details>
# <font style="color:rgb(51, 51, 51);">The goal of 6.031</font>
<font style="color:rgb(51, 51, 51);">Our primary goal in this course is learning how to produce software that is:</font>

+ **<font style="color:rgb(51, 51, 51);">Safe from bugs</font>**<font style="color:rgb(51, 51, 51);">. Correctness (correct behavior right now) and defensiveness (correct behavior in the future) are required in any software we build.</font>
+ **<font style="color:rgb(51, 51, 51);">Easy to understand</font>**<font style="color:rgb(51, 51, 51);">. The code has to communicate to future programmers who need to understand it and make changes in it (fixing bugs or adding new features). That future programmer might be you, months or years from now. You’ll be surprised how much you forget if you don’t write it down, and how much it helps your own future self to have a good design.</font>
+ **<font style="color:rgb(51, 51, 51);">Ready for change</font>**<font style="color:rgb(51, 51, 51);">. Software always changes. Some designs make it easy to make changes; others require throwing away and rewriting a lot of code.</font>

---

第一次课内容其实没多少重要的，只是 MIT 学生熟悉 Java 语法用的。



> 更新: 2024-09-19 18:22:01  
> 原文: <https://www.yuque.com/yuqueyonghukaqxkk/self_learning_route/mlp6w8v44y6859ha>