/**
 * 功能:
 * - 负责把 data 中的属性转换成响应式数据
 * - data 中的某个属性也是对象 同样转换成响应式  需要递归
 * - 数据变化发送通知
 */

class Observe {
    constructor (data) {
        this.walk(data)
    }
    walk (data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach(item => {
            this.defineReactive(data, item, data[item])
        })
    }

    defineReactive (obj, key, val) {

        // 如果 val 是对象 就把 val 转换成对象  就是处理 preson: {name: '张三'}
        this.walk(val)

        const that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newVal) {
                if (newVal === obj[key]) return 
                val = newVal
                 // 如果 新赋的值也是一个对象 再次调用 walk 设置为响应式
                that.walk(newVal)

                // 发送通知
                dep.notify()
            }
        })

    }
}