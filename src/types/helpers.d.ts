type ValueOf<T> = T[keyof T];
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;