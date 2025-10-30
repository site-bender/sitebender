import { assertEquals } from "@std/assert"

import type { Maybe } from "../../types/fp/maybe/index.ts"
import type { MonadDictionary } from "../doNotation/index.ts"

import chain from "../maybe/chain/index.ts"
import just from "../maybe/just/index.ts"
import nothing from "../maybe/nothing/index.ts"
import of from "../maybe/of/index.ts"
import doNotationWithTap from "./index.ts"

Deno.test("doNotationWithTap", async (t) => {
	await t.step("sequences Maybe computations with tap function", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const tappedValues: Array<unknown> = []

		const computation = doNotationWithTap(
			maybeMonad,
			function tapValue(value: unknown): void {
				tappedValues.push(value)
			},
		)(function* () {
			const x = (yield just(2)) as number
			const y = (yield just(3)) as number
			return x + y
		})

		assertEquals(computation, of(5))
		assertEquals(tappedValues.length > 0, true)
	})

	await t.step("tap function receives intermediate values", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const tappedValues: Array<unknown> = []

		doNotationWithTap(
			maybeMonad,
			function tapValue(value: unknown): void {
				tappedValues.push(value)
			},
		)(function* () {
			const x = (yield just(10)) as number
			const y = (yield just(20)) as number
			return x + y
		})

		assertEquals(tappedValues.includes(10), true)
		assertEquals(tappedValues.includes(20), true)
		assertEquals(tappedValues.includes(30), true)
	})

	await t.step("tap function receives final value", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const tappedValues: Array<unknown> = []

		doNotationWithTap(
			maybeMonad,
			function tapValue(value: unknown): void {
				tappedValues.push(value)
			},
			// [EXCEPTION] Approved exception ONLY in test files and ONLY for generator functions
			// deno-lint-ignore require-yield
		)(function* (): Generator<Maybe<unknown>, number, unknown> {
			return 42
		})

		assertEquals(tappedValues.includes(42), true)
	})

	await t.step("short-circuits on Nothing", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const tappedValues: Array<unknown> = []

		const computation = doNotationWithTap(
			maybeMonad,
			function tapValue(value: unknown): void {
				tappedValues.push(value)
			},
		)(function* () {
			const x = (yield nothing<number>()) as number
			const y = (yield just(42)) as number
			return x + y
		})

		assertEquals(computation, nothing())
		assertEquals(tappedValues.includes(42), false)
	})

	await t.step("tap function can perform side effects", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		let sideEffectCounter = 0

		doNotationWithTap(
			maybeMonad,
			function incrementCounter(_value: unknown): void {
				sideEffectCounter++
			},
		)(function* () {
			const x = (yield just(1)) as number
			const y = (yield just(2)) as number
			const z = (yield just(3)) as number
			return x + y + z
		})

		assertEquals(sideEffectCounter, 4)
	})

	await t.step("handles single yield", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const tappedValues: Array<unknown> = []

		const computation = doNotationWithTap(
			maybeMonad,
			function tapValue(value: unknown): void {
				tappedValues.push(value)
			},
		)(function* () {
			const x = (yield just(100)) as number
			return x
		})

		assertEquals(computation, of(100))
		assertEquals(tappedValues.includes(100), true)
	})

	await t.step("handles complex types", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const tappedValues: Array<unknown> = []

		doNotationWithTap(
			maybeMonad,
			function tapValue(value: unknown): void {
				tappedValues.push(value)
			},
		)(function* () {
			const obj = (yield just({ x: 1, y: 2 })) as { x: number; y: number }
			const arr = (yield just([1, 2, 3])) as Array<number>
			return { obj, arr }
		})

		const hasObject = tappedValues.some(function hasObj(v: unknown): boolean {
			return typeof v === "object" && v !== null && "x" in v && "y" in v
		})
		const hasArray = tappedValues.some(function hasArr(v: unknown): boolean {
			return Array.isArray(v) && v.length === 3
		})

		assertEquals(hasObject, true)
		assertEquals(hasArray, true)
	})

	await t.step("tap does not modify monadic value", () => {
		const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const computation = doNotationWithTap(
			maybeMonad,
			function modifyAttempt(_value: unknown): void {
				// Attempt to modify (should not affect result)
			},
		)(function* () {
			const x = (yield just(42)) as number
			return x * 2
		})

		assertEquals(computation, of(84))
	})
})
