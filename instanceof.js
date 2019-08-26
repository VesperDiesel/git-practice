function myInstanceof (left, right) {
    // 获取类型的原型
    let prototype = right.prototype,
    // 获取对象的原型
    left = left.__proto__
    // 循环判断对象原型是否等于类型原型，直到对象原型为null
    while (true) {
        if (left === null || left === undefined) {
            return false
        }
        if (prototype === left) {
            return true
        }
        left = left.__proto__
    }
}