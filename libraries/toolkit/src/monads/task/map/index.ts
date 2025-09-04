import type { Task } from "../task/index.ts"

const map = <A, B>(f: (a: A) => B) => (ta: Task<A>): Task<B> =>
  () => ta().then(f)

export default map
