import type { Reader } from "../reader/index.ts"

const ask = <R>(): Reader<R, R> => (r: R) => r

export default ask
