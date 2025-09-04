import type { State } from "../state/index.ts"

const get = <S>(): State<S, S> => (s: S) => [s, s]

export default get
