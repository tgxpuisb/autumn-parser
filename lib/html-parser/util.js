// 生成虚拟的节点
const createVNode = (name, attrs) => {
    let nodeObj = Object.create({
        parent: null,
        children: [],
        text: null,
    })
    nodeObj.name = name
    nodeObj.id = attrs.id
    // 对应html中的class只能有一个
    if(attrs.class){
        if(attrs.class.split(' ').length > 1){
            throw new Error('你的class超过一个了，iOS会崩溃的～')
        }else {
            nodeObj.class = attrs.class ? attrs.class.split(' ') : []
        }
    }
    nodeObj.attrs = attrs
    return nodeObj
}
// 替换块级和内联标签
// 将其他的block元素转化成autumn支持的元素
const mapLabel = (node) => {
    const blockLabel = ['section', 'article', 'nav', 'header', 'aside', 'footer','h1', 'h2', 'h3']
    const inlineLabel = ['i', 'strong']
    // 块级元素和内联元素替换
    if(blockLabel.indexOf(node.name) > -1){
        node.name = 'div'
    } else if(inlineLabel.indexOf(node.name) > -1) {
        node.name = 'span'
    }
    // 处理内联样式，检查是否是对应标签的样式
    //dealInlineStyle(node)
    // 删除内联样式
    deleteInlineStyle(node)
    return node
}
const deleteInlineStyle = (node) => {
    let attrs = node.attrs
    if(attrs.style){
        delete attrs.style
    }
}
// 处理内联样式
const dealInlineStyle = (node) => {
    let attrs = node.attrs
    if(attrs.style){
        let styleArrs = attrs.style.split(';').slice(0, -1)
        let styleObj = {}
        styleArrs.forEach((item) => {
            // 获取属性名称
            let itemStyle = item.trim().split(':')
            styleObj[itemStyle[0]] = itemStyle[1]
        })
        // 获取内联样式的样式名称
        Object.keys(styleObj).forEach((item) => {
            if(defaultStyleObj[node.name].indexOf(item) < 0){
                throw new Error(`${item}属性不支持哦！`)
            }
        })
    }
}
// 将对应的虚拟节点生成html
const createElement = ({name, attrs, text, children}) => {
    const singleNode = ['br', 'hr', 'input', 'link', 'meta', 'area', 'base', 'col', 'command', 'embed', 'keygen', 'param', 'source', 'track', 'wbr']
    if(name === 'img'){
        name = 'image'
    }
    let html = `<${name}`
    let keys = Object.keys(attrs)
    // deal the attributes
    if (keys && keys.length > 0){
        keys.forEach((key) => {
            let value = attrs[key]
            if (value === '' || value === true){
                html += ` ${key}='${true}'`
            } else {
                html += ` ${key}='${value}'`
            }
        })
    }
    // if the node is single element
    if(singleNode.indexOf(name) > -1){
        html += ' />'
        return html
    }

    html += '>'
    
    // deal the text
    if(text){
        html += text + `</${name}>`
        return html
    }

    // deal the children elements
    if(children && children.length > 0){
        html += renderToHtml(children)
    }

    html += `</${name}>`

    return html
}

// 生成处理后的html字符串
const renderToHtml = (json) => {
    let html = ''

    if (Array.isArray(json)){
        json.forEach((node) => {
            node = mapLabel(node)
            html += renderToHtml(node)
        })

        return html
    }

    html += createElement(json)
    return html
}

module.exports = {
    createVNode,
    mapLabel,
    deleteInlineStyle,
    dealInlineStyle,
    createElement,
    renderToHtml
}