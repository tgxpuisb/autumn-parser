/**
 * 特殊属性调整与转化
 * `"clips-to-bounds":"1"`相当于前端的`overflow:hidden`，指的是子元素溢出隐藏，但是只在ios上面有使用，对于出现`overflow:hidden`和`border-radius`的元素自动补上该属性
 */


const postcss = require('postcss')
module.exports = postcss.plugin('overflow', options => {
    return function (root) {
        root.walkDecls(decl => {
            if (decl.prop === 'overflow' && decl.value === 'hidden') {
                decl.cloneAfter({
                    prop: 'clips-to-bounds',
                    value: '1'
                })
                // decl.remove() // 暂时无法确定是否需要移除overflow: hidden
            }
        })
    }
})