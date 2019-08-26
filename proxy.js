// proxy用法
// let p = new Proxy (target, handler)
// target 代表需要添加代理的对象，handler 用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。

let onWatch = (obj, setBind, getLogger) => {
    // 通过自定义set 和 get方法，在原本逻辑中插入函数逻辑，实现了在对 对象 任何属性读写时 发出通知 
    let handler = {
        get(target, property, receiver) {
            getLogger(target, property)
            return Reflect.get(target, property, receiver)
        },
        set(target, property, value, receiver) {
           setBind(value, property)
            return Reflect.set(target, property, value)
        }
    }
    return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch (obj, (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
},
(target, property) => {
    console.log(`${property}=${target[property]}`)
}
)
p.a = 2
p.a









// defineProperty
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
// 数据劫持
Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get() {
    console.log('获取数据了')
    return obj['text']
  },
  set(newVal) {
    console.log('数据更新了')
    input.value = newVal
    span.innerHTML = newVal
  }
})
// 输入监听
input.addEventListener('keyup', function(e) {
  obj.text = e.target.value
})
