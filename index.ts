export type State = {
    test: boolean;
}

export const state: State = {
    test: true
}

function  _setState<T, K extends keyof T>(state: T, key: K, value: T[K]){
    state[key] = value;
}

_setState(state, 'test', true);

function actionState<T, K extends keyof T>(state: T, key: K, value: T[K]) {
    _setState(state, key, value);
}

actionState(state, 'test', true);