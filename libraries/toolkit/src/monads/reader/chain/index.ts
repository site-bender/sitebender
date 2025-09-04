import type { Reader } from "../reader/index.ts"

const chain = <A, B, R>(
  f: (a: A) => Reader<R, B>,
) => (ra: Reader<R, A>): Reader<R, B> => (r: R) => f(ra(r))(r)

export default chain
