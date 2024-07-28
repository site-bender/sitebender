import { expect, test } from "vitest"

import isScriptSupportingContent from "."

test("[isScriptSupportingContent] (guards) returns true for script-supporting content elements", () => {
	expect(isScriptSupportingContent({ tag: "Script" })).toBe(true)
	expect(isScriptSupportingContent({ tag: "Template" })).toBe(true)
})

test("[isScriptSupportingContent] (guards) returns false for non-script-supporting content elements", () => {
	expect(isScriptSupportingContent({ tag: "Abbr" })).toBe(false)
	expect(isScriptSupportingContent({ tag: "DataList" })).toBe(false)
	expect(isScriptSupportingContent({ tag: "Input" })).toBe(false)
	expect(isScriptSupportingContent({ tag: "Output" })).toBe(false)
	expect(isScriptSupportingContent({ tag: "Select" })).toBe(false)
})
