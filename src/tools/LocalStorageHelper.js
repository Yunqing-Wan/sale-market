//定义一个 localStorage 工具
const KEY = 'goodsid'

//导出 取数据的方法
export function getItem(){
    //取出来的是 json字符串'[{},{}]', 也可能没有数据,给一个空'[]'
    //转为json对象
    return JSON.parse(localStorage.getItem(KEY) || '[]')
}

//导出 存数据的方法
export function setItem(data){
    //1.0 先取, '[{},{}]' JSON.parse()之后是个数组
    var arr = JSON.parse(localStorage.getItem(KEY) || '[]');

    //2.0 存数据到数组中, 存入的是{}对象形式
    arr.push(data);

    //3.0 保存到localStorage, 要存 json字符串形式
    localStorage.setItem(KEY,JSON.stringify(arr));
}