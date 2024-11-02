import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'

export default defineUserConfig({
  lang: 'zh-CN',
  title: "PJCP2's Personal Site",
  description: 'My first VuePress Site!',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/guide/get-started'],
  }),

  // 排除 README.md
  pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],

  bundler: viteBundler(),

  plugins: [
    shikiPlugin({
      // 语言配置项
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff', 'python', 'java', 'c', 'c#', 'c++', 'js', 'cmake', 'makefile', 'html', 'go', 'shell', 'php'],
    }),
    markdownMathPlugin({
      // 选项
    }),
  ],
})
