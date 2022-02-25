/**
 * 功能:
 * - 负责模板编译, 解析指令/差值表达式
 * - 负责页面的首次渲染
 * - 当数据变化时重新渲染视图
 * - 一句话总结: 就是在操作 DOM
 */

class Compiler {
    constructor (vm) {
        this.el = vm.$el
        this.vm = vm
        this.compiler(vm.$el)

    }

    // 判断属性名是不是指令
    isDirective (attrName) {
        return attrName.startsWith('v-')
    }
    // 判断是不是 字符串
    isTextNode (node) {
        return node.nodeType === 3
    }
    // 判断是不是 元素
    isElementNode (node) {
        return node.nodeType === 1
    }

    // 主函数 遍历 el 按规则解析
    compiler (el) {
        let childNodes = el.childNodes
        // childNodes 是伪数组 想 遍历 使用 Array.from 
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                this.compileElement(node)
            } else if (this.isTextNode(node)) {
                this.compileText(node)
            }

            // 递归
            if (node.childNodes && node.childNodes.length) {
                this.compiler(node)
            }

        })
    }
    compileText (node) {
        const content = node.textContent
        // 匹配{{xxx}}的内容
        let reg = /\{\{(.+?)\}\}/
        if (reg.test(content)) {
            console.log(content)
            node.textContent = content.replace(reg, this.vm[RegExp.$1.trim()])

            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, RegExp.$1.trim(), (newValue) => {
                node.textContent = newValue
            })
        }

    }

    compileElement () {
        // console.log('ele')
    }


}