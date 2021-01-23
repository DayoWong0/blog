module.exports = {
  // host: '0.0.0.0',  // 生成网页地址（本地调试使用）
  // port: "22335", // 生成网页端口（本地调试使用）
  title: "Dayo's Blog", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "雨后南风", // meta 中的描述文字，用于SEO
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }], //浏览器的标签栏的网页图标,基地址/docs/.vuepress/public
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ], //在移动端，搜索框在获得焦点时会放大
  ],
  // base: '/blog/',
  theme: "reco", //选择主题‘reco’
  themeConfig: {
    type: "blog", //选择类型博客
    fullscreen: true,
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认 “标签”
      },
    },
    nav: [
      //导航栏设置
      { text: "主页", link: "/", icon: "reco-home" },
      { text: "时间线", link: "/timeline/", icon: "reco-date" },
      { text: "订阅", link: "https://dayowong0.github.io/rss.xml", icon: "reco-rss" },
      {
        text: "工具",
        icon: "reco-api",
        items: [
          {
            text: "第三方网易云播放器",
            link: "http://clouddisk.tsanfer.xyz/YesPlayMusic/",
            icon: "reco-menu",
          },
        ],
      },
      {
        text: "联系",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/DayoWong0",
            icon: "reco-github",
          },
          {
            text: "QQ",
            // link: "tencent://message/?uin=1950882442",
            link: "http://wpa.qq.com/msgrd?v=3&uin=1950882442&site=qq&menu=yes",
            icon: "reco-qq",
          },
          {
            text: "Email",
            link: "mailto:1950882442@qq.com",
            icon: "reco-mail",
          },
        ],
      },
    ],
    sidebar: "auto", //在所有页面中启用自动生成侧栏
    startYear: "2020", // 项目开始时间，只填写年份
    lastUpdated: "最后更新时间", // string | boolean
    author: "Dayo",
    authorAvatar: "/avatar.svg", //作者头像
    mode: "auto", //主题颜色自动 light auto dark
    codeTheme: "okaidia", // default 'tomorrow'
    smooth: "true", //平滑滚动
    // 评论设置
    valineConfig: {
      appId: process.env.LEANCLOUD_APP_ID,
      appKey: process.env.LEANCLOUD_APP_KEY,
    },
  },
  markdown: {
    lineNumbers: true, //代码显示行号
    // Typeora图片路径问题
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"))
    }
  }, // 搜索设置
  search: true,
  searchMaxSuggestions: 10, // 插件
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-rss", //RSS插件
      {
        site_url: "https://dayowong0.github.io/", //网站地址
        copyright: "Dayo", //版权署名
      },
    ],
    ["flowchart"], // 支持流程图
    // ["vuepress-plugin-smooth-scroll"], // 平滑滚动
    ["@vuepress/nprogress"], // 加载进度条
    ["reading-progress"], // 阅读进度条
    ["vuepress-plugin-code-copy", true], //一键复制代码插件
  ],
}
