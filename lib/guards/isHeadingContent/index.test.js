import { expect, test } from "vitest"

import isHeadingContent from "."

test("[isHeadingContent] (guards) returns true for heading content elements", () => {
	expect(isHeadingContent({ tag: "H1" })).toBe(true)
	expect(isHeadingContent({ tag: "H2" })).toBe(true)
	expect(isHeadingContent({ tag: "H3" })).toBe(true)
	expect(isHeadingContent({ tag: "H4" })).toBe(true)
	expect(isHeadingContent({ tag: "H5" })).toBe(true)
	expect(isHeadingContent({ tag: "H6" })).toBe(true)
	expect(isHeadingContent({ tag: "Hgroup" })).toBe(true)
	expect(isHeadingContent({ tag: "Hn" })).toBe(true)
})

test("[isHeadingContent] (guards) returns false for non-heading content elements", () => {
	expect(isHeadingContent({ tag: "Abbr" })).toBe(false)
	expect(isHeadingContent({ tag: "DataList" })).toBe(false)
	expect(isHeadingContent({ tag: "Input" })).toBe(false)
	expect(isHeadingContent({ tag: "Output" })).toBe(false)
	expect(isHeadingContent({ tag: "Select" })).toBe(false)
	expect(isHeadingContent({ tag: "Template" })).toBe(false)
})
