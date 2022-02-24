/**
 * 功能:
 * - 负责模板编译, 解析指令/差值表达式
 * - 负责页面的首次渲染
 * - 当数据变化时重新渲染视图
 * - 一句话总结: 就是在操作 DOM
 */

class Compoler {
    constructor (vm) {
        this.el = vm.$el
        this.vm = vm

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
        Array.from(chileNodes).forEach(node => {
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

}