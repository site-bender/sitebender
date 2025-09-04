import type { Task } from "../task/index.ts"

const delay = (ms: number) => <A>(t: Task<A>): Task<A> => () =>
  new Promise((resolve) => setTimeout(() => t().then(resolve), ms))

export default delay
