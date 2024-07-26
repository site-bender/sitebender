import { expect, test } from "vitest"

import isFormAssociatedLabelableContent from "."

test("[isFormAssociatedLabelableContent] (guards) returns true for form-associated labelable content elements", () => {
	expect(isFormAssociatedLabelableContent({ tag: "Button" })).toBe(true)
	expect(isFormAssociatedLabelableContent({ tag: "Input" })).toBe(true)
	expect(isFormAssociatedLabelableContent({ tag: "Meter" })).toBe(true)
	expect(isFormAssociatedLabelableContent({ tag: "Output" })).toBe(true)
	expect(isFormAssociatedLabelableContent({ tag: "Progress" })).toBe(true)
	expect(isFormAssociatedLabelableContent({ tag: "Select" })).toBe(true)
	expect(isFormAssociatedLabelableContent({ tag: "TextArea" })).toBe(true)
})

test("[isFormAssociatedLabelableContent] (guards) returns false for non-form-associated labelable content elements", () => {
	expect(isFormAssociatedLabelableContent({ tag: "Abbr" })).toBe(false)
	expect(isFormAssociatedLabelableContent({ tag: "DataList" })).toBe(false)
	expect(isFormAssociatedLabelableContent({ tag: "Figure" })).toBe(false)
	expect(isFormAssociatedLabelableContent({ tag: "P" })).toBe(false)
	expect(isFormAssociatedLabelableContent({ tag: "Section" })).toBe(false)
	expect(isFormAssociatedLabelableContent({ tag: "Template" })).toBe(false)
})
