// class继承
class Parent {
    constructor (value) {
        this.val = value
    }
    getValue () {
        console.log(this.val)
    }
}
// 使用extend表明继承自哪个父类
class Child extends Parent {
    constructor (value) {
        // 子类构造函数中必须调用super
        super(value)
        // Parent.call(this, value)
        this.val = value
    }
}
let child = new Child(1)
child.getValue()  // 1
child instanceof Parent // true







// 原型组合继承
function Parent (value) {
    this.val = value
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}
// 子类构造函数通过parent.call(this)继承父类属性，然后改变子类原型为new Parent()来继承父类的函数
function Child (value) {
    Parent.call(this, value)
}
Child.prototype = new Parent()
const child = new Child(1)
child.getValue()   // 1
child instanceof Parent // true








// 寄生组合继承
function Parent (value) {
    this.val = value
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}
function Child (value) {
    Parent.call(this, value)
}
// 将父类的原型赋值给子类，并将构造函数设置为子类
Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      enumerable: false, // 可枚举
      writable: true, 
      configurable: true // 可配置的
    }
  })
const child = new Child(1)
child.getValue()            // 1
child instanceof Parent // true
