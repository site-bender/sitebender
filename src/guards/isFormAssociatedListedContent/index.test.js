import { expect, test } from "vitest"

import isFormAssociatedListedContent from "."

test("[isFormAssociatedListedContent] (guards) returns true for form-associated listed content elements", () => {
	expect(isFormAssociatedListedContent({ tag: "Button" })).toBe(true)
	expect(isFormAssociatedListedContent({ tag: "Fieldset" })).toBe(true)
	expect(isFormAssociatedListedContent({ tag: "Input" })).toBe(true)
	expect(isFormAssociatedListedContent({ tag: "Object" })).toBe(true)
	expect(isFormAssociatedListedContent({ tag: "Output" })).toBe(true)
	expect(isFormAssociatedListedContent({ tag: "Select" })).toBe(true)
	expect(isFormAssociatedListedContent({ tag: "TextArea" })).toBe(true)
})

test("[isFormAssociatedListedContent] (guards) returns false for non-form-associated listed content elements", () => {
	expect(isFormAssociatedListedContent({ tag: "Abbr" })).toBe(false)
	expect(isFormAssociatedListedContent({ tag: "DataList" })).toBe(false)
	expect(isFormAssociatedListedContent({ tag: "Figure" })).toBe(false)
	expect(isFormAssociatedListedContent({ tag: "P" })).toBe(false)
	expect(isFormAssociatedListedContent({ tag: "Section" })).toBe(false)
	expect(isFormAssociatedListedContent({ tag: "Template" })).toBe(false)
})
