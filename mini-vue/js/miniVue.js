class MiniVue {
    constructor (options) {
        // 1. 记录传入的参数
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

        // 2. 把data中的成员转换成getter和setter，注入到vue实例中
        this._proxyData(options.data)

        // 3. 调用observer对象，监听数据的变化
        new Observe(options.data)

        // 4. 调用compiler对象，解析指令和差值表达式
        new Compiler(this)

    }

    _proxyData (data) {
        Object.keys(data).forEach(item => {
            Object.defineProperty(this, item, {
                enumerable: true,
                configurable:  true,
                get () {
                    return data[item]
                }, 
                set (newVal) {
                    if (newVal === data[item]) return
                    data[item] = newVal
                }
            
            })
        })
    }

}