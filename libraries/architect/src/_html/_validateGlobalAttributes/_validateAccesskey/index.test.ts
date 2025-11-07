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
		"returns data-§-bad-accesskey for multi-character strings",
		function returnsBadForMultiChar() {
			assertEquals(_validateAccesskey({ accesskey: "ab" }), {
				"data-§-bad-accesskey": "ab",
			})
			assertEquals(_validateAccesskey({ accesskey: "test" }), {
				"data-§-bad-accesskey": "test",
			})
			assertEquals(_validateAccesskey({ accesskey: "ABC" }), {
				"data-§-bad-accesskey": "ABC",
			})
		},
	)

	await t.step(
		"returns data-§-bad-accesskey for empty string",
		function returnsBadForEmptyString() {
			assertEquals(_validateAccesskey({ accesskey: "" }), {
				"data-§-bad-accesskey": "",
			})
		},
	)

	await t.step(
		"returns data-§-bad-accesskey for non-printable characters",
		function returnsBadForNonPrintable() {
			assertEquals(_validateAccesskey({ accesskey: "\n" }), {
				"data-§-bad-accesskey": "\n",
			})
			assertEquals(_validateAccesskey({ accesskey: "\t" }), {
				"data-§-bad-accesskey": "\t",
			})
			assertEquals(_validateAccesskey({ accesskey: "\r" }), {
				"data-§-bad-accesskey": "\r",
			})
		},
	)

	await t.step(
		"returns data-§-bad-accesskey for non-string values",
		function returnsBadForNonString() {
			assertEquals(_validateAccesskey({ accesskey: 123 }), {
				"data-§-bad-accesskey": "123",
			})
			assertEquals(_validateAccesskey({ accesskey: true }), {
				"data-§-bad-accesskey": "true",
			})
			assertEquals(_validateAccesskey({ accesskey: null }), {
				"data-§-bad-accesskey": "null",
			})
		},
	)
})
