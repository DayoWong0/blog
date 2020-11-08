```javascript
document.querySelectorAll(".units")[0]
document.querySelectorAll(".units")[7].innerText
```

```javascript
// ==UserScript==
// @name         超星学习通标题导出为 Markdown 链接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mooc1-1.chaoxing.com/mycourse/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var allTitle ="";
    var classTimeline = document.querySelectorAll(".units");
    for(var i = 0; i < classTimeline.length; i++){
        var eachChapter = classTimeline[i].innerText.split("\n");
        console.log(eachChapter);
        //copyText = copyText + "## [" + title[0] + " " + title[1] + "](https://www.bilibili.com" + currentUrl +"?p=" + (i+1) + ")\n";
        eachChapter = "# " + eachChapter[0] + "\n";
        allTitle = allTitle + eachChapter;
        console.log(eachChapter);
    }
    copyToClipboard(allTitle)


    function copyToClipboard(copyText){
        // 复制到剪切板
        var el = document.createElement('textarea');
        el.value = copyText;
        el.setAttribute('readonly', '');
        el.style = {
            position: 'absolute',
            left: '-9999px'
        };
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        //  阻止事件冒泡
        event.stopPropagation();
    }
})();
```



