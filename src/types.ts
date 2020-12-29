export type ExtendedProperties<T> = { [P in keyof T]: {
    get(): T[P];
    set(value: T[P]): void;
    reset(): void;
} };