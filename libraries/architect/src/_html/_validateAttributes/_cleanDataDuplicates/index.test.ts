import { assertEquals } from "@std/assert"

import _cleanDataDuplicates from "./index.ts"

Deno.test("_cleanDataDuplicates", async function cleanDataDuplicatesTests(t) {
	await t.step(
		"returns empty object for empty attrs",
		function returnsEmptyObject() {
			const result = _cleanDataDuplicates({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"cleans data-data-* duplicates",
		function cleansDuplicates() {
			const result = _cleanDataDuplicates({
				"data-data-custom": "value1",
				"data-data-other": "value2",
			})

			assertEquals(result, {
				"data-custom": "value1",
				"data-other": "value2",
			})
		},
	)

	await t.step(
		"preserves single data-* attributes",
		function preservesSingleData() {
			const result = _cleanDataDuplicates({
				"data-custom": "value1",
				"data-test": "value2",
			})

			assertEquals(result, {
				"data-custom": "value1",
				"data-test": "value2",
			})
		},
	)

	await t.step(
		"preserves non-data attributes",
		function preservesNonData() {
			const result = _cleanDataDuplicates({
				id: "test",
				class: "container",
				"data-value": "test",
			})

			assertEquals(result, {
				id: "test",
				class: "container",
				"data-value": "test",
			})
		},
	)

	await t.step(
		"handles mixed attributes",
		function handlesMixed() {
			const result = _cleanDataDuplicates({
				id: "test",
				"data-data-custom": "value",
				"data-normal": "normal",
				class: "container",
			})

			assertEquals(result, {
				id: "test",
				"data-custom": "value",
				"data-normal": "normal",
				class: "container",
			})
		},
	)
})
