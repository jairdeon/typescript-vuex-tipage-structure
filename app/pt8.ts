enum MutationTypes {
    setState = "_setState"
}

type Phone = {
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

// A constante actions, será um objeto que terá a permissão de acessar a mutation setState por meio da função setStateAction
// Por enquanto, ela não possui um retorno definido, e sua função setStateAction, espera receber um parâmetro do tipo commit, que será a função
// responsável por acessar a mutation setState e passar os parâmetros necessários para realizar a alteração dos seus valores
const actions = {
    // A função setStateAction, por enquanto aguarda receber um parâmetro chamado commit, mas sem instruções definidas
    setStateAction({commit}: any) {
        // A função commit, estará enviando para a mutanção '_setState', dois parâmetros:
        // propName: 'phone', que será o nome da propriedade que será alterada
        // value: '123456789', que será o novo valor atribuído a propriedade
        commit('_setState', {propName: 'phone', value: 123456789});
    }
}