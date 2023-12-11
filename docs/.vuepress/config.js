import { defineUserConfig, defaultTheme } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
export default defineUserConfig({
  lang: "zh-CN",
  base: "/",
  title: "Xing-Blog！",
  description: "这是我的第一个 VuePress 站点",
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],
  theme: defaultTheme({
    // 默认主题配置
    search: true,
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "python",
        link: "/python/",
        children: [
          {
            text: "python基础",
            link: "/python/python_base/",
          },
          {
            text: "python进阶",
            link: "/python/python_advance/",
          },
          {
            text: "python面试",
            link: "/python/python_interview/",
          },
        ],
      },
    ],
  }),
  plugins: [
    searchPlugin({
      // 配置项
    }),
    backToTopPlugin(),
  ],
});
