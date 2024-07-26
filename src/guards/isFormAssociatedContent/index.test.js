import { expect, test } from "vitest"

import isFormAssociatedContent from "."

test("[isFormAssociatedContent] (guards) returns true for form-associated content elements", () => {
	expect(isFormAssociatedContent({ tag: "Button" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Fieldset" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Input" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Label" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Meter" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Object" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Output" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Progress" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "Select" })).toBe(true)
	expect(isFormAssociatedContent({ tag: "TextArea" })).toBe(true)
})

test("[isFormAssociatedContent] (guards) returns false for non-form-associated content elements", () => {
	expect(isFormAssociatedContent({ tag: "Abbr" })).toBe(false)
	expect(isFormAssociatedContent({ tag: "DataList" })).toBe(false)
	expect(isFormAssociatedContent({ tag: "Figure" })).toBe(false)
	expect(isFormAssociatedContent({ tag: "P" })).toBe(false)
	expect(isFormAssociatedContent({ tag: "Section" })).toBe(false)
	expect(isFormAssociatedContent({ tag: "Template" })).toBe(false)
})
