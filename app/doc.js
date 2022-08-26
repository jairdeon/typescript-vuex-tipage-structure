"use strict";
// const test: Order = {
//   test: true
// }
//
// function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
//   obj[key] = value;
// }
Object.defineProperty(exports, "__esModule", { value: true });
// A constante mutations, retornará o tipo Mutations, que por padrão sabe que seu tipo genérico é o Order
const mutations = {
    // A função commit é executada com base nas regras de sua interface Mutations e aguarda em seus valores
    // que o nome da chave e o valor da chave existam e sejam compatíveis com o tipo Order
    commit(state, payload) {
        // state.test && (state.test[payload.propName] = payload.value);
        state.test && (state[payload.propName] = payload.value);
    },
};
// A constante actions, retornará o tipo Actions, que possui uma interface
// esperando que ela retorne uma função chamada setAction, que recebe um tipo AugmentedActionContext
// O tipo AugmentedActionContext aguarda que o conteúdo recebido por ela, seja uma função chamada commit
// e que o seu primeiro parâmetro seja uma chave do tipo Mutations, e o segundo parâmetro seja um valor do tipo AllowedValues
const actions = {
    setAction({ commit }) {
        commit('commit', { propName: 'test', value: true });
    },
};
