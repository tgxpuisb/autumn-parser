## HTML
- 标签中属性=值的形式可以不需要引号
- 一个标签只允许有一个class类名，多了iOS会崩溃
- 会移除所有的style属性
- 对于只有属性没有值的情况，需要强行设置属性=true
- ul、li、p、div标签不变
- 其他块级元素标签转化成div标签
- 除span之外的内联标签转化成span
- 块级元素中如果包含text节点则需要使用span进行包裹
- img标签转化成<image></image>双标签并且在相应的class中一定要有content-mode属性，属性默认值设为scale-fill表示拉伸至宽高

## CSS
- 所有元素都是的盒模型都是`border-box`
- 所有的`value`必须是String类型
- 建议每一个块级元素都有宽高属性

- 不建议使用CSS复合属性
- `width`、`height`，`padding`，`margin`这四个属性需要转化成`-autumn-width`、`-autumn-height`，`-autumn-padding`，`-autumn-margin`支持动态计算
- 采用适配方案所有元素尺寸必须乘以一个比例（100vw/设计稿宽度）
- `padding`、`margin`这两个属性支持动态计算，安卓只支持一个值，iOS支持1到4个值。所以需要将其拆散成`padding-top`，`padding-bottom`，`padding-left`，`padding-right`
- 复合属性`border`需要拆分成`border-color`和`border-width`，`border-style`不需要因为只能是`solid`
- 复合属性`background`需要拆分成`background-color`和`background-image`，其他属性无效`background-size`默认是`100% 100%`
- `background-image`的值没有`url()`，而是直接写链接
- 复合属性`flex`由于两端支持问题需求同时列出复合属性flex和各个子属性

- `"clips-to-bounds":"1"`相当于前端的`overflow:hidden`，指的是子元素溢出隐藏，但是只在ios上面有使用，对于出现`overflow:hidden`和`border-radius`的元素自动补上该属性
