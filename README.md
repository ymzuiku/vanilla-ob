# vanilla-ob

> Size < 1kb

## Install

```sh
$ npm install --save vanilla-ob
```

## Use

```js
import Ob from "vanilla-ob";

const ob = Ob({
  name: "dog",
  vip: true,
  age: 20,
});

const ele = document.createElement("div");

// 监听 name 和 vip, 仅当它改变时，派发任务
// 若 ele 不存在 document.body 中，自动移除监听
// 初始化时，必定会执行一次监听
ob.on(ele, (s)=>[s.name, s.vip], [name, vip]=>{
  ele.textContent = name;
  ele.hidden = !vip;
});

// 也可以手动删除监听
ob.delete(ele);

document.body.append(ele);
```
