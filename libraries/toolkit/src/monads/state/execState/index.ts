import type { State } from "../state/index.ts"

const execState = <S, A>(sa: State<S, A>) => (s: S): S => sa(s)[1]

export default execState
