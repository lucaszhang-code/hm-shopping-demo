module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            //对应的vw标准屏的宽度
            //设计图750，调成1倍=>适配375的屏幕
            //设计图640，调成1倍=>适配320的屏幕
            viewportWidth: 375,
        },
    },
}