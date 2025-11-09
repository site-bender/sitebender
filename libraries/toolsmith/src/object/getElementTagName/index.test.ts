import type { ElementNode } from "../../types/index.ts"

import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import getElementTagName from "./index.ts"

Deno.test("getElementTagName", async function getElementTagNameTests(t) {
	await t.step(
		"returns ok with tagName for valid ElementNode",
		function returnsOkWithTagName() {
			const node: ElementNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			const result = getElementTagName(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "DIV")
			}
		},
	)

	await t.step(
		"returns ok for any valid tag name",
		function worksWithAnyValidTagName() {
			const node: ElementNode = {
				_tag: "element",
				tagName: "CUSTOM-ELEMENT",
				attributes: {},
				children: [],
			}

			const result = getElementTagName(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "CUSTOM-ELEMENT")
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

			const result = getElementTagName(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_ELEMENT_NODE")
			}
		},
	)

	await t.step(
		"returns error for node missing tagName",
		function returnsErrorForMissingTagName() {
			const node = {
				_tag: "element",
				attributes: {},
				children: [],
			} as unknown as ElementNode

			const result = getElementTagName(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "MISSING_TAG_NAME")
			}
		},
	)

	await t.step(
		"returns error for non-string tagName",
		function returnsErrorForNonStringTagName() {
			const node = {
				_tag: "element",
				tagName: 123,
				attributes: {},
				children: [],
			} as unknown as ElementNode

			const result = getElementTagName(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_TAG_NAME_TYPE")
			}
		},
	)

	await t.step(
		"returns error for empty tagName",
		function returnsErrorForEmptyTagName() {
			const node: ElementNode = {
				_tag: "element",
				tagName: "",
				attributes: {},
				children: [],
			}

			const result = getElementTagName(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "EMPTY_TAG_NAME")
			}
		},
	)

	await t.step(
		"protects against type assertion bypasses",
		function protectsAgainstTypeAssertions() {
			const node = {} as ElementNode

			const result = getElementTagName(node)

			assert(result._tag === "Error")
		},
	)
})
