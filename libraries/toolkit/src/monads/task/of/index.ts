import type { Task } from "../task/index.ts"

const of = <A>(a: A): Task<A> => () => Promise.resolve(a)

export default of
