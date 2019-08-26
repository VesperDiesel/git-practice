// 解决循环中定时器的问题
for (var i = 0; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
// 6 6 6 6 6 6

// 1.闭包（自调用函数），将i传入函数内部，此时值被固定在参数j上不变，下次执行timer，可以使用j这个变量
for (var i = 0; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j)
        }, j * 1000)
    })(i)
}
// 0 1 2 3 4 5 

// 2.传入定时器第三个参数,第三个参数i会被当成timer的参数传入
for (var i = 0; i <= 5; i++) {
    setTimeout(function timer(j) {
        console.log(j)
    }, i * 1000, i)
}
// 0 1 2 3 4 5

// 3.用let定义i，let有块级作用域
for (let i = 0; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
// 0 1 2 3 4 5



// 手写闭包
var Circle = function () {
    this.PI = 3.1415926
    this.S = function (r) {
        return r * r * this.PI
    }
}
var circle = new Circle()
console.log(circle.S(10))