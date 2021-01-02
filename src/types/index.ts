export type ExtendedProperties<T> = {
  [P in keyof T]: {
    /**
     * @returns The value of the state variable.
     *
     */
    get(): T[P];
    /**
     * @param value - New value to set the state variable to.
     * @returns void
     *
     */
    set(value: T[P]): void;
    /**
     * Resets the state variable to it's initial value.
     * @returns void
     *
     */
    reset(): void;
  };
};

type RestrictedKeywords =
  | 'getAll'
  | 'multiSet'
  | 'multiReset'
  | 'resetAll'
  | 'goBack'
  | 'goForward'
  | 'initialValues'
  | 'lite';

export type ProhibitedProperties<S> = Omit<S, RestrictedKeywords>;
