import comp from "E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/MIT-Missing-Semester/课后练习/Lec3Editor-Vim.html.vue"
const data = JSON.parse("{\"path\":\"/learning-path/MIT-Missing-Semester/%E8%AF%BE%E5%90%8E%E7%BB%83%E4%B9%A0/Lec3Editor-Vim.html\",\"title\":\"Lec3 Editor - Vim\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"learning-path/MIT-Missing-Semester/课后练习/Lec3Editor-Vim.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
