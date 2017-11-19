const  { Parser } = require('htmlparser2')
const {
    createVNode
} = require('./util')

// 使用htmlparser解析html,生成对应的html节点对象
module.exports = function htmlParser (htmlString) {
    let self = this
    let elements = []
    let nodeTree = []
    // 解析html
    let parser = new Parser({
        onopentag(name, attrs){
            let vnode = createVNode(name, attrs)
            let parent = nodeTree.length ? nodeTree[nodeTree.length - 1] : null

            if(parent){
                vnode.parent = parent
                if(!parent.hasOwnProperty('children')){
                    parent.children = []
                }
                parent.children.push(vnode)
            }

            nodeTree.push(vnode)
            elements.push(vnode)
        },
        onclosetag(name){
            nodeTree.pop()
        },
        ontext(text){
            let vnode = nodeTree[nodeTree.length - 1]
            if(vnode){
                vnode.text = text.trim()
            }
        }
    })

    parser.parseChunk(htmlString)
    parser.done()

    return elements
}