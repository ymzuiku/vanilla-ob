# vanilla-message

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
  age: 20,
});

const view = document.createElement("div");

ob.on(view, (s)=>[s.name], [name]=>{
  view.textContent = name;
});

document.body.append(view);
```
