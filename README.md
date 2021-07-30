# vanilla-ob

为 Element 绑定动态属性，并且在有需要的时候进行更新，此库作为核心库使用在 [aoife](https://github.com/ymzuiku/aoife) 项目中

> Gzip size < 1kb

## Install

```sh
$ npm install --save vanilla-ob
```

## Use

```js
import { bindState, nextState } from "vanilla-ob";

const state = {
  name: "dog",
  css: 'page-style'
  age: 20,
};

const ele = document.createElement("div");

// 首先，绑定一些属性为动态属性

// 绑定动态属性，例子1 普通绑定
// 动态属性是一个函数，返回值会进行赋值
bindState(ele, "textContent", () => state.name);
bindState(ele, "className", () => state.css);

// 绑定动态属性，例子2 attribute 属性
// 当属性发现有 '-' 字符，会使用 setAttribute 赋值
bindState(ele, "data-name", ()=>"hello");

// 绑定动态属性，例子3 赋值函数，可以返回 Promise
bindState(ele, "data-list", () => fetch('/url').then(v=>v.text()));

// 其次，选择一部分元素，让其重新更新自身的动态属性

// 更新动态属性，例子1
// 重新执行某个元素及其子元素的 bind 函数，用新的返回值赋值
state.name = "world";
nextState(ele);

// 更新动态属性，例子2
// 通过css选择器查找多个元素
nextState(".page-style");

// 更新动态属性，例子3
// 使用第二个css选择器，忽略某些元素及其子元素的此次更新
nextState(".page-style", ".ignore");


// 未有参数，更新所有
nextState();

// 未有参数，更新除 ignore 之外的元素
nextState(null, ".ignore");

document.body.append(ele);



```
