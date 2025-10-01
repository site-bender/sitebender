import type { Task } from "../task/task/index.ts"

import doNotation, { type MonadDictionary } from "../doNotation/index.ts"
import chain from "../task/chain/index.ts"
import of from "../task/of/index.ts"

const TaskMonad: MonadDictionary<Task<unknown>> = {
	chain: chain as unknown as MonadDictionary<Task<unknown>>["chain"],
	of: of as unknown as MonadDictionary<Task<unknown>>["of"],
}

//++ Specialized do-notation for Task monad with async operations
export default function doTask<A>(
	genFn: () => Generator<Task<unknown>, A, unknown>,
): Task<A> {
	return doNotation(TaskMonad)(genFn) as Task<A>
}
