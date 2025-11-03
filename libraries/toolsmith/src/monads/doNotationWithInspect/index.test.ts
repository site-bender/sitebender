import { assertEquals } from "@std/assert"

import type { Maybe } from "../../types/fp/maybe/index.ts"
import type { MonadDictionary } from "../doNotation/index.ts"

import chain from "../maybe/chain/index.ts"
import just from "../maybe/just/index.ts"
import nothing from "../maybe/nothing/index.ts"
import of from "../maybe/of/index.ts"
import doNotationWithInspect from "./index.ts"

Deno.test("doNotationWithInspect", async (t) => {
	await t.step("sequences Maybe computations with inspection", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		const computation = doNotationWithInspect(maybeMonad, {
			label: "test",
		})(function* () {
			const x = (yield just(2)) as number
			const y = (yield just(3)) as number
			return x + y
		})

		console.log = originalLog

		assertEquals(computation, of(5))
		assertEquals(logs.length > 0, true)
	})

	await t.step("respects custom label in logs", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		doNotationWithInspect(maybeMonad, { label: "custom" })(function* () {
			const x = (yield just(10)) as number
			return x
		})

		console.log = originalLog

		const hasCustomLabel = logs.some(function hasLabel(log: string): boolean {
			return log.includes("[custom:")
		})
		assertEquals(hasCustomLabel, true)
	})

	await t.step("handles maxDepth configuration", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		doNotationWithInspect(maybeMonad, { maxDepth: 1 })(function* () {
			const x = (yield just({ nested: { deep: { value: 42 } } })) as unknown
			return x
		})

		console.log = originalLog

		const hasTruncation = logs.some(function hasTrunc(log: string): boolean {
			return log.includes("...")
		})
		assertEquals(hasTruncation, true)
	})

	await t.step("handles filter configuration", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		doNotationWithInspect(maybeMonad, {
			filter: function filterNumbers(value: unknown): boolean {
				return typeof value === "number"
			},
		})(function* () {
			const _x = (yield just("string")) as string
			const y = (yield just(42)) as number
			return y
		})

		console.log = originalLog

		const hasNumber = logs.some(function hasNum(log: string): boolean {
			return log.includes("42")
		})
		const hasString = logs.some(function hasStr(log: string): boolean {
			return log.includes('"string"')
		})

		assertEquals(hasNumber, true)
		assertEquals(hasString, false)
	})

	await t.step("handles showTypes configuration", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		doNotationWithInspect(maybeMonad, { showTypes: true })(function* () {
			const x = (yield just(42)) as number
			return x
		})

		console.log = originalLog

		const hasTypeInfo = logs.some(function hasType(log: string): boolean {
			return log.includes("(number)")
		})
		assertEquals(hasTypeInfo, true)
	})

	await t.step("short-circuits on Nothing", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		const computation = doNotationWithInspect(maybeMonad)(function* () {
			const x = (yield nothing<number>()) as number
			const y = (yield just(42)) as number
			return x + y
		})

		console.log = originalLog

		assertEquals(computation, nothing())
	})

	await t.step("formats arrays correctly", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		doNotationWithInspect(maybeMonad)(function* () {
			const arr = (yield just([1, 2, 3])) as Array<number>
			return arr
		})

		console.log = originalLog

		const hasArrayFormat = logs.some(function hasArr(log: string): boolean {
			return log.includes("[1, 2, 3]")
		})
		assertEquals(hasArrayFormat, true)
	})

	await t.step("formats objects correctly", () => {
		const maybeChain = chain as unknown as MonadDictionary<
			Maybe<unknown>
		>["chain"]
		const maybeOf = of as unknown as MonadDictionary<Maybe<unknown>>["of"]

		const maybeMonad: MonadDictionary<Maybe<unknown>> = {
			chain: maybeChain,
			of: maybeOf,
		}

		const logs: Array<string> = []
		const originalLog = console.log
		console.log = function captureLog(...args: Array<unknown>): void {
			logs.push(args.join(" "))
		}

		doNotationWithInspect(maybeMonad)(function* () {
			const obj = (yield just({ x: 1, y: 2 })) as { x: number; y: number }
			return obj
		})

		console.log = originalLog

		const hasObjectFormat = logs.some(function hasObj(log: string): boolean {
			return log.includes("x:") && log.includes("y:")
		})
		assertEquals(hasObjectFormat, true)
	})
})
