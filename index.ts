export type State = {
    test: boolean;
}

export const state: State = {
    test: true
}

function setState<T, K extends keyof T>(state: T, key: K, value: T[K]) {
    return state[key] = value;
}

setState(state, 'test', true);