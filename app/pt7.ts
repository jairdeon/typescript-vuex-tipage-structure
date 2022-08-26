// O enum MutationTypes, será utilizado para que ao chamar a constante mutations, seja possível atribuir de forma dinâmica
// então utilizar [MutationTypes.setState] como nome da função, será o mesmo que chamar a função _setState
// O tipo MutationType espera receber uma função com o nome _setState, e ao utilizar o enum MutationTypes.setState, será identificado como _setState, então será válido
enum MutationTypes {
    setState = "_setState"
}

export type Phone = {
    phone: boolean;
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