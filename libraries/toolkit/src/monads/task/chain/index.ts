import type { Task } from "../task/index.ts"

const chain = <A, B>(
	f: (a: A) => Task<B>,
) =>
(ta: Task<A>): Task<B> =>
() => ta().then((a) => f(a)())

export default chain
