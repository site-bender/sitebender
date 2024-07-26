import { expect, test } from "vitest"

import isFormAssociatedResettableContent from "."

test("[isFormAssociatedResettableContent] (guards) returns true for form-associated resettable content elements", () => {
	expect(isFormAssociatedResettableContent({ tag: "Input" })).toBe(true)
	expect(isFormAssociatedResettableContent({ tag: "Output" })).toBe(true)
	expect(isFormAssociatedResettableContent({ tag: "Select" })).toBe(true)
	expect(isFormAssociatedResettableContent({ tag: "TextArea" })).toBe(true)
})

test("[isFormAssociatedResettableContent] (guards) returns false for non-form-associated resettable content elements", () => {
	expect(isFormAssociatedResettableContent({ tag: "Abbr" })).toBe(false)
	expect(isFormAssociatedResettableContent({ tag: "DataList" })).toBe(false)
	expect(isFormAssociatedResettableContent({ tag: "Figure" })).toBe(false)
	expect(isFormAssociatedResettableContent({ tag: "P" })).toBe(false)
	expect(isFormAssociatedResettableContent({ tag: "Section" })).toBe(false)
	expect(isFormAssociatedResettableContent({ tag: "Template" })).toBe(false)
})
