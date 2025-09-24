import type { Reader } from "../reader/index.ts"

const map =
	<A, B>(f: (a: A) => B) => <R>(ra: Reader<R, A>): Reader<R, B> => (r: R) =>
		f(ra(r))

export default map
