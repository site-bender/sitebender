import { assert, assertEquals } from "@std/assert"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

import isbn from "./index.ts"
import unsafeIsbn from "./unsafeIsbn/index.ts"
import unwrapIsbn from "./unwrapIsbn/index.ts"

Deno.test("isbn smart constructor", async function isbnTests(t) {
	await t.step(
		"returns Ok for valid input",
		function returnsOkForValidInput() {
			// TODO: Replace with actual valid input
			const result = isbn("valid-input" as never)
			assert(isOk(result))
		},
	)

	await t.step(
		"returns Error for invalid input",
		function returnsErrorForInvalidInput() {
			// TODO: Replace with actual invalid input
			const result = isbn("invalid-input" as never)
			assert(isError(result))

			if (isError(result)) {
				assertEquals(result.error.code, "ISBN_INVALID")
			}
		},
	)
})

Deno.test("unsafeIsbn constructor", async function unsafeIsbnTests(t) {
	await t.step(
		"brands value without validation",
		function brandsWithoutValidation() {
			// TODO: Replace with actual input
			const branded = unsafeIsbn("test-value" as never)
			// Type assertion validates it's branded
			const _typeCheck: Isbn = branded
			assert(branded !== undefined)
		},
	)
})

Deno.test("unwrapIsbn function", async function unwrapIsbnTests(t) {
	await t.step(
		"extracts underlying primitive",
		function extractsUnderlying() {
			// TODO: Replace with actual input
			const branded = unsafeIsbn("test-value" as never)
			const unwrapped = unwrapIsbn(branded)
			assertEquals(unwrapped, "test-value")
		},
	)
})
