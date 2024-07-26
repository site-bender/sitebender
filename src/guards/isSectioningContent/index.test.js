import { expect, test } from "vitest"

import isSectioningContent from "."

test("[isSectioningContent] (guards) returns true for sectioning content elements", () => {
	expect(isSectioningContent({ tag: "Article" })).toBe(true)
	expect(isSectioningContent({ tag: "Aside" })).toBe(true)
	expect(isSectioningContent({ tag: "Nav" })).toBe(true)
	expect(isSectioningContent({ tag: "Section" })).toBe(true)
})

test("[isSectioningContent] (guards) returns false for non-sectioning content elements", () => {
	expect(isSectioningContent({ tag: "Abbr" })).toBe(false)
	expect(isSectioningContent({ tag: "DataList" })).toBe(false)
	expect(isSectioningContent({ tag: "Input" })).toBe(false)
	expect(isSectioningContent({ tag: "Output" })).toBe(false)
	expect(isSectioningContent({ tag: "Select" })).toBe(false)
	expect(isSectioningContent({ tag: "Template" })).toBe(false)
})
