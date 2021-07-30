function isSvg(ele: any) {
  if (ele.__isSvg || ele.tagName === "svg" || ele.ownerSVGElement) {
    return true;
  }
  return false;
}

function isAttr(ele: any, key: any) {
  if (attributeKeys[key as string] || /-/.test(key as string) || isSvg(ele)) {
    return true;
  }
  return false;
}

export const attributeKeys: { [key: string]: boolean } = {
  autofocus: true,
  role: true,
  viewBox: true,
};

function getElementList(targets?: string | HTMLElement | HTMLElement[]) {
  let list: HTMLElement[] = [];
  if (targets) {
    if (typeof targets === "string") {
      let query = "";
      const _list = targets.split(", ");
      _list.forEach((v, i) => {
        v = v.trim();
        if (i === _list.length - 1) {
          query += `${v}[bind-state], ${v} [bind-state]`;
        } else {
          query += `${v}[bind-state], ${v} [bind-state],`;
        }
      });
      list = document.body.querySelectorAll(query) as any;
    } else if (Object.prototype.toString.call(targets) === "[object Array]") {
      list = [...(targets as any[])];
      (targets as any[]).forEach((e) => {
        list.push(...e.querySelectorAll("*"));
      });
    } else {
      list = [targets as any];
      list.push(...(targets as any).querySelectorAll("*"));
    }
  }
  return list;
}

export const nextState = (
  focusUpdateTargets?: string | HTMLElement | HTMLElement[],
  ignoreUpdateTargets?: string | HTMLElement | HTMLElement[]
) => {
  if (!focusUpdateTargets) {
    focusUpdateTargets = "*";
  }
  const ignoreList = getElementList(ignoreUpdateTargets);
  const eleList = getElementList(focusUpdateTargets);

  const len = eleList.length;
  for (let i = 0; i < len; i++) {
    const ele = eleList[i] as any;
    if ((ele as any).__bindState) {
      // 判断元素是否存在
      if (document.body.contains(ele)) {
        // 忽略元素及其子元素的更新
        if (ignoreList.length) {
          const len = ignoreList.length;
          let isUseIgnoreList = false;
          for (let i = 0; i < len; i++) {
            const parent = ignoreList[i] as HTMLElement;
            if (parent === ele || parent.contains(ele)) {
              isUseIgnoreList = true;
              break;
            }
          }
          if (isUseIgnoreList) {
            continue;
          }
        }

        ((ele as any).__bindState as Map<string, Function>).forEach((fn) => {
          fn();
        });
      }
    }
  }
};

export const bindState = <T extends HTMLElement, K extends keyof T>(
  ele: T,
  key: K | null,
  fn: any
) => {
  if (key && /^on/.test(key as string)) {
    (ele as any)[key] = fn;
    return;
  }
  if (typeof fn !== "function") {
    if (isAttr(ele, key)) {
      ele.setAttribute(key as string, fn);
    } else {
      if (typeof fn === "object") {
        Object.assign((ele as any)[key], fn);
      } else {
        ele[key!] = fn;
      }
    }
    return;
  }

  if (!(ele as any).__bindState) {
    (ele as HTMLElement).setAttribute("bind-state", "");
    (ele as any).__bindState = new Map<string, Function>();
  }

  let setValue: any;
  if (key === null) {
    // 若无key，直接记录fn
    setValue = () => fn(ele);
  } else {
    if (isAttr(ele, key)) {
      setValue = () => {
        Promise.resolve(fn(ele)).then((v) => {
          if (ele.getAttribute(key as string) !== v) {
            ele.setAttribute(key as string, v);
          }
        });
      };
    } else {
      setValue = () => {
        Promise.resolve(fn(ele)).then((v) => {
          if (typeof v === "object") {
            Object.assign(ele[key], v);
          } else {
            if (ele[key] !== v) {
              ele[key] = v;
            }
          }
        });
      };
    }
  }
  setValue();

  ((ele as any).__bindState as Map<string, Function>).set(
    key as string,
    setValue
  );
};
