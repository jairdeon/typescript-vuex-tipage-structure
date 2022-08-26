import {Phone, PhoneState} from "./type";

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