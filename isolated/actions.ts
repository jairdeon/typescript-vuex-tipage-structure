import {ActionTypes} from "./enum";
import {MutationsType, AllowedValues} from "./type";

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