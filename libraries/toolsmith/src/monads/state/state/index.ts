export type State<S, A> = (s: S) => [A, S]
