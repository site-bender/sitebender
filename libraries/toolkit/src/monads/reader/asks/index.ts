import type { Reader } from "../reader/index.ts"

const asks = <R, A>(f: (r: R) => A): Reader<R, A> => (r: R) => f(r)

export default asks
