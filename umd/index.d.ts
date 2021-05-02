import { Draft } from "immer";
export declare type IListenElement<T> = <M extends ListItem>(element: Element, memo: (state: T) => M, update: (...nowMemo: M) => any) => any;
interface ObItem<S> {
    getMemo: (state: S) => any;
    memo: any;
    update: (...values: any[]) => any;
}
export interface ObEvent<S extends object, V> extends Map<Element, ObItem<S>> {
    state: S;
    next: (fn: (draft: Draft<S>) => any) => void;
    on: IListenElement<S>;
}
export declare const Ob: <S extends object, V>(state: S) => ObEvent<S, V>;
declare type ListItem = [] | [any] | [any, any] | [any, any, any] | [any, any, any, any] | [any, any, any, any, any] | [any, any, any, any, any, any] | [any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any];
export {};
