import { defineUserConfig, defaultTheme } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
export default defineUserConfig({
  //   作者
  author: "Xing",
  base: "/",
  title: "Xing-Blog！",
  description: "这是我的第一个 VuePress 站点",
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],
  theme: defaultTheme({
    lang: "zh-CN",
    // 默认主题配置
    contributors: false,
    search: true,
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "python",
        link: "/python/",
      },
      {
        text: "java",
        link: "/java/",
        children: [
          {
            text: "spring",
            link: "/java/spring/",
          },
          {
            text: "mybatis",
            link: "/java/mybatis/",
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
