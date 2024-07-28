import { expect, test } from "vitest"

import isFlowContent from "."

test("[isFlowContent] (guards) returns true for flow content elements", () => {
	expect(isFlowContent({ tag: "Abbr" })()).toBe(true)
	expect(isFlowContent({ tag: "Canvas" })()).toBe(true)
	expect(isFlowContent({ tag: "Embed" })()).toBe(true)
	expect(isFlowContent({ tag: "Footer" })()).toBe(true)
	expect(isFlowContent({ tag: "Img" })()).toBe(true)
	expect(isFlowContent({ tag: "Label" })()).toBe(true)
	expect(isFlowContent({ tag: "Object" })()).toBe(true)
	expect(isFlowContent({ tag: "Picture" })()).toBe(true)
	expect(isFlowContent({ tag: "Select" })()).toBe(true)
	expect(isFlowContent({ tag: "Video" })()).toBe(true)
})

test("[isFlowContent] (guards) returns false for non-flow content elements", () => {
	expect(isFlowContent({ tag: "Base" })()).toBe(false)
	expect(isFlowContent({ tag: "Link" })()).toBe(false)
	expect(isFlowContent({ tag: "Meta" })()).toBe(false)
	expect(isFlowContent({ tag: "Title" })()).toBe(false)
})

test("[isFlowContent] (guards) returns true for AREA when descendant of MAP", () => {
	expect(
		isFlowContent({ tag: "Area" })({
			ancestors: ["Article", "Section", "Map"],
		}),
	).toBe(true)
})

test("[isFlowContent] (guards) returns false for MAP when not a descendant of AREA", () => {
	expect(
		isFlowContent({ tag: "Area" })({
			ancestors: ["Article", "Section"],
		}),
	).toBe(false)
})

test("[isFlowContent] (guards) returns true for LINK and META when itemprop attribute present", () => {
	expect(
		isFlowContent({ attributes: { itemprop: "prop" }, tag: "Link" })(),
	).toBe(true)
	expect(
		isFlowContent({ attributes: { itemprop: "prop" }, tag: "Meta" })(),
	).toBe(true)
})

test("[isFlowContent] (guards) returns true for LINK and META when itemprop attribute absent", () => {
	expect(isFlowContent({ tag: "Link" })()).toBe(false)
	expect(isFlowContent({ tag: "Meta" })()).toBe(false)
})
