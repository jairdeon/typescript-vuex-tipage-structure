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
    _setState(state, payload) {
        state.phone && (state.phone.responsible = payload.value);
    }
}

type MutationsType<S = PhoneState> = {
    _setState(
        state: S,
        payload: any
    ): void;
}