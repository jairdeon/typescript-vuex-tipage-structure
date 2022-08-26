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
        // Todos os commits abaixo funcionarão, pois agora, a função setStateAction em seu parâmetro context
        // espera receber um objeto do tipo ActionsContextParam, que informa em suas regras de tipagem, que a
        // função commit, receberá 2 parâmetros no total:
        // - o primeiro é o nome da mutação que será executada
        // - o segundo é o payload que será passado para a mutação

        // Diferente da parte 11, todos os commits abaixo funcionarão, pois agora o tipo AllowedValues, é igual a um objeto do tipo Values
        // que por sua vez, recebe um parâmetro de tipo genérico duas propriedades:
        // a chave (Prop) do objeto que está buscando (que precisa existir no tipo Phone)
        // e a mesma chave informada (Prop) será usada para verificar se o tipo de valor informado é compatível com o tipo do valor do objeto
        // por meio do tipo PropNameKeyValue, que possui duas propriedades:
        // Prop (a mesma chave informada no primeiro parâmetro do objeto Value atual
        // O tipo do valor, informado por Phone[Prop], então se o propName é 'phone', o Values será {phone: number}
        commit(MutationTypes.setState, {propName: 'phone', value: 123456789});
        commit(MutationTypes.setState, {propName: 'responsible', value: 'Jair Deon'});
        commit(MutationTypes.setState, {propName: 'phone_type_id', value: 1});
    }
}

interface Actions {
    setStateAction(context: ActionsContextParam): void;
}

type ActionsContextParam = {
    // A função commit retornará o tipo MutationsType[Key], caso o commit possua como mutation o valor '_setState',
    // ele saberá por meio do tipo MutationsType, função _setState, que o seu tipo é Phone
    commit<Key extends keyof MutationsType>(
        key: Key,

        // O payload, espera receber um valor do tipo AllowedValues, que por sua vez, espera que uma das chaves enviadas esteja no tipo Phone
        // por meio do tipo PropNameKeyValue, que possui duas propriedades:
        // Prop (a mesma chave informada no primeiro parâmetro do objeto Value atual)
        // O tipo do valor, informado por Phone[Prop], então se o propName é 'phone', o Values será {phone: number}
        payload: AllowedValues
    ): ReturnType<MutationsType[Key]>;
};

// O tipo Values, espera receber um parâmetro do tipo genérico
// Ele será igual ao tipo genérico e o tipo de seu valor
type Values<T> = T[keyof T];

// O tipo AllowedValues, será igual ao objeto do tipo Values, ele receberá os parâmetro enviados pela função commit (propName, value)
// Nesse caso, se o propName for 'phone', ele verificará se este valor existe em uma das chaves do tipo Phone
// E também, ele verificará por meio do valor encontrado, qual o tipo dele na função PropNameKeyValue, que possui duas propriedades:
// Prop (a mesma chave informada no primeiro parâmetro do objeto Value atual (propName))
// O tipo do valor, informado por Phone[Prop], então se o propName for 'phone', o Values será {phone: number}
type AllowedValues = Values<{
    // O Prop fará um loop em todas as chaves do tipo Phone, buscando pelo valor informado em commit (propName)
    [Prop in keyof Phone]: PropNameKeyValue<Prop, Phone[Prop]>
}>;
