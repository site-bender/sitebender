import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import hasTag from "./index.ts"

Deno.test("hasTag", async function hasTagTests(t) {
	await t.step(
		"returns true when tag matches",
		function returnsTrueWhenMatches() {
			const element = {
				_tag: "element" as const,
				tagName: "div",
			}

			const result = hasTag("element")(element)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when tag does not match",
		function returnsFalseWhenNoMatch() {
			const element = {
				_tag: "element" as const,
				tagName: "div",
			}

			const result = hasTag("text")(element)

			assertEquals(result, false)
		},
	)

	await t.step(
		"works with text tag",
		function worksWithTextTag() {
			const text = {
				_tag: "text" as const,
				content: "Hello",
			}

			const result = hasTag("text")(text)

			assertEquals(result, true)
		},
	)

	await t.step(
		"works with comment tag",
		function worksWithCommentTag() {
			const comment = {
				_tag: "comment" as const,
				content: "A comment",
			}

			const result = hasTag("comment")(comment)

			assertEquals(result, true)
		},
	)

	await t.step(
		"works with error tag",
		function worksWithErrorTag() {
			const error = {
				_tag: "error" as const,
				errorType: "INVALID_CHILD",
			}

			const result = hasTag("error")(error)

			assertEquals(result, true)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const isElement = hasTag("element")
			const element = { _tag: "element" as const }
			const text = { _tag: "text" as const }

			assertEquals(isElement(element), true)
			assertEquals(isElement(text), false)
		},
	)

	await t.step(
		"works with custom tag values",
		function worksWithCustomTags() {
			const custom = {
				_tag: "custom-type" as const,
				data: "value",
			}

			const result = hasTag("custom-type")(custom)

			assertEquals(result, true)
		},
	)
})

Deno.test("hasTag - property: returns boolean", function alwaysReturnsBoolean() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.record({
				_tag: fc.string(),
			}),
			function propertyReturnsBoolean(tag, obj) {
				const result = hasTag(tag)(obj)
				assertEquals(typeof result, "boolean")
			},
		),
	)
})

Deno.test("hasTag - property: returns true only when tags match", function returnsTrueOnMatch() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.record({
				_tag: fc.string(),
			}),
			function propertyMatchesCorrectly(tag, obj) {
				const result = hasTag(tag)(obj)
				assertEquals(result, obj._tag === tag)
			},
		),
	)
})

Deno.test("hasTag - property: curried version equivalent to direct call", function curriedEquivalent() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.record({
				_tag: fc.string(),
			}),
			function propertyCurriedEquivalent(tag, obj) {
				const curriedResult = hasTag(tag)(obj)
				const directResult = obj._tag === tag

				assertEquals(curriedResult, directResult)
			},
		),
	)
})
