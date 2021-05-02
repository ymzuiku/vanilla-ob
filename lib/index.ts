import immer, { Draft } from "immer";
import { onRemove } from "vanilla-life";

export type IListenElement<T> = <M extends DynList>(
  element: Element,
  memo: (state: T) => M,
  update: (...nowMemo: M) => any
) => any;

interface ObItem<S> {
  getMemo: (state: S) => any;
  memo: any;
  update: (...values: any[]) => any;
}

export interface ObEvent<S extends object, V> extends Map<Element, ObItem<S>> {
  state: S;
  next: (fn: (draft: Draft<S>) => any) => void;
  use: IListenElement<S>;
}

export const Ob = <S extends object, V>(state: S): ObEvent<S, V> => {
  const ob = new Map() as ObEvent<S, V>;
  ob.state = immer(state, (v) => {});
  ob.use = (ele, getMemo, fn) => {
    onRemove(ele, () => {
      ob.delete(ele);
    });
    const item = { getMemo, memo: getMemo(ob.state), update: fn };
    fn(...item.memo);
    ob.set(ele, item);
  };
  ob.next = (fn: (draft: Draft<S>) => any) => {
    ob.forEach((item) => {
      ob.state = immer(ob.state, (draft) => {
        fn(draft);
      });

      const nextMemo = item.getMemo(ob.state);

      let isNeedUpdate = false;
      for (let i = 0; i < nextMemo.length; i++) {
        if (nextMemo[i] !== item.memo[i]) {
          isNeedUpdate = true;
          break;
        }
      }
      if (!isNeedUpdate) {
        return;
      }
      item.memo = nextMemo;
      item.update(...item.memo);
    });
  };
  return ob;
};

export type DynList =
  | []
  | [any]
  | [any, any]
  | [any, any, any]
  | [any, any, any, any]
  | [any, any, any, any, any]
  | [any, any, any, any, any, any]
  | [any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any, any, any, any, any, any, any]
  | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any];
