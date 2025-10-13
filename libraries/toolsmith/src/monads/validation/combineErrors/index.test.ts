import { assertEquals } from "@std/assert"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import reduce from "../../../array/reduce/index.ts"
import groupByField from "./groupByField/index.ts"
import combineErrors from "./index.ts"

Deno.test("combineErrors - concatenates error messages per field and preserves structure", async (t) => {
	await t.step("merges same-field messages", () => {
		const a: NonEmptyArray<ValidationError> = [
			{ field: "age", messages: ["must be 18+"] },
		]
		const b: NonEmptyArray<ValidationError> = [
			{ field: "age", messages: ["too young"] },
		]

		const result = combineErrors(a)(b)

		assertEquals(result.length, 1)
		assertEquals(result[0].field, "age")
		assertEquals(result[0].messages, ["must be 18+", "too young"])
	})

	await t.step("keeps separate fields", () => {
		const a: NonEmptyArray<ValidationError> = [
			{ field: "age", messages: ["must be 18+"] },
		]
		const b: NonEmptyArray<ValidationError> = [
			{ field: "name", messages: ["required"] },
		]

		const result = combineErrors(a)(b)

		// Order isn't strictly guaranteed by Object.keys, but with these inputs expect age first
		assertEquals(result.length, 2)
		assertEquals(result[0].field, "age")
		assertEquals(result[1].field, "name")
	})
})

Deno.test("groupByField - reducer accumulates messages per field", () => {
	const errors = [
		{ field: "age", messages: ["must be 18+"] },
		{ field: "age", messages: ["too young"] },
		{ field: "name", messages: ["required"] },
	]

	const grouped = reduce(groupByField)({})(errors)

	assertEquals(grouped, {
		age: ["must be 18+", "too young"],
		name: ["required"],
	})
})
