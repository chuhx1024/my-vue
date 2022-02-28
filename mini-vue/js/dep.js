/**
 * 功能:
 * - 创建的一个观察者 
 * - 在observe 处理响应式阶段 收集 watcher 
 * 理解: 
 * - data 中对象的每个属性 都要有一个 dep 对象 get 时 收集依赖  set时 发送通知
 */
class Dep {
    constructor () {
      // 存储所有的观察者
      this.subs = []
    }
    // 添加观察者
    addSub (sub) {
      if (sub && sub.update) {
        this.subs.push(sub)
      }
    }
    // 发送通知
    notify () {
      this.subs.forEach(sub => {
        sub.update()
      })
    }
  }