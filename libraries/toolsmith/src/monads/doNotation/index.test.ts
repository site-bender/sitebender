import { assertEquals } from "@std/assert"

import type { Maybe } from "../../types/fp/maybe/index.ts"
import type { Result } from "../../types/fp/result/index.ts"
import type { MonadDictionary } from "./index.ts"

import chain from "../maybe/chain/index.ts"
import just from "../maybe/just/index.ts"
import nothing from "../maybe/nothing/index.ts"
import of from "../maybe/of/index.ts"
import chainResult from "../result/chain/index.ts"
import error from "../result/error/index.ts"
import ok from "../result/ok/index.ts"
import ofResult from "../result/of/index.ts"
import doNotation from "./index.ts"

Deno.test("doNotation", async (t) => {
	await t.step("sequences Maybe computations with Just values", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const computation = doNotation(maybeMonad)(function* () {
			const x = (yield just(2)) as number
			const y = (yield just(3)) as number
			return x + y
		})

		assertEquals(computation, of(5))
	})

	await t.step("short-circuits on Nothing in Maybe", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const computation = doNotation(maybeMonad)(function* () {
			const x = (yield nothing<number>()) as number
			const y = (yield just(3)) as number
			return x + y
		})

		assertEquals(computation, nothing())
	})

	await t.step("sequences Result computations with Ok values", () => {
		const resultChain = chainResult as unknown as MonadDictionary<
			Result<unknown, unknown>
		>["chain"]
		const resultOf = ofResult as unknown as MonadDictionary<
			Result<unknown, unknown>
		>["of"]

		const resultMonad: MonadDictionary<Result<unknown, unknown>> = {
			chain: resultChain,
			of: resultOf,
		}

		const computation = doNotation(resultMonad)(function* () {
			const x = (yield ok(10)) as number
			const y = (yield ok(20)) as number
			return x + y
		})

		assertEquals(computation, ofResult(30))
	})

	await t.step("short-circuits on Error in Result", () => {
		const resultChain = chainResult as unknown as MonadDictionary<
			Result<unknown, unknown>
		>["chain"]
		const resultOf = ofResult as unknown as MonadDictionary<
			Result<unknown, unknown>
		>["of"]

		const resultMonad: MonadDictionary<Result<unknown, unknown>> = {
			chain: resultChain,
			of: resultOf,
		}

		const computation = doNotation(resultMonad)(function* () {
			const x = (yield error<string>("failed")) as number
			const y = (yield ok(20)) as number
			return x + y
		})

		assertEquals(computation, error("failed"))
	})

	await t.step("handles single yield", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const computation = doNotation(maybeMonad)(function* () {
			const x = (yield just(42)) as number
			return x
		})

		assertEquals(computation, of(42))
	})

	await t.step("handles no yields (just return)", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		// [EXCEPTION] Approved exception ONLY in test files and ONLY for generator functions
		// deno-lint-ignore require-yield
		const computation = doNotation(maybeMonad)(function* (): Generator<
			Maybe<unknown>,
			number,
			unknown
		> {
			return 100
		})

		assertEquals(computation, of(100))
	})

	await t.step("handles complex chained computations", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const computation = doNotation(maybeMonad)(function* () {
			const a = (yield just(1)) as number
			const b = (yield just(2)) as number
			const c = (yield just(3)) as number
			const d = (yield just(4)) as number
			return a + b + c + d
		})

		assertEquals(computation, of(10))
	})

	await t.step("preserves type information through yields", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const computation = doNotation(maybeMonad)(function* () {
			const str = (yield just("hello")) as string
			const num = (yield just(42)) as number
			return `${str}:${num}`
		})

		assertEquals(computation, of("hello:42"))
	})
})
