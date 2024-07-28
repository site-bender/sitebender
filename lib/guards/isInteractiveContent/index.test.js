import { expect, test } from "vitest"

import isInteractiveContent from "."

test("[isInteractiveContent] (guards) returns true for interactive content elements", () => {
	expect(isInteractiveContent({ tag: "Button" })).toBe(true)
	expect(isInteractiveContent({ tag: "Details" })).toBe(true)
	expect(isInteractiveContent({ tag: "Embed" })).toBe(true)
	expect(isInteractiveContent({ tag: "Iframe" })).toBe(true)
	expect(isInteractiveContent({ tag: "Label" })).toBe(true)
	expect(isInteractiveContent({ tag: "Select" })).toBe(true)
	expect(isInteractiveContent({ tag: "TextArea" })).toBe(true)
})

test("[isInteractiveContent] (guards) returns false for non-interactive content elements", () => {
	expect(isInteractiveContent({ tag: "Abbr" })).toBe(false)
	expect(isInteractiveContent({ tag: "DataList" })).toBe(false)
	expect(isInteractiveContent({ tag: "Input" })).toBe(false)
	expect(isInteractiveContent({ tag: "Output" })).toBe(false)
	expect(isInteractiveContent({ tag: "Script" })).toBe(false)
	expect(isInteractiveContent({ tag: "Template" })).toBe(false)
})

test("[isInteractiveContent] (guards) returns true for A elements when href attribute present", () => {
	expect(isInteractiveContent({ attributes: { href: "href" }, tag: "A" })).toBe(
		true,
	)
})

test("[isInteractiveContent] (guards) returns false for A elements when href attribute absent", () => {
	expect(isInteractiveContent({ tag: "A" })).toBe(false)
})

test("[isInteractiveContent] (guards) returns true for AUDIO and VIDEO elements when controls attribute present", () => {
	expect(
		isInteractiveContent({
			attributes: { controls: "controls" },
			tag: "Audio",
		}),
	).toBe(true)
	expect(
		isInteractiveContent({
			attributes: { controls: "controls" },
			tag: "Video",
		}),
	).toBe(true)
})

test("[isInteractiveContent] (guards) returns false for A elements when controls attribute absent", () => {
	expect(isInteractiveContent({ tag: "Audio" })).toBe(false)
	expect(isInteractiveContent({ tag: "Video" })).toBe(false)
})

test("[isInteractiveContent] (guards) returns true for IMG and OBJECT elements when usemap attribute present", () => {
	expect(
		isInteractiveContent({
			attributes: { usemap: "usemap" },
			tag: "Img",
		}),
	).toBe(true)
	expect(
		isInteractiveContent({
			attributes: { usemap: "usemap" },
			tag: "Object",
		}),
	).toBe(true)
})

test("[isInteractiveContent] (guards) returns false for A elements when usemap attribute absent", () => {
	expect(isInteractiveContent({ tag: "Img" })).toBe(false)
	expect(isInteractiveContent({ tag: "Object" })).toBe(false)
})

test("[isInteractiveContent] (guards) returns true for INPUT elements when type attribute present but not hidden", () => {
	expect(
		isInteractiveContent({ attributes: { type: "type" }, tag: "Input" }),
	).toBe(true)
})

test("[isInteractiveContent] (guards) returns false for INPUT elements when type attribute present but hidden", () => {
	expect(
		isInteractiveContent({
			attributes: { hidden: "hidden", type: "type" },
			tag: "Input",
		}),
	).toBe(false)
})

test("[isInteractiveContent] (guards) returns false for INPUT elements when type attribute absent", () => {
	expect(
		isInteractiveContent({
			attributes: { hidden: "hidden" },
			tag: "Input",
		}),
	).toBe(false)
})
