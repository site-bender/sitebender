import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import getTag from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("getTag", async function getTagTests(t) {
	await t.step(
		"retrieves _tag from element object",
		function retrievesElementTag() {
			const element = {
				_tag: "element" as const,
				tagName: "div",
				attributes: {},
				children: [],
			}

			const result = getTag(element)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "element")
			}
		},
	)

	await t.step(
		"retrieves _tag from text object",
		function retrievesTextTag() {
			const text = {
				_tag: "text" as const,
				content: "Hello",
			}

			const result = getTag(text)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "text")
			}
		},
	)

	await t.step(
		"retrieves _tag from comment object",
		function retrievesCommentTag() {
			const comment = {
				_tag: "comment" as const,
				content: "A comment",
			}

			const result = getTag(comment)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "comment")
			}
		},
	)

	await t.step(
		"retrieves _tag from error object",
		function retrievesErrorTag() {
			const error = {
				_tag: "error" as const,
				errorType: "INVALID_CHILD",
				message: "Invalid child type",
			}

			const result = getTag(error)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "error")
			}
		},
	)

	await t.step(
		"works with custom tag values",
		function worksWithCustomTags() {
			const custom = {
				_tag: "custom-type" as const,
				data: "value",
			}

			const result = getTag(custom)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "custom-type")
			}
		},
	)

	await t.step(
		"returns error when object has no _tag",
		function returnsErrorWhenNoTag() {
			const obj = { name: "test" }

			const result = getTag(obj as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "GET_TAG_INVALID_INPUT")
			}
		},
	)

	await t.step(
		"returns error when _tag is empty string",
		function returnsErrorWhenEmptyTag() {
			const obj = { _tag: "" }

			const result = getTag(obj as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "GET_TAG_INVALID_INPUT")
			}
		},
	)

	await t.step(
		"returns error when input is not a plain object",
		function returnsErrorWhenNotPlainObject() {
			const arr = [1, 2, 3]

			const result = getTag(arr as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "GET_TAG_INVALID_INPUT")
			}
		},
	)
})

Deno.test("getTag - property: always returns Result", function alwaysReturnsResult() {
	fc.assert(
		fc.property(
			fc.record({
				_tag: fc.string().filter((s) => s.length > 0),
				otherProp: fc.anything(),
			}),
			function propertyReturnsResult(obj) {
				const result = getTag(obj)

				assertEquals(
					isOk(result) || isError(result),
					true,
				)
			},
		),
	)
})

Deno.test("getTag - property: valid objects return Ok with _tag value", function validObjectsReturnOk() {
	fc.assert(
		fc.property(
			fc.record({
				_tag: fc.string().filter((s) => s.length > 0),
			}),
			function propertyValidObjectsOk(obj) {
				const result = getTag(obj)

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, obj._tag)
				}
			},
		),
	)
})
