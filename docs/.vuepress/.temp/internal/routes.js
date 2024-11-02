export const redirects = JSON.parse("{\"/learning-path/os/Linux-related-content/Make&Makefile.html\":\"/learning-path/os/Linux-related-content/Make_Makefile.html\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/guide/get-started.html", { loader: () => import(/* webpackChunkName: "guide_get-started.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/guide/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/learning-path/", { loader: () => import(/* webpackChunkName: "learning-path_index.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/index.html.js"), meta: {"title":"学习之路"} }],
  ["/learning-path/%E5%AD%A6%E4%B9%A0%E5%9C%B0%E5%9B%BE.html", { loader: () => import(/* webpackChunkName: "learning-path_学习地图.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/学习地图.html.js"), meta: {"title":"学习地图"} }],
  ["/learning-path/%E6%97%A5%E5%BF%97.html", { loader: () => import(/* webpackChunkName: "learning-path_日志.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/日志.html.js"), meta: {"title":"日志"} }],
  ["/learning-path/algorithm/KMP%E7%AE%97%E6%B3%952024_09_10.html", { loader: () => import(/* webpackChunkName: "learning-path_algorithm_KMP算法2024_09_10.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/algorithm/KMP算法2024_09_10.html.js"), meta: {"title":"KMP算法 2024/09/10"} }],
  ["/learning-path/algorithm/%E6%95%B0%E7%BB%84-12024_09_22.html", { loader: () => import(/* webpackChunkName: "learning-path_algorithm_数组-12024_09_22.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/algorithm/数组-12024_09_22.html.js"), meta: {"title":"数组-1 2024/09/22"} }],
  ["/learning-path/algorithm/%E6%95%B0%E7%BB%84-22024_09_23.html", { loader: () => import(/* webpackChunkName: "learning-path_algorithm_数组-22024_09_23.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/algorithm/数组-22024_09_23.html.js"), meta: {"title":"数组-2 2024/09/23"} }],
  ["/learning-path/MIT6.031/(sp16)Exercises/ProblemSet0_TurtleGraphics.html", { loader: () => import(/* webpackChunkName: "learning-path_MIT6.031_(sp16)Exercises_ProblemSet0_TurtleGraphics.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/MIT6.031/(sp16)Exercises/ProblemSet0_TurtleGraphics.html.js"), meta: {"title":"Problem Set 0 : Turtle Graphics"} }],
  ["/learning-path/MIT6.031/Notes/Reading1_StaticChecking.html", { loader: () => import(/* webpackChunkName: "learning-path_MIT6.031_Notes_Reading1_StaticChecking.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/MIT6.031/Notes/Reading1_StaticChecking.html.js"), meta: {"title":"Reading 1: Static Checking"} }],
  ["/learning-path/MIT6.031/Notes/Reading2_BasicJava.html", { loader: () => import(/* webpackChunkName: "learning-path_MIT6.031_Notes_Reading2_BasicJava.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/MIT6.031/Notes/Reading2_BasicJava.html.js"), meta: {"title":"Reading 2: Basic Java"} }],
  ["/learning-path/MIT6.031/Notes/Reading3_Testing.html", { loader: () => import(/* webpackChunkName: "learning-path_MIT6.031_Notes_Reading3_Testing.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/MIT6.031/Notes/Reading3_Testing.html.js"), meta: {"title":"Reading 3: Testing"} }],
  ["/learning-path/os/Linux-related-content/Linux%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html", { loader: () => import(/* webpackChunkName: "learning-path_os_Linux-related-content_Linux学习笔记.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/Linux-related-content/Linux学习笔记.html.js"), meta: {"title":"Linux学习笔记"} }],
  ["/learning-path/os/Linux-related-content/Make_Makefile.html", { loader: () => import(/* webpackChunkName: "learning-path_os_Linux-related-content_Make_Makefile.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/Linux-related-content/Make_Makefile.html.js"), meta: {"title":"Make & Makefile"} }],
  ["/learning-path/os/NJU-OS/Lab/MiniLab1_pstree.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_Lab_MiniLab1_pstree.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/Lab/MiniLab1_pstree.html.js"), meta: {"title":"Mini Lab 1: pstree"} }],
  ["/learning-path/os/NJU-OS/note/%E5%B9%B6%E5%8F%91-1%E5%A4%9A%E5%A4%84%E7%90%86%E5%99%A8%E7%BC%96%E7%A8%8B_%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E6%94%BE%E5%BC%83.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_note_并发-1多处理器编程_从入门到放弃.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/note/并发-1多处理器编程_从入门到放弃.html.js"), meta: {"title":"并发-1 多处理器编程: 从入门到放弃"} }],
  ["/learning-path/os/NJU-OS/note/%E5%B9%B6%E5%8F%91-2%EF%BC%9A%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6-%E4%BA%92%E6%96%A5(1).html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_note_并发-2：并发控制-互斥(1).html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/note/并发-2：并发控制-互斥(1).html.js"), meta: {"title":"并发 - 2：并发控制 - 互斥 (1)"} }],
  ["/learning-path/os/NJU-OS/note/%E7%BB%AA%E8%AE%BA2%E5%BA%94%E7%94%A8%E8%A7%86%E8%A7%92%E7%9A%84%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_note_绪论2应用视角的操作系统.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/note/绪论2应用视角的操作系统.html.js"), meta: {"title":"绪论2 应用视角的操作系统"} }],
  ["/learning-path/os/NJU-OS/note/%E7%BB%AA%E8%AE%BA3%E7%A1%AC%E4%BB%B6%E8%A7%86%E8%A7%92%E7%9A%84%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_note_绪论3硬件视角的操作系统.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/note/绪论3硬件视角的操作系统.html.js"), meta: {"title":"绪论3 硬件视角的操作系统"} }],
  ["/learning-path/os/NJU-OS/note/%E7%BB%AA%E8%AE%BA4%E6%95%B0%E5%AD%A6%E8%A7%86%E8%A7%92%E7%9A%84%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_note_绪论4数学视角的操作系统.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/note/绪论4数学视角的操作系统.html.js"), meta: {"title":"绪论4 数学视角的操作系统"} }],
  ["/learning-path/os/NJU-OS/textbook/OSTEP%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-1%E7%BB%AA%E8%AE%BA.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_textbook_OSTEP学习笔记-1绪论.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/textbook/OSTEP学习笔记-1绪论.html.js"), meta: {"title":"OSTEP 学习笔记-1 绪论"} }],
  ["/learning-path/os/NJU-OS/textbook/OSTEP%E7%9B%B8%E5%85%B3%E8%B5%84%E6%BA%90.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_textbook_OSTEP相关资源.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/textbook/OSTEP相关资源.html.js"), meta: {"title":"OSTEP相关资源"} }],
  ["/learning-path/os/NJU-OS/textbook/OSTEP%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-2Concurrency/Homework-ThreadAPI.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_textbook_OSTEP学习笔记-2Concurrency_Homework-ThreadAPI.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/textbook/OSTEP学习笔记-2Concurrency/Homework-ThreadAPI.html.js"), meta: {"title":"Homework - Thread API"} }],
  ["/learning-path/os/NJU-OS/textbook/OSTEP%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-2Concurrency/Homework-ThreadsIntro.html", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_textbook_OSTEP学习笔记-2Concurrency_Homework-ThreadsIntro.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/textbook/OSTEP学习笔记-2Concurrency/Homework-ThreadsIntro.html.js"), meta: {"title":"Homework - Threads Intro"} }],
  ["/learning-path/os/NJU-OS/textbook/OSTEP%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-2Concurrency/", { loader: () => import(/* webpackChunkName: "learning-path_os_NJU-OS_textbook_OSTEP学习笔记-2Concurrency_index.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/os/NJU-OS/textbook/OSTEP学习笔记-2Concurrency/index.html.js"), meta: {"title":"OSTEP 学习笔记-2 Concurrency"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
