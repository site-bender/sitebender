import { expect, test } from "vitest"

import isFormAssociatedSubmittableContent from "."

test("[isFormAssociatedSubmittableContent] (guards) returns true for form-associated submittable content elements", () => {
	expect(isFormAssociatedSubmittableContent({ tag: "Button" })).toBe(true)
	expect(isFormAssociatedSubmittableContent({ tag: "Input" })).toBe(true)
	expect(isFormAssociatedSubmittableContent({ tag: "Object" })).toBe(true)
	expect(isFormAssociatedSubmittableContent({ tag: "Select" })).toBe(true)
	expect(isFormAssociatedSubmittableContent({ tag: "TextArea" })).toBe(true)
})

test("[isFormAssociatedSubmittableContent] (guards) returns false for non-form-associated submittable content elements", () => {
	expect(isFormAssociatedSubmittableContent({ tag: "Abbr" })).toBe(false)
	expect(isFormAssociatedSubmittableContent({ tag: "DataList" })).toBe(false)
	expect(isFormAssociatedSubmittableContent({ tag: "Figure" })).toBe(false)
	expect(isFormAssociatedSubmittableContent({ tag: "P" })).toBe(false)
	expect(isFormAssociatedSubmittableContent({ tag: "Section" })).toBe(false)
	expect(isFormAssociatedSubmittableContent({ tag: "Template" })).toBe(false)
})
