import * as fc from "npm:fast-check@3"

import type { Reader } from "../../../../../src/monads/reader/reader/index.ts"

import ask from "../../../../../src/monads/reader/ask/index.ts"
import asks from "../../../../../src/monads/reader/asks/index.ts"
import chain from "../../../../../src/monads/reader/chain/index.ts"
import local from "../../../../../src/monads/reader/local/index.ts"
import map from "../../../../../src/monads/reader/map/index.ts"
import of from "../../../../../src/monads/reader/of/index.ts"

Deno.test("Reader monad - left identity law", () => {
	const f = (n: number) => (r: number) => n + r

	fc.assert(
		fc.property(fc.integer(), fc.integer(), (value, env) => {
			const m = of<number, number>(value)
			const left = chain<number, number, number>(
				(x: number) => (r: number) => f(x)(r),
			)(m)
			const right = (r: number) => f(value)(r)
			return left(env) === right(env)
		}),
		{ numRuns: 300 },
	)
})

Deno.test("Reader monad - right identity law", () => {
	fc.assert(
		fc.property(fc.integer(), fc.integer(), (value, env) => {
			const m: Reader<number, number> = () => value
			const result = chain<number, number, number>(of<number, number>)(m)
			return result(env) === m(env)
		}),
		{ numRuns: 300 },
	)
})

Deno.test("Reader monad - associativity law", () => {
	const f = (x: number) => (r: number) => x * 2 + r
	const g = (x: number) => (r: number) => x + 10 + r

	fc.assert(
		fc.property(fc.integer(), fc.integer(), (value, env) => {
			const m = of<number, number>(value)
			const left = chain<number, number, number>(g)(
				chain<number, number, number>(f)(m),
			)
			const right = chain<number, number, number>((x: number) =>
				chain<number, number, number>(g)(f(x))
			)(m)
			return left(env) === right(env)
		}),
		{ numRuns: 300 },
	)
})

Deno.test("Reader behaviors - ask/asks/local", () => {
	const env = { multiplier: 3, offset: 5 }

	const r1 = ask<typeof env>() // Reader<env, env>
	const r2 = asks<typeof env, number>((e: typeof env) => e.multiplier) // Reader<env, number>
	const r3 = map<number, number>((n: number) => n * 2)(r2)
	const combined = chain<number, number, typeof env>(
		(m: number) => (_: typeof env) => m + 1,
	)(r3)

	// local to transform env
	const localR = local<typeof env, { multiplier: number; offset: number }>((
		e: { multiplier: number; offset: number },
	) => ({ ...e, offset: e.offset + 1 }))(r1)

	// run
	const v1 = r1(env)
	const v2 = r2(env)
	const v3 = r3(env)
	const v4 = combined(env)
	const v5 = localR(env)

	if (v1.multiplier !== 3 || v1.offset !== 5) throw new Error("ask failed")
	if (v2 !== 3) throw new Error("asks failed")
	if (v3 !== 6) throw new Error("map failed")
	if (v4 !== 7) throw new Error("chain failed")
	if (v5.offset !== 6) throw new Error("local failed")
})
