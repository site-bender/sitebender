import { assertEquals } from "@std/assert"

import just from "./index.ts"

Deno.test("just", async function justTests(t) {
	await t.step("creates a Just with number value", function createsJustNumber() {
		const result = just(42)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("creates a Just with string value", function createsJustString() {
		const result = just("hello")

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, "hello")
		}
	})

	await t.step("creates a Just with object value", function createsJustObject() {
		const user = { id: 1, name: "Alice", email: "alice@example.com" }
		const result = just(user)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, user)
		}
	})

	await t.step("creates a Just with null value", function createsJustNull() {
		const result = just(null)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, null)
		}
	})

	await t.step("creates a Just with undefined value", function createsJustUndefined() {
		const result = just(undefined)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, undefined)
		}
	})

	await t.step("creates a Just with array value", function createsJustArray() {
		const items = [1, 2, 3, 4, 5]
		const result = just(items)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, items)
		}
	})

	await t.step("creates a Just with boolean value", function createsJustBoolean() {
		const resultTrue = just(true)
		const resultFalse = just(false)

		assertEquals(resultTrue._tag, "Just")
		if (resultTrue._tag === "Just") {
			assertEquals(resultTrue.value, true)
		}

		assertEquals(resultFalse._tag, "Just")
		if (resultFalse._tag === "Just") {
			assertEquals(resultFalse.value, false)
		}
	})

	await t.step("preserves type information", function preservesTypes() {
		interface User {
			id: number
			name: string
		}

		const user: User = { id: 1, name: "Bob" }
		const result = just<User>(user)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Bob")
		}
	})

	await t.step("works with function values", function functionValues() {
		const fn = (x: number) => x * 2
		const result = just(fn)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value(5), 10)
		}
	})

	await t.step("works with nested Maybe values", function nestedMaybe() {
		const inner = just(42)
		const result = just(inner)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value._tag, "Just")
			if (result.value._tag === "Just") {
				assertEquals(result.value.value, 42)
			}
		}
	})
})
