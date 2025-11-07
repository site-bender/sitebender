import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isPrintableCharacter from "./index.ts"

Deno.test("isPrintableCharacter", async function isPrintableCharacterTests(t) {
	await t.step(
		"returns true for printable ASCII characters",
		function returnsTrueForPrintable() {
			assertEquals(isPrintableCharacter(" "), true) // Space (32)
			assertEquals(isPrintableCharacter("!"), true)
			assertEquals(isPrintableCharacter("A"), true)
			assertEquals(isPrintableCharacter("Z"), true)
			assertEquals(isPrintableCharacter("a"), true)
			assertEquals(isPrintableCharacter("z"), true)
			assertEquals(isPrintableCharacter("0"), true)
			assertEquals(isPrintableCharacter("9"), true)
			assertEquals(isPrintableCharacter("~"), true) // Tilde (126)
			assertEquals(isPrintableCharacter("@"), true)
			assertEquals(isPrintableCharacter("#"), true)
			assertEquals(isPrintableCharacter("$"), true)
			assertEquals(isPrintableCharacter("%"), true)
		},
	)

	await t.step(
		"returns false for non-printable ASCII characters",
		function returnsFalseForNonPrintable() {
			assertEquals(isPrintableCharacter("\n"), false) // Newline (10)
			assertEquals(isPrintableCharacter("\t"), false) // Tab (9)
			assertEquals(isPrintableCharacter("\r"), false) // Carriage return (13)
			assertEquals(isPrintableCharacter("\0"), false) // Null (0)
			assertEquals(isPrintableCharacter("\x1F"), false) // Unit separator (31)
			assertEquals(isPrintableCharacter("\x7F"), false) // DEL (127)
		},
	)

	await t.step(
		"returns false for empty string",
		function returnsFalseForEmpty() {
			assertEquals(isPrintableCharacter(""), false)
		},
	)

	await t.step(
		"returns false for multi-character strings",
		function returnsFalseForMultiChar() {
			assertEquals(isPrintableCharacter("ab"), false)
			assertEquals(isPrintableCharacter("ABC"), false)
			assertEquals(isPrintableCharacter("hello"), false)
			assertEquals(isPrintableCharacter("  "), false) // Two spaces
		},
	)

	await t.step(
		"returns false for Unicode characters outside ASCII range",
		function returnsFalseForUnicode() {
			assertEquals(isPrintableCharacter("é"), false)
			assertEquals(isPrintableCharacter("你"), false)
			assertEquals(isPrintableCharacter("🚀"), false)
			assertEquals(isPrintableCharacter("ñ"), false)
		},
	)

	await t.step(
		"returns false for non-string values",
		function returnsFalseForNonStrings() {
			assertEquals(isPrintableCharacter(65), false) // ASCII code for 'A'
			assertEquals(isPrintableCharacter(true), false)
			assertEquals(isPrintableCharacter(false), false)
			assertEquals(isPrintableCharacter(null), false)
			assertEquals(isPrintableCharacter(undefined), false)
			assertEquals(isPrintableCharacter({}), false)
			assertEquals(isPrintableCharacter([]), false)
			assertEquals(isPrintableCharacter(["A"]), false)
		},
	)

	await t.step(
		"tests boundary values",
		function testsBoundaries() {
			// Character 31 (just below printable range)
			assertEquals(isPrintableCharacter("\x1F"), false)

			// Character 32 (space - first printable)
			assertEquals(isPrintableCharacter(" "), true)

			// Character 126 (tilde - last printable)
			assertEquals(isPrintableCharacter("~"), true)

			// Character 127 (DEL - just above printable range)
			assertEquals(isPrintableCharacter("\x7F"), false)
		},
	)

	await t.step(
		"works as type guard",
		function typeGuard() {
			const value: string | number = "A"

			if (isPrintableCharacter(value)) {
				// TypeScript knows value is string here
				assertEquals(value.length, 1)
				assertEquals(value, "A")
			}

			const multiChar: string | number = "AB"

			if (!isPrintableCharacter(multiChar)) {
				// TypeScript knows this is not a single printable character
				assertEquals(typeof multiChar === "string" ? multiChar.length : 0, 2)
			}
		},
	)

	await t.step(
		"works with array filter",
		function arrayFilter() {
			const values: Array<string | number | boolean | null> = [
				"A",
				"hello",
				"B",
				42,
				" ",
				"",
				"\n",
				"C",
				null,
			]
			const printableChars = values.filter(isPrintableCharacter)

			assertEquals(printableChars.length, 3)
			assertEquals(printableChars, ["A", "B", " "])
		},
	)
})

Deno.test(
	"isPrintableCharacter - property: all single printable ASCII chars return true",
	function allPrintableTrue() {
		fc.assert(
			fc.property(
				fc.integer({ min: 32, max: 126 }),
				function propertyPrintableChars(charCode) {
					const char = String.fromCharCode(charCode)
					assertEquals(isPrintableCharacter(char), true)
				},
			),
		)
	},
)

Deno.test(
	"isPrintableCharacter - property: non-printable ASCII chars return false",
	function nonPrintableFalse() {
		fc.assert(
			fc.property(
				fc.oneof(
					fc.integer({ min: 0, max: 31 }),
					fc.integer({ min: 127, max: 255 }),
				),
				function propertyNonPrintable(charCode) {
					const char = String.fromCharCode(charCode)
					assertEquals(isPrintableCharacter(char), false)
				},
			),
		)
	},
)

Deno.test(
	"isPrintableCharacter - property: multi-character strings return false",
	function multiCharFalse() {
		fc.assert(
			fc.property(
				fc.string({ minLength: 2 }),
				function propertyMultiChar(value) {
					assertEquals(isPrintableCharacter(value), false)
				},
			),
		)
	},
)

Deno.test(
	"isPrintableCharacter - property: idempotent",
	function idempotent() {
		fc.assert(
			fc.property(
				fc.anything(),
				function propertyIdempotent(value) {
					const first = isPrintableCharacter(value)
					const second = isPrintableCharacter(value)
					assertEquals(first, second)
				},
			),
		)
	},
)
