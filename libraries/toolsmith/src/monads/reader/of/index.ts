import type { Reader } from "../reader/index.ts"

const of = <A, R = unknown>(a: A): Reader<R, A> => (_: R) => a

export default of
