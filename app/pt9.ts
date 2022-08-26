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

// A constante actions, retornará um objeto do tipo Actions
// Não foi necessário atribuir o tipo do parâmetro da função setStateAction, pois na interface Actions, por enquanto
// foi definido que seu contexto é do tipo any, então ele espera receber qualquer parâmetro
// A interface Actions em seu parâmetro context, será responsável por dizer quais os possíveis parâmetros que podem ser passados para a função setStateAction
// A função commit, por padrão, será acessada por meio do enum MutationTypes, que possui os nomes dos mutations disponíveis
// neste caso, o commit estará acessando a mutation '_setState'
const actions: Actions = {
    // A função setStateAction, receberá um ou mais parâmetros compatíveis com o contexto do Actions
    // O parâmetro context em sua interface, por enquanto espera receber qualquer parâmetro
    // Sendo assim, seria possível por enquanto enviar qualquer tipo de parâmetro nesta desestruturação
    setStateAction({commit}) {
        commit([MutationTypes.setState], {propName: 'phone', value: 123456789});
    }
}

// A interface Actions, dita as regras e retornos esperados para a constante actions
interface Actions {
    // A função setStateAction, receberá um parâmetro do tipo context, que por enquanto espera receber qualquer tipo de parâmetro
    setStateAction(context: any): void;
}