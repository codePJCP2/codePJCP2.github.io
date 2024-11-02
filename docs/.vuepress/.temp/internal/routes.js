export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/guide/get-started.html", { loader: () => import(/* webpackChunkName: "guide_get-started.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/guide/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/Workspace/GitHubProj/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
