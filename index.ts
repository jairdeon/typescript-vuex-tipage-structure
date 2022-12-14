// noinspection DuplicatedCode

enum MutationTypes {
    setState = "_setState"
}

export enum ActionTypes {
    setStateAction = "setStateAction"
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
    phone: {
        phone: 999999999,
        responsible: "Jair Deon",
        phone_type_id: 1
    }
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
    [ActionTypes.setStateAction]({commit}) {
        commit(MutationTypes.setState, {propName: 'phone', value: 123456789});
        commit(MutationTypes.setState, {propName: 'responsible', value: 'Jair Deon'});
        commit(MutationTypes.setState, {propName: 'phone_type_id', value: 1});
    }
}

interface Actions {
    setStateAction(context: ActionsContextParam): void;
}

type ActionsContextParam = {
    commit<Key extends keyof MutationsType>(
        key: Key,
        payload: AllowedValues
    ): ReturnType<MutationsType[Key]>;
};

type Values<T> = T[keyof T];

type AllowedValues = Values<{
    [Prop in keyof Phone]: PropNameKeyValue<Prop, Phone[Prop]>
}>;
