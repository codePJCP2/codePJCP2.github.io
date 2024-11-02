import comp from "E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/learning-path/MIT6.031/Notes/Reading1_StaticChecking.html.vue"
const data = JSON.parse("{\"path\":\"/learning-path/MIT6.031/Notes/Reading1_StaticChecking.html\",\"title\":\"Reading 1: Static Checking\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Exercise 1\",\"slug\":\"exercise-1\",\"link\":\"#exercise-1\",\"children\":[]}],\"git\":{\"updatedTime\":1730468838000,\"contributors\":[{\"name\":\"codePJCP2\",\"email\":\"159783914+codePJCP2@users.noreply.github.com\",\"commits\":1}]},\"filePathRelative\":\"learning-path/MIT6.031/Notes/Reading1_StaticChecking.md\"}")
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
