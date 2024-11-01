import comp from "E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/学习地图.html.vue"
const data = JSON.parse("{\"path\":\"/learning-path/%E5%AD%A6%E4%B9%A0%E5%9C%B0%E5%9B%BE.html\",\"title\":\"学习地图\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"软工\",\"slug\":\"软工\",\"link\":\"#软工\",\"children\":[]},{\"level\":2,\"title\":\"OS\",\"slug\":\"os\",\"link\":\"#os\",\"children\":[]},{\"level\":2,\"title\":\"数据结构\",\"slug\":\"数据结构\",\"link\":\"#数据结构\",\"children\":[]},{\"level\":2,\"title\":\"数据库\",\"slug\":\"数据库\",\"link\":\"#数据库\",\"children\":[]},{\"level\":2,\"title\":\"网络\",\"slug\":\"网络\",\"link\":\"#网络\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"learning-path/学习地图.md\"}")
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
