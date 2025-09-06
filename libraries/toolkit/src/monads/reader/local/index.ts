import type { Reader } from "../reader/index.ts"

const local = <R, R2>(
	f: (r2: R2) => R,
) =>
<A>(ra: Reader<R, A>): Reader<R2, A> =>
(r2: R2) => ra(f(r2))

export default local
