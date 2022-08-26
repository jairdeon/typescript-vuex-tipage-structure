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

// A constante mutations, retornará o tipo MutationsType, que por padrão, sabe que o seu parâmetro
// state é o tipo PhoneState, sendo assim, ao chamar "phone..." já será sugerido os campos disponíveis do tipo PhoneState > Phone
// payload, espera receber dois parâmetros definidos na interface PropNameKeyValue, que são:
// // PropName: nome da chave do tipo PhoneState
// // Value: o valor que será atribuído ao campo da chave do tipo PhoneState, que precisará ser compatível com o tipo PhoneState[PropName]
// // // PropName: 'responsible', Value: 'Jair Deon' | ao chamar a função _setState, será atribuído o valor 'Jair Deon' ao campo responsible
const mutations: MutationsType = {
    _setState(state, payload) {
        // Como o parâmetro state já sabe ser do tipo PhoneState, então, podemos acessar o campo phone
        // e caso este campo exista, como também o campo buscado (payload.propName) = 'responsible', então estaremos acessando
        // o campo state.phone.responsible, e atribuído o valor 'Jair Deon' do tipo string
        state.phone && (state.phone[payload.propName] = payload.value);
    }
}

// O tipo MutationsType, por padrão recebe um tipo genérico do tipo PhoneState, e retornará um objeto
// que tem como chave, uma função chamada _setState, que aguarda receber um parâmetro onde sua chave exista no tipo PhoneState
// sendo assim, PropName precisará ser phone | responsible ou phone_type_id, e o seu valor precisará ser
// compatível com o tipo PhoneState[PropName]
type MutationsType<S = PhoneState> = {
    // _setState espera que no payload, seja enviado no parâmetro PropName, uma chave compatível com o tipo Phone
    // e Value, um tipo compatível com o tipo PhoneState[PropName]
    _setState <PropName extends keyof Phone>(
        state: S,

        // Payload é um objeto que possui como contrato a interface PropNameKeyValue, que espera receber dois parâmetros:
        // PropName: nome da chave do campo desejado
        // ValueType, que será o valor atribuído ao campo desejado
        payload: PropNameKeyValue<PropName, Phone[PropName]>
    ): void;
}

// A interface PropNameKeyValue, espera receber dois parâmetros:
// PropName: nome da chave do campo desejado
// ValueType, que será o valor atribuído ao campo desejado
interface PropNameKeyValue<KeyType, ValueType> {
    propName: KeyType;
    value: ValueType;
}