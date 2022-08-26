export type State = {
    test: boolean;
}

export const state: State = {
    test: true
}

// A função abaixo chamada setState, recebe 3 parâmetros
// T é o objeto (que herdará o seu tipo (State)
// K, a chave que precisará existir também entre os tipos de T (State)
// value, que precisará ser um tipo compatível com o valor esperado de State[test] (boolean)
function setState<T, K extends keyof T>(state: T, key: K, value: T[K]) {
    return state[key] = value;
}

// Executando a função setState, passando a constante do tipo State como referência
// buscando pelo campo 'test', com o valor true (boolean)
setState(state, 'test', true);