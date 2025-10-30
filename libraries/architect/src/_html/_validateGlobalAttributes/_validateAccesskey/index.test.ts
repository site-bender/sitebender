import { assertEquals } from "@std/assert"

import _validateAccesskey from "./index.ts"

Deno.test("_validateAccesskey", async function _validateAccesskeyTests(t) {
	await t.step(
		"returns empty object when accesskey absent",
		function returnsEmptyWhenAbsent() {
			const result = _validateAccesskey({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"accepts single printable character",
		function acceptsSingleChar() {
			assertEquals(_validateAccesskey({ accesskey: "A" }), { accesskey: "A" })
			assertEquals(_validateAccesskey({ accesskey: "z" }), { accesskey: "z" })
			assertEquals(_validateAccesskey({ accesskey: "5" }), { accesskey: "5" })
			assertEquals(_validateAccesskey({ accesskey: "@" }), { accesskey: "@" })
			assertEquals(_validateAccesskey({ accesskey: " " }), { accesskey: " " })
		},
	)

	await t.step(
		"returns empty object for multi-character strings",
		function returnsEmptyForMultiChar() {
			assertEquals(_validateAccesskey({ accesskey: "ab" }), {})
			assertEquals(_validateAccesskey({ accesskey: "test" }), {})
			assertEquals(_validateAccesskey({ accesskey: "ABC" }), {})
		},
	)

	await t.step(
		"returns empty object for empty string",
		function returnsEmptyForEmptyString() {
			assertEquals(_validateAccesskey({ accesskey: "" }), {})
		},
	)

	await t.step(
		"returns empty object for non-printable characters",
		function returnsEmptyForNonPrintable() {
			assertEquals(_validateAccesskey({ accesskey: "\n" }), {})
			assertEquals(_validateAccesskey({ accesskey: "\t" }), {})
			assertEquals(_validateAccesskey({ accesskey: "\r" }), {})
		},
	)

	await t.step(
		"returns empty object for non-string values",
		function returnsEmptyForNonString() {
			assertEquals(_validateAccesskey({ accesskey: 123 }), {})
			assertEquals(_validateAccesskey({ accesskey: true }), {})
			assertEquals(_validateAccesskey({ accesskey: null }), {})
		},
	)
})
