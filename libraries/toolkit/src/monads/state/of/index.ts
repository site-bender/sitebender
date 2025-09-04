import type { State } from "../state/index.ts"

const of = <A, S = unknown>(a: A): State<S, A> => (s: S) => [a, s]

export default of
