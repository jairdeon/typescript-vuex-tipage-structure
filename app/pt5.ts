// Agora, temos um novo tipo chamado Phone
// O tipo phone, será um objeto
export type Phone = {
    phone: boolean;
    responsible: string;
    phone_type_id: number;
}

// O tipo PhoneState, será um objeto que receberá em sua chave "phone"
// um objeto do tipo Phone, ou será um objeto vazio
type PhoneState = {
    phone: Phone | null
}

// O estado por padrão, retornará o tipo PhoneState
// e por padrão, o valor do campo phone é null
const state: PhoneState = {
    phone: null
}

// A constante mutations, retornará um objeto do tipo MitationsType
// Este objeto, por padrão sabe que é do tipo PhoneState, então seu estado será do tipo PhoneState
// Seu payload por enquanto não possui um tipo definido, então será do tipo any
const mutations: MutationsType = {
    // A função _setState, recebe um objeto do tipo PhoneState, e um payload que ainda não possui um tipo definido
    _setState(state, payload) {
        // Caso o estado possua o campo phone, e dentro deste campo (objeto) exista o campo responsible,
        // seu valor será o valor enviado pelo parâmetro payload
        state.phone && (state.phone.responsible = payload.value);
    }
}

// O tipo MutationsType, por padrão recebe um tipo genérico do tipo PhoneState
// O tipo MutationsType, será um objeto que possuirá uma função chamada _setState,
// e essa função receberá um objeto do tipo PhoneState e um payload que ainda não possui um tipo definido
type MutationsType<S = PhoneState> = {
    _setState(
        state: S,
        payload: any
    ): void;
}