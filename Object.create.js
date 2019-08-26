// 思路：将传入的对象作为原型
function create (object) {
    function F () {}
    F.prototype = object
    return new F()
}