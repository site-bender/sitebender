import type { State } from "../state/index.ts"

const map =
	<A, B>(f: (a: A) => B) => <S>(sa: State<S, A>): State<S, B> => (s: S) => {
		const [a, s1] = sa(s)
		return [f(a), s1]
	}

export default map
