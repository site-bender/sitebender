import { assertEquals } from "@std/assert"

import right from "./index.ts"

Deno.test("right", async function rightTests(t) {
	await t.step(
		"creates a Right with number value",
		function createsRightNumber() {
			const result = right(42)

			assertEquals(result._tag, "Right")
			if (result._tag === "Right") {
				assertEquals(result.right, 42)
			}
		},
	)

	await t.step(
		"creates a Right with string value",
		function createsRightString() {
			const result = right("success")

			assertEquals(result._tag, "Right")
			if (result._tag === "Right") {
				assertEquals(result.right, "success")
			}
		},
	)

	await t.step(
		"creates a Right with object value",
		function createsRightObject() {
			const user = { id: 1, name: "Alice", email: "alice@example.com" }
			const result = right(user)

			assertEquals(result._tag, "Right")
			if (result._tag === "Right") {
				assertEquals(result.right, user)
			}
		},
	)

	await t.step(
		"creates a Right with boolean value",
		function createsRightBoolean() {
			const result = right(true)

			assertEquals(result._tag, "Right")
			if (result._tag === "Right") {
				assertEquals(result.right, true)
			}
		},
	)

	await t.step(
		"creates a Right with array value",
		function createsRightArray() {
			const items = [1, 2, 3, 4, 5]
			const result = right(items)

			assertEquals(result._tag, "Right")
			if (result._tag === "Right") {
				assertEquals(result.right, items)
			}
		},
	)

	await t.step("creates a Right with null value", function createsRightNull() {
		const result = right(null)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, null)
		}
	})

	await t.step(
		"creates a Right with undefined value",
		function createsRightUndefined() {
			const result = right(undefined)

			assertEquals(result._tag, "Right")
			if (result._tag === "Right") {
				assertEquals(result.right, undefined)
			}
		},
	)

	await t.step("preserves type information", function preservesTypes() {
		const result = right<number, string>(100)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 100)
		}
		// TypeScript should infer Either<string, number>
	})

	await t.step("works with function values", function functionValues() {
		const fn = (x: number) => x * 2
		const result = right(fn)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right(5), 10)
		}
	})

	await t.step("works with nested Either values", function nestedEither() {
		const inner = right(42)
		const result = right(inner)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right._tag, "Right")
			assertEquals(result.right.right, 42)
		}
	})
})
