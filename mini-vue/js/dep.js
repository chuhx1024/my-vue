/**
 * 功能:
 * - 创建的一个观察者 
 * - 在observe 处理响应式阶段 收集 watcher 
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