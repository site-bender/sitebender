import { assertEquals } from "@std/assert"
import _validateAriaAttributes from "./index.ts"

Deno.test("_validateAriaAttributes", async function validateAriaAttributesTests(
	t,
) {
	await t.step(
		"validates allowed attributes with valid values",
		function validatesAllowedAttributes() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({
				label: "Click me",
				pressed: "true",
			})

			assertEquals(result, {
				"aria-label": "Click me",
				"aria-pressed": "true",
			})
		},
	)

	await t.step(
		"rejects attributes not allowed on element",
		function rejectsNotAllowed() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({
				label: "Click",
				colcount: "5", // Not allowed on button
			})

			assertEquals(result["aria-label"], "Click")
			assertEquals(result["data-§-bad-aria-colcount"], "5")
			assertEquals(
				result["data-§-aria-error"]?.includes("not allowed"),
				true,
			)
		},
	)

	await t.step(
		"rejects attributes with invalid values",
		function rejectsInvalidValues() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({
				pressed: "maybe", // Invalid - should be true/false/mixed/undefined
			})

			assertEquals(result["data-§-bad-aria-pressed"], "maybe")
			assertEquals(
				result["data-§-aria-error"]?.includes("must be one of"),
				true,
			)
		},
	)

	await t.step(
		"handles explicit role changing allowed attributes",
		function handlesExplicitRole() {
			const validate = _validateAriaAttributes("div")("button")
			const result = validate({
				label: "Click", // Allowed because div has explicit button role
				pressed: "true",
			})

			assertEquals(result, {
				"aria-label": "Click",
				"aria-pressed": "true",
			})
		},
	)

	await t.step(
		"rejects naming attributes on naming-prohibited elements without role",
		function rejectsNamingWithoutRole() {
			const validate = _validateAriaAttributes("div")(undefined)
			const result = validate({
				label: "Label", // Not allowed on div without explicit role
			})

			assertEquals(result["data-§-bad-aria-label"], "Label")
			assertEquals(
				result["data-§-aria-error"]?.includes("not allowed"),
				true,
			)
		},
	)

	await t.step(
		"allows naming attributes on naming-prohibited elements with role",
		function allowsNamingWithRole() {
			const validate = _validateAriaAttributes("div")("button")
			const result = validate({
				label: "Click", // Allowed because div has explicit button role
			})

			assertEquals(result, {
				"aria-label": "Click",
			})
		},
	)

	await t.step(
		"handles empty aria object",
		function handlesEmptyAria() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"validates multiple attributes with mixed validity",
		function validatesMixedValidity() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({
				label: "Click", // Valid
				pressed: "true", // Valid
				colcount: "5", // Invalid attribute (not allowed on button)
				expanded: "maybe", // Invalid value
			})

			assertEquals(result["aria-label"], "Click")
			assertEquals(result["aria-pressed"], "true")
			assertEquals(result["data-§-bad-aria-colcount"], "5")
			assertEquals(result["data-§-bad-aria-expanded"], "maybe")
		},
	)

	await t.step(
		"handles unknown element gracefully",
		function handlesUnknownElement() {
			const validate = _validateAriaAttributes("unknown-element")(undefined)
			const result = validate({
				label: "Test",
			})

			// Unknown element → no validation data → no attributes allowed
			assertEquals(result["data-§-bad-aria-label"], "Test")
		},
	)

	await t.step(
		"validates role-specific attributes",
		function validatesRoleSpecific() {
			const validate = _validateAriaAttributes("div")("checkbox")
			const result = validate({
				checked: "true", // Required for checkbox
				label: "Enable feature",
			})

			assertEquals(result, {
				"aria-checked": "true",
				"aria-label": "Enable feature",
			})
		},
	)

	await t.step(
		"validates global ARIA attributes",
		function validatesGlobalAttributes() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({
				label: "Click me", // Global attribute
				describedby: "desc1 desc2", // Global attribute
			})

			assertEquals(result, {
				"aria-label": "Click me",
				"aria-describedby": "desc1 desc2",
			})
		},
	)

	await t.step(
		"converts all values to strings",
		function convertsToStrings() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({
				label: 123, // Will be converted to "123"
			})

			// Should accept and convert to string
			assertEquals(result["aria-label"], "123")
		},
	)

	await t.step(
		"accumulates errors for multiple invalid attributes",
		function accumulatesErrors() {
			const validate = _validateAriaAttributes("button")(undefined)
			const result = validate({
				colcount: "5", // Not allowed on button
				rowcount: "10", // Not allowed on button
				pressed: "invalid-value", // Invalid value
			})

			// All three should have data-§-bad-aria-* attributes
			assertEquals(result["data-§-bad-aria-colcount"], "5")
			assertEquals(result["data-§-bad-aria-rowcount"], "10")
			assertEquals(result["data-§-bad-aria-pressed"], "invalid-value")
			// Should have error message
			assertEquals(result["data-§-aria-error"] !== undefined, true)
		},
	)

	await t.step(
		"prohibits all ARIA attributes except aria-hidden for none/presentation roles",
		function prohibitsForNonePresentationRoles() {
			const noneValidate = _validateAriaAttributes("div")("none")
			const noneResult = noneValidate({
				hidden: "true",
				label: "Test",
				describedby: "desc",
			})

			const presentationValidate = _validateAriaAttributes("div")(
				"presentation",
			)
			const presentationResult = presentationValidate({
				hidden: "false",
				expanded: "true",
			})

			// aria-hidden should be allowed
			assertEquals(noneResult["aria-hidden"], "true")
			assertEquals(presentationResult["aria-hidden"], "false")

			// All other attributes should be rejected
			assertEquals(noneResult["data-§-bad-aria-label"], "Test")
			assertEquals(noneResult["data-§-bad-aria-describedby"], "desc")
			assertEquals(presentationResult["data-§-bad-aria-expanded"], "true")
		},
	)
})
