import { assertEquals } from "@std/assert"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"

import _validateAriaValue from "./index.ts"

Deno.test("_validateAriaValue", async function validateAriaValueTests(t) {
	await t.step(
		"returns undefined for unknown attribute",
		function returnsUndefinedForUnknown() {
			const result = _validateAriaValue("unknown-attribute")("some-value")

			assertEquals(result, undefined)
		},
	)

	await t.step(
		"validates boolean type - accepts true and false",
		function validatesBoolean() {
			const validate = _validateAriaValue("aria-busy")

			assertEquals(validate("true"), undefined)
			assertEquals(validate("false"), undefined)
		},
	)

	await t.step(
		"validates boolean type - rejects invalid values",
		function rejectsInvalidBoolean() {
			const validate = _validateAriaValue("aria-busy")

			const result = validate("yes")

			assertEquals(isDefined(result), true)
			assertEquals(
				result,
				'Attribute \'aria-busy\' must be "true" or "false", got "yes"',
			)
		},
	)

	await t.step(
		"validates tristate type - accepts all four values",
		function validatesTristate() {
			const validate = _validateAriaValue("aria-pressed")

			assertEquals(validate("true"), undefined)
			assertEquals(validate("false"), undefined)
			assertEquals(validate("mixed"), undefined)
			assertEquals(validate("undefined"), undefined)
		},
	)

	await t.step(
		"validates tristate type - rejects invalid values",
		function rejectsInvalidTristate() {
			const validate = _validateAriaValue("aria-pressed")

			const result = validate("yes")

			assertEquals(isDefined(result), true)
			assertEquals(result?.includes("must be one of"), true)
			assertEquals(result?.includes("yes"), true)
		},
	)

	await t.step(
		"validates nmtoken with enumerated values",
		function validatesNmtokenEnum() {
			const validate = _validateAriaValue("aria-current")

			assertEquals(validate("page"), undefined)
			assertEquals(validate("step"), undefined)
			assertEquals(validate("location"), undefined)
			assertEquals(validate("date"), undefined)
			assertEquals(validate("time"), undefined)
			assertEquals(validate("true"), undefined)
			assertEquals(validate("false"), undefined)
		},
	)

	await t.step(
		"validates nmtoken - rejects values not in enum",
		function rejectsInvalidNmtoken() {
			const validate = _validateAriaValue("aria-current")

			const result = validate("invalid")

			assertEquals(isDefined(result), true)
			assertEquals(
				result?.includes("must be one of"),
				true,
			)
		},
	)

	await t.step(
		"validates integer type - accepts valid integers",
		function validatesInteger() {
			const validate = _validateAriaValue("aria-colcount")

			assertEquals(validate("1"), undefined)
			assertEquals(validate("10"), undefined)
			assertEquals(validate("999"), undefined)
		},
	)

	await t.step(
		"validates integer type - rejects non-integers",
		function rejectsNonInteger() {
			const validate = _validateAriaValue("aria-colcount")

			const result1 = validate("1.5")
			const result2 = validate("abc")

			assertEquals(isDefined(result1), true)
			assertEquals(isDefined(result2), true)
		},
	)

	await t.step(
		"validates integer type - enforces minValue constraint",
		function enforcesMinValue() {
			const validate = _validateAriaValue("aria-colcount")

			const result = validate("-2")

			assertEquals(isDefined(result), true)
			assertEquals(result?.includes(">= -1"), true)
		},
	)

	await t.step(
		"validates decimal type - accepts valid decimals",
		function validatesDecimal() {
			const validate = _validateAriaValue("aria-valuemax")

			assertEquals(validate("1.5"), undefined)
			assertEquals(validate("10"), undefined)
			assertEquals(validate("3.14159"), undefined)
		},
	)

	await t.step(
		"validates decimal type - rejects non-numbers",
		function rejectsNonDecimal() {
			const validate = _validateAriaValue("aria-valuemax")

			const result = validate("abc")

			assertEquals(isDefined(result), true)
			assertEquals(result?.includes("must be a number"), true)
		},
	)

	await t.step(
		"validates idref type - accepts valid IDs",
		function validatesIdref() {
			const validate = _validateAriaValue("aria-activedescendant")

			assertEquals(validate("my-id"), undefined)
			assertEquals(validate("element123"), undefined)
		},
	)

	await t.step(
		"validates idref type - rejects IDs with spaces",
		function rejectsIdrefWithSpaces() {
			const validate = _validateAriaValue("aria-activedescendant")

			const result = validate("id1 id2")

			assertEquals(isDefined(result), true)
			assertEquals(result?.includes("cannot contain spaces"), true)
		},
	)

	await t.step(
		"validates idrefs type - accepts space-separated IDs",
		function validatesIdrefs() {
			const validate = _validateAriaValue("aria-describedby")

			assertEquals(validate("id1 id2 id3"), undefined)
			assertEquals(validate("single-id"), undefined)
		},
	)

	await t.step(
		"validates idrefs type - allows empty when allowEmpty is true",
		function allowsEmptyIdrefs() {
			const validate = _validateAriaValue("aria-describedby")

			// aria-describedby has allowEmpty: true
			const result = validate("")

			assertEquals(result, undefined)
		},
	)

	await t.step(
		"validates string type - accepts any string",
		function validatesString() {
			const validate = _validateAriaValue("aria-label")

			assertEquals(validate("Hello World"), undefined)
			assertEquals(validate("Any text is ok!"), undefined)
			assertEquals(validate("123"), undefined)
		},
	)

	await t.step(
		"handles allowEmpty constraint",
		function handlesAllowEmpty() {
			const validate = _validateAriaValue("aria-label")

			// aria-label has allowEmpty: true
			assertEquals(validate(""), undefined)
			assertEquals(validate(undefined), undefined)
		},
	)

	await t.step(
		"rejects empty values when not allowed",
		function rejectsEmptyWhenNotAllowed() {
			const validate = _validateAriaValue("aria-pressed")

			const result = validate("")

			assertEquals(isDefined(result), true)
			assertEquals(result?.includes("cannot be empty"), true)
		},
	)

	await t.step(
		"rejects non-string values",
		function rejectsNonString() {
			const validate = _validateAriaValue("aria-label")

			const result = validate(123)

			assertEquals(isDefined(result), true)
			assertEquals(result?.includes("must be a string"), true)
		},
	)

	await t.step(
		"rejects undefined when not allowed",
		function rejectsUndefinedWhenNotAllowed() {
			const validate = _validateAriaValue("aria-pressed")

			const result = validate(undefined)

			assertEquals(isDefined(result), true)
			assertEquals(result?.includes("requires a value"), true)
		},
	)
})
