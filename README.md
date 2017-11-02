## HTML
- 标签中属性=值的形式可以不需要引号
- 一个标签只允许有一个class类名，多了iOS会崩溃
- 对于只有属性没有值的情况，需要强行设置属性=true
- ul、li、p、div标签不变
- 其他块级元素标签转化成div标签
- 除span之外的内联标签转化成span
- img标签转化成<image></image>双标签并且在相应的class中一定要有content-mode属性，属性默认值设为scale-fill表示拉伸至宽高

## CSS
- 建议每一个块级元素都有宽高属性
- 采用适配方案所有元素尺寸必须乘以一个比例（100vw/设计稿宽度）
- `width`、`height`这两个属性需要转化成`-autumn-width`、`-autumn-height`支持动态计算
- `padding`、`margin`这两个属性支持动态计算，安卓只支持一个值，iOS支持1到4个值。所以需要将其拆散成`padding-top`，`padding-bottom`，`padding-left`，`padding-right`
- 不建议使用CSS复合属性
- 复合属性`border`需要拆分成`border-color`和`border-width`，`border-style`不需要因为只能是`solid`
- 复合属性`background`需要拆分成`background-color`和`background-image`，其他属性无效`background-size`默认是`100% 100%`
- `background-image`的值没有`url()`，而是直接写链接