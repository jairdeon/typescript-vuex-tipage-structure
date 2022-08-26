export type State = {
    test: boolean;
}

export const state: State = {
    test: true
}

const mutations: MutationsType = {
    _setState(state, payload) {
        state.test = payload.value;
    }
}

type MutationsType<S = State> = {
    _setState(
        state: S,
        payload: any
    ): void;
}