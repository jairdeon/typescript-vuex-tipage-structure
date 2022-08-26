export type Phone = {
    phone: number;
    responsible: string;
    phone_type_id: number;
}

export type PhoneState = {
    phone: Phone | null
}

export type MutationsType<S = PhoneState> = {
    _setState<PropName extends keyof Phone>(
        state: S,
        payload: PropNameKeyValue<PropName, Phone[PropName]>
    ): void;
}

export type ActionsContextParam = {
    commit<Key extends keyof MutationsType>(
        key: Key,
        payload: AllowedValues
    ): ReturnType<MutationsType[Key]>;
};

export type Values<T> = T[keyof T];

export type AllowedValues = Values<{
    [Prop in keyof Phone]: PropNameKeyValue<Prop, Phone[Prop]>
}>;