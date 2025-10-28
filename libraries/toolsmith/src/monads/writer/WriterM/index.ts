export type Monoid<W> = {
	readonly empty: W
	readonly concat: (a: W, b: W) => W
}

export type Writer<W, A> = () => [A, W]

const WriterM = <W>(M: Monoid<W>) => {
	const of = <A>(a: A): Writer<W, A> => () => [a, M.empty]

	const from = <A>(thunk: () => [A, W]): Writer<W, A> => thunk

	const map =
		<A, B>(f: (a: A) => B) => (wa: Writer<W, A>): Writer<W, B> => () => {
			const [a, w] = wa()
			return [f(a), w]
		}

	const chain = <A, B>(
		f: (a: A) => Writer<W, B>,
	) =>
	(wa: Writer<W, A>): Writer<W, B> =>
	() => {
		const [a, w1] = wa()
		const [b, w2] = f(a)()
		return [b, M.concat(w1, w2)]
	}

	const tell = (w: W) => (wa: Writer<W, unknown>): Writer<W, unknown> => () => {
		const [a, w1] = wa()
		return [a, M.concat(w1, w)]
	}

	const run = <A>(wa: Writer<W, A>): [A, W] => wa()

	return { of, from, map, chain, tell, run }
}

export default WriterM
