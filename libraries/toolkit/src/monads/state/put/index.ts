import type { State } from "../state/index.ts"

const put = <S>(s: S): State<S, void> => () => [undefined, s]

export default put
