// 创建三个常量用于表示状态， 便于后期维护
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function Mypromise(fn) {
    // 代码可能异步执行，用于获取正确的this
    const that = this
    // promise起始状态
    that.state = PENDING
    // value用于保存resolve/reject中传入的值
    that.value = null
    // 数组用于保存then中的回调，因为执行完promise时，状态可能还是pending，这时应该把then中的回调保存起来用于状态改变时使用
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []
}

function resolve(value) {
    // 判断当前状态是否是等待中
    if (that.state === PENDING) {
        // 更改当前状态为对应状态，并将赋值传给value
        that.state = RESOLVED
        that.value = value
        // 遍历回调数组并执行
        that.resolvedCallbacks.map(cb => cb(that.value))
    }
}

function reject(value) {
    if (that.state === PENDING) {
        that.state = REJECTED
        that.value = value
        that.resolvedCallbacks.map(cb => cb(that.value))
    }
}

// 执行promise中传入函数
try {
    // 把之前两个函数作为参数传入
    fn(resolve, reject)
} catch (e) {
    // 遇到错误，捕获并执行reject函数
    reject(e)
}

// then函数
Mypromise.prototype.then = function (onFulfilled, onRejected) {
    const that = this
    // 因为参数是可选参数，在这里判断参数类型是否是函数，如果不是，需要创建一个函数值赋给相应参数，同时实现透传
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }
    // 如果是等待状态就向回调数组中push参数
    if (that.state === PENDING) {
        that.resolvedCallbacks.push(onFulfilled)
        that.rejectedCallbacks.push(onRejected)
    }
    // 如果不是等待状态就去执行相应状态函数
    if (that.state === RESOLVED) {
        onFulfilled(that, value)
    }
    if (that.state === REJECTED) {
        onRejected(that, value)
    }
}