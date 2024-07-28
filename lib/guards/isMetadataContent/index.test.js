import { expect, test } from "vitest"

import isMetadataContent from "."

test("[isMetadataContent] (guards) returns true for metadata content elements", () => {
	expect(isMetadataContent({ tag: "Base" })).toBe(true)
	expect(isMetadataContent({ tag: "Link" })).toBe(true)
	expect(isMetadataContent({ tag: "Meta" })).toBe(true)
	expect(isMetadataContent({ tag: "NoScript" })).toBe(true)
	expect(isMetadataContent({ tag: "Script" })).toBe(true)
	expect(isMetadataContent({ tag: "Style" })).toBe(true)
	expect(isMetadataContent({ tag: "Title" })).toBe(true)
})

test("[isMetadataContent] (guards) returns false for non-metadata content elements", () => {
	expect(isMetadataContent({ tag: "Abbr" })).toBe(false)
	expect(isMetadataContent({ tag: "DataList" })).toBe(false)
	expect(isMetadataContent({ tag: "Input" })).toBe(false)
	expect(isMetadataContent({ tag: "Output" })).toBe(false)
	expect(isMetadataContent({ tag: "Select" })).toBe(false)
	expect(isMetadataContent({ tag: "Template" })).toBe(false)
})
