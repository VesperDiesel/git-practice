// call // 思路：将要改变this指向的方法挂到目标this上执行并返回 
// context--上下文、环境 可选参数，不传默认为window
Function.prototype.mycall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error not function')
    }
    context = context || window
    // 给context创建一个fn属性，并将值设置为需要调用的函数
    context.fn = this
    // call 可以传入多个参数作为调用函数的参数，所以需要将参数剥离出来，从索引为1的位置截取，返回新数组
    // arguments是伪数组。[...arguments]就可以用数组的方法 等同于Array.prototype.slice.call(arguments，1)
    const args = [...arguments].slice(1)
    // 调用函数
    const result = context.fn(...args)
    // 将对象上的函数删除
    delete context.fn
    return result
}



// apply // 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error not function')
    }
    context = context || window
    // 给context创建一个fn属性，并将值设置为需要调用的函数
    context.fn = this
    // 调用函数
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    // 将对象上的函数删除
    delete context.fn
    return result
}    



// bind // 思路：类似call，但返回的是函数
Function.prototype.mybind = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('Error not function')
    }
    let _this = this
    // 将参数剥离出来，从索引为1的位置截取，返回新数组
    let arg = [...arguments].slice(1)
    // 返回一个函数， new一个F
    return function F() {
      // 处理函数使用new的情况,函数有两种调用方式，直接调用 和 new
      if (this instanceof F) {
          // new的函数不会被任何方式改变this，需要忽略传入的this
        return new _this(...arg, ...arguments)
      } else {
          // bind可以实现F.bind(obj,1)(2) 所以需要将两边的参数拼接起来
        return _this.apply(context, arg.concat(...arguments))
      }
    }
  }
