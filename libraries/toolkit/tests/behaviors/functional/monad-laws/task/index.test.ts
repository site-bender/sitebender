import * as fc from "npm:fast-check@3"

import chain from "../../../../../src/monads/task/chain/index.ts"
import delay from "../../../../../src/monads/task/delay/index.ts"
import map from "../../../../../src/monads/task/map/index.ts"
import of from "../../../../../src/monads/task/of/index.ts"
import run from "../../../../../src/monads/task/run/index.ts"

Deno.test("Task monad - laws (async)", async () => {
	const f = (n: number) => () => Promise.resolve(n + 1)
	const g = (n: number) => () => Promise.resolve(n * 2)

	await fc.assert(
		fc.asyncProperty(fc.integer(), async (value) => {
			const m = of<number>(value)
			const left = chain<number, number>(f)(m)
			const right = f(value)
			return (await run(left)) === (await run(right))
		}),
		{ numRuns: 100 },
	)

	await fc.assert(
		fc.asyncProperty(fc.integer(), async (value) => {
			const m = of<number>(value)
			const result = chain<number, number>(of<number>)(m)
			return (await run(result)) === (await run(m))
		}),
		{ numRuns: 100 },
	)

	await fc.assert(
		fc.asyncProperty(fc.integer(), async (value) => {
			const m = of<number>(value)
			const left = chain<number, number>(g)(chain<number, number>(f)(m))
			const right = chain<number, number>((x: number) =>
				chain<number, number>(g)(f(x))
			)(m)
			return (await run(left)) === (await run(right))
		}),
		{ numRuns: 100 },
	)
})
