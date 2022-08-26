// noinspection DuplicatedCode

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

const actions: Actions = {
    setStateAction({commit}) {
        // A função commit espera receber 2 parâmetros:
        // O nome da mutação desejada (no caso abaixo, atribuído como MutationTypes.setState), que é um enum do tipo MutationTypes
        // Um payload do tipo AllowedValues, que possui dois possíveis parâmetros
        // // propName: o nome da propriedade que será alterada (que por enquanto permitirá apenas se o valor for 'phone')
        // // value: o valor que será atribuído à propriedade, que por enquanto permitirá apenas se for do tipo number

        // O commit abaixo funcionará porque o propName é 'phone', e o valor é do tipo número que são os tipos descritos no tipo AllowedValues
        commit(MutationTypes.setState, {propName: 'phone', value: 123456789});

        // O commit abaixo funcionará pois agora, o propName e o valor são descritos no tipo AllowedValues
        commit(MutationTypes.setState, {propName: 'responsible', value: 'Jair Deon'});
    }
}

interface Actions {
    setStateAction(context: ActionsContextParam): void;
}

type ActionsContextParam = {
    commit<Key extends keyof MutationsType>(
        key: Key,
        // O payload espera receber um objeto que esteja nas opções do tipo AllowedValues
        // Por enquanto, o payload permitirá receber apenas o propName 'phone', e o value do tipo number
        payload: AllowedValues
    ): ReturnType<MutationsType[Key]>;
};

type AllowedValues = {
    // Pequena alteração para permitir que o propName seja 'phone' ou 'responsible'
    // Porém, não é o ideal, pois podemos ter inúmeros tipos de propriedades que podem ser alteradas
    propName: 'phone' | 'responsible',

    // Pequena alteração para permitir que o value seja do tipo number ou string
    // Porém, não é o ideal, pois podemos ter inúmeros tipos de valores que podem ser atribuídos à propriedade
    // e cada propriedade, possui seus próprios tipos de valores
    value: number | string;
}