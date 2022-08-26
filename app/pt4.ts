export type State = {
    test: boolean;
}

export const state: State = {
    test: true
}

// A constante abaixo, retornara o tipo "MutationsType"
// O tipo "MutationsType" possui por padrão o tipo genérico setado como (State), sendo assim
// a constante abaixo, já sabe que o seu estado é do tipo State
const mutations: MutationsType = {
    // A função abaixo, será uma mutação chamada _setState, ela espera receber dois parâmetros:
    // state, que será o estado (State) desejado
    // payload, que por enquanto não possui um tipo definido
    // Por causa do MutationsType estar definido como MutationsType<State>, o primeiro parâmetro state
    // já assume que seus possíveis valores são do tipo State
    _setState(state, payload) {
        state.test = payload.value;
    }
}

// O tipo MutationsType por padrão, possui um tipo genérico S setado como State, sendo assim
// a constante abaixo, já sabe que o seu tipo genérico é do tipo State
type MutationsType<S = State> = {
    // A função abaixo, será uma mutação chamada _setState, ela espera receber dois parâmetros:
    // state, que será o estado (State) desejado, e que por padrão estará utilizando o tipo genérico neste caso definido por padrão como State
    // payload, que por enquanto não possui um tipo definido
    // Esta função não retornará nenhum valor
    _setState(
        state: S,
        payload: any
    ): void;
}