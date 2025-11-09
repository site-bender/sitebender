import type { ElementNode } from "../../types/index.ts"

import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import getElementChildren from "./index.ts"

Deno.test("getElementChildren", async function getElementChildrenTests(t) {
	await t.step(
		"returns ok with children for valid ElementNode",
		function returnsOkWithChildren() {
			const node: ElementNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [
					{ _tag: "text", content: "hello" },
					{ _tag: "element", tagName: "SPAN", attributes: {}, children: [] },
				],
			}

			const result = getElementChildren(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value.length, 2)
			}
		},
	)

	await t.step(
		"returns ok for empty children array",
		function worksWithEmptyChildren() {
			const node: ElementNode = {
				_tag: "element",
				tagName: "BR",
				attributes: {},
				children: [],
			}

			const result = getElementChildren(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, [])
			}
		},
	)

	await t.step(
		"returns error for non-ElementNode",
		function returnsErrorForNonElementNode() {
			const node = {
				_tag: "text",
				content: "hello",
			} as unknown as ElementNode

			const result = getElementChildren(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_ELEMENT_NODE")
			}
		},
	)

	await t.step(
		"returns error for node missing children",
		function returnsErrorForMissingChildren() {
			const node = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
			} as unknown as ElementNode

			const result = getElementChildren(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "MISSING_CHILDREN")
			}
		},
	)

	await t.step(
		"returns error for non-array children",
		function returnsErrorForNonArrayChildren() {
			const node = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: "not an array",
			} as unknown as ElementNode

			const result = getElementChildren(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_CHILDREN_TYPE")
			}
		},
	)

	await t.step(
		"protects against type assertion bypasses",
		function protectsAgainstTypeAssertions() {
			const node = {} as ElementNode

			const result = getElementChildren(node)

			assert(result._tag === "Error")
		},
	)
})
