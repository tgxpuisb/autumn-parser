# autumn-parser

## 简介
> 这是一个将前端html，css代码转化成autumn代码的工具，他适用于autumn2.0版本

> autumn是一个借鉴了html和css语言的一个客户端动态化解决方案。前端最常接触到的场景是调用hybrid功能使用autumn代码生成分享图片。

> autumn代码仅仅是类似html和css，如果想要真正使用需要一些学习成本。该工具的出现目的是能够让前端使用一个html和css代码的子集来实现autumn的功能，而不需要去了解autumn的特有语法，以及客户端版本的差异性（事实上2.0版本之后的差异性已经很小了）。

## 使用
使用方法有两种，全局安装autumn-parser

```
npm install -g @base/autumn-parser

autumn -i xxx.vue
```

上面的.vue文件其实是为了语法高亮，并不是真正的vue文件

```js
const convert = requrie('@base/autumn-parser')
convert({
    html: '<div class=".box"></div>',
    css: '.box {width: 10px;}',
    js: '',
    data: {}
}).then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})
```

## todo
转换器目前还有很多的不足，以及一些兼容性问题需要和客户端配合解决。另外也需要非常多的应用场景的代码来进行测试，欢迎试用，欢迎提交BUG

## 其他
转化规则可以参考wiki里面的convert-rule.md

## 更新记录
2017.11.7 01:50 第一版功能实现，文档完成。太晚了先写这么多了。

2017.11.12 版本更新0.0.2

> font-size的值不再使用适配规
>
> color和background-color属性支持rgba和rgb，将会被转化成客户端的16进制值（客户端的alpha在颜色之前）

2017.11.13 版本更新0.0.3

> bug fix 修复编译时候节点异常增加问题

2017.11.16 版本更新0.0.4

> bug fix 修复-autumn-width之类的标签在编译时被再次加入前缀的问题