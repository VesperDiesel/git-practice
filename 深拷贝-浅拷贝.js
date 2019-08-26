// 实现浅拷贝
// 1. ...实现
let copy1 = {
  ...{
    x: 1
  }
}

// 2. Object.assign实现

let copy2 = Object.assign({}, {
  x: 1
})




// 实现深拷贝
// 1. JOSN.stringify()/JSON.parse()  undefined/symbol/函数/循环引用的对象无效
let obj = {
  a: 1,
  b: {
    x: 3
  }
}
JSON.parse(JSON.stringify(obj))

// 2. 递归拷贝 递归复制了所有层级
function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {}
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return copy
}




// 完整版深拷贝
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false; //不是对象直接return false，没必要判断
  const typeString = Object.prototype.toString.call(obj); //是因为toString为Object的原型方法，而Array 、Function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（Function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串.....），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object上原型toString方法。
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};

const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};

const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];
  const _clone = parent => {
    if (parent === null) return null; //parent为null的话直接返回null
    if (typeof parent !== 'object') return parent; //如果需要克隆的元素不是复杂数据类型,直接返回自身
    let child, proto;
    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto); // 利用Object.create切断原型链
    }


    // 处理循环引用
    const index = parents.indexOf(parent);
    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);
    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }
    return child;
  };
  return _clone(parent);
};








// 验证
function person(pname) {
  this.name = pname;
} //构造函数
const Messi = new person('Messi'); //实例

function say() {
  console.log('hi');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'i'),
  d: Messi,
};

oldObj.b = oldObj;

const newObj = clone(oldObj);
console.log(newObj.a, oldObj.a); // [Function: say] [Function: say]
console.log(newObj.b, oldObj.b); // { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] } { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] }
console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person] [Function: person]









// const isType = (obj, type) => {
//   if (typeof obj !== 'object') return false
//   const typeString = Object.prototype.toString.call(obj)
//   let flag
//   switch (type) {
//       case 'Array':
//           flag = typeString === '[object Array]'
//           break
//       case 'Date':
//           flag = typeString === '[object Date]'
//           break
//       case 'ARegExp':
//           flag = typeString === '[object RegExp]'
//           break
//       default:
//           flag = false
//   }
//   return flag
// }


// const getRegExp = re => {
//   var flags = ''
//   if (re.global) flags += 'g'
//   if (re.ignoreCase) flags += 'i'
//   if (re.multiline) flags += 'm'
//   return flags
// }


// const clone = parent => {
//   const parents = []
//   const children = []
//   const _clone = parent => {
//       if (parent === null) return null
//       if (typeof parent !== 'object') return parent
//       let child, proto
//       if (isType(parent, 'Array')) {
//           child = []
//       } else if (isType(parent, 'Date')) {
//           child = new Date(parent.getTime())
//       } else if (isType(parent, 'RegExp')) {
//           child = new RegExp(parent.source, getRegExp(parent))
//           if (parent.lastIndex) child.lastIndex = parent.lastIndex
//       } else {
//           proto = Object.getPrototypeOf(parent)
//           child = Object.create(proto)
//       }

//       const index = parents.indexOf(parent)
//       if (index != -1) {
//           return children[index]
//       }
//       parents.push(parent)
//       children.push(child)
//       for (let i in parent) {
//           child[i] = _clone(parent[i])
//       }
//       return child
//   }
//   return _clone(parent)
// }