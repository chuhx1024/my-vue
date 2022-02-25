/**
 * 功能:主要负责更新 数据
 *  1. 在模板编译的阶段 挂载
 *  2. 当 触发 set 是 执行里边的 update 回调方法
 */
class Watcher {
    constructor (vm, key, cb) {
      this.vm = vm
      // data中的属性名称
      this.key = key
      // 回调函数负责更新视图
      this.cb = cb
  
      // 把watcher对象记录到Dep类的静态属性target
      Dep.target = this
      // 触发get方法，在get方法中会调用addSub
      this.oldValue = vm[key]
      Dep.target = null
    }
    // 当数据发生变化的时候更新视图
    update () {
      let newValue = this.vm[this.key]
      if (this.oldValue === newValue) {
        return
      }
      this.cb(newValue)
    }
}