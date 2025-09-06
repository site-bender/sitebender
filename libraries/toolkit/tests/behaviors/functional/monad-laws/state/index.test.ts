import * as fc from "npm:fast-check@3"

import type { State } from "../../../../../src/monads/state/state/index.ts"

import chain from "../../../../../src/monads/state/chain/index.ts"
import evalState from "../../../../../src/monads/state/evalState/index.ts"
import execState from "../../../../../src/monads/state/execState/index.ts"
import get from "../../../../../src/monads/state/get/index.ts"
import modify from "../../../../../src/monads/state/modify/index.ts"
import of from "../../../../../src/monads/state/of/index.ts"

Deno.test("State monad - left/right identity and associativity", () => {
	const f = (n: number) => (s: number): [number, number] => [n + s, s]
	const g = (n: number) => (s: number): [number, number] => [n * 2, s]

	fc.assert(
		fc.property(fc.integer(), fc.integer(), (value, s0) => {
			const m = of<number, number>(value)
			const left = chain<number, number, number>(f)(m)
			const right = f(value)
			const env = s0
			const l1 = left(env)
			const r1 = right(env)

			const rightId = chain<number, number, number>(of<number, number>)(m)(env)
			const assocLeft = chain<number, number, number>(g)(
				chain<number, number, number>(f)(m),
			)(env)
			const assocRight = chain<number, number, number>((x: number) =>
				chain<number, number, number>(g)(f(x))
			)(m)(env)

			return JSON.stringify(l1) === JSON.stringify(r1) &&
				JSON.stringify(rightId) === JSON.stringify(m(env)) &&
				JSON.stringify(assocLeft) === JSON.stringify(assocRight)
		}),
		{ numRuns: 300 },
	)
})

Deno.test("State behaviors - get/put/modify/eval/exec", () => {
	const inc = modify<number>((s: number) => s + 1)
	const program: State<number, number> = chain<number, number, number>(() =>
		inc
	)(get<number>())
	const res = program(10)
	if (JSON.stringify(res) !== JSON.stringify([11, 11])) {
		throw new Error("state program failed")
	}

	const v = evalState(program)(10)
	const s = execState(program)(10)
	if (v !== 11 || s !== 11) throw new Error("eval/exec failed")
})
