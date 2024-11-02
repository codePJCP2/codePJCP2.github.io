import comp from "E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/index.html.vue"
const data = JSON.parse("{\"path\":\"/learning-path/\",\"title\":\"学习之路\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"学习地图\",\"slug\":\"学习地图\",\"link\":\"#学习地图\",\"children\":[]},{\"level\":2,\"title\":\"学习日志\",\"slug\":\"学习日志\",\"link\":\"#学习日志\",\"children\":[]},{\"level\":2,\"title\":\"学习之路\",\"slug\":\"学习之路-1\",\"link\":\"#学习之路-1\",\"children\":[{\"level\":3,\"title\":\"计算机操作系统\",\"slug\":\"计算机操作系统\",\"link\":\"#计算机操作系统\",\"children\":[]}]}],\"git\":{\"updatedTime\":1730468838000,\"contributors\":[{\"name\":\"codePJCP2\",\"email\":\"159783914+codePJCP2@users.noreply.github.com\",\"commits\":1}]},\"filePathRelative\":\"learning-path/index.md\"}")
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
