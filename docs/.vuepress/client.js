import { defineClientConfig } from "@vuepress/client";

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [],
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],
});
