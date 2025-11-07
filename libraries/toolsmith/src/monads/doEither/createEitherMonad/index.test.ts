import { assertEquals } from "@std/assert"

import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"
import createEitherMonad from "./index.ts"

Deno.test("createEitherMonad", async (t) => {
	await t.step("creates monad dictionary with chain and of", () => {
		const eitherMonad = createEitherMonad<string>()

		assertEquals(typeof eitherMonad.chain, "function")
		assertEquals(typeof eitherMonad.of, "function")
	})

	await t.step("of creates Right value", () => {
		const eitherMonad = createEitherMonad<string>()

		const result = eitherMonad.of(42)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("chain applies function to Right value", () => {
		const eitherMonad = createEitherMonad<string>()

		const doubleRight = function double(n: number) {
			return right<number, string>(n * 2)
		}

		const result = eitherMonad.chain(doubleRight)(right(10))

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 20)
		}
	})

	await t.step("chain short-circuits on Left value", () => {
		const eitherMonad = createEitherMonad<string>()

		const doubleRight = function double(n: number) {
			return right<number, string>(n * 2)
		}

		const leftValue = left<string, number>("error")
		const result = eitherMonad.chain(doubleRight)(leftValue)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "error")
		}
	})

	await t.step("chain preserves type through transformations", () => {
		const eitherMonad = createEitherMonad<string>()

		const toString = function convertToString(n: number) {
			return right<string, string>(n.toString())
		}

		const result = eitherMonad.chain(toString)(right(42))

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, "42")
		}
	})

	await t.step("supports chaining multiple operations", () => {
		const eitherMonad = createEitherMonad<string>()

		const addTen = function add(n: number) {
			return right<number, string>(n + 10)
		}

		const double = function mult(n: number) {
			return right<number, string>(n * 2)
		}

		const value = right<number, string>(5)
		const step1 = eitherMonad.chain(addTen)(value)
		const step2 = eitherMonad.chain(double)(step1)

		assertEquals(step2._tag, "Right")
		if (step2._tag === "Right") {
			assertEquals(step2.right, 30)
		}
	})

	await t.step("works with complex Left types", () => {
		type ValidationError = {
			field: string
			message: string
		}

		const eitherMonad = createEitherMonad<ValidationError>()

		const errorValue = left<ValidationError, number>({
			field: "age",
			message: "must be positive",
		})

		const transform = function transformValue(n: number) {
			return right<number, ValidationError>(n * 2)
		}

		const result = eitherMonad.chain(transform)(errorValue)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left.field, "age")
			assertEquals(result.left.message, "must be positive")
		}
	})

	await t.step("of and chain satisfy left identity monad law", () => {
		const eitherMonad = createEitherMonad<string>()

		const f = function toRight(n: number) {
			return right<string, string>(`value: ${n}`)
		}

		const a = 42
		const leftIdentity = eitherMonad.chain(f)(eitherMonad.of(a))
		const direct = f(a)

		assertEquals(leftIdentity, direct)
	})

	await t.step("chain satisfies right identity monad law", () => {
		const eitherMonad = createEitherMonad<string>()

		const m = right<number, string>(100)
		const rightIdentity = eitherMonad.chain(eitherMonad.of)(m)

		assertEquals(rightIdentity._tag, m._tag)
		if (rightIdentity._tag === "Right" && m._tag === "Right") {
			assertEquals(rightIdentity.right, m.right)
		}
	})
})
