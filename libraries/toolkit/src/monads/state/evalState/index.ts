import type { State } from "../state/index.ts"

const evalState = <S, A>(sa: State<S, A>) => (s: S): A => sa(s)[0]

export default evalState
