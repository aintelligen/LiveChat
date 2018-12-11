let arr = [1, 2, 3, 4]
// 遍历
[1, 2, 3].forEach(function (value, index) {
  console.log(value)
})
// 映射
let arr2 = arr.map(v => v * 2)
// 所有元素是否通过测试
arr.every(v => v > 3)
// 是否存在某个元素通过测试
arr.some(v => v > 3)
// 过滤数组
arr.filter(v => v % 2 === 0)
// 索引
arr.indexOf(2)
//数组合并
let arr3 = [...arr, ...arr2];
// 数组去重
let arr4 = [...new Set(arr)];


// Object 操作
let obj = {
  'name': 'addd',
  'age': 37
}
// 对象key
Object.keys(obj)
// 对象值
Object.values(obj)
// key, 值  转成数组
Object.entries(obj)
