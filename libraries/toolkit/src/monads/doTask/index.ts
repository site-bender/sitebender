import type { Task } from "../task/task/index.ts"

import chain from "../task/chain/index.ts"
import of from "../task/of/index.ts"
import doNotation, { type MonadDictionary } from "../doNotation/index.ts"

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

//?? [EXAMPLE] doTask(function* () { const { default: fromPromise } = await import("../task/fromPromise/index.ts"); const x = yield fromPromise(fetch('/api').then(r => r.json())); return x })
//?? [EXAMPLE] doTask(function* () { const { default: delay } = await import("../../vanilla/async/delay/index.ts"); const x = yield (() => delay(1000)(5)); return x * 2 })
//?? [EXAMPLE] doTask(function* () { const { default: parallel } = await import("../task/parallel/index.ts"); const [a, b] = yield parallel([() => Promise.resolve(1), () => Promise.resolve(2)]); return a + b })
