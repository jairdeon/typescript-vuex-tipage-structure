export type State = {
    test: boolean;
}

export const state: State = {
    test: true
}

// A função abaixo receberá 3 parâmetros, sendo eles o T e o K
// T será o estado (State) desejado
// K será a chave que será buscada no estado (State)
// value será o valor que será atribuído a chave K
function  _setState<T, K extends keyof T>(state: T, key: K, value: T[K]){
    state[key] = value;
}

// A função abaixo, executará a _setState, passando o estado como referência
// o campo 'test' como chave, e o valor true (boolean)
// A chave 'test', deve ser uma chave existente no estado (State)
// O valor true, deve ser compatível com o tipo do valor do campo 'test' (boolean)
_setState(state, 'test', true);

// A função abaixo receberá 3 parâmetros, sendo eles o T e o K
// T será o estado (State) desejado
// K será a chave que será buscada no estado (State)
// value será o valor que será atribuído a chave K
function actionState<T, K extends keyof T>(state: T, key: K, value: T[K]) {
    // Esta ação executará a função _setState, que também aguardará 3 parâmetros do tipo T, K e value
    _setState(state, key, value);
}

// A função abaixo executará a actionState, recebendo a constante state (do tipo State),
// buscando o campo 'test' e setando o seu valor para true (boolean
actionState(state, 'test', true);