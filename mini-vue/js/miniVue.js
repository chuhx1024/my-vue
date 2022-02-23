class MiniVue {
    constructor (options) {
        // 记录传入的参数
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        this._proxyData(options.data)
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