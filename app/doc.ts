// const test: Order = {
//   test: true
// }
//
// function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
//   obj[key] = value;
// }

// Categoria de dados igual a ORDER, com um campo test
type Order = {
    test: boolean;
}

// Categoria de dados igual a Values, sendo que o que for passado como parâmetro, será um tipo genérico
// Este tipo, é igual ao tipo enviado
type Values<T> = T[keyof T]

// Allow values, é um tipo que ao ser chamado, receberá um tipo "Values"
// O Tipo "values, recebe um tipo genérico, que é o tipo "T", e retorna ele mesmo, e o valor com base nos tipos disponíveis do tipo "T"
type AllowedValues = Values<{
    // Faça um loop das chaves do tipo "Order" em Prop, e retorne o tipo PropNameKeyValue, sendo que o seu primeiro parâmetro será
    // o nome da chave, e o segundo parâmetro será o tipo da chave
    [Prop in keyof Order]: PropNameKeyValue<Prop, Order[Prop]>
}>

// PropNameKeyValue é uma interface que recebe um nome e um tipo, e retorna o nome e o tipo
export interface PropNameKeyValue<KeyType, ValueType> {
    propName: KeyType;
    value: ValueType;
}

// O tipo Mutations, recebe um tipo genérico, que neste caso é o Order
type Mutations<S = Order> = {
    // O tipo mutations espera receber uma função chamada commit, esta função commit espera receber
    // um parâmetro que será uma das chaves disponíveis do tipo Order
    commit: <PropName extends keyof Order>(
        // State é o objeto enviado, que no caso é o Order
        state: S,

        // Payload é o valor que será enviado para a chave, neste caso o valor que ele espera receber é
        // um tipo PropNameKeyValue, que recebe o nome da chave e o mesmo valor da chave, será buscado no Order[chave]
        payload: PropNameKeyValue<PropName, Order[PropName]>
    ) => void;
};

// O tipo AugmentedOrder é um tipo que recebe o tipo Order e o tipo Mutations
type AugmentedActionContext = {
    // a A função commit, recebe um parâmetro que existe como chave no tipo Mutations
    commit<Key extends keyof Mutations>(
        // A chave, é o parâmetro enviado ao chamar a função commit
        key: Key,

        // O payload, espera receber um valor do tipo "AlloweValues", que espera que o tipo enviado
        // seja um tipo que exista no tipo Order
        payload: AllowedValues // change is here

        // O retorno espera que seja o tipo Mutação, sendo que sua chave deve existir no tipo Mutations
    ): ReturnType<Mutations[Key]>;
};

// A constante mutations, retornará o tipo Mutations, que por padrão sabe que seu tipo genérico é o Order
const mutations: Mutations = {
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
const actions: Actions = {
    setAction({commit}) {
        commit('commit', {propName: 'test', value: true});
    },
}

// A interface Actions, espera receber uma função chamada setAction, que recebe um tipo AugmentedActionContext
interface Actions {
    setAction(context: AugmentedActionContext): void;
}
