import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isRegExp from "./index.ts"

Deno.test("isRegExp", async function isRegExpTests(t) {
	await t.step(
		"returns true for RegExp literals",
		function returnsTrueForRegExpLiterals() {
			assertEquals(isRegExp(/test/), true)
			assertEquals(isRegExp(/test/gi), true)
		},
	)

	await t.step(
		"returns true for RegExp constructor",
		function returnsTrueForRegExpConstructor() {
			assertEquals(isRegExp(new RegExp("test")), true)
			assertEquals(isRegExp(new RegExp("test", "gi")), true)
		},
	)

	await t.step(
		"returns false for regex strings",
		function returnsFalseForRegexStrings() {
			assertEquals(isRegExp("/test/"), false)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isRegExp(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isRegExp(undefined), false)
		},
	)

	await t.step(
		"returns false for objects",
		function returnsFalseForObjects() {
			assertEquals(isRegExp({}), false)
		},
	)

	await t.step(
		"returns false for arrays",
		function returnsFalseForArrays() {
			assertEquals(isRegExp([]), false)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isRegExp(42), false)
		},
	)
})

Deno.test("isRegExp - property: all non-RegExp values return false", function nonRegExpsFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.integer(),
				fc.float(),
				fc.boolean(),
				fc.array(fc.anything()),
				fc.dictionary(fc.string(), fc.anything()),
			),
			function propertyNonRegExps(value) {
				assertEquals(isRegExp(value), false)
			},
		),
	)
})
