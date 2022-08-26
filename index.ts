export type State = {
    test: boolean;
}

export const state: State = {
    test: true
}

function setState(state: State, value: boolean) {
    state['test'] = value;
}

setState(state, true);