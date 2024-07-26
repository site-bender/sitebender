import { expect, test } from "vitest"

import isEmbeddedContent from "."

test("[isEmbeddedContent] (guards) returns true for embedded content elements", () => {
	expect(isEmbeddedContent({ tag: "Audio" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Canvas" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Embed" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Iframe" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Img" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Math" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Object" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Picture" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Svg" })).toBe(true)
	expect(isEmbeddedContent({ tag: "Video" })).toBe(true)
})

test("[isEmbeddedContent] (guards) returns false for non-embedded content elements", () => {
	expect(isEmbeddedContent({ tag: "Abbr" })).toBe(false)
	expect(isEmbeddedContent({ tag: "DataList" })).toBe(false)
	expect(isEmbeddedContent({ tag: "Input" })).toBe(false)
	expect(isEmbeddedContent({ tag: "Output" })).toBe(false)
	expect(isEmbeddedContent({ tag: "Select" })).toBe(false)
	expect(isEmbeddedContent({ tag: "Template" })).toBe(false)
})
