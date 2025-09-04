import type { Task } from "../task/index.ts"

const run = async <A>(t: Task<A>): Promise<A> => await t()

export default run
