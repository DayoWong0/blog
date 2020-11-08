---
title: blibili 脚本
date: 2020-11-08
sidebar: "auto"
categories:
  - 前端
tags:
  - JavaScript
  - bilibili
  - scripts
  - 油猴脚本
---

# blibili 脚本

## 功能介绍

- 双击页面使得视频全屏或取消全屏，和 Youtube 或 Netflix 双击视频全屏功能一样。
- 双击标题复制此标题为 Markdown 一级标题、播放列表标题为 Markdown 二级标题，方便做笔记写目录，两者都附带视频源地址。

## 双击全屏

仿照 Youtube Netflix 观看视频时双击全屏和退出全屏功能。

- 选择了 id= app 的元素，因为经过测试它好选择，双击也有效。若选择播放器界面的 div 双击无效。这个是 id = app 的元素是整个网页的 div，双击网页任何地方均可以实现全屏（最好双击空白的地方）。
- class st0，经过测试点击这个按钮有效且没问题。如果是 class bp-svgicon，会出现问题，有兴趣可以自己测试。

```javascript
$("#app").dblclick(function () {
  $(".st0").click();
});
```

## 复制标题＋网址为 Markdown 插入网址格式

### 参考

- [javascript - 如何将变量复制到剪贴板](https://www.coder.work/article/1845380)

  此插件用到了

- [ jQuery 复制网页内容插件](https://github.com/by-syk/jquery-copy)

  - [插件灵感来源](https://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery)

  这个插件没用的，以后可以用用

```javascript
function copy() {
  var copyText = "Hooray ! I will be copied";
  var el = document.createElement("textarea");
  el.value = copyText;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px",
  };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
```

### 实现

获取标题和当前网页网址再拼接，然后在网页中增加一个不可见的元素，使用 JavaScript 复制到剪切板再删除这个元素，最后还要阻止冒泡事件，冒泡事件是由双击全屏功能带来的。

```javascript
$(".tit").dblclick(function copy() {
  let title = $(this).text();
  let link = window.location.href;

  var copyText = "[" + title + "]" + "(" + link + ")";
  var el = document.createElement("textarea");
  el.value = copyText;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px",
  };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  //  阻止事件冒泡
  event.stopPropagation();
});
```

## 增加一个按钮将播放列表标题复制为 Markdown 二级标题

- 1

  ```javascript
  document.getElementsByClassName("list-box")[0];
  ```

![image-20201101010101842](./img/blibili%E8%84%9A%E6%9C%AC/image-20201101010101842.png)

- 2

  ```javascript
  document.getElementsByClassName("list-box")[0].textContent;
  ```

![image-20201101010132720](./img/blibili%E8%84%9A%E6%9C%AC/image-20201101010132720.png)

- 3

```javascript
document.getElementsByClassName("list-box")[0].innerText;
```

![image-20201101010150208](./img/blibili%E8%84%9A%E6%9C%AC/image-20201101010150208.png)

- 4

  ```javascript
  document.querySelectorAll(".list-box li");
  ```

  ![image-20201101012738436](./img/blibili%E8%84%9A%E6%9C%AC/image-20201101012738436.png)

  ```javascript
  document.querySelectorAll(".list-box li")[0].innerText;
  ```

  ![image-20201101012851680](./img/blibili%E8%84%9A%E6%9C%AC/image-20201101012851680.png)

  ```javascript
  document.querySelectorAll(".list-box li")[0].textContent;
  ```

  ![image-20201101012938317](./img/blibili%E8%84%9A%E6%9C%AC/image-20201101012938317.png)

  其实到这里基本功能就能实现了，我还想把网址加上去。 ?p=第几集 参数

  下标 0 为 p1，下标 1 为 p2 ok。

  ```javascript
  var list_box = document.querySelectorAll(".list-box li");
  var copyText = "";
  // 这里的 i <= list_box.length; 越界了。但是JavaScript 调试报错不说明原因，害得我花了可能半个小时调试
  // for(var i = 0; i <= list_box.length; i++){
  for (var i = 0; i <= list_box.length; i++) {
    console.log(list_box[i].textContent);
    copyText = copyText + list_box[i].textContent;
  }
  ```

  ```javascript
  userscript.html?name=bilibili.user.js&id=5cc99011-abe9-46dd-a304-8b246738769f:10916 Uncaught TypeError: Cannot read property 'textContent' of undefined
  ```

  这里的 i <= list_box.length; 越界了。但是 JavaScript 调试报错说明的原因不准确，害得我花了可能半个小时调试。看来以后必须得学学 TypeScript， JavaScript 太坑了。

  最终结果

  ```javascript
  ## [P1 1-1 & 1-2 Android开发概述和开发工具](https://www.bilibili.com/video/BV1Rt411e76H?p=1)
  ## [P2 1-3 第一个Android应用](https://www.bilibili.com/video/BV1Rt411e76H?p=2)
  ## [P3 2-1-1 线性布局LinearLayout](https://www.bilibili.com/video/BV1Rt411e76H?p=3)
  ## [P4 2-1-2 相对布局RelativeLayout](https://www.bilibili.com/video/BV1Rt411e76H?p=4)
  ## [P5 2-2 TextView](https://www.bilibili.com/video/BV1Rt411e76H?p=5)
  ## [P6 2-3 Button](https://www.bilibili.com/video/BV1Rt411e76H?p=6)
  ## [P7 2-4 EditText & 简单登录界面制作](https://www.bilibili.com/video/BV1Rt411e76H?p=7)
  ## [P8 2-5 RadioButton](https://www.bilibili.com/video/BV1Rt411e76H?p=8)
  ## [P9 2-6 复选框CheckBox](https://www.bilibili.com/video/BV1Rt411e76H?p=9)
  ## [P10 2-7 ImageView & 使用第三方库加载网络图片](https://www.bilibili.com/video/BV1Rt411e76H?p=10)
  ## [P11 2-8 列表视图ListView](https://www.bilibili.com/video/BV1Rt411e76H?p=11)
  ## [P12 2-9 网格视图GridView](https://www.bilibili.com/video/BV1Rt411e76H?p=12)
  ## [P13 2-10 ScrollView & HorizontalScrollView](https://www.bilibili.com/video/BV1Rt411e76H?p=13)
  ## [P14 2-11-1 RecyclerView（一）](https://www.bilibili.com/video/BV1Rt411e76H?p=14)
  ## [P15 2-11-2 RecyclerView（二）](https://www.bilibili.com/video/BV1Rt411e76H?p=15)
  ## [P16 2-11-3 RecyclerView（三）](https://www.bilibili.com/video/BV1Rt411e76H?p=16)
  ## [P17 2-11-4 RecyclerView（四）](https://www.bilibili.com/video/BV1Rt411e76H?p=17)
  ## [P18 2-12 WebView](https://www.bilibili.com/video/BV1Rt411e76H?p=18)
  ## [P19 3-1 Toast](https://www.bilibili.com/video/BV1Rt411e76H?p=19)
  ## [P20 3-2 AlertDialog](https://www.bilibili.com/video/BV1Rt411e76H?p=20)
  ## [P21 3-3 ProgressBar & ProgressDialog](https://www.bilibili.com/video/BV1Rt411e76H?p=21)
  ## [P22 3-4 自定义Dialog](https://www.bilibili.com/video/BV1Rt411e76H?p=22)
  ## [P23 3-5 PopupWindow](https://www.bilibili.com/video/BV1Rt411e76H?p=23)
  ## [P24 4-1-1 Activity创建三部曲](https://www.bilibili.com/video/BV1Rt411e76H?p=24)
  ## [P25 4-1-2 Activity的生命周期](https://www.bilibili.com/video/BV1Rt411e76H?p=25)
  ## [P26 4-1-3 Activity的跳转和数据传递](https://www.bilibili.com/video/BV1Rt411e76H?p=26)
  ## [P27 4-1-4 Activity的4种启动模式](https://www.bilibili.com/video/BV1Rt411e76H?p=27)
  ## [P28 4-2-1 Fragment详解（一）](https://www.bilibili.com/video/BV1Rt411e76H?p=28)
  ## [P29 4-2-2 Fragment详解（二）](https://www.bilibili.com/video/BV1Rt411e76H?p=29)
  ## [P30 4-2-3 Fragment详解（三）](https://www.bilibili.com/video/BV1Rt411e76H?p=30)
  ## [P31 4-2-4 Fragment详解（四）](https://www.bilibili.com/video/BV1Rt411e76H?p=31)
  ## [P32 5-1 基于监听的事件处理机制](https://www.bilibili.com/video/BV1Rt411e76H?p=32)
  ## [P33 5-2 基于回调的事件处理机制](https://www.bilibili.com/video/BV1Rt411e76H?p=33)
  ## [P34 5-3 源码剖析，了解View的事件分发](https://www.bilibili.com/video/BV1Rt411e76H?p=34)
  ## [P35 5-5 Handler消息处理](https://www.bilibili.com/video/BV1Rt411e76H?p=35)
  ## [P36 7-1 SharedPreferences 轻量数据存储](https://www.bilibili.com/video/BV1Rt411e76H?p=36)
  ## [P37 7-2-1 Android存储概念](https://www.bilibili.com/video/BV1Rt411e76H?p=37)
  ## [P38 7-2-2 File 内部存储](https://www.bilibili.com/video/BV1Rt411e76H?p=38)
  ## [P39 7-2-3 File 外部存储](https://www.bilibili.com/video/BV1Rt411e76H?p=39)
  ## [P40 8-1 BroadcastReceiver](https://www.bilibili.com/video/BV1Rt411e76H?p=40)
  ## [P41 属性动画](https://www.bilibili.com/video/BV1Rt411e76H?p=41)
  ## [P42 附1 如何分析错误日志](https://www.bilibili.com/video/BV1Rt411e76H?p=42)
  ## [P43 附2 按压水波纹效果](https://www.bilibili.com/video/BV1Rt411e76H?p=43)

  ```

## 最终代码

```javascript
// ==UserScript==
// @name         bilibili
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/video/*
// @require     https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  $("#app").dblclick(function () {
    $(".st0").click();
  });

  $(".tit").dblclick(function copy() {
    let title = $(this).text();
    let link = window.location.href;

    var copyText = "# [" + title + "](" + link + ")";
    var el = document.createElement("textarea");
    el.value = copyText;
    el.setAttribute("readonly", "");
    el.style = {
      position: "absolute",
      left: "-9999px",
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    //  阻止事件冒泡
    event.stopPropagation();
  });
  $(".head-con").dblclick(function () {
    var list_box = document.querySelectorAll(".list-box li");
    var copyText = "";
    // 当前网页地址，不包含 ?username=xxx 等参数
    // 例如 https://www.bilibili.com/video/xxx?p=6 获取到的是 /video/xxx
    var currentUrl = window.location.pathname;
    for (var i = 0; i < list_box.length; i++) {
      // console.log(list_box[i].textContent);
      // console.log("i = " + i);
      // copyText = copyText + document.querySelectorAll(".list-box li")[i].textContent;
      var title = list_box[i].innerText.split("\n");
      // 显示 P1 数理逻辑篇介绍，而不是 P1 数理逻辑篇介绍 07:26。即标题不显示视频时长。

      //复制为 Markdown 二级标题 加了 “## ”
      // 标题上加上视频地址 加了
      copyText =
        copyText +
        "## [" +
        title[0] +
        " " +
        title[1] +
        "](https://www.bilibili.com" +
        currentUrl +
        "?p=" +
        (i + 1) +
        ")\n";
    }
    //copyText = copyText + list_box[0].innerText + "\n";
    console.log(copyText);
    var el = document.createElement("textarea");
    el.value = copyText;
    el.setAttribute("readonly", "");
    el.style = {
      position: "absolute",
      left: "-9999px",
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    //  阻止事件冒泡
    event.stopPropagation();
  });
})();
```

## 界面优化以及增加更多选项

做个按钮出来，后面有空再说

# Markdown 网址引用脚本

经常需要用到参考代码，参考资料等，但是每次都要手动复制标题、网址，再写成 Markdown 格式的链接。

写个插件来简化一下。

名字叫做 `引用网址为md链接`

名字表达出它的功能。

## 实现

用 JavaScript 获取网站标题 和 网址，拼接为 Markdown 格式的链接。比较简单，分分钟搞定，最后设置下样式，css 参考来自 bilibili 首页悬浮固定的 联系客服。

```javascript
// ==UserScript==
// @name         引用网址和标题为 Markdown 链接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include *
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // 新增一个 button
  var but = document.createElement("button");
  // 设置元素 id
  but.id = "referSiteToMarkdownFormatLink";
  but.innerHTML = "引用网址为md链接";
  but.addEventListener("click", referSiteToMarkdownFormatLink);

  function referSiteToMarkdownFormatLink() {
    let link = window.location.href;
    let title = document.title;

    // 复制到剪切板
    var copyText = "[" + title + "](" + link + ")";
    var el = document.createElement("textarea");
    el.value = copyText;
    el.setAttribute("readonly", "");
    el.style = {
      position: "absolute",
      left: "-9999px",
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    //  阻止事件冒泡
    event.stopPropagation();
  }
  var parent = document.getElementsByTagName("body");
  parent[0].appendChild(but);
  var element = document.getElementById("referSiteToMarkdownFormatLink");
  // css 参考来自 bilibili 首页悬浮固定的 联系客服
  //element.style.cssText = 'position:fixed;z-index:9999;left:0;top:50%;margin-top:-36px;width:28px;height:200px;border-top-right-radius:2px;border-bottom-right-radius:2px;transition:all .3s;font-size:12px;color:#fff;box-shadow:0 6px 10px 0 rgba(251,114,153,.4);padding:8px 7px;line-height:14px}.try-feedback:hover{background-color:#ff85ad;color:#fff}.contact-help{position:fixed;z-index:101;left:0;top:calc(50% - 30px);margin-top:-36px;width:28px;height:72px;transition:all .3s;font-size:12px;color: red;background:#fff;border:1px solid #e7e7e7;box-shadow:0 6px 10px 0 #e7e7e7;border-radius:0 2px 2px 0;padding:8px 7px;line-height:14px';
  element.style.cssText =
    "position: fixed;z-index: 9999;left: 0px;top: 50%;margin-top: -36px;width: 28px;height: 200px;border-top-right-radius: 2px;border-bottom-right-radius: 2px;transition: all 0.3s ease 0s;font-size: 12px;box-shadow: rgba(251, 114, 153, 0.4) 0px 6px 10px 0px;padding: 8px 7px;";
})();
```

- Github

  [Bilibili-Evolved/features.md at master · the1812/Bilibili-Evolved](https://github.com/the1812/Bilibili-Evolved/blob/master/features.md#%E5%8A%9F%E8%83%BD%E5%88%97%E8%A1%A8)

- CSDN

  [(8 条消息) JavaScript 中 split（）方法详解\_积少成多-CSDN 博客](https://blog.csdn.net/wxl1555/article/details/63871739)

- stackoverflow

  [javascript - How to use split? - Stack Overflow](https://stackoverflow.com/questions/2555794/how-to-use-split)

- 博客园

  [js 中 split 正则表示式 (/[,+]/) - Jaye118 - 博客园](https://www.cnblogs.com/zhangym118/p/10177973.html)

- 菜鸟教程

  [CSS Position(定位) | 菜鸟教程](https://www.runoob.com/css/css-positioning.html)

- w3cschool

  [JavaScript split() 方法](https://www.w3school.com.cn/jsref/jsref_split.asp)

- w3c 英文

  [JavaScript String split() Method](https://www.w3schools.com/jsref/jsref_split.asp)

- bilibli

  [【马克思硬核解析】996、内卷、打工人：马克思为什么是对的（上）\_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV18z4y1C7rX)

- vue

  [介绍 — Vue.js](https://cn.vuejs.org/v2/guide/index.html)

  [计算属性和侦听器 — Vue.js](https://cn.vuejs.org/v2/guide/computed.html)

- Youtube 上不可点击

  stackoverflow 也出现过这问题。

  ~~可能由于 html 由上到下加载的原因，加载按钮之前有脚本没加载成功，考虑将 这个按钮加为 body 第一个元素而不是最后一个（之前的代码是将按钮加到 body 标签最后一个元素）~~。

  虽然不是这个原因导致的，但设置为第一个元素也可以，那样 按钮加载速度会快些。暂时没改，以后有需要再说。

  后来发现是图层问题，将 css 中的 z-index 数值设置大点，设置为了 9999。

  [(17) Alan Walker - Norwegian Grammy Awards Takeover (with Noah Cyrus, Juliander & Julie Bergan) - YouTube](https://www.youtube.com/watch?v=kyD2uvgoyKM)

## 最终代码

```javascript
// ==UserScript==
// @name         引用网址和标题为 Markdown 链接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include *
// @require     https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // 新增一个 button
  var but = document.createElement("button");
  // 设置元素 id
  but.id = "referSiteToMarkdownFormatLink";
  but.innerHTML = "md";
  but.addEventListener("click", referSiteToMarkdownFormatLink);
  //but.addEventListener("mouseover",displayToBlock)
  //but.addEventListener("mouseout",displayToNone)
  // $("#referSiteToMarkdownFormatLink").
  var parent = document.getElementsByTagName("body");
  parent[0].appendChild(but);
  var element = document.getElementById("referSiteToMarkdownFormatLink");
  // css 参考来自 bilibili 首页悬浮固定的 联系客服
  //element.style.cssText = 'position:fixed;z-index:9999;left:0;top:50%;margin-top:-36px;width:28px;height:200px;border-top-right-radius:2px;border-bottom-right-radius:2px;transition:all .3s;font-size:12px;color:#fff;box-shadow:0 6px 10px 0 rgba(251,114,153,.4);padding:8px 7px;line-height:14px}.try-feedback:hover{background-color:#ff85ad;color:#fff}.contact-help{position:fixed;z-index:101;left:0;top:calc(50% - 30px);margin-top:-36px;width:28px;height:72px;transition:all .3s;font-size:12px;color: red;background:#fff;border:1px solid #e7e7e7;box-shadow:0 6px 10px 0 #e7e7e7;border-radius:0 2px 2px 0;padding:8px 7px;line-height:14px';
  //element.style.cssText = 'position: fixed;z-index: 9999;left: 0px;top: 50%;margin-top: -36px;width: 28px;height: 200px;border-top-right-radius: 2px;border-bottom-right-radius: 2px;transition: all 0.3s ease 0s;font-size: 12px;box-shadow: rgba(251, 114, 153, 0.4) 0px 6px 10px 0px;padding: 8px 7px;';
  //var cssText = 'position: fixed;z-index: 9999; left: 0px;  bottom: 0%; /* margin top: -36px; */width: 27px;height: auto;border-top-right-radius: 2px;border-bottom-right-radius: 2px;transition: all 0.3s ease 0s;font-size: 1px;box-shadow: rgba(251, 114, 153, 0.4) 0px 6px 10px 0px;'
  //var cssText = 'position: fixed;z-index: 9999;left: 0px;bottom: 50%;width: 27px;height: 17px;border-top-right-radius: 2px;-bottom-right-radius: 2px;transition: all 0.3s ease 0s;font-size: 1px;box-shadow: rgba(251, 114, 153, 0.4) 0px 6px 10px 0px;'
  var cssText =
    "position: fixed;z-index: 9999;left: 0px;bottom: 1%;/* width: 27px; *//* height: 17px; */ /* border-top-right-radius: 2px; */ transition: all 0.3s ease 0s;font-size: 1px;box-shadow: rgba(251, 114, 153, 0.4) 0px 6px 10px 0px;color: blue";
  element.style.cssText = cssText;
  // console.log("是否全屏：" + isFullScreen())

  function displayToBlock() {
    var element = document.getElementById("referSiteToMarkdownFormatLink");
    console.log("on mouse over");
    element.style.display = "block";
  }

  function displayToNone() {
    var element = document.getElementById("referSiteToMarkdownFormatLink");
    console.log("on mouse out");
    // element.style.display = 'none'
  }

  function referSiteToMarkdownFormatLink() {
    let link = window.location.href;
    let title = document.title;

    // 复制到剪切板
    var copyText = "[" + title + "](" + link + ")";
    var el = document.createElement("textarea");
    el.value = copyText;
    el.setAttribute("readonly", "");
    el.style = {
      position: "absolute",
      left: "-9999px",
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    //  阻止事件冒泡
    event.stopPropagation();
  }

  //判断浏览器是否全屏
  function isFullScreen() {
    return (
      document.body.scrollHeight == window.screen.height &&
      document.body.scrollWidth == window.screen.width
    );
  }
})();
```

```
position: fixed;z-index: 9999;/* left: 0px; */ top: 84%; /* margin top: -36px; */width: 27px;height: auto;border-top-right-radius: 2px;border-bottom-right-radius: 2px;transition: all 0.3s ease 0s;font-size: 1px;box-shadow: rgba(251, 114, 153, 0.4) 0px 6px 10px 0px;
```

[(8 条消息) JS 实现开启全屏和退出全屏\_王海达博客-CSDN 博客](https://blog.csdn.net/hbhaida/article/details/107401518?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)

```javascript
// 是否全屏
const isFullScreen =
  document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen;
```

[EventTarget.addEventListener() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

[HTML DOM Event 对象](https://www.w3school.com.cn/jsref/dom_obj_event.asp)