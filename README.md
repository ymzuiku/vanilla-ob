# vanilla-ob

> Size < 1kb

## Install

```sh
$ npm install --save vanilla-ob
```

## Use

```js
import { Ob } from "vanilla-ob";

const ob = Ob({
  name: "dog",
  list: ["name-a", "name-b"],
  age: 20,
});

const ele = document.createElement("div");

// 监听 name 和 list, 仅当它任何一个有改变时，才会派发任务
// 初始化时，必定会执行一次监听
// 当 ele remove 之后，会自动取消监听
ob.use(ele, (s)=>[s.name, s.list], [name, list]=>{
  ele.textContent = name + list.join('-');
});

// 也可以手动删除监听
ob.delete(ele);

ob.next(s=>{
  // 由于 ob 内部的state使用的是不可变对象，即便直接修改数组内容，也会认为对象已被修改
  s.list[0] = "dog";
});

document.body.append(ele);
```
