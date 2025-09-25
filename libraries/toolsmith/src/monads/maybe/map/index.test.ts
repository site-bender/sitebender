import { assertEquals } from "@std/assert"

import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import map from "./index.ts"

Deno.test("map", async function mapTests(t) {
	await t.step("transforms Just values", function transformsJust() {
		const double = (x: number) => x * 2
		const result = map(double)(just(5))

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, 10)
		}
	})

	await t.step("leaves Nothing unchanged", function leavesNothing() {
		const double = (x: number) => x * 2
		const result = map(double)(nothing<number>())

		assertEquals(result._tag, "Nothing")
	})

	await t.step("works with different types", function differentTypes() {
		const toString = (x: number) => x.toString()
		const result = map(toString)(just(42))

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, "42")
		}
	})

	await t.step("chains multiple maps", function chainsMultipleMaps() {
		const addOne = (x: number) => x + 1
		const double = (x: number) => x * 2
		const toString = (x: number) => x.toString()

		const mapAddOne = map(addOne)
		const mapDouble = map(double)
		const mapToString = map(toString)

		const result = mapToString(mapDouble(mapAddOne(just(5))))

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, "12") // (5 + 1) * 2 = 12
		}
	})

	await t.step(
		"preserves Nothing through chain",
		function preservesNothingInChain() {
			const addOne = (x: number) => x + 1
			const double = (x: number) => x * 2

			const result = map(double)(map(addOne)(nothing<number>()))

			assertEquals(result._tag, "Nothing")
		},
	)

	await t.step(
		"works with object transformation",
		function objectTransformation() {
			interface User {
				name: string
				age: number
			}

			const getName = (user: User) => user.name
			const result = map(getName)(just({ name: "Alice", age: 30 }))

			assertEquals(result._tag, "Just")
			if (result._tag === "Just") {
				assertEquals(result.value, "Alice")
			}
		},
	)

	await t.step("handles function composition", function functionComposition() {
		const compose = <A, B, C>(f: (b: B) => C) => (g: (a: A) => B) => (a: A) =>
			f(g(a))
		const add = (x: number) => x + 10
		const multiply = (x: number) => x * 2
		const composed = compose(multiply)(add)

		const result = map(composed)(just(5))

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, 30) // (5 + 10) * 2
		}
	})

	await t.step("preserves functor laws", async function functorLaws(t) {
		await t.step("identity law", function identityLaw() {
			const id = <T>(x: T) => x
			const value = just(42)

			const result = map(id)(value)
			assertEquals(result, value)
		})

		await t.step("composition law", function compositionLaw() {
			const f = (x: number) => x + 1
			const g = (x: number) => x * 2
			const value = just(5)

			const result1 = map((x: number) => g(f(x)))(value)
			const result2 = map(g)(map(f)(value))

			assertEquals(result1, result2)
		})
	})

	await t.step("handles null and undefined", function handlesNullUndefined() {
		const toLength = (s: string | null | undefined) => s ? s.length : 0

		const resultJust = map(toLength)(just("hello"))
		const resultNull = map(toLength)(just(null))
		const resultNothing = map(toLength)(nothing<string>())

		assertEquals(resultJust._tag, "Just")
		if (resultJust._tag === "Just") {
			assertEquals(resultJust.value, 5)
		}

		assertEquals(resultNull._tag, "Just")
		if (resultNull._tag === "Just") {
			assertEquals(resultNull.value, 0)
		}

		assertEquals(resultNothing._tag, "Nothing")
	})

	await t.step("works with partial application", function partialApplication() {
		const multiplyBy = (factor: number) => (x: number) => x * factor
		const double = map(multiplyBy(2))
		const triple = map(multiplyBy(3))

		assertEquals(double(just(5))._tag, "Just")
		if (double(just(5))._tag === "Just") {
			assertEquals(double(just(5)).value, 10)
		}

		assertEquals(triple(just(5))._tag, "Just")
		if (triple(just(5))._tag === "Just") {
			assertEquals(triple(just(5)).value, 15)
		}
	})
})
