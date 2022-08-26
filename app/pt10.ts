// noinspection DuplicatedCode

enum MutationTypes {
    setState = "_setState"
}

export type Phone = {
    phone: number;
    responsible: string;
    phone_type_id: number;
}

type PhoneState = {
    phone: Phone | null
}

const state: PhoneState = {
    phone: null
}

const mutations: MutationsType = {
    [MutationTypes.setState](state, payload) {
        state.phone && (state.phone[payload.propName] = payload.value);
    }
}

type MutationsType<S = PhoneState> = {
    _setState<PropName extends keyof Phone>(
        state: S,
        payload: PropNameKeyValue<PropName, Phone[PropName]>
    ): void;
}

interface PropNameKeyValue<KeyType, ValueType> {
    propName: KeyType;
    value: ValueType;
}

const actions: Actions = {
    setStateAction({commit}) {
        commit(MutationTypes.setState, {propName: 'phone', value: 123456789});
    }
}

interface Actions {
    // A função setStateAction, possui um parâmetro com o nome de context
    // o parâmetro context, espera receber um parâmetro com o nome de commit, que é uma das regras definidas no tipo ActionsContextParam
    setStateAction(context: ActionsContextParam): void;
}

// O tipo ActionsContextParam, é um objeto que possui uma função chamada commit
// A função commit, espera receber dois parâmetros:
// // Uma chave, que deverá ser uma constante do tipo MutationTypes, que é uma enumeração dos tipos de mutações
// // Um payload, que por enquanto aceitará qualquer tipo de dado
// No final, a função commit retornará um ReturnType que é o tipo de retorno da função commit
// O ReturnType retorna o tipo de retorno de um tipo de função, que receberá como chave o tipo da mutação informada no parâmetro da função commit
type ActionsContextParam = {
    commit<Key extends keyof MutationsType>(
        key: Key,
        payload: any
    ): ReturnType<MutationsType[Key]>;
};